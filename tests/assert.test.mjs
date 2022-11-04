import { assert, context, test } from '../index.mjs';

await test('1 + 1 = 2', async () => {
  const value = 1 + 1;

  assert.eq(value, 2, 'answer should be 2');
});
