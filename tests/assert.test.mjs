'use strict';

import { test } from '../index.mjs';

await test('assert.eq', async (t) => {
  const value = 1 + 1;

  t.assert.eq(value, 2, 'two numbers should be equal');
  t.assert.eq(String(value), '2', 'two strings should be equal');
});

test('assert.gte', async (t) => {
  t.assert.gte(1, 0, 'larger numbers should pass');
  t.assert.gte(1, 1, 'equal numbers should pass');

  t.assert.gte('a', 'a', 'equal strings should pass');
  t.assert.gte('b', 'a', 'larger strings should pass');
});

test('assert.lte', async (t) => {
  t.assert.lte(0, 1, 'smaller numbers should pass');
  t.assert.lte(1, 1, 'equal numbers should pass');

  t.assert.lte('a', 'a', 'equal strings should pass');
  t.assert.lte('a', 'b', 'smaller strings should pass');
});

test('assert.gt', async (t) => {
  t.assert.gt(1, 0, 'larger numbers should pass');

  t.assert.gt('b', 'a', 'larger strings should pass');
});

test('assert.lt', async (t) => {
  t.assert.lt(1, 2, 'smaller numbers should pass');

  t.assert.lt('a', 'b', 'smaller strings should pass');
});

test('assert.ok', async (t) => {
  t.assert.ok(true, 'true should pass');
});
