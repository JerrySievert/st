'use strict';

import { fail, ok } from './test.mjs';

const tracedata = (err, true_error = false) => {
  const parts = err.stack.split('\n');

  const position = true_error ? 1 : 2;
  const parencheck = parts[position].match(/.*\((.+):(.+):(\d+):(\d+)\)/);
  if (parencheck) {
    return parencheck;
  }

  const nakedcheck = parts[position].match(/.*(.+):(.+):(\d+):(\d+)/);

  if (nakedcheck) {
    return nakedcheck;
  }

  return parts;
};

const assert = {
  eq: (actual, expected, message = '') => {
    const err = new Error();
    const trace = tracedata(err);

    const filename = trace ? trace[2] : null;
    const linenum = trace ? trace[3] : null;

    if (actual != expected) {
      fail(actual, expected, message, '==', null, filename, linenum);
    } else {
      ok(actual, expected, message, '==', filename, linenum);
    }
  },
  ne: (actual, expected, message = '') => {
    const err = new Error();
    const trace = tracedata(err);

    const filename = trace ? trace[2] : null;
    const linenum = trace ? trace[3] : null;

    if (actual == expected) {
      fail(actual, expected, message, '!=', null, filename, linenum);
    } else {
      ok(actual, expected, message, '!=', filename, linenum);
    }
  },
  gt: (actual, expected, message = '') => {
    const err = new Error();
    const trace = tracedata(err);

    const filename = trace ? trace[2] : null;
    const linenum = trace ? trace[3] : null;

    if (actual <= expected) {
      fail(actual, expected, message, '>', null, filename, linenum);
    } else {
      ok(actual, expected, message, '>', filename, linenum);
    }
  },
  gte: (actual, expected, message = '') => {
    const err = new Error();
    const trace = tracedata(err);

    const filename = trace ? trace[2] : null;
    const linenum = trace ? trace[3] : null;

    if (actual < expected) {
      fail(actual, expected, message, '>', null, filename, linenum);
    } else {
      ok(actual, expected, message, '>', filename, linenum);
    }
  },
  lt: (actual, expected, message = '') => {
    const err = new Error();
    const trace = tracedata(err);

    const filename = trace ? trace[2] : null;
    const linenum = trace ? trace[3] : null;

    if (actual >= expected) {
      fail(actual, expected, message, '<', null, filename, linenum);
    } else {
      ok(actual, expected, message, '<', filename, linenum);
    }
  },
  lte: (actual, expected, message = '') => {
    const err = new Error();
    const trace = tracedata(err);

    const filename = trace ? trace[2] : null;
    const linenum = trace ? trace[3] : null;

    if (actual > expected) {
      fail(actual, expected, message, '<=', null, filename, linenum);
    } else {
      ok(actual, expected, message, '<=', filename, linenum);
    }
  }
};

export { assert, tracedata };
