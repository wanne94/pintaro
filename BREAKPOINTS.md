# Breakpoint Strategy for pintaro.ch

## Standard Tailwind Breakpoints Used

- **sm:** 640px (Small devices - landscape phones)
- **md:** 768px (Medium devices - tablets)
- **lg:** 1024px (Large devices - desktops)
- **xl:** 1280px (Extra large devices - large desktops)
- **2xl:** 1536px (2X large devices - larger desktops)

## Responsive Design Patterns

### Typography Scale
- Mobile first: Base size
- sm: Slightly larger
- md: Desktop size
- lg+: Maximum size

Example:
```css
text-2xl sm:text-3xl md:text-4xl lg:text-5xl
```

### Grid Layouts
- Mobile: Single column
- sm: 2 columns where appropriate
- md: 3 columns for galleries
- lg: 4+ columns for extensive grids

Example:
```css
grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
```

### Spacing & Padding
- Mobile: Compact (px-4, py-16)
- sm: Medium (px-6)
- lg: Generous (px-8, py-20)

### Container Width
- Mobile: Full width with padding
- sm: Max 640px
- md: Max 768px
- lg: Max 1024px
- xl: Max 1280px
- 2xl: Max 1536px

## Component-Specific Patterns

### Header
- Mobile: h-16 (64px height)
- Desktop: h-20 (80px height)

### Touch Targets
- Minimum: 44x44px on all devices
- Mobile: 48-56px for primary actions

### Images
- Mobile: 95vw max width
- Desktop: 90vw max width

## Testing Viewports
- 320px - iPhone SE
- 375px - iPhone 12/13/14
- 390px - iPhone 14 Pro
- 414px - iPhone Plus models
- 768px - iPad
- 1024px - iPad Pro / Desktop
- 1366px - Popular laptop
- 1920px - Full HD desktop