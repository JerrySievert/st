'use strict';

import { context } from './test.mjs';

const dotreporter_immediate = (test_status) => {
  if (test_status.status == 'pass') {
    context.write('.');
  } else {
    context.write('✘\n');
    if (test_status.error) {
      context.write(
        `\nError: ${test_status.error}\n\tat ${test_status.filename} line ${test_status.line}\n`
      );
    } else {
      context.write(
        `\n\nFailure in "${test_status.current_test}" -> "${test_status.message}"\n\tat ${test_status.filename} line ${test_status.line}\n\n`
      );
      context.write(
        `\tExpected "${test_status.expected}" but got "${test_status.actual}"\n\n`
      );
    }
  }
};

let previous_test = null;

const specreporter_immediate = (test_status) => {
  if (previous_test !== test_status.current_test) {
    context.write(`\n- ${test_status.current_test}\n`);

    previous_test = test_status.current_test;
  }

  if (test_status.status == 'pass') {
    context.write(`  ✔️ ${test_status.message}\n`);
  } else {
    context.write(`  ✘ ${test_status.message}\n`);

    if (test_status.error) {
      context.write(
        `\nError: ${test_status.error}\n\tat ${test_status.filename} line ${test_status.line}\n`
      );
    } else {
      context.write(
        `\n\nFailure in "${test_status.current_test}" -> "${test_status.message}"\n\tat ${test_status.filename} line ${test_status.line}\n`
      );
      context.write(
        `\tExpected "${test_status.expected}" but got "${test_status.actual}"\n`
      );
    }
  }
};

const dotreporter = (context) => {
  const fails = [];

  const output = [];
  for (const test_status of context.test_statuses) {
    if (test_status.status == 'pass') {
      output.push('.');
    } else {
      fails.push(test_status);
      output.push('✘');
    }
  }

  console.log(output.join(''));
  console.log(
    `\n${fails.length} ${fails.length === 1 ? 'failure' : 'failures'}`
  );

  for (const fail of fails) {
    if (fail.error) {
      console.log(
        `\nError: ${fail.error}\n\tat ${fail.filename} line ${fail.line}\n`
      );
    } else {
      console.log(
        `\n\nFailure in "${fail.current_test}" -> "${fail.message}"\n\tat ${fail.filename} line ${fail.line}`
      );
      console.log(`\tExpected "${fail.expected}" but got "${fail.actual}"`);
    }
  }
};

const specreporter = (context) => {};

export {
  dotreporter,
  dotreporter_immediate,
  specreporter,
  specreporter_immediate
};
