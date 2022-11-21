import { assert, context, test } from '../index.mjs';

await test('assert.eq', async () => {
  const value = 1 + 1;

  assert.eq(value, 2, 'two numbers should be equal');
  assert.eq(String(value), '2', 'two strings should be equal');
});

test('assert.gte', async () => {
  assert.gte(1, 0, 'larger numbers should pass');
  assert.gte(1, 1, 'equal numbers should pass');

  assert.gte('a', 'a', 'equal strings should pass');
  assert.gte('b', 'a', 'larger strings should pass');
});

test('assert.lte', async () => {
  assert.lte(0, 1, 'smaller numbers should pass');
  assert.lte(1, 1, 'equal numbers should pass');

  assert.lte('a', 'a', 'equal strings should pass');
  assert.lte('a', 'b', 'smaller strings should pass');
});

test('assert.gt', async () => {
  assert.gt(1, 0, 'larger numbers should pass');

  assert.gt('b', 'a', 'larger strings should pass');
});

test('assert.lt', async () => {
  assert.lt(1, 2, 'smaller numbers should pass');

  assert.lt('a', 'b', 'smaller strings should pass');
});
