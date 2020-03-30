#!/usr/bin/env node
var yoEnvironment = require('yeoman-environment');
var env = yoEnvironment.createEnv();


env.register(require.resolve('./generator'), 'myapp');

env.run('myapp');