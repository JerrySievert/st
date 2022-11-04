'use strict';

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
        `\n\nFailure in "${fail.current_test}"\n\tat ${fail.filename} line ${fail.line}`
      );
      console.log(`\tExpected "${fail.expected}" but got "${fail.actual}"`);
    }
  }
};

const html_test_reporter_failure = (test) => {
  if (test.status === 'pass') {
    return '<br>';
  }

  let fail_error;
  if (test.error) {
    fail_error = `
      Error: ${test.error}
      <br>
      at ${test.filename} line ${test.line}
    `;
  } else {
    fail_error = `
      Failure in ${test.current_test}
      <br>
      at ${test.filename} line ${test.line}
    `;
  }

  return `
    <div class="test-failure">
      ${fail_error}
      <br>
      Expected "${test.expected}" but got "${test.actual}"
    </div>
  `;
};

const html_test_reporter = (test) => {
  const status =
    test.status === 'pass'
      ? '<span class="test-pass">√</span>'
      : '<span class="test-fail">✘</span>';

  const failure = `
    <div class="test-failure">
      Error:
  `;
  return `
  <div class="test-status">
    ${status}
    <span class="test-message">${test.message}</span>
    ${html_test_reporter_failure(test)}
  `;
};

const htmlreporter = (context) => {
  const parts = [];
  let failures = 0;
  let current_test = null;

  for (const test of context.test_statuses) {
    console.log('current_test', current_test, test.current_test);
    if (current_test !== test.current_test) {
      if (current_test !== null) {
        parts.push('  </div>');
      }
      parts.push(`
      <div class="test">
        <div class="test-current">${test.current_test}</div>
      `);
      current_test = test.current_test;
    }

    parts.push(html_test_reporter(test));
  }

  return parts.join('\n');
};

export { dotreporter, htmlreporter };
