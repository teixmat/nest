'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    let dirs = config.directories
    let dest = path.join(taskTarget, dirs.main)

    // Copy
    gulp.task('copy', () => {
        return gulp.src([
                path.join(dirs.source, '**/*'),
                '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}')
            ])
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest))
    })
}
