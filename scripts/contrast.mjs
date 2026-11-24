/**
 * Verificador de contraste WCAG sobre el HTML compilado (`dist/`).
 *
 * Uso: `node scripts/contrast.mjs`
 * Recorre cada página, sigue la pila de fondos (bg-*) de cada elemento,
 * calcula el color compuesto de los textos y avisa si queda por debajo de
 * 4.5:1 (texto pequeño) o 3:1 (texto grande).
 *
 * Limitaciones: ignora imágenes/fondos con gradiente y estilos inline
 * complejos; cubre las utilidades de Tailwind y las clases de componentes
 * definidas en `src/styles/global.css`.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("../dist/", import.meta.url)));

const COLORS = {
  white: "#ffffff",
  black: "#000000",
  ink: "#17121f",
  cream: "#fbf7ef",
  grape: "#8b2be2",
  "grape-dark": "#6716b8",
  "grape-soft": "#f3e9ff",
  sky: "#7be3f5",
  peri: "#aab4f2",
  pink: "#ff9ea9",
  transparent: null,
};

const SIZES = {
  "text-xs": 12,
  "text-sm": 14,
  "text-base": 16,
  "text-lg": 18,
  "text-xl": 20,
  "text-2xl": 24,
  "text-3xl": 30,
  "text-4xl": 36,
  "text-5xl": 48,
  "text-6xl": 60,
};

const WEIGHTS = {
  "font-medium": 500,
  "font-semibold": 600,
  "font-bold": 700,
  "font-extrabold": 800,
  "font-black": 900,
};

// Clases compuestas de src/styles/global.css que pintan fondo o texto.
const COMPONENT_STYLES = {
  "btn-primary": { bg: "grape", color: "white" },
  "btn-secondary": { bg: "white", color: "ink" },
  "card-pop": { bg: "white" },
  eyebrow: { bg: "white", color: "ink" },
  field: { bg: "white", color: "ink", placeholder: "ink/60" },
  "skip-link": { bg: "ink", color: "white" },
};

const toRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const luminance = (hex) => {
  const [r, g, b] = toRgb(hex).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const l1 = Math.max(luminance(a), luminance(b));
  const l2 = Math.min(luminance(a), luminance(b));
  return (l1 + 0.05) / (l2 + 0.05);
};
const composite = (fg, alpha, bg) => {
  const f = toRgb(fg);
  const b = toRgb(bg);
  return (
    "#" +
    f
      .map((v, i) => Math.round((v * alpha + b[i] * (1 - alpha)) * 255).toString(16).padStart(2, "0"))
      .join("")
  );
};

function parseColorToken(token) {
  // `text-ink/70`, `bg-white/10`, `border-ink/15`...
  const [name, alpha] = token.split("/");
  const hex = COLORS[name];
  if (!hex) return null;
  return { hex, alpha: alpha === undefined ? 1 : Number(alpha) / 100 };
}

function elementStyles(classes) {
  const out = { bg: null, color: null, size: null, weight: null, placeholder: null };
  for (const cls of classes) {
    if (cls.startsWith("placeholder:")) {
      const token = cls.slice("placeholder:".length).replace(/^text-/, "");
      out.placeholder = parseColorToken(token);
      continue;
    }
    if (cls.startsWith("bg-")) {
      const c = parseColorToken(cls.slice(3));
      if (c && c.alpha > 0) out.bg = c;
      continue;
    }
    if (cls.startsWith("text-")) {
      const c = parseColorToken(cls.slice(5));
      if (c) {
        out.color = c;
        continue;
      }
      if (SIZES[cls]) out.size = SIZES[cls];
      continue;
    }
    if (cls.startsWith("text-[")) {
      const m = cls.match(/^text-\[([\d.]+)(px|rem)\]$/);
      if (m) out.size = m[2] === "rem" ? Number(m[1]) * 16 : Number(m[1]);
      continue;
    }
    if (WEIGHTS[cls]) out.weight = WEIGHTS[cls];
  }
  const comp = COMPONENT_STYLES[classes[0]];
  if (comp) {
    if (comp.bg && !out.bg) out.bg = parseColorToken(comp.bg);
    if (comp.color && !out.color) out.color = parseColorToken(comp.color);
    if (comp.placeholder && !out.placeholder) out.placeholder = parseColorToken(comp.placeholder);
  }
  return out;
}

function effectiveBackground(stack) {
  // Compone los fondos translúcidos desde el más externo.
  let base = "#ffffff";
  const layers = [];
  for (const frame of stack) {
    if (frame.bg) layers.push(frame.bg);
  }
  for (const layer of layers) {
    base = layer.alpha >= 1 ? layer.hex : composite(layer.hex, layer.alpha, base);
  }
  return base;
}

function scanPage(html) {
  const issues = [];
  const stack = [];
  const tagRe = /<\/?([a-zA-Z][^\s/>]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;
  let cursor = 0;
  let match;

  const pushText = (text, colorOverride) => {
    if (!text.trim() || !stack.length) return;
    const current = stack[stack.length - 1];
    const color = colorOverride ?? current.styles.color;
    if (!color) return;
    const bg = effectiveBackground(stack.map((f) => f.styles));
    const fg = color.alpha >= 1 ? color.hex : composite(color.hex, color.alpha, bg);
    const size = current.styles.size ?? 16;
    const weight = current.styles.weight ?? 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const required = large ? 3 : 4.5;
    const ratio = contrast(fg, bg);
    if (ratio < required) {
      issues.push({
        ratio: Number(ratio.toFixed(2)),
        required,
        size,
        fg,
        bg,
        text: text.trim().replace(/\s+/g, " ").slice(0, 70),
        cls: current.classes.slice(0, 4).join(" "),
      });
    }
  };

  while ((match = tagRe.exec(html)) !== null) {
    pushText(html.slice(cursor, match.index));
    cursor = tagRe.lastIndex;

    const [raw, name, rawAttrs] = match;
    const isClose = raw.startsWith("</");
    const selfClosing = raw.endsWith("/>") || ["img", "br", "hr", "input", "meta", "link", "path", "circle", "rect", "line", "polyline", "polygon", "use", "source"].includes(name.toLowerCase());

    if (isClose) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].name === name) {
          stack.length = i;
          break;
        }
      }
      continue;
    }

    const classMatch = rawAttrs.match(/class\s*=\s*"([^"]*)"/);
    const classes = classMatch ? classMatch[1].split(/\s+/).filter(Boolean) : [];
    const styles = elementStyles(classes);
    const phMatch = rawAttrs.match(/placeholder\s*=\s*"([^"]*)"/);
    const keep = !selfClosing || Boolean(phMatch);

    if (keep) stack.push({ name, classes, styles });
    // El texto de los inputs vive en el atributo `placeholder`.
    if (phMatch && styles.placeholder) pushText(phMatch[1], styles.placeholder);
    if (keep && selfClosing) stack.pop();
  }

  return issues;
}

async function listHtml(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await listHtml(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

const files = await listHtml(ROOT);
let total = 0;
for (const file of files) {
  const html = await fs.readFile(file, "utf8");
  const issues = scanPage(html).sort((a, b) => a.ratio - b.ratio);
  total += issues.length;
  const rel = path.relative(ROOT, file).replaceAll("\\", "/");
  if (issues.length) {
    console.log(`\n✖ ${rel}`);
    for (const issue of issues) {
      console.log(
        `   ${issue.ratio} < ${issue.required}  (${issue.size}px, fg ${issue.fg} / bg ${issue.bg}) "${issue.text}" [${issue.cls}]`,
      );
    }
  } else {
    console.log(`✓ ${rel}`);
  }
}
console.log(`\n${files.length} páginas revisadas · ${total} incidencias`);
process.exit(total > 0 ? 1 : 0);
