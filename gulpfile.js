var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	ejs = require("gulp-ejs"),
	sass = require("gulp-sass"),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	htmlhint = require("gulp-htmlhint"),
	csslint = require('gulp-csslint'),
	htmlReporter = require('gulp-csslint-report'),
	csscomb = require('gulp-csscomb'),
	htmlbeautify = require('gulp-html-beautify'),
	crLfReplace = require('gulp-cr-lf-replace'),
	fs = require('fs');
	var changed  = require('gulp-changed');
	var imagemin = require('gulp-imagemin');
	var imageminJpg = require('imagemin-jpeg-recompress');
	var imageminPng = require('imagemin-pngquant');
	var imageminGif = require('imagemin-gifsicle');
	var svgmin = require('gulp-svgmin');

gulp.task('ejs', function () {
	var tmp_file = './ejs/template.ejs',
		json_file = './ejs/data/pages.json',
		json = JSON.parse(fs.readFileSync(json_file)),
		page_data = json.pages;
	for (var i = 0; i < page_data.length; i++) {
		var bread1 = page_data[i].bread1;
		var bread2 = page_data[i].bread2;
		var bread3 = page_data[i].bread3;
		var bread4 = page_data[i].bread4;
		var bread1_url = page_data[i].bread1_url;
		var bread2_url = page_data[i].bread2_url;
		var bread3_url = page_data[i].bread3_url;
		var BREADCRUMBS = "";
		var id = page_data[i].id,
			parentId1 = page_data[i].parentId1,
			parentId2 = page_data[i].parentId2,
			parentId3 = page_data[i].parentId3,
			parentId4 = page_data[i].parentId4,
			depth = page_data[i].depth,
			RELATIVE_PATH = "";
		if (depth == 0) {
			RELATIVE_PATH = "./"
		} else if (depth == 1) {
			RELATIVE_PATH = "../"
		} else if (depth == 2) {
			RELATIVE_PATH = "../../"
		} else if (depth == 3) {
			RELATIVE_PATH = "../../../"
		} else if (depth == 4) {
			RELATIVE_PATH = "../../../../"
		}
		if (bread1 != "") {
			BREADCRUMBS = '<a href="/">TOP</a> <i class="fa fa-angle-right" aria-hidden="true">＞</i> <span>' + bread1 + '</span>'
		}
		if (bread2 != "") {
			BREADCRUMBS = '<a href="/">TOP</a> <i class="fa fa-angle-right" aria-hidden="true">＞</i> <span><a href="' + bread1_url + '">' + bread1 + '</a></span> <i class="fa fa-angle-right" aria-hidden="true"></i> <span>' + bread2 + '</span>'
		}
		if (bread3 != "") {
			BREADCRUMBS = '<a href="/">TOP</a> <i class="fa fa-angle-right" aria-hidden="true">＞</i> <span><a href="' + bread1_url + '">' + bread1 + '</a></span> <i class="fa fa-angle-right" aria-hidden="true"></i> <span><a href="' + bread2_url + '">' + bread2 + '</a></span> <i class="fa fa-angle-right" aria-hidden="true"></i> <span>' + bread3 + '</span>'
		}
		if (bread4 != "") {
			BREADCRUMBS = '<a href="/">TOP</a> <i class="fa fa-angle-right" aria-hidden="true">＞</i> <span><a href="' + bread1_url + '">' + bread1 + '</a></span> <i class="fa fa-angle-right" aria-hidden="true"></i> <span><a href="' + bread2_url + '">' + bread2 + '</a></span> <i class="fa fa-angle-right" aria-hidden="true"></i> <span><a href="' + bread3_url + '">' + bread3 + '</a></span> <i class="fa fa-angle-right" aria-hidden="true"></i> <span>' + bread4 + '</span>'
		}
		if (parentId4 != "") {
			parentId1 = parentId1 + "/" + parentId2 + "/" + parentId3 + "/" + parentId4
		} else if (parentId3 != "") {
			parentId1 = parentId1 + "/" + parentId2 + "/" + parentId3
		} else if (parentId2 != "") {
			parentId1 = parentId1 + "/" + parentId2
		}
		gulp.src(tmp_file)
			.pipe(plumber())
			.pipe(crLfReplace({
				changeCode: 'CR+LF'
			}))
			.pipe(ejs({
				pageData: page_data[i],
				RELATIVE_PATH: RELATIVE_PATH,
				BREADCRUMBS: BREADCRUMBS
			}))
			.pipe(rename(id + '.html'))
			.pipe(gulp.dest('./' + parentId1))
	}
	gulp.src(['**/*.html', '!node_modules/**/*.html', '!logs/*.html', '!includes/*.html', '!frontnote/*.html']).pipe(htmlhint()).pipe(htmlhint.reporter());
});

gulp.task("sass", function () {
	gulp.src("scss/**/*scss")
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(crLfReplace({
			changeCode: 'CR+LF'
		}))
		.pipe(autoprefixer({browsers: ['last 3 versions', 'ie >= 10']}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest("./css"));
});

gulp.task("csscomb", function () {
	gulp.src('scss/**/*scss')
		.pipe(csscomb())
		.pipe(gulp.dest('./scss'));
	gulp.src('./css/*.css')
		.pipe(csscomb())
		.pipe(gulp.dest('./css'));
});


gulp.task('csslint', function () {
	gulp.src("**/*.css")
		.pipe(csslint({
			"adjoining-classes": false,
			"box-model": false,
			"box-sizing": false,
			"bulletproof-font-face": false,
			"compatible-vendor-prefixes": false,
			"empty-rules": false,
			"display-property-grouping": false,
			"duplicate-background-images": false,
			"duplicate-properties": false,
			"fallback-colors": false,
			"floats": false,
			"font-faces": false,
			"font-sizes": false,
			"gradients": false,
			"ids": false,
			"import": false,
			"important": false,
			"known-properties": false,
			"outline-none": false,
			"overqualified-elements": false,
			"qualified-headings": false,
			"regex-selectors": false,
			"shorthand": false,
			"star-property-hack": false,
			"text-indent": false,
			"underscore-property-hack": false,
			"unique-headings": false,
			"universal-selector": false,
			"unqualified-attributes": false,
			"vendor-prefix": false,
			"zero-units": false
		}))
		.pipe(htmlReporter());
});

gulp.task('htmllint', function () {
	gulp.src(['**/*.html', '!node_modules/**/*.html', '!logs/*.html', '!includes/*.html', '!frontnote/*.html'])
		.pipe(htmlhint())
		.pipe(htmlhint.reporter());
});

gulp.task('htmlcomb', function () {
	var options = {
		"indent_size": 1,
		"indent_char": "\t",
		"eol": "\n",
		"indent_level": 0,
		"indent_with_tabs": false,
		"preserve_newlines": true,
		"max_preserve_newlines": 10,
		"jslint_happy": false,
		"space_after_anon_function": false,
		"brace_style": "collapse",
		"keep_array_indentation": false,
		"keep_function_indentation": false,
		"space_before_conditional": true,
		"break_chained_methods": false,
		"eval_code": false,
		"unescape_strings": false,
		"wrap_line_length": 0,
		"wrap_attributes": "auto",
		"wrap_attributes_indent_size": 4,
		"end_with_newline": false
	};
	gulp.src('**/*.html')
		.pipe(htmlbeautify(options))
		.pipe(gulp.dest('./'))
});


// 圧縮前と圧縮後のディレクトリを定義
var paths = {
  srcDir : 'src',
  dstDir : 'img'
}
// jpg,png,gif画像の圧縮タスク
gulp.task('imagemin', function(){
    var srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|png|gif)';
    var dstGlob = paths.dstDir;
    gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(imagemin([
        imageminPng(),
        imageminJpg(),
        imageminGif({
            interlaced: false,
            optimizationLevel: 3,
            colors:180
        })
    ]
    ))
    .pipe(gulp.dest( dstGlob ));
});
// svg画像の圧縮タスク
gulp.task('svgmin', function(){
    var srcGlob = paths.srcDir + '/**/*.+(svg)';
    var dstGlob = paths.dstDir;
    gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(svgmin())
    .pipe(gulp.dest( dstGlob ));
});
// defaultで画像圧縮タスクをwatch状態に
gulp.task('default', function(){
  gulp.watch(paths.srcDir + '/**/*', ['imagemin','svgmin']);
});

//gulp3の場合
gulp.task('watch', function () {
	gulp.watch('ejs/**/*.ejs', ['ejs']);
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch(paths.srcDir + '/**/*', ['imagemin','svgmin']);
});

//gulp4の場合* /*の半角スペースを削除してください。
/*
gulp.task('watch', function () {
	gulp.watch('ejs/** /*.ejs', gulp.task('ejs'));
	gulp.watch('./sass/** /*.scss', gulp.task('sass'));
	gulp.watch(paths.srcDir + '/** /*',gulp.task('imagemin'));
});
*/