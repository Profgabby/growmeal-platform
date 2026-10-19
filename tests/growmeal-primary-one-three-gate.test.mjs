import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const page=read('app/play-discover/page.tsx');
const packs=[
{path:'components/play-discover/primary-one-raised-food-pack.tsx',id:'GM-P16',flag:'isPrimaryOneRaised',component:'PrimaryOneRaisedFoodPack'},
{path:'components/play-discover/primary-two-rebottle-pack.tsx',id:'GM-P17',flag:'isPrimaryTwoReBottle',component:'PrimaryTwoReBottlePack'},
{path:'components/play-discover/primary-three-grid-pack.tsx',id:'GM-P23',flag:'isPrimaryThreeGrid',component:'PrimaryThreeGridPack'}
];
for(const pack of packs){
 const source=read(pack.path);
 test(pack.id+' has six well-formed, individually explained questions',()=>{
 const matches=[...source.matchAll(/question:'([^']+)',(?:answers|choices):\[([^\]]+)\],correct:(\d),/g)];
 assert.equal(matches.length,6);
 for(const m of matches){assert.ok(m[1].length>10);assert.equal((m[2].match(/'[^']*'/g)||[]).length,3);assert.ok(Number(m[3])>=0&&Number(m[3])<3)}
 assert.equal((source.match(/(?:reason|why):'/g)||[]).length,6);
 });
 test(pack.id+' has accessible feedback and activity navigation',()=>{
 for(const token of ['aria-live="polite"','← Activities','Next →','data-asset-id'])assert.ok(source.includes(token),token);
 });
 test(pack.id+' is wired to a class-specific garden route',()=>{
 assert.ok(page.includes(pack.flag+'&&<'+pack.component+'/>'));
 assert.ok(page.includes('!'+pack.flag));
 });
}
test('Each pack declares six independently composed lesson scenes',()=>{
 for(const pack of packs){
 const source=read(pack.path);
 for(let i=0;i<6;i++)assert.ok(source.includes('index==='+i+'&&'),pack.id+' scene '+i);
 assert.equal((source.match(/index===\\d+&&/g)||[]).length,6);
 }
});
