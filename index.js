#!/usr/bin/env node

import { cmd } from './src/main.js';

try {
  // Run the program
  cmd().parse();
} catch (error) {
  if (error instanceof Error) {
    console.error(`Failed: ${error.message}`);
    process.exit(1);
  }
}
