import * as api from '@lp-labs/json-lines-codec';
import { encodeJsonLines, decodeJsonLines } from '@lp-labs/json-lines-codec';
const text = encodeJsonLines([{ id: 1 }, { id: 2 }]);
console.log(decodeJsonLines(text));
// @ts-expect-error invalid argument must be rejected by declarations
api.decodeJsonLines(5);
