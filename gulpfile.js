import gulp from 'gulp';

import './gulp/dev.js';
import './gulp/docs.js';

// Таск default (запускається командою gulp)
gulp.task(
  'default',
  gulp.series(
    'clean:dev',
    gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'),
    'server:dev', 
    'watch:dev'   
  )
);

// Таск docs (запускається командою gulp docs)
gulp.task(
  'docs',
  gulp.series(
    'clean:docs',
    gulp.parallel('html:docs', 'sass:docs', 'images:docs', 'fonts:docs', 'files:docs', 'js:docs'),
    'server:docs',
    'watch:docs'  
  )
);