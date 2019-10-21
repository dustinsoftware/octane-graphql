# PWA Performance Workshop

Working so far:

- Asset hashing and 304 not modified
- Service workers pre-emptively fetching content
- Code splitting to defer loading heavy modules
- CSS modules and hack-tastic code splitting for vendor'd modules
- Lighthouse in CI to prevent accidental regressions

Still to explore:

- Pre-generating initial loading state for static pages (prember in this case)
- Server side rendering (increased hosting cost, worth it for dynamic content critical for first paint)
- Telemetry backend for collecting metrics for RUM
