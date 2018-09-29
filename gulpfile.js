var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass'),
	combineMq = require('gulp-combine-mq'),
	imagemin = require('gulp-imagemin');
	watch = require('gulp-watch').
	babel = require('gulp-babel');
var browserSync = require('browser-sync').create();


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

/**
 * Compile with gulp-ruby-sass + source maps
 */
gulp.task('sass', function () {

    return sass('src/scss', {sourcemap: true})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: '/app/scss'
        }))
        .pipe(browserSync.stream({match: '**/*.css'}));
});


// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('src/js/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['js'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("src/js/*.js", ['js-watch']);
});



// // Static server
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });
// });


// 	// zip = require('gulp-zip');

// var path = {
// 	scripts:"src/js",
// 	styles:"src/scss",
// 	images:"src/img"
// };

// //scripts task 
// gulp.task('img', function () {
//     return gulp.src('src/images/**/*')
//         .pipe(imagemin({
//             // progressive: true,
//             // svgoPlugins: [{removeViewBox: false}],
//            // use: [pngquant()]
//         }))
//         .pipe(gulp.dest('images'));
// });

// gulp.task('scripts', function () {	
// 	gulp.src('src/js/*.js')
// 	.pipe(sourcemaps.init())
//         .pipe(babel({
//             // presets: ['@babel/env']
//         }))
// 	// .pipe(concat('bundle.min.js'))
// 	.pipe(uglify())
// 	.pipe(sourcemaps.write('.'))
// 	.pipe(gulp.dest('js/bundle.min.js'));
// });

// //styles
// gulp.task('style', function () {
	
// 	 return sass('src/scss/', ({style: 'compressed'}))
//     .on('error', function (err) {
//       console.error('Error!', err.message);
//    })
//     .pipe(combineMq({ beautify: false }))
// 	.pipe(gulp.dest('css/'));
// });

// gulp.task('new', function () {
	
// 	gulp.watch('src/scss/*.scss', ['style']);
// 	// gulp.watch('bower_components/bootstrap-sass/assets/**/*.scss', ['style']);
   
// });



// gulp.task('zip', function () {	
// 		return gulp.src('js/*')
//         .pipe(zip('archive.zip'))
//         .pipe(gulp.dest('minjs'));

// });

// gulp.task('default', ['scripts', 'style']);