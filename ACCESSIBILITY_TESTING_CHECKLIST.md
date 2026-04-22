# Accessibility Testing Checklist

**Project:** 1Way Home Services
**WCAG Level:** 2.1 AA
**Last Updated:** 2026-04-21

Use this checklist to verify accessibility compliance before each deployment.

---

## Pre-Deployment Testing

### ✅ Phase 1: Automated Testing (5 minutes)

Run these automated tools to catch common issues:

#### Lighthouse Audit
```bash
1. Open site in Chrome
2. Right-click → Inspect → Lighthouse tab
3. Select "Accessibility" category
4. Click "Analyze page load"
5. Target score: ≥95/100
```

**Expected Results:**
- ✅ Contrast: All text passes
- ✅ ARIA: All attributes valid
- ✅ Names/Labels: All interactive elements labeled
- ✅ Navigation: Skip link present

#### axe DevTools
```bash
1. Install axe DevTools extension
2. Open DevTools → axe tab
3. Click "Scan ALL of my page"
4. Target: 0 violations
```

**Common Issues to Check:**
- [ ] No color contrast failures
- [ ] No missing ARIA labels
- [ ] No keyboard traps
- [ ] No duplicate IDs

---

### ✅ Phase 2: Keyboard Navigation (10 minutes)

Test all functionality using only keyboard (no mouse).

#### Desktop Navigation
- [ ] **Tab** to skip link → "Skip to main content" appears
- [ ] **Enter** on skip link → Jumps to main content
- [ ] **Tab** through nav links → All links show blue focus outline
- [ ] **Tab** to "Call Now" button → Shows gold focus outline
- [ ] **Enter** on phone button → Opens phone dialer

#### Mobile Navigation (Responsive Mode)
- [ ] Resize browser to mobile width (< 768px)
- [ ] **Tab** to hamburger button → Shows blue focus outline
- [ ] **Enter** on hamburger → Menu opens
- [ ] **Tab** through menu items → All links focusable
- [ ] **Enter** on menu link → Navigates to section & closes menu
- [ ] **Tab** to phone icon button → Shows focus outline

#### Page Content
- [ ] **Tab** through all service cards → Each card shows focus
- [ ] **Tab** through FAQ section → All cards focusable
- [ ] **Tab** to all CTA buttons → All show focus outline
- [ ] **Shift+Tab** backwards → Focus order reversed correctly

**Pass Criteria:**
✅ All interactive elements reachable with keyboard
✅ Visible focus indicator on all elements
✅ No focus traps (can always move focus forward/backward)
✅ Logical tab order (top to bottom, left to right)

---

### ✅ Phase 3: Screen Reader Testing (15 minutes)

Test with a screen reader to verify content is properly announced.

#### macOS - VoiceOver
```bash
1. Enable: Cmd+F5
2. Navigate: Ctrl+Option+Arrow Keys
3. Interact: Ctrl+Option+Space
4. Landmarks: Ctrl+Option+U (Web Spots)
```

#### Windows - NVDA (Free)
```bash
1. Download: https://www.nvaccess.org/download/
2. Enable: Ctrl+Alt+N
3. Navigate: Arrow Keys
4. Interact: Enter
5. Landmarks: Insert+F7 (Elements List)
```

#### Testing Checklist

**Landmarks Navigation**
- [ ] Navigate to landmarks (VoiceOver: Ctrl+Option+U, NVDA: Insert+F7)
- [ ] Verify announced: "Main navigation", "Main content", "Site footer"
- [ ] Can jump between landmarks

**Skip Link**
- [ ] Tab to first element → Announces "Skip to main content, link"
- [ ] Activate skip link → Focus jumps to main content
- [ ] Screen reader announces new location

**Navigation**
- [ ] Each nav link announced with text: "Services, link"
- [ ] Phone button announced: "Call us at, Call Now, button" (desktop)
- [ ] Phone button announced: "Call (619) 716-9193, button" (mobile)

**Mobile Menu**
- [ ] Hamburger button: "Toggle navigation menu, button, collapsed/expanded"
- [ ] Menu items announced correctly
- [ ] Menu state changes announced (opened/closed)

**Service Cards**
- [ ] Each service title announced as heading
- [ ] Service descriptions read completely
- [ ] Call-to-action links announced

**Forms (if present)**
- [ ] All fields have labels
- [ ] Required fields announced as "required"
- [ ] Error messages announced

**Icons**
- [ ] Phone icons: Ignored by screen reader (aria-hidden)
- [ ] Decorative animations: Ignored by screen reader

**Pass Criteria:**
✅ All content readable by screen reader
✅ Interactive elements properly labeled
✅ Landmarks help navigation
✅ Icon-only buttons have descriptive labels
✅ No "unlabeled" or "clickable" generic announcements

---

### ✅ Phase 4: Color Contrast (5 minutes)

Verify all text meets WCAG AA minimum contrast ratio (4.5:1).

#### Method 1: Browser DevTools
```bash
Chrome DevTools:
1. Inspect element
2. Click color swatch in Styles panel
3. Check contrast ratio indicator
4. Look for ✅ AA badge
```

#### Method 2: WebAIM Contrast Checker
```bash
1. Go to: https://webaim.org/resources/contrastchecker/
2. Enter foreground: Text color
3. Enter background: #0A0A0A (black)
4. Verify: ✅ WCAG AA Pass
```

#### Elements to Check
- [ ] Navigation links (gray-300: #D1D5DB) → 7.1:1 ✅
- [ ] Body text (gray-400: #B8BFC7) → 4.6:1 ✅
- [ ] Stat labels (gray-300: #D1D5DB) → 7.1:1 ✅
- [ ] Service descriptions (gray-400) → 4.6:1 ✅
- [ ] FAQ text (gray-400) → 4.6:1 ✅
- [ ] Footer text (gray-400) → 4.6:1 ✅

**Pass Criteria:**
✅ All text ≥ 4.5:1 ratio (AA standard)
✅ Large text (≥18pt) ≥ 3:1 ratio
✅ No gray-500 (#9CA3AF) used for text

---

### ✅ Phase 5: Mobile Testing (10 minutes)

Test on real mobile devices or emulators.

#### iOS Testing (iPhone)
```bash
Physical Device or iOS Simulator:
1. Open Safari
2. Navigate to site
3. Test interactions
```

#### Android Testing
```bash
Physical Device or Android Emulator:
1. Open Chrome
2. Navigate to site
3. Test interactions
```

#### Mobile Checklist

**Navigation**
- [ ] Hamburger icon visible and tappable
- [ ] Phone icon button visible and tappable
- [ ] Tap hamburger → Menu slides down
- [ ] Menu links all tappable
- [ ] Tap menu link → Navigates and closes menu
- [ ] Tap outside menu → Menu closes (if implemented)

**Content**
- [ ] All text readable (no tiny text)
- [ ] Service cards stack vertically
- [ ] CTA buttons full-width on small screens
- [ ] Forms usable with on-screen keyboard

**Touch Targets**
- [ ] All buttons ≥44×44px (iOS guideline)
- [ ] Links have adequate spacing
- [ ] No accidental taps

**Pass Criteria:**
✅ Mobile menu fully functional
✅ All content accessible
✅ No horizontal scrolling
✅ Touch targets meet size requirements

---

### ✅ Phase 6: Reduced Motion (3 minutes)

Test that animations respect user preferences.

#### macOS
```bash
1. System Preferences → Accessibility → Display
2. Enable "Reduce motion"
3. Reload website
4. Verify: Animations disabled/minimal
```

#### Windows
```bash
1. Settings → Ease of Access → Display
2. Enable "Show animations in Windows" OFF
3. Reload website
4. Verify: Animations disabled/minimal
```

#### Chrome DevTools Emulation
```bash
1. Open DevTools → Rendering tab
2. Scroll to "Emulate CSS media feature prefers-reduced-motion"
3. Select "prefers-reduced-motion: reduce"
4. Reload page
```

**Expected Behavior:**
- [ ] Scroll animations instant (no smooth scroll)
- [ ] Fade-in animations instant
- [ ] Parallax effects disabled
- [ ] Transitions near-instant (0.01ms)
- [ ] Rotating/moving elements static

**Pass Criteria:**
✅ All animations respect reduced motion preference
✅ Site remains functional without animations
✅ No vestibular motion triggers

---

### ✅ Phase 7: Forms Testing (if applicable)

If contact forms are added, test these:

#### Keyboard
- [ ] Tab through all fields in logical order
- [ ] Field labels always visible (no placeholder-only)
- [ ] Required fields marked with `*` or "required"
- [ ] Error messages keyboard accessible

#### Screen Reader
- [ ] Field labels announced
- [ ] Input type announced (text, email, tel, etc.)
- [ ] Required state announced
- [ ] Error messages announced when validation fails

#### Visual
- [ ] Focus indicator on focused field
- [ ] Error states clearly visible
- [ ] Success messages accessible

---

## Quick Pass/Fail Criteria

### ✅ PASS if:
- Lighthouse accessibility score ≥ 95
- 0 axe DevTools violations
- All content keyboard accessible
- All interactive elements labeled
- All text meets contrast ratios
- Mobile menu works on touch devices
- Animations disabled with reduced motion

### ❌ FAIL if:
- Any keyboard trap exists
- Any interactive element unlabeled
- Any text < 4.5:1 contrast ratio
- Skip link missing or broken
- Mobile navigation broken
- Animations play with reduced motion enabled

---

## Regression Testing

### After Code Changes

Test these specific areas after modifying:

**CSS Changes:**
- [ ] Re-check color contrast
- [ ] Verify focus styles still visible
- [ ] Test reduced motion still works

**Component Changes:**
- [ ] Tab through affected components
- [ ] Screen reader test new/modified content
- [ ] Mobile test if responsive changes made

**Navigation Changes:**
- [ ] Full keyboard navigation test
- [ ] Mobile menu functionality test
- [ ] Skip link still works

**Form Changes:**
- [ ] All fields labeled
- [ ] Error handling accessible
- [ ] Keyboard and screen reader test

---

## Issue Reporting Template

When accessibility issues are found, report using this format:

```markdown
### Issue: [Brief description]

**WCAG Criterion:** [e.g., 2.4.7 Focus Visible (AA)]
**Severity:** Critical / High / Medium / Low
**Component:** [e.g., Navigation, Service Cards, Footer]
**Location:** [File path and line number]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What currently happens]

**Suggested Fix:**
[How to fix it]

**Affects:**
- [ ] Keyboard users
- [ ] Screen reader users
- [ ] Low vision users
- [ ] Mobile users
```

---

## Testing Schedule

### Development
- **Every commit:** Run automated tests (Lighthouse, axe)
- **Every feature:** Full keyboard + screen reader test
- **Before PR:** Complete quick checklist (Phases 1-4)

### Staging
- **Every deployment:** Full checklist (all phases)
- **Weekly:** Comprehensive screen reader test
- **Monthly:** Real device testing (iOS + Android)

### Production
- **After deployment:** Smoke test (Phases 1-2)
- **Quarterly:** Full accessibility audit
- **Annually:** Third-party WCAG audit (recommended)

---

## Tools Reference

### Browser Extensions
- **axe DevTools:** https://www.deque.com/axe/devtools/
- **WAVE:** https://wave.webaim.org/extension/
- **Lighthouse:** Built into Chrome DevTools

### Screen Readers
- **VoiceOver:** Built into macOS
- **NVDA:** https://www.nvaccess.org/ (Windows, free)
- **JAWS:** https://www.freedomscientific.com/products/software/jaws/ (Windows, paid)

### Contrast Checkers
- **WebAIM:** https://webaim.org/resources/contrastchecker/
- **Coolors:** https://coolors.co/contrast-checker

### Validators
- **W3C Markup Validator:** https://validator.w3.org/
- **ARIA Validator:** https://www.w3.org/WAI/ARIA/apg/practices/

---

## Sign-Off

After completing all tests, sign off before deployment:

```markdown
## Accessibility Testing Sign-Off

**Date:** [YYYY-MM-DD]
**Tester:** [Your name]
**Branch/Commit:** [Branch name / Commit hash]

### Results
- [ ] Phase 1: Automated Testing - PASS
- [ ] Phase 2: Keyboard Navigation - PASS
- [ ] Phase 3: Screen Reader - PASS
- [ ] Phase 4: Color Contrast - PASS
- [ ] Phase 5: Mobile Testing - PASS
- [ ] Phase 6: Reduced Motion - PASS
- [ ] Phase 7: Forms Testing - PASS (or N/A)

### Issues Found
[List any issues or "None"]

### Notes
[Any additional observations]

**Overall Status:** ✅ PASS / ❌ FAIL
**Ready for Deployment:** YES / NO
```

---

**Document Version:** 1.0
**Last Updated:** 2026-04-21
**WCAG Standard:** 2.1 Level AA
