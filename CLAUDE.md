# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic portfolio website for Dr. Geunhyeong Lee (https://geunhyeong.com). Built with Jekyll 4.3+ using the al-folio academic theme. Features research in AI-driven design optimization, additive manufacturing, and nuclear engineering.

## Build Commands

```bash
# Local development
bundle exec jekyll serve              # Serve on http://localhost:4000

# Docker development
docker compose up                     # Dev mode on port 8080 with live reload
docker compose -f docker-compose-slim.yml up  # Lightweight option

# Production build
JEKYLL_ENV=production bundle exec jekyll build

# Install dependencies
bundle install                        # Ruby gems
npm install                           # Node (Prettier)
```

## Linting and Formatting

```bash
npx prettier . --check               # Check formatting
npx prettier . --write               # Auto-format
pre-commit run --all-files           # Run all pre-commit hooks
```

## Architecture

### Content System
- **_bibliography/papers.bib**: BibTeX publications processed by jekyll-scholar
- **_projects/**: Project pages with categories (EM=Electromagnetic, TF=Thermo-Fluid, OT=Other) and importance ranking
- **_pages/**: Static pages (about.md is the homepage)
- **_data/cv.yml**: Structured CV data

### Styling
- **_sass/_custom.scss**: Custom style overrides (primary customization point)
- **_sass/_themes.scss**: Dark/light mode theming
- Bootstrap + Material Design Bootstrap for UI framework

### Layouts
- **_layouts/about.liquid**: Homepage layout
- **_layouts/bib.liquid**: Publication list
- **_layouts/distill.liquid**: Distill-style articles
- **_includes/**: Reusable components (head, header, footer, cv/)

### Configuration
- **_config.yml**: Main Jekyll config (~600 lines) - theme settings, plugins, SEO, analytics (GA: G-S6E3Q7K15Y), scholar settings

## Key Plugins

- jekyll-scholar: Publication management from BibTeX
- jekyll-imagemagick: Responsive image generation (480px, 800px, 1400px WebP)
- jekyll-archives-v2: Blog categorization
- jekyll-minifier: Production optimization

## CI/CD Workflows (.github/workflows/)

- **deploy.yml**: Main deployment (Ruby 3.3.5, Python 3.13)
- **prettier.yml**: Format checking
- **broken-links.yml**: Link validation
- **axe.yml**: Accessibility testing
- **lighthouse-badger.yml**: Performance metrics
