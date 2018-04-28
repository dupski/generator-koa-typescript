const Generator = require('yeoman-generator');
const path = require('path');
const chalk = require('chalk');
const pkgInfo = require('../package.json');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        this.argument('dirname', {
            type: String,
            default: '',
            description: 'Specify to create a subdirectory for the new project'
        });
        if (this.options.dirname) {
            this.destinationRoot(
                path.join(this.destinationRoot(), this.options.dirname)
            );
            this.appname = this.options.dirname;
        }
    }

    _log_property(description, value) {
        this.log(
            chalk.yellow.bold(description + ': ') + value
        );
    }

    async prompts() {
        this.log(
            chalk.blue.bold('Koa & TypeScript Web Application Generator')
            + ' - v' + pkgInfo.version + '\n'
        );

        this._log_property('Project Path', this.destinationRoot() + '\n');

        const answers = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message : 'Project Name',
                default : this.appname
            }
        ])

        this.log('Projet Name: ' + answers.name);
    }

};