# ST (Stupid/Simple Test)

A dumb test framework for JavaScript for ES Modules.

## Quickstart in Node:

`test.mjs`:

```
const { context, dotreporter, test } = import 'st';

await test('1 + 1 = 2', async (t) => {
  const value = 1 + 1;

  t.assert.eq(value, 2, 'answer should be 2');
});

dotreporter(context);
```

```
$ node test.mjs
```

## Using the `st` Test Runner

`test.mjs`:

```
const { test } = import 'st';

test('normal test', (t) => {
  t.assert.eq(1, 1, '1 should equal 1');
});
```

```
$ st -spec test.mjs
```
