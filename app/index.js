const Generator = require('yeoman-generator');
const path = require('path');
const chalk = require('chalk');
const pkgInfo = require('../package.json');

const GENERATOR_TITLE = chalk.blue.bold('Koa & TypeScript Web Application Generator');

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

    async prompting() {
        this.log(
            '\n' + GENERATOR_TITLE + ' - v' + pkgInfo.version + '\n'
        );

        this._log_property('Project Path', this.destinationRoot() + '\n');

        const answers = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Project Name',
                default: this.appname,
                validate(input, answers) {
                    return input.trim() != ''; 
                }
            }
        ])

        this.packageName = answers.name
    }

    async writing() {

        const KOA_BASE_DEPENDENCIES = {
            "koa": "2.5.1",
            "koa-bodyparser": "4.2.0",
            "koa-json-log": "1.0.0",
            "koa-router": "7.4.0"
        };
        const KOA_BASE_DEVDEPENDENCIES = {
            "@types/koa": "2.0.45",
            "@types/koa-bodyparser": "4.2.0",
            "@types/koa-router": "7.0.28",
            "@types/node": "8.10.10",
            "cross-env": "5.1.4",
            "nodemon": "1.17.3",
            "ts-node": "6.0.1",
            "tslint": "5.9.1",
            "typescript": "2.8.3"
        }

        this.fs.writeJSON('package.json', {
            name: this.packageName,
            version: '1.0.0',
            description: '',
            scripts: {
                "build-server": "tslint -p . && tsc",
                "watch-server": "cross-env NODE_ENV=development nodemon --watch 'src/**/*' -e ts --exec 'ts-node' src/server/server.ts",
                "start": "node dist/server/server.js"
            },
            dependencies: {
                ...KOA_BASE_DEPENDENCIES
            },
            devDependencies: {
                ...KOA_BASE_DEVDEPENDENCIES,
            }
        }, null, 2);

        const copyFile = (src, dest = src) => {
            this.fs.copy(this.templatePath(src), this.destinationPath(dest));
        }

        // Copy files
        copyFile('npmrc', '.npmrc');
        copyFile('tsconfig.json');
        copyFile('src/server/config.ts');
        copyFile('src/server/routes.ts');
        copyFile('src/server/server.ts');

    }

    install() {
        this.installDependencies({ npm: true, bower: false })
        .then(() => {
            this.log(
                '\n' + GENERATOR_TITLE + chalk.yellow.bold(' Finished.') + '\n'
            );
        });
    }
};