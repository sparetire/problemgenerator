# problemgenerator

Save silly B kids

拯救智障儿童

## Install

```shell
$ npm i -g problemgenerator
```

## Usage

```shell
$ pgen [options] <arguments>
$ pgen -c path-of-configuration
```

## Available Options

* `-p` Number of problem (defaults to 30)
* `-o` Operator of problem (defaults to 'all', and '+', '-', '*', 'x', '/', '÷', 'pm', 'ms' are also available.)
* `-r` Range of operands (defaults to '1,100')
* `-n` Number of operands of each problem (defaults to '4,6')
* `-c` Path of configuration file
* `-h` Show help

## Configuration File

A `.js` or `.json` file

JSON:

```json
{
	"problemCount": 30,
	"operator": "all",
	"operandsRange": "1,100",
	"operandsCount": "3,8"
}
```

or JS:
```javascript
module.exports = {
	problemCount: 30,
	operator: 'all',
	operandsRange: '1,100',
	operandsCount: '3,8'
};
```