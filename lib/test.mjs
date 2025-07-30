'use strict';

import { tracedata } from './assert.mjs';
import { dotreporter_immediate, specreporter_immediate } from './reporter.mjs';
import { assert } from './assert.mjs';

const context = {
  test_statuses: [],
  current_test: null,
  immediate: false,
  reporter: 'dot'
};

// assertion failure.
const fail = (actual, expected, message, operator, error, filename, line) => {
  const test_status = {
    actual,
    expected,
    message,
    operator,
    status: 'fail',
    error,
    current_test: context.current_test,
    filename,
    line
  };

  context.test_statuses.push(test_status);

  if (context.immediate) {
    if (context.reporter === 'dot') {
      dotreporter_immediate(test_status);
    } else if (context.reporter === 'spec') {
      specreporter_immediate(test_status);
    }
  }
};

// assertion ok.
const ok = (actual, expected, message, operator, filename, line) => {
  const test_status = {
    actual,
    expected,
    status: 'pass',
    message,
    current_test: context.current_test,
    filename,
    line,
    operator
  };

  context.test_statuses.push(test_status);

  if (context.immediate) {
    if (context.reporter === 'dot') {
      dotreporter_immediate(test_status);
    } else if (context.reporter === 'spec') {
      specreporter_immediate(test_status);
    }
  }
};

const test = async (name, fn) => {
  context.current_test = name;

  try {
    await fn({ assert });
  } catch (err) {
    const trace = tracedata(err, true);
    const filename = trace ? trace[2] : null;
    const linenum = trace ? trace[3] : null;
    const parts = err.stack.split('\n');

    fail(null, null, 'Error', null, err, filename, linenum);
  }
};

export { context, test, ok, fail };
