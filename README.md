# ST (Stupid/Simple Test)

A dumb test framework for Javascript.

Quickstart in Node:

```
const { assert, context, dotreporter, test } = import 'st';

test('1 + 1 = 2', () => {
  const value = 1 + 1;

  assert.eq(value, 2, 'answer should be 2');
});

dotreporter(context);
```
