#!/usr/bin/env node
const exec = require('child_process').exec; 
const path = require('path');
const inquirer = require('inquirer');
const command = process.argv[2];
console.log(process.argv);
console.log(command, __dirname);
console.log(process.cwd());

inquirer.prompt([{
  name: 'name',
  type: 'input',
  message: 'message',
},
{
  name: 'choice',
  type: 'list', 
  message: 'abc',
  choices: ['config', 'iloop-form']
}]).then((anwsers)=>{
  console.log('abc', anwsers);
})

// if(command === "copy") {
//   exec('cd ../ | git clone git@github.com:545682879/nextjs.git', (err, stdout, stderr) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(stdout);
//   });
// }