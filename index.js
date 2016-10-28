var inquirer = require('inquirer');
var rx = require('inquirer/node_modules/rx');

var questions = [{
    name: 'partyChoice',
    message: 'which party is your opponent?',
    type: list,
    choices: ['Democrat', 'Republican']
}];

inquirer(questions, function (answers) {
   console.log(answers);
});