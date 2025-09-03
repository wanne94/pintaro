# Project Plan: Gallery Before/After & Logo Integration

## Overview
Implement a before/after gallery showcasing Pintaro's painting and plastering work, and integrate the Pintaro logo into the website.

## TODO List

### Phase 1: Gallery Enhancement
- [x] Identify and pair before/after images from the provided folder
- [x] Analyze images to determine which show "before" state and which show "after" state
- [x] Create proper image pairs for each project
- [x] Create a new gallery data structure for before/after images
- [x] Copy selected work images to public/images/gallery folder
- [x] Build BeforeAfterSlider component with interactive comparison
- [x] Update Gallery component to display before/after projects
- [x] Add project details (type, location, duration)

### Phase 2: Logo Integration  
- [x] Add Pintaro logo to Header component
- [ ] Update favicon with logo mark
- [x] Add logo to Footer component
- [x] Ensure proper responsive sizing

### Phase 3: Content & Styling
- [ ] Organize images into categories (facade, interior, floor, plastering)
- [ ] Add German/Italian translations for new gallery content
- [ ] Implement gallery filtering by project type
- [ ] Add animations and hover effects
- [ ] Optimize images for performance

## Technical Approach
- Use Next.js Image component for optimization
- Implement slider using CSS and minimal JS
- Maintain existing Tailwind/shadcn design system
- Keep mobile-first responsive approach

## Files to Modify
1. `/components/Gallery.tsx` - Main gallery update
2. `/components/Header.tsx` - Add logo
3. `/components/Footer.tsx` - Add logo
4. `/public/images/gallery/` - New folder for work images
5. `/messages/de.json` & `/messages/it.json` - Translations

## Success Criteria
- Smooth before/after slider interaction
- Professional presentation of work portfolio
- Logo properly integrated with existing brand colors
- Fully responsive on all devices
- Fast loading with optimized images