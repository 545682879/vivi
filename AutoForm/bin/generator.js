#!/usr/bin/env node
const yoGenerator = require('yeoman-generator');


const command = process.argv[2];
console.log(process.argv);
console.log(command, __dirname);
console.log(process.cwd());

module.exports = class extends yoGenerator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }

  // add your own methods
  prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'framework',
        message: 'choose a framework',
        choices: ['config', 'iloop-form'],
        default: 'config'
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.name = answers.name;
      this.framework = answers.framework;
      console.log('answers',answers);
    })
  }

  method1() {
    this.log('method 1 just ran');
  }

  method2() {
    this.log('method 2 just ran');
  }

  paths() {
   // console.log('paths', this.sourceRoot());
    // returns './templates'

    // this.templatePath('index.js');

    // returns './templates/index.js'
  }

  writing() {
    console.log('this.name',this.framework);
    console.log('writing', this.templatePath(`../../src/${this.framework}`), this.destinationPath(`./dist/${this.framework}`));
    this.fs.copyTpl(
      this.templatePath(`../../src/${this.framework}`),
      this.destinationPath(`./dist/${this.framework}`)
    );
  }
};
