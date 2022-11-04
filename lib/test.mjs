'use strict';

import { tracedata } from './assert.mjs';

const context = {
  test_statuses: [],
  current_test: null
};

// assertion failure.
const fail = (actual, expected, message, operator, error, filename, line) => {
  context.test_statuses.push({
    actual,
    expected,
    message,
    operator,
    status: 'fail',
    error,
    current_test: context.current_test,
    filename,
    line
  });
};

// assertion ok.
const ok = (actual, expected, message, operator, filename, line) => {
  context.test_statuses.push({
    actual,
    expected,
    status: 'pass',
    message,
    current_test: context.current_test,
    filename,
    line,
    operator
  });
};

const test = async (name, fn) => {
  context.current_test = name;

  try {
    await fn();
  } catch (err) {
    const trace = tracedata(err);

    const filename = trace ? trace[2] : null;
    const linenum = trace ? trace[3] : null;
    const parts = err.stack.split('\n');

    fail(null, null, 'Error', null, err, filename, linenum);
  } finally {
    context.current_test = null;
  }
};

export { context, test, ok, fail };
