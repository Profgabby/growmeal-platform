import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root=new URL('../components/play-discover/',import.meta.url);
const names=['sss-one-production-pack.tsx','sss-two-crop-trial-pack.tsx','sss-three-controlled-pack.tsx'];
const normalize=s=>s.toLowerCase().normalize('NFKC').replace(/[^a-z0-9]+/g,' ').trim();
test('SSS 1-3 first-garden question wording is unique across all classes',()=>{
 const seen=new Map();
 for(const name of names){
  const src=readFileSync(new URL(name,root),'utf8');
  const prompts=[...src.matchAll(/"prompt":"([^"]+)"/g)].map(m=>m[1]);
  assert.equal(prompts.length,30,name+' must contain 30 questions');
  for(const prompt of prompts){const key=normalize(prompt);assert.ok(!seen.has(key),'Duplicate question in '+name+': '+prompt+' previously '+seen.get(key));seen.set(key,name)}
 }
});
test('SSS 1-3 screens use responsive plot grids and wrap answer labels',()=>{
 for(const name of names){const src=readFileSync(new URL(name,root),'utf8');assert.ok(!src.includes("gridTemplateColumns:'repeat(4,minmax(0,1fr))'"),name);assert.ok(src.includes("overflowWrap:'anywhere'"),name)}
});
test('SSS 2 and SSS 3 use distinct experimental-design interactions',()=>{
 const two=readFileSync(new URL(names[1],root),'utf8');
 const three=readFileSync(new URL(names[2],root),'utf8');
 assert.ok(two.includes('Interactive eight-plot treatment assignment'));
 assert.ok(three.includes('Blocked trial design: four matched site blocks'));
 assert.ok(!three.includes('Eight-plot treatment allocation exercise'));
});
