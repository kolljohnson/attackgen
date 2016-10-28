'use strict';

const inquirer = require('inquirer');
const rx = require('rx');

inquirer.prompt([{
    name: 'candidateName',
    message: "What's your opponent's name?",
    type: 'input'
},
    {
    name: 'partyChoice',
    message: 'Which party is your opponent?',
    type: 'list',
    choices: ['Democrat', 'Republican', 'Independent', 'Other']
},
    {
        name: 'realParty',
        message: 'Seriously, which party is your opponent?',
        type: 'list',
        choices: ['Democrat', 'Republican'],
        when: function(answers) {
            if(answers.partyChoice === 'Independent') {
                return answers.partyChoice === 'Independent'
            } else if(answers.partyChoice === 'Other') {
                return answers.partyChoice === 'Other'
            }
        }
    }
]).then(function (answers) {
    console.log(answers);
});
