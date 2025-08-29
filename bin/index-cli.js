#! /usr/bin/env node

let compodoc;
try {
    compodoc = require('../dist/index-cli.js');
} catch (e) {
    require('ts-node/register/transpile-only');
    compodoc = require('../src/index-cli.ts');
}

var cdI = new compodoc.CliApplication();

cdI.start();
