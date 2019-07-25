export PATH := node_modules/.bin:$(PATH)

browserify_production_flags = -g [ envify --NODE_ENV production ] -g uglifyify
terser_command = terser --compress --mangle

all: build .env

build: build/app.js build/app.css build/schema.json

start_web:
	node config/server/index.js

.env:
	cp default.env $@

build_css: clean_css build/app.css

build_debug_css: clean_css
	nodemon -w ./app/styles --ext scss --exec "node-sass" -- app/styles/index.scss build/app.css --source-map build/app.css.map

build_debug_js: clean_js
	watchify config/browser/index.js -o build/app.js -v -d

start_dev:
	nodemon config/server/index.js -w app/ -w config/ --ext js

start_api:
	bundle exec rails server -b 0.0.0.0

analyze_bundle:
	browserify config/browser/index.js --full-paths $(browserify_production_flags) | ${terser_command} | discify --open

clean: clean_css clean_js clean_schema

clean_css:
	rm -f build/app.css
	rm -f build/app.css.map

clean_js:
	rm -f build/app.js
	rm -f build/app.js.map

clean_schema:
	rm -f build/schema.json

build/app.css:
	mkdir -p build
	"node-sass" app/styles/index.scss $@ --output-style compressed

build/app.js:
	mkdir -p build
	browserify config/browser/index.js $(browserify_production_flags) | ${terser_command} > $@

build/schema.json:
	curl http://localhost:2000/api/v1/vandal/schema.json > $@
