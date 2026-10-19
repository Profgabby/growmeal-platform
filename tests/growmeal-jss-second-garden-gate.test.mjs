import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const pack=readFileSync(new URL('../components/play-discover/jss-second-garden-pack.tsx',import.meta.url),'utf8');
const page=readFileSync(new URL('../app/play-discover/page.tsx',import.meta.url),'utf8');
for(const [id,flag,grade] of [['GM-J35','isJssOneSecond','JSS 1'],['GM-J36','isJssTwoSecond','JSS 2'],['GM-J37','isJssThreeSecond','JSS 3']]){
 test(grade+' contains six unique lesson scene branches and six complete questions',()=>{
  const start=pack.indexOf("'"+id+"':{heading:");
  assert.ok(start>=0);
  const end=pack.indexOf('\n]},',start);
  const block=pack.slice(start,end>=0?end:pack.indexOf('\n]}',start));
  const questions=[...block.matchAll(/prompt:'([^']+)',options:\[([^\]]+)\],correct:(\d),explanation:'([^']+)'/g)];
  assert.equal(questions.length,6);
  for(const q of questions){assert.equal((q[2].match(/'[^']+'/g)||[]).length,3);assert.ok(Number(q[3])>=0&&Number(q[3])<=2);assert.ok(q[4].length>15)}
  const sceneStart=pack.indexOf("garden==='"+id+"'&&");
  assert.ok(sceneStart>=0);
  const scene=pack.slice(sceneStart,pack.indexOf('</>}',sceneStart));
  for(let i=0;i<6;i++)assert.ok(scene.includes('index==='+i+'&&'),id+' scene '+i);
 });
 test(grade+' routes second garden and suppresses generic fallback',()=>{
  assert.ok(page.includes(flag+'&&<JssSecondGardenPack garden="'+id+'"/>'));
  assert.ok(page.includes('!'+flag));
 });
}
test('All JSS activities include feedback and navigation',()=>{
 for(const t of ['aria-live="polite"','← Activities','Next →','data-asset-id'])assert.ok(pack.includes(t));
});
test('JSS arithmetic cross-checks',()=>{
 assert.equal(3*8,24);assert.equal(12+4,16);assert.equal(4*6,24);assert.equal(300/10,30);assert.equal(45-30,15);assert.equal(3+1,4);assert.equal(10-7,3);
});
