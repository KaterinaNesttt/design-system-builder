const fs = require('fs');

const assetsCss = fs.readFileSync('src/assets/index.css', 'utf-8');

// We want to keep everything EXCEPT lines matching `html[data-theme='light']...`
// And we want to keep the variables in :root for the dark theme.

// Let's just use regex to remove `html[data-theme='light'] { ... }` blocks.
// Wait, CSS parsing with regex can be tricky with nested brackets.
// Let's do it simple: find blocks.
let cleanCss = assetsCss.replace(/html\[data-theme='light'\]\s*\{[^}]+\}/g, '');
// Also remove light theme selectors like `html[data-theme='light'] .class { ... }`
// Actually, `html[data-theme='light'] { ... }` has nested rules in assets/index.css ? No, the file uses standard CSS mostly, except Tailwind @layer.
// Let's check if there are nested rules: `html[data-theme='light'] { ... }` has multiple variables inside.
// Other rules are `html[data-theme='light'] .something { ... }`

// Let's just remove any rule block that starts with `html[data-theme='light']`.
function removeLightBlocks(css) {
    let result = '';
    let i = 0;
    while (i < css.length) {
        let match = css.indexOf("html[data-theme='light']", i);
        if (match === -1) {
            result += css.substring(i);
            break;
        }
        result += css.substring(i, match);
        // Find the opening brace
        let openBrace = css.indexOf('{', match);
        if (openBrace === -1) break;
        // Find the matching closing brace
        let depth = 1;
        let j = openBrace + 1;
        while (j < css.length && depth > 0) {
            if (css[j] === '{') depth++;
            if (css[j] === '}') depth--;
            j++;
        }
        i = j;
    }
    return result;
}

let darkCss = removeLightBlocks(assetsCss);

// Remove `html[data-theme='dark']` wrapper around variables, just keep the variables inside if any.
// In assets/index.css: `html[data-theme='dark'] { --shadow-button: ... }`
darkCss = darkCss.replace(/html\[data-theme='dark'\]\s*\{([^}]+)\}/g, ':root { $1 }');

// We need to inject the Tailwind v4 @theme block and the custom fallbacks for StyleInjector.
const topBlock = `
@import "tailwindcss";

@theme {
  --color-primary: var(--color-primary);
  --color-secondary: var(--color-secondary);
  --color-accent: var(--color-accent);
  --color-background: var(--color-background);
  --color-surface: var(--color-surface);
  --color-text-main: var(--color-text-main);
  --color-text-muted: var(--color-text-muted);
  --color-border-main: var(--color-border-main);
  
  --radius-sm: calc(var(--radius) * 0.5);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) * 1.5);
  --radius-xl: calc(var(--radius) * 2);
  --radius-full: 9999px;
  
  --font-sans: var(--font-family);
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

`;

// Find where `@tailwind utilities;` is and replace the top part
darkCss = darkCss.replace(/@tailwind base;[\s\S]*?@tailwind utilities;/g, '');

// Also, the body {} in darkCss needs to be updated to use our dynamic variables if possible, 
// but wait, `assets/index.css` has `body { @apply bg-background text-foreground font-sans antialiased; }`.
// I will just append our `glass-panel` class for PreviewArea to darkCss.

const glassPanel = `
@layer utilities {
  .glass-panel {
    background-color: color-mix(in srgb, var(--color-surface) var(--glass-opacity), transparent);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
  }
}
`;

fs.writeFileSync('src/index.css', topBlock + darkCss + glassPanel);
console.log('src/index.css updated');

