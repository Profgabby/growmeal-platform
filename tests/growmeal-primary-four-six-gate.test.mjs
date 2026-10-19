import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../components/play-discover/primary-second-garden-pack.tsx',import.meta.url),'utf8');
const page=readFileSync(new URL('../app/play-discover/page.tsx',import.meta.url),'utf8');
for(const [id,route] of [['GM-P26','isPrimaryFourSecond'],['GM-P29','isPrimaryFiveSecond'],['GM-P16','isPrimarySixSecond']]){
 test(id+' has six question explanations and unique scene branches',()=>{
 const bank=source.split("'"+id+"':{heading:")[1]?.split("\n]},")[0];
 assert.ok(bank,'missing bank '+id);
 assert.equal((bank.match(/question:'/g)||[]).length,6);
 assert.equal((bank.match(/why:'/g)||[]).length,6);
 assert.ok(source.includes('garden===\''+id+'\''));
 for(let i=0;i<6;i++)assert.ok(source.includes('index==='+i+'&&'));
 });
 test(id+' is routed from the corresponding class',()=>assert.ok(page.includes(route+'&&<PrimarySecondGardenPack garden="'+id+'"/>')));
}
test('Activities expose feedback and navigation',()=>{
 for(const token of ['aria-live="polite"','← Activities','Next →','data-asset-id'])assert.ok(source.includes(token));
});
