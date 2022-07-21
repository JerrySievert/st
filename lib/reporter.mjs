"use strict";

const dotreporter = (context) => {
  const fails = [];

  const output = [];
  for (const test_status of context.test_statuses) {
    if (test_status.status == "pass") {
      output.push("√");
    } else {
      fails.push(test_status);
      output.push("✘");
    }
  }

  console.log(output.join(""));
  console.log(
    `\n${fails.length} ${fails.length === 1 ? "failure" : "failures"}`
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

export { dotreporter };
