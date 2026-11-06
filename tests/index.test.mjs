import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('encodes records', () => {
  assert.equal(api.encodeJsonLines([{ a: 1 }, { b: 2 }]), '{"a":1}\n{"b":2}');
});
test('decodes records', () => {
  assert.deepEqual(api.decodeJsonLines('{"a":1}\n[2]'), [{ a: 1 }, [2]]);
});
test('accepts CRLF input', () => {
  assert.deepEqual(api.decodeJsonLines('1\r\n2\r\n'), [1, 2]);
});
test('accepts empty input', () => {
  assert.deepEqual(api.decodeJsonLines(''), []);
});
test('rejects blank lines', () => {
  assert.throws(() => api.decodeJsonLines('1\n\n2'), SyntaxError);
});
test('rejects invalid JSON', () => {
  assert.throws(() => api.decodeJsonLines('{'), SyntaxError);
});
