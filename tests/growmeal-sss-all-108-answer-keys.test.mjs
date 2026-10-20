import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const dir=new URL('../components/play-discover/',import.meta.url);
const sources=['sss-one-production-pack.tsx','sss-two-crop-trial-pack.tsx','sss-three-controlled-pack.tsx','sss-second-garden-pack.tsx'];
const data=sources.map(file=>readFileSync(new URL(file,dir),'utf8'));
const questions=data.map((source,i)=>i<3?[...source.matchAll(/\{"prompt":"([^"]+)","(?:choices|options)":(\[[^\]]+\]),"(?:correct|answer)":(\d+),"(?:explanation|why)":"([^"]+)"\}/g)].map(m=>({prompt:m[1],choices:JSON.parse(m[2]),correct:Number(m[3]),reason:m[4]})):[...source.matchAll(/\['([^']+)','([^']+)','([^']+)','([^']+)','([^']+)'\]/g)].map(m=>({prompt:m[1],choices:[m[2],m[3],m[4]],correct:0,reason:m[5]})));
test('all 108 questions have 3 distinct answers, valid key and explanation',()=>{
 assert.deepEqual(questions.map(q=>q.length),[30,30,30,18]);
 const seen=new Set();
 for(const [bank,items] of questions.entries())for(const [i,q] of items.entries()){
  assert.equal(q.choices.length,3,bank+':'+i);
  assert.equal(new Set(q.choices.map(x=>x.toLowerCase().trim())).size,3,bank+':'+i);
  assert.ok(q.correct>=0&&q.correct<3,bank+':'+i);
  assert.ok(q.reason.trim().length>=12,bank+':'+i);
  const key=q.prompt.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  assert.ok(!seen.has(key),'Duplicate question '+q.prompt);
  seen.add(key);
 }
});
test('SSS second gardens have distinct lesson goals rather than repeated formulas',()=>{
 const prompts=questions[3].map(x=>x.prompt).join('\n');
 assert.ok(prompts.includes('tank holds 150 L'));
 assert.ok(prompts.includes('yield-preserving irrigation reduction'));
 assert.ok(!prompts.includes('12 m² receives 5 mm'));
 assert.ok(!prompts.includes('24 kg harvest with 120 L'));
});
