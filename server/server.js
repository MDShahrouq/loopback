'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
//process.env.PORT || 8080;
var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
// Deploying on Heroku :
 // 9097  heroku create meetupz
 // 9098  heroku buildpacks:set https://github.com/strongloop/strongloop-buildpacks.git
 // 9099  heroku buildpacks:set https://github.com/strongloop/strongloop-buildpacks.git meetupz
 // 9100  ls
 // 9101  git init
 // 9102  git add .
 // 9103  git commit -m "Init"
 // 9104  touch Procfile
 // 9105  git add .
 // 9106  git commit -m "Add procfile"
 // 9107  heroku apps:create --buildpack https://github.com/strongloop/strongloop-buildpacks.git
 // 9108  git push heroku master
 // 9109  heroku open
 // 9110  heroku logs -t
