const gulp              = require('gulp');                          // Task automator
const inquirer          = require('inquirer');                      // Collection of common interactive command line user interfaces
const yargs             = require('yargs');                         // Args

const createCwomponent = require('../lib/create/create.js');


// @internal
gulp.task('cwel-create-duplo', (taskDone) => {
    yargs.option('type', {
        default: '',
    });
    yargs.option('name', {
        default: '',
    });
    yargs.option('includeJs', {
        default: true,
    });
    const typeQuestion = {
        type: 'list',
        name: 'type',
        message: 'What typeth of cwomponent wouldst thee liketh?',
        choices: ['Component', 'Pattern', 'Service'],
    };
    const nameQuestion = {
        type: 'input',
        name: 'name',
        message: 'How wouldst thee nameth thy cwomponent? (e.g. Dropdown or WizKhalifa)',
        validate: (value) => {
            return value.trim().length > 0
                ? true
                : 'This shizz better not be empty, bruh';
        },
        filter: value => value.trim(),
    };
    const scriptQuestion = {
        type: 'confirm',
        name: 'includeJs',
        message: 'Wouldst thee liketh some JavaScript for thy cwomponent?',
        when: answers => /(?:Pattern|Component)/i.test(answers.type),
    };

    if (!yargs.argv.type && !yargs.argv.name) {
        inquirer.prompt([
            typeQuestion,
            nameQuestion,
            scriptQuestion,
        ]).then((answers) => {
            answers.includeJs = answers.type.toLowerCase() === 'service'
                ? true
                : answers.includeJs;
            createCwomponent(answers.type.toLowerCase(), answers, () => taskDone());
        });
    } else {
        createCwomponent(yargs.argv.type, yargs.argv.name, () => taskDone());
    }
});
