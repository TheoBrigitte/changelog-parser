#!/usr/bin/env node

var { main } = require('./src/main.js');

try {
  // Run the program
  main().parse();
} catch (error) {
  if (error instanceof Error) {
    console.error(`Failed: ${error.message}`);
    process.exit(1);
  }
}
