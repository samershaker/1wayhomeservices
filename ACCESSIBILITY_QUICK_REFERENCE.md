# Accessibility Quick Reference Guide

## For Developers Working on 1Way Home Services

This guide provides quick reference for maintaining WCAG 2.1 Level AA compliance.

---

## Essential CSS Classes

### Screen Reader Only
```tsx
<span className="sr-only">Descriptive text for screen readers</span>
```
**When to use:** Hidden text that screen readers should announce (e.g., icon button labels)

### Focus Visible
**Automatic** - All interactive elements (`<a>`, `<button>`) automatically get focus styles.
- Blue outline: `3px solid var(--color-primary)`
- Offset: `3px` from element edge

---

## Color Contrast Requirements

### Text Colors (on black background)
| Class | Hex | Ratio | Usage | Status |
|-------|-----|-------|-------|--------|
| `text-white` | #F9FAFB | 18:1 | Headings, primary text | ✅ AAA |
| `text-gray-200` | #E5E7EB | 12:1 | Secondary text | ✅ AAA |
| `text-gray-300` | #D1D5DB | 7.1:1 | Labels, nav links | ✅ AA |
| `text-gray-400` | #B8BFC7 | 4.6:1 | Body text minimum | ✅ AA |
| ~~`text-gray-500`~~ | #9CA3AF | 3.2:1 | ❌ DO NOT USE for text |

### Rule of Thumb
- **Headings/important text:** Use `text-white` or `text-gray-200`
- **Body text:** Use `text-gray-300` or `text-gray-400`
- **Avoid:** `text-gray-500` and `text-gray-600` (fail contrast)

---

## ARIA Patterns

### Icon Buttons
```tsx
{/* Icon + text (desktop) */}
<button className="btn-primary">
  <span className="sr-only">Call us at </span>
  <span aria-hidden="true">{icons.phone}</span>
  <span>Call Now</span>
</button>

{/* Icon only (mobile) */}
<button className="btn-primary" aria-label="Call (619) 716-9193">
  <span aria-hidden="true">{icons.phone}</span>
</button>
```

### Mobile Menu Button
```tsx
<button
  onClick={() => setMenuOpen(!menuOpen)}
  aria-expanded={menuOpen}
  aria-controls="mobile-menu"
  aria-label="Toggle navigation menu"
>
  {menuOpen ? '✕' : '☰'}
</button>
```

### Decorative Elements
```tsx
{/* Animations, visual effects */}
<div className="animate-pulse" aria-hidden="true">
  {/* Decorative content */}
</div>
```

---

## Landmark Regions

### Required Structure
```tsx
<body>
  <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main</a>

  <nav aria-label="Main navigation">
    {/* Navigation */}
  </nav>

  <main id="main-content">
    {/* All page content */}
  </main>

  <footer aria-label="Site footer">
    {/* Footer */}
  </footer>
</body>
```

### Rules
- ✅ **One** `<main>` per page
- ✅ Use `aria-label` if multiple `<nav>` or `<footer>` elements
- ✅ Skip link must be first focusable element

---

## Keyboard Navigation

### Focus Order
1. Skip link (shows on focus)
2. Navigation links
3. Page content (top to bottom)
4. Footer links

### Testing
```bash
# Tab through page
Press Tab repeatedly → All interactive elements should show blue outline

# Activate elements
Enter/Space on buttons and links → Should trigger action

# Mobile menu
Enter/Space on hamburger → Menu opens/closes
```

---

## Mobile Menu Implementation

### State Management
```tsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
```

### Hamburger Button
```tsx
<button
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-expanded={mobileMenuOpen}
  aria-controls="mobile-menu"
  aria-label="Toggle navigation menu"
>
  {mobileMenuOpen ? '✕' : '☰'}
</button>
```

### Menu Dropdown
```tsx
{mobileMenuOpen && (
  <div id="mobile-menu" className="md:hidden">
    <a href="#section" onClick={() => setMobileMenuOpen(false)}>Link</a>
  </div>
)}
```

### Best Practices
- ✅ Close menu when link is clicked
- ✅ Use semantic HTML (`<nav>`, `<a>`)
- ✅ Provide `aria-controls` and `aria-expanded`

---

## Common Mistakes to Avoid

### ❌ DON'T
```tsx
// Icon button without label
<button><PhoneIcon /></button>

// Low contrast text
<p className="text-gray-500">Important text</p>

// Missing aria-label on icon-only
<a href="tel:123"><PhoneIcon /></a>

// Divs as buttons
<div onClick={handleClick}>Click me</div>
```

### ✅ DO
```tsx
// Icon button with label
<button aria-label="Call (619) 716-9193">
  <PhoneIcon />
</button>

// High contrast text
<p className="text-gray-300">Important text</p>

// Aria-label on icon-only
<a href="tel:123" aria-label="Call (619) 716-9193">
  <PhoneIcon />
</a>

// Buttons as buttons
<button onClick={handleClick}>Click me</button>
```

---

## Testing Checklist

### Before Every Deployment

#### Keyboard
- [ ] Tab through entire page
- [ ] Skip link appears and works
- [ ] All buttons/links show focus
- [ ] Mobile menu works with keyboard

#### Screen Reader
- [ ] Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] Landmarks navigate correctly
- [ ] Icon buttons announce labels
- [ ] Form fields have labels

#### Visual
- [ ] Text contrast meets 4.5:1 minimum
- [ ] Focus indicators clearly visible
- [ ] Mobile menu opens/closes properly

#### Motion
- [ ] Enable "Reduce motion" in OS
- [ ] Animations disabled/reduced

---

## Tools

### Browser Extensions
- **axe DevTools** - Automated accessibility testing
- **WAVE** - Visual accessibility checker
- **Lighthouse** - Performance + accessibility audit

### Color Contrast Checkers
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Coolors Contrast Checker: https://coolors.co/contrast-checker

### Screen Readers
- **macOS:** VoiceOver (Cmd+F5)
- **Windows:** NVDA (free) or JAWS (paid)
- **Browser:** ChromeVox extension

---

## Resources

### WCAG Guidelines
- WCAG 2.1 Quick Reference: https://www.w3.org/WAI/WCAG21/quickref/
- WebAIM Articles: https://webaim.org/articles/

### Next.js Accessibility
- Next.js Accessibility Docs: https://nextjs.org/docs/accessibility

### Tailwind + Accessibility
- Tailwind Forms Plugin (accessible by default)
- Use semantic HTML with Tailwind classes

---

## Questions?

### Common Questions

**Q: Can I use `text-gray-500` for decorative text?**
A: No - even decorative text must meet contrast requirements if it's readable. Use `aria-hidden="true"` for purely visual elements.

**Q: Do I need `aria-label` on every button?**
A: Only if the button doesn't have visible text. If it has text content, skip `aria-label`.

**Q: What about images?**
A: All `<img>` need `alt` text. Decorative images: `alt=""`. Meaningful images: descriptive alt text.

**Q: How do I test mobile menu accessibility?**
A: 1) Tab to hamburger button, 2) Press Enter, 3) Tab through menu items, 4) Press Enter on link.

---

**Last Updated:** 2026-04-21
**WCAG Level:** AA Compliant
**Maintained by:** Development Team
