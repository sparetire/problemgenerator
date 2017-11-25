#!/usr/bin/env node
const path = require('path');
const yargs = require('yargs');
const chalk = require('chalk');
const error = chalk.red.bold;
const {getBounds, genOperator, genProblem} = require('./util');

process.on('uncaughtException', err => {
	console.error(error(`ERROR: ${err.message}`));
	console.error(err.stack);
});

const END_OF_LINE = process.platform == 'win32' ? '\r\n' : '\n';

const argv = yargs
	.usage(
		`
Usage: pgen [options] <arguments>
       pgen -c configurationfile
`
	)
	.default({
		p: 30,
		o: 'all',
		r: '1,100',
		n: '4,6'
	})
	.describe('p', 'the number of problem')
	.describe('o', 'the operator of problem, eg. "+", "-", "*", "x", "/", "÷", "all", "pm", "ms"')
	.describe('r', 'the range of operands, eg. 100 or "0,100", 100 is equals to "0,100"')
	.describe('n', 'the number of operands, eg. 5 or "0,5", 5 is equals to "0,5"')
	.describe('c', 'the path of configuration file')
	.epilog('By Sparetire')
	.example(
		`
	pgen -p 30 -o '+' -r '1,100' -n '4,6'
	`
	)
	.help('h').argv;

const {p, o, r, n, c} = argv;
let configFile = '',
	config = {};

if (c) {
	configFile = path.resolve(process.cwd(), c);
	config = require(configFile);
}

config.problemCount = String(config.problemCount || p).trim();
config.operator = (config.operator || o).trim();
config.operandsRange = String(config.operandsRange || r).trim();
config.operandsCount = String(config.operandsCount || n).trim();

let {problemCount, operator, operandsRange, operandsCount} = config;

let getOperator = genOperator(operator);

let operandsBounds = getBounds(operandsRange),
	operandsUpperBound = operandsBounds.upperBound,
	operandsLowerBound = operandsBounds.lowerBound,
	countBounds = getBounds(operandsCount),
	countUpperBound = countBounds.upperBound,
	countLowerBound = countBounds.lowerBound;

problemCount = parseInt(problemCount, 10);

function run(ol, ou, cl, cu, pc, getOperator) {
	const answers = [];
	console.log(chalk.blue(`Enjoy it!${END_OF_LINE}`));
	while (pc--) {
		let problem = genProblem(ol, ou, cl, cu, getOperator);
		answers.push(problem.answer);
		console.log(`${problem.expression} =${END_OF_LINE}`);
	}
	console.log(chalk.blue(`Answers:${END_OF_LINE}`));
	for (let k in answers) {
		console.log(`${chalk.green(answers[k])}${END_OF_LINE}`);
	}
}

run(operandsLowerBound, operandsUpperBound, countLowerBound, countUpperBound, problemCount, getOperator);
