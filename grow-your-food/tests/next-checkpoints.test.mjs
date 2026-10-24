import test from 'node:test';import assert from 'node:assert/strict';import {nextCheckpoints} from '../growing-guides/next-checkpoints.mjs';
test('only upcoming checkpoints in date order',()=>{const a=[{date:'2026-10-23',crop:'A'},{date:'2026-10-26',crop:'B'},{date:'2026-10-25',crop:'C'}];assert.deepEqual(nextCheckpoints(a,'2026-10-24').map(x=>x.crop),['C','B'])});
test('limits list to five by default',()=>{const a=Array.from({length:9},(_,i)=>({date:'2026-11-'+String(i+1).padStart(2,'0')}));assert.equal(nextCheckpoints(a,'2026-10-24').length,5)});
test('invalid limit rejected',()=>assert.throws(()=>nextCheckpoints([], '2026-10-24',0)));
