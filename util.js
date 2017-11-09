class Operands {
	constructor(value) {
		this.value = value || 0;
	}

	toString() {
		return this.value < 0 ? `(${this.value.toString()})` : this.value.toString();
	}
}

class Brackets {
	constructor() {
		this.value = '';
	}

	toString() {
		return this.value;
	}
}

class LeftBrackets extends Brackets {
	constructor() {
		super();
		this.value = '(';
	}
}

class RightBrackets extends Brackets {
	constructor(value) {
		super();
		this.value = ')';
	}
}

class Operator {
	constructor(value) {
		this.value = value;
	}

	toString() {
		return ` ${this.value} `;
	}
}

class Expression extends Operands {
	constructor(operands0, operator, operands1) {
		super();
		if (isOperands(operands0) && isOperator(operator) && isOperands(operands1)) {
			this.value = [operands0, operator, operands1];
		} else if (isExpression(operands0)) {
			this.value = operands0.value;
		} else if (isOperands(operands0)) {
			this.value = [operands0];
		} else {
			throw new Error(`${operands0} or ${operator} or ${operands1} is not a valid data.`);
		}

		let randomNum = randomInt(0, 100);
		// 30%概率加括号
		if (!this.hasBrackets() && randomNum > 0 && randomNum < 30) {
			this.value.push(new RightBrackets());
			this.value.unshift(new LeftBrackets());
		}
	}

	hasBrackets() {
		return isLeftBrackets(this.value[0]) && isRightBrackets(this.value[this.value.length - 1]);
	}

	toString() {
		let str = '';
		for (var i = 0, len = this.value.length; i < len; ++i) {
			str += this.value[i].toString();
		}
		return str;
	}

	toEvalString() {
		let str = this.toString();
		return str.replace(/×|÷/g, m => {
			let map = {
				'×': '*',
				'÷': '/'
			};
			return map[m];
		});
	}
}

function isExpression(obj) {
	return obj instanceof Expression;
}

function isOperator(obj) {
	return obj instanceof Operator;
}

function isOperands(obj) {
	return obj instanceof Operands;
}

function isLeftBrackets(obj) {
	return obj instanceof LeftBrackets;
}

function isRightBrackets(obj) {
	return obj instanceof RightBrackets;
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function trimBrackets(expr) {
	if (expr[0] != '(') {
		return expr;
	} else {
		let stack = [];
		for (var i = 0, len = expr.length; i < len; ++i) {
			if (i == len - 1 && stack[0] === 0) {
				return expr.slice(1, len - 1);
			}
			if (expr[i] == '(') {
				stack.push(i);
			} else if (expr[i] == ')') {
				stack.pop();
			}
		}
		return expr;
	}
}

function getBounds(range) {
	let firstBound = parseInt(~range.indexOf(',') ? range.split(',')[1] : range, 10),
		secondBound = parseInt(~range.indexOf(',') ? range.split(',')[0] : 0, 10),
		upperBound = 0,
		lowerBound = 0;

	if (firstBound > secondBound) {
		upperBound = firstBound;
		lowerBound = secondBound;
	} else {
		upperBound = secondBound;
		lowerBound = firstBound;
	}
	return {
		upperBound,
		lowerBound
	};
}

function genOperator(operator) {
	const operatorMap = {
		'+': '+',
		'-': '-',
		x: '×',
		'*': '×',
		'×': '×',
		'/': '÷',
		'÷': '÷',
		all: 'all',
		pm: 'pm',
		ms: 'ms'
	};
	const operators = ['+', '-', '×', '÷'];
	operator = operatorMap[operator];

	if (operator == 'all') {
		return function() {
			return new Operator(operators[randomInt(0, 3)]);
		};
	} else if (operator == 'pm') {
		return function() {
			return new Operator(operators[randomInt(0, 1)]);
		};
	} else if (operator == 'ms') {
		return function() {
			return new Operator(operators[randomInt(2, 3)]);
		};
	} else {
		return function() {
			return new Operator(operator);
		};
	}
}

function genProblem(operandsLowerBound, operandsUpperBound, countLowerBound, countUpperBound, getOperator) {
	if (countLowerBound < 2 || countUpperBound < 2) {
		throw new Error(`At least two operands are required, but get ${countLowerBound} to ${countUpperBound}`);
	}
	let operandsCount = randomInt(countLowerBound, countUpperBound),
		operands = [],
		expr0 = null,
		expr1 = null,
		expr = null,
		prevExpr = null,
		random = 0;


	while (operandsCount--) {
		operands.push(new Operands(randomInt(operandsLowerBound, operandsUpperBound)));
	}


	do {
		expr0 = operands.pop();
		random = randomInt(0, 100);

		if (prevExpr) {
			if (random > 50) {
				expr = new Expression(prevExpr, getOperator(), expr0);
			} else {
				expr = new Expression(expr0, getOperator(), prevExpr);
			}
		} else {
			expr1 = operands.pop();
			expr = new Expression(expr0, getOperator(), expr1);
		}
		prevExpr = expr;

	} while (operands.length);

	let expression = trimBrackets(prevExpr.toString());
	if (expression == 'undefined') {
		console.log(expression);
	}
	return {
		expression,
		answer: eval(prevExpr.toEvalString())
	};
}

module.exports = {
	getBounds,
	genOperator,
	genProblem
};
