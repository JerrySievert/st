# ST (Stupid/Simple Test)

A dumb test framework for Javascript for ES Modules.

## Quickstart in Node:

`test.mjs`:

```
const { assert, context, dotreporter, test } = import 'st';

await test('1 + 1 = 2', async () => {
  const value = 1 + 1;

  assert.eq(value, 2, 'answer should be 2');
});

dotreporter(context);
```

```
$ node test.mjs
```

## Using the `st` Test Runner

`test.mjs`:

```
const { assert, test } = import 'st';

test('normal test', () => {
  assert.eq(1, 1, '1 should equal 1');
});
```

```
$ st -spec test.mjs
```
