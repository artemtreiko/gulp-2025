```
gulp-2025/
├── .gitignore              # Git ignore file
├── README.md               # Project documentation
├── package.json            # Node.js dependencies and scripts
├── package-lock.json       # Lockfile for dependencies
├── webpack.config.cjs      # Webpack configuration
├── gulp/                   # Gulp task configurations
│   ├── dev.js              # Development tasks
│   ├── docs.js             # Production tasks
│   └── gulpfile.js         # Gulp entry point
├── src/                    # Source files
│   ├── html/               # HTML templates
│   │   ├── blocks/         # Reusable HTML blocks
│   │   │   ├── footer.html
│   │   │   └── header.html
│   │   ├── index.html      # Main HTML page
│   │   └── sprite-preview.html  # SVG sprite preview page
│   ├── img/                # Images
│   │   ├── svg/            # SVG icons for sprite
│   │   │   ├── instagram.svg
│   │   │   └── linkedin.svg
│   │   └── test-image.jpg  # Test image
│   ├── js/                 # JavaScript files
│   │   ├── index.js        # Main JS entry
│   │   └── modules/        # JS modules
│   │       └── mobile-nav.js
│   └── scss/               # SCSS styles
│       ├── base/           # Base styles
│       │   ├── _base.scss
│       │   ├── _containers.scss
│       │   ├── _reset.scss
│       │   ├── _sticky-footer.scss
│       │   ├── _utils.scss
│       │   └── _vars.scss
│       └── main.scss       # Main SCSS file
├── build/                  # Development build output
│   ├── css/                # Compiled CSS
│   │   └── main.css
│   ├── img/                # Images and SVG sprite
│   │   ├── sprite.svg
│   │   └── test-image.jpg
│   ├── js/                 # Bundled JS
│   │   └── index.bundle.js
│   └── index.html          # Built HTML
└── docs/                   # Production build output
    ├── css/                # Compiled CSS
    │   └── main.css
    ├── img/                # Images
    │   ├── test-image.jpg
    │   └── test-image.webp
    ├── js/                 # Bundled JS
    │   └── index.bundle.js
    └── index.html          # Built HTML
```
