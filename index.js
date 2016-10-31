'use strict';

const inquirer = require('inquirer');
const rx = require('rx');
const fs = require('fs');
const pug = require('pug');
const dir = __dirname;

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
    }, {
        name: 'sponsor',
        message: "Who's sponsoring this ad?",
        type: 'input'
    }
]).then(function (answers) {
    console.log(answers);
    const fileName = dir + "/candidates/" +  answers["candidateName"] + '.html';
    const stream = fs.createWriteStream(fileName, answers);

    stream.once('open', function (fd) {
        console.log(answers)
        let html = pug.renderFile('index.pug', {
            candidateName: answers["candidateName"]
        });
        stream.end(html);
    });
});

