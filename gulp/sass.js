'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';
import gulpif from 'gulp-if';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    let dirs = config.directories;
    let entries = config.entries;
    let dest = path.join(taskTarget, dirs.main, dirs.styles.replace('_', ''));

    // Sass compilation
    gulp.task('sass', () => {
        gulp.src(path.join(dirs.source, dirs.styles, entries.css))
            .pipe(plugins.plumber())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({
                outputStyle: 'expanded',
                precision: 10
            }))
            .on('error', function(err) {
                plugins.util.log(err);
            })
            .on('error', plugins.notify.onError(config.defaultNotification))
            .pipe(plugins.postcss([autoprefixer({
                browsers: ['last 2 version', '> 5%', 'safari 5', 'ios 6', 'android 4']
            })]))
            .pipe(gulpif(args.production, plugins.cssnano({
                rebase: false
            })))
            .pipe(gulpif(!args.production, plugins.sourcemaps.write('./')))
            .pipe(gulp.dest(dest))
            .pipe(browserSync.stream({
                match: '**/*.css'
            }));
    });
}
