#!/usr/bin/env node

const { generateYamlFromDirectory } = require('../src/index');
const path = require('path');

// Captura argumentos da linha de comando
const args = process.argv.slice(2);

if (args.length < 2) {
    console.error('Usage: java-to-openapi <source-directory> <output-file>');
    process.exit(1);
}

const directoryPath = path.resolve(args[0]);
const outputFilePath = path.resolve(args[1]);

generateYamlFromDirectory(directoryPath, outputFilePath);
