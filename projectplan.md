# Performance Optimization Plan for pintaro.ch

## Priority 1: Critical Image Optimizations (Immediate Impact)

### TODO: Enable Next.js Image Optimization
- [ ] Remove `unoptimized: true` from next.config.ts
- [ ] Configure proper image domains if needed
- [ ] Test that static export still works with optimization

### TODO: Optimize Image Sizes and Formats
- [ ] Convert large images to WebP format
- [ ] Create responsive image sizes (mobile, tablet, desktop)
- [ ] Implement proper `sizes` attribute for all Next Image components
- [ ] Add priority loading for above-the-fold images

## Priority 2: React Performance Optimizations

### TODO: Add React.memo to Heavy Components
- [ ] Wrap Gallery component with React.memo
- [ ] Memoize BeforeAfterSlider component
- [ ] Memoize ImageModal component
- [ ] Add useMemo for expensive computations (beforeAfterProjects, galleryImages arrays)

### TODO: Implement Lazy Loading
- [ ] Use dynamic imports for ImageModal (loads on demand)
- [ ] Lazy load BeforeAfterSlider components below fold
- [ ] Implement intersection observer for gallery images

## Priority 3: Bundle and Code Splitting

### TODO: Optimize JavaScript Bundle
- [ ] Analyze bundle with @next/bundle-analyzer
- [ ] Dynamic import heavy components
- [ ] Review and optimize third-party imports
- [ ] Implement route-based code splitting

### TODO: Optimize CSS and Fonts
- [ ] Review Tailwind CSS purge configuration
- [ ] Optimize font loading strategy
- [ ] Remove unused CSS classes
- [ ] Consider critical CSS extraction

## Priority 4: Additional Optimizations

### TODO: Add Loading States and Suspense
- [ ] Implement loading skeletons for images
- [ ] Add React Suspense boundaries
- [ ] Progressive enhancement for interactions

### TODO: Caching and Headers
- [ ] Configure proper cache headers for static assets
- [ ] Implement service worker for offline support
- [ ] Add resource hints (preconnect, prefetch)

## Notes
- Current performance score: 2/10 (Critical)
- Estimated improvement after Priority 1 & 2: 70-80% faster load times
- Images currently 213MB unoptimized vs 4.2MB optimized potential