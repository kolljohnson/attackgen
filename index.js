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
    name: 'party',
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
            if(answers.party === 'Independent') {
                return answers.party === 'Independent'
            } else if(answers.party === 'Other') {
                return answers.party === 'Other'
            }
        }
    }, {
        name: 'position',
        message: 'What position are they campaigning for?',
        type: 'list',
        choices: ['President', 'Senator', 'Representative',
                   'State Representative', 'State Senator',
                   'Governor', 'Mayor', 'Sheriff']
    },
    {
        name: 'sponsor',
        message: "Who's sponsoring this ad?",
        type: 'input'
    }, {
        name: 'filePath',
        message: 'Where do you want your attack add generated?',
        type: 'input',
        default: dir + '/candidates'
    }
]).then(function (answers) {
    console.log(answers);
    const fileName = answers['filePath'] + '/' + answers['candidateName'] + '.html';
    const stream = fs.createWriteStream(fileName, answers);

    stream.once('open', function (fd) {
        let html = pug.renderFile('index.pug', {
            candidateName: answers['candidateName'],
            party: answers['party'],
            realParty: answers['realParty'],
            position: answers['position'],
            sponsor: answers['sponsor'],
        });
        stream.end(html);
    });
});

