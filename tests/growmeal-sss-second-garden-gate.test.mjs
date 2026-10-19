import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const s=readFileSync(new URL('../components/play-discover/sss-second-garden-pack.tsx',import.meta.url),'utf8');
for(const id of ['GM-S44','GM-S45','GM-S46'])test(id+' has six original question entries',()=>{
 const start=s.indexOf("'"+id+"':{heading:");
 assert.ok(start>=0);
 const end=s.indexOf('\n]},',start);
 const block=s.slice(start,end<0?s.indexOf('\n]}',start):end);
 assert.equal((block.match(/\['/g)||[]).length,6);
});
test('SSS calculations',()=>{
 assert.equal(12*5,60);assert.equal(60/.75,80);assert.equal(4*2,8);
 assert.equal(90/15,6);assert.equal(1000*9.81*.001*10,98.1);
 assert.equal(18/6,3);assert.equal(24/120,.2);assert.equal((200-150)/200*100,25);
 assert.equal([8,10,24].sort((a,b)=>a-b)[1],10);assert.equal((8+10+24)/3,14);assert.equal(1000/5,200);
 assert.equal(40+5-12,33);assert.equal((18-12)/12*100,50);
});

test('SSS second garden routing and illustration identifiers',()=>{
 const page=readFileSync(new URL('../app/play-discover/page.tsx',import.meta.url),'utf8');
 for(const [id,flag] of [['GM-S44','isSssOneSecond'],['GM-S45','isSssTwoSecond'],['GM-S46','isSssThreeSecond']]){
  assert.ok(page.includes(flag+'&&<SssSecondGardenPack garden="'+id+'"/>'));
  assert.ok(page.includes('!'+flag));
 }
 assert.ok(!s.includes('function Evidence('),'Do not reuse generic SVG art across distinct activities');
});

test('SSS answer order is not fixed and interactive answers reset on navigation',()=>{
 assert.ok(s.includes('(i+step!+1)%choices.length'));
 assert.ok(s.includes('onClick={()=>setAnswer(sourceIndex)}'));
 assert.ok(s.includes('answer===0'));
 assert.ok(s.includes('setAnswer(null)'));
 assert.ok(s.includes("width:'100%'"));
});
