# Devvit_2.0

### Gulp Build System Template 

This gist for [gulpfile](https://gist.github.com/Tor020/41f20722baf152e873cc876feafbe381
)

Comes packaged with bulma in .scss format in the vendor folder

npm install or yarn install

runs sass compile and watch task
```gulp```

creates a new stylesheet to show which styles are being used in the html
```gulp test ```

minifies both the css and javascript (babelify)
```gulp minify```

uglify + babel javascript
```gulp babelify```

minifies css and injects into body
```gulp bodyInjectCss```

check the CSS styles in use against the index.html page and create a document with only the styles that are currently in use on the page
```gulp checkCss```

minifies images
```gulp imageMin```

pipes html and minifies everything
```gulp plsgo```
