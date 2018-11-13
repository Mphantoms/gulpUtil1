gulp = require 'gulp'
htmlmin = require 'gulp-htmlmin'
rev = require 'gulp-rev-append'
connect = require 'gulp-connect'
watch = require 'gulp-watch'
plumber = require 'gulp-plumber'
cleancss = require 'gulp-clean-css'

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

#监听刷新
gulp.task 'connect_reload',->
    connect.server({root: './dist',livereload: true,port: 8888})
#监听所有js和html刷新
gulp.task 'comp_watch',->
    gulp.watch('src1/*.html',['minhtml'])
    gulp.watch('src1/js/*.js', ['minjs'])
    gulp.watch('src1/css/*.css',['mincss'])


gulp.task 'online',['mincss','minjs','minhtml','comp_watch','connect_reload']