gulp = require 'gulp'
htmlmin = require 'gulp-htmlmin'
rev = require 'gulp-rev-append'
connect = require 'gulp-connect'
watch = require 'gulp-watch'
plumber = require 'gulp-plumber'
cleancss = require 'gulp-clean-css'
gsass = require 'gulp-sass'
coffee = require 'gulp-coffee'
babel = require 'gulp-babel'

option = {removeComments: true,collapseWhitespace: true,collapseBooleanAttributes: true, removeEmptyAttributes: true,minifyJS: true,minifyCSS: true}

#压缩html
gulp.task 'minhtml',->
    gulp.src('./src1/*.html').pipe(htmlmin(option)).pipe(gulp.dest 'dist')

#链接添加版本号
gulp.task 'buildRev',->
    gulp.src('./src1/*.html').pipe(rev()).pipe(gulp.dest 'dist')
#压缩css并监听更新
gulp.task 'mincss',->
    gulp.src('./src1/css/*.css').pipe(cleancss()).pipe(gulp.dest 'dist/css').pipe(connect.reload())

#压缩js并监听更新
gulp.task 'minjs',->
    gulp.src('./src1/js/*.js').pipe(plumber({errorHandler: (error)-> this.error 'end' })).pipe(gulp.dest './dist/js').pipe(connect.reload())
#监听html压缩
gulp.task 'minhtml',->
    gulp.src('./src1/*.html').pipe(htmlmin(option)).pipe(gulp.dest 'dist').pipe(connect.reload())


#编译sass
gulp.task 'gscss',->
    gulp.src('./src1/sass/*.scss').pipe(gsass()).pipe(gulp.dest 'dist/css').pipe(connect.reload())
#编译coffee
gulp.task 'coffeeT',->
    gulp.src('./src1/coffee/*.coffee').pipe(coffee()).pipe(gulp.dest 'dist/js').pipe(connect.reload())
#编译es6
gulp.task 'es6',->
    gulp.src('./src1/es6/*.js').pipe(babel
        presets: ['babel-preset-es2015']
    ).pipe(gulp.dest 'dist/es6js').pipe(connect.reload())


#监听刷新
gulp.task 'connect_reload',->
    connect.server({root: './dist',livereload: true,port: 8888})
#监听所有js和html刷新
gulp.task 'comp_watch',->
    gulp.watch('src1/*.html',['minhtml'])
    gulp.watch('src1/js/*.js', ['minjs'])
    gulp.watch('src1/sass/*.scss',['gscss'])
    gulp.watch('src1/coffee/*.coffee',['coffeeT'])
    gulp.watch('src1/es6/*.js',['es6'])


gulp.task 'online',['gscss','minjs','es6','coffeeT','minhtml','comp_watch','connect_reload']