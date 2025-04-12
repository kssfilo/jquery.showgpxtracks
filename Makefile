.PHONY:test default

TARGETS=jquery.showgpxtracks.js jquery.showgpxtracks.min.js
BIN=./node_modules/.bin
TOOLS=$(BIN)/terser $(BIN)/http-server

default:test

all:$(addprefix dist/,$(TARGETS))


dist/%.min.js:src/%.js|$(TOOLS)
	$(BIN)/terser $< -o $@ --compress --mangle 

dist/%.js:src/%.js
	cp $< $@

test/%.js:src/%.js
	cp $< $@

$(TOOLS):
	npm i

test:test/jquery.showgpxtracks.js|$(TOOLS)
	@echo Open this URL 
	@echo http://localhost:8080/showgpxtracks.html
	@echo
	node_modules/.bin/http-server ./test/ -p 8080
