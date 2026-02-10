# Font Usage Guide

## Available Fonts

All fonts are configured in `tailwind.config.js` and loaded globally in `src/app/layout.tsx`.

### 1. **Aktura** (Regular)
- **File**: `public/fonts/Aktura-Regular.ttf`
- **Tailwind class**: `font-aktura`
- **CSS variable**: `var(--font-aktura)`

### 2. **Harmond** (Extra Bold Expanded)
- **File**: `public/fonts/Harmond-ExtraBoldExpanded.otf`
- **Tailwind class**: `font-harmond`
- **CSS variable**: `var(--font-harmond)`

### 3. **TG Mathos** (Regular)
- **File**: `public/fonts/TGMathosDemo-Regular.otf`
- **Tailwind class**: `font-mathos`
- **CSS variable**: `var(--font-mathos)`

### 4. **TG Mathos** (Bold)
- **File**: `public/fonts/TGMathosDemo-Bold.otf`
- **Tailwind class**: `font-mathos-bold`
- **CSS variable**: `var(--font-mathos-bold)`

---

## How to Use

### Method 1: Tailwind Classes (Recommended)

```tsx
// Aktura font
<h1 className="font-aktura text-4xl">Heading with Aktura</h1>

// Harmond font
<h2 className="font-harmond text-3xl">Heading with Harmond</h2>

// Mathos Regular
<p className="font-mathos text-base">Body text with Mathos</p>

// Mathos Bold
<p className="font-mathos-bold text-lg">Bold text with Mathos</p>
```

### Method 2: CSS Variables (for inline styles)

```tsx
<h1 style={{ fontFamily: "var(--font-aktura)" }}>
  Heading with Aktura
</h1>

<div style={{ fontFamily: "var(--font-harmond)" }}>
  Content with Harmond
</div>
```

### Method 3: CSS/SCSS Files

```css
.my-heading {
  font-family: var(--font-aktura);
}

.my-subheading {
  font-family: var(--font-harmond);
}

.my-body {
  font-family: var(--font-mathos);
}
```

---

## Examples

### Hero Title with Aktura
```tsx
<h1 className="font-aktura text-[12vw] uppercase tracking-tight">
  Ayush Kumar
</h1>
```

### Section Heading with Harmond
```tsx
<h2 className="font-harmond text-6xl font-bold">
  Selected Work
</h2>
```

### Body Text with Mathos
```tsx
<p className="font-mathos text-base leading-relaxed">
  Lorem ipsum dolor sit amet consectetur adipisicing elit.
</p>

<p className="font-mathos-bold text-lg">
  Bold paragraph with Mathos Bold
</p>
```

### Combining with Other Tailwind Classes
```tsx
<h1 className="font-aktura text-[clamp(48px,12vw,200px)] uppercase leading-[0.8] tracking-[0.08em]">
  Responsive Heading
</h1>
```

---

## Notes

- All fonts are loaded globally in `src/app/layout.tsx`
- CSS variables are available throughout the entire app
- Fonts include fallbacks to system fonts for better performance
- Use Tailwind classes for consistency and easier maintenance
