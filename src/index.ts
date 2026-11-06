export function encodeJsonLines(values: readonly unknown[]): string {
  if (!Array.isArray(values)) throw new TypeError('Expected array');
  if (values.length > 100000) throw new RangeError('Too many records');
  return values
    .map((value) => {
      const line = JSON.stringify(value);
      if (line === undefined) throw new TypeError('Value is not JSON serializable');
      return line;
    })
    .join('\n');
}
export function decodeJsonLines(text: string): unknown[] {
  if (typeof text !== 'string') throw new TypeError('Expected text');
  if (text.length > 10000000) throw new RangeError('Input too long');
  if (text === '') return [];
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  if (lines.at(-1) === '') lines.pop();
  return lines.map((line, index) => {
    if (!line.trim()) throw new SyntaxError('Blank JSON line at ' + (index + 1));
    return JSON.parse(line);
  });
}
