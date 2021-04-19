// Load Gulp...of course
const { src, dest, task, watch, series, parallel } = require('gulp');

// CSS related plugins
const sass         = require( 'gulp-sass' );
const autoprefixer = require( 'gulp-autoprefixer' );

// Utility plugins
var notify       = require( 'gulp-notify' );

const paths = {
  styles: {
    src: './scss/*.scss',
    dest: './css/',
    watch: './scss/*/*.scss'
  }
};

// Tasks
function css(done) {
  src( paths.styles.src )
    .pipe( sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }) )
    .on( 'error', console.error.bind( console ) )
    .pipe( autoprefixer() )
    .pipe( dest( paths.styles.dest ) )
  done();
}

function watchFiles() {
  watch(paths.styles.watch, series(css));
  notify({ message: 'Gulp is Watching, Happy Coding!' })
}

task("css", css);
task("default", parallel(css));
task("watch", parallel(watchFiles));
