#!/usr/bin/env node

import { context } from '../lib/index.mjs';

const flags = {};
const tests = [];

for (const arg of process.argv.slice(2)) {
  if (arg.startsWith('-')) {
    flags[arg.slice(1)] = true;
  } else {
    tests.push(arg);
  }
}

if (flags.spec) {
  context.reporter = 'spec';
}

context.write = (output) => process.stdout.write(output);
context.immediate = true;

for (const test of tests) {
  await import(`${process.cwd()}/${test}`);
}

context.write('\n');

let failure_count = 0;

for (const test of context.test_statuses) {
  if (test.status !== 'pass') {
    failure_count++;
  }
}

context.write(`\n${failure_count} failure${failure_count === 1 ? '' : 's'}.\n`);
