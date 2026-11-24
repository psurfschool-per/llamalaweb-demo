/**
 * Regenera las fuentes auto-hospedadas de `public/fonts/`.
 *
 * Descarga la hoja de estilos de Google Fonts (subconjunto latino), guarda los
 * `.woff2` localmente y escribe los bloques `@font-face` que van en
 * `src/styles/global.css`. Ejecutar con `node scripts/selfhost-fonts.mjs`
 * cuando cambien los pesos usados.
 */
import { promises as fs } from "node:fs";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const API =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800;900&display=swap";

const res = await fetch(API, { headers: { "user-agent": UA } });
if (!res.ok) throw new Error(`Google Fonts: ${res.status}`);
const css = await res.text();

const blocks = [];
const re = /\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g;
let m;
while ((m = re.exec(css)) !== null) {
  if (m[1] !== "latin") continue; // el español cubre el subconjunto `latin`
  const body = m[2];
  const family = /font-family:\s*'([^']+)'/.exec(body)?.[1];
  const weight = /font-weight:\s*(\d+)/.exec(body)?.[1];
  const url = /url\((https:[^)]+)\)/.exec(body)?.[1];
  const range = /unicode-range:\s*([^;]+);/.exec(body)?.[1];
  if (family && weight && url) blocks.push({ family, weight, url, range });
}

await fs.mkdir("public/fonts", { recursive: true });
const seen = new Map();
let total = 0;
for (const b of blocks) {
  if (!seen.has(b.url)) {
    const file = await fetch(b.url, { headers: { "user-agent": UA } });
    if (!file.ok) throw new Error(`${file.status} ${b.url}`);
    const buf = Buffer.from(await file.arrayBuffer());
    const name = `${b.family.toLowerCase()}-${b.weight}-latin.woff2`;
    await fs.writeFile(`public/fonts/${name}`, buf);
    seen.set(b.url, name);
    total += buf.length;
    console.log(`\u2193 public/fonts/${name}  ${Math.round(buf.length / 1024)} KB`);
  }
  b.file = `/fonts/${seen.get(b.url)}`;
}

const out = [
  "/* Fuentes auto-hospedadas (subconjunto latino).",
  "   Regenerar con: node scripts/selfhost-fonts.mjs",
  "   Evitan la petición render-blocking a fonts.googleapis.com. */",
  ...blocks.map((b) =>
    [
      "@font-face {",
      `  font-family: "${b.family}";`,
      "  font-style: normal;",
      `  font-weight: ${b.weight};`,
      "  font-display: swap;",
      `  src: url("${b.file}") format("woff2");`,
      b.range ? `  unicode-range: ${b.range};` : null,
      "}",
    ]
      .filter(Boolean)
      .join("\n"),
  ),
  "",
].join("\n\n");

await fs.writeFile("src/styles/fonts.generated.css", out);
console.log(`\n${blocks.length} @font-face · ${seen.size} archivos · ${Math.round(total / 1024)} KB`);
console.log("Escrito en src/styles/fonts.generated.css");
