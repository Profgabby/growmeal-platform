import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root=path.join(process.cwd(),'components','play-discover');
const files=fs.readdirSync(root).filter(name=>name.endsWith('.tsx'));
test('literal question and prompt strings are not duplicated between activity components',()=>{
 const seen=new Map();
 for(const file of files){
  const source=fs.readFileSync(path.join(root,file),'utf8');
  const matches=source.matchAll(/(?:q|question|prompt)\s*:\s*(['"`])(.{15,200}?)\1/g);
  for(const match of matches){
   const normalized=match[2].trim().replace(/\s+/g,' ').toLowerCase();
   const previous=seen.get(normalized);
   assert.equal(previous,undefined,'Repeated literal question in '+file+' and '+previous+': '+normalized);
   seen.set(normalized,file);
  }
 }
 assert.ok(seen.size>200,'Unexpectedly low number of scanned literal prompts');
});
test('static local image paths are not reused between activity components',()=>{
 const seen=new Map();
 for(const file of files){
  const source=fs.readFileSync(path.join(root,file),'utf8');
  for(const match of source.matchAll(/(?:src|href)\s*=\s*["']([^"']+\.(?:png|jpe?g|webp|svg))["']/gi)){
   const asset=match[1];
   const previous=seen.get(asset);
   assert.equal(previous,undefined,'Repeated static image reference '+asset+' in '+file+' and '+previous);
   seen.set(asset,file);
  }
 }
});
