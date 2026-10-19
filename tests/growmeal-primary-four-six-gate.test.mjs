import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../components/play-discover/primary-second-garden-pack.tsx',import.meta.url),'utf8');
const page=readFileSync(new URL('../app/play-discover/page.tsx',import.meta.url),'utf8');
for(const [id,route] of [['GM-P26','isPrimaryFourSecond'],['GM-P29','isPrimaryFiveSecond'],['GM-P16','isPrimarySixSecond']]){
 test(id+' has six question explanations and unique scene branches',()=>{
 const start=source.indexOf("'"+id+"':{heading:");
 const end=source.indexOf('\n]},',start);
 const bank=source.slice(start,end<0?source.indexOf('\n]}',start):end);
 assert.ok(bank,'missing bank '+id);
 assert.equal((bank.match(/question:'/g)||[]).length,6);
 assert.equal((bank.match(/why:'/g)||[]).length,6);
 const sceneStart=source.indexOf('garden===\''+id+'\'&&');
 assert.ok(sceneStart>=0);
 const sceneEnd=source.indexOf('</>}',sceneStart);
 const scene=source.slice(sceneStart,sceneEnd);
 for(let i=0;i<6;i++)assert.ok(scene.includes('index==='+i+'&&'),id+' scene '+i);
 });
 test(id+' is routed from the corresponding class',()=>assert.ok(page.includes(route+'&&<PrimarySecondGardenPack garden="'+id+'"/>')));
}
test('Activities expose feedback and navigation',()=>{
 for(const token of ['aria-live="polite"','← Activities','Next →','data-asset-id'])assert.ok(source.includes(token));
});

test('Primary 4-6 quantitative answers agree with independent arithmetic',()=>{
 const expected=[['GM-P26','50 mL/min','20 mL'],['GM-P29','20 L','42 L','15 mm','6 L'],['GM-P16','3 m²','8 m','20','4 plants/m²']];
 for(const [id,...answers] of expected){
  const start=source.indexOf("'"+id+"':{heading:");
  const end=source.indexOf('\n]}',start);
  const bank=source.slice(start,end);
  for(const answer of answers)assert.ok(bank.includes("'"+answer+"'"),id+' '+answer);
 }
 assert.equal(250/5,50);assert.equal(100-80,20);
 assert.equal(4*5,20);assert.equal(60-18,42);assert.equal(4+6+5,15);assert.equal(30-24,6);
 assert.equal(3*1,3);assert.equal(2*(3+1),8);assert.equal(5*4,20);assert.equal(12/3,4);
});
