import fs from 'node:fs';
import assert from 'node:assert/strict';
const root = new URL('../', import.meta.url);
const read = (path) => JSON.parse(fs.readFileSync(new URL(path, root), 'utf8'));
const catalog=read('crop-catalog/nigeria/crops.json');
const phases=read('growing-phases/phases.json');
const audience=read('audience-pathways/pathways.json');
const guidance=read('crop-catalog/nigeria/reviewed-guidance.json');
const schema=read('schemas/crop.schema.json');
const onboarding=read('schemas/onboarding.schema.json');
assert.equal(catalog.records.length,30);
assert.equal(new Set(catalog.records.map(c=>c.id)).size,30);
assert.equal(phases.length,5);
assert.equal(audience.pathways.length,8);
assert.equal(audience.crop_access,'unrestricted_by_gender_or_age');
assert.equal(audience.safety.public_child_profiles,false);
assert.ok(onboarding.properties.adult_managed);
const cats=new Set(schema.properties.category.enum);
for(const c of catalog.records){
 assert.ok(cats.has(c.category),c.id);
 assert.ok(c.countries.includes('NG'),c.id);
 assert.equal(c.content_status,'draft',c.id);
 assert.ok(c.space_options.length>0,c.id);
 assert.ok(c.local_names.every(n=>n.verification==='draft'),c.id);
}
for(const g of guidance.profiles){
 assert.ok(catalog.records.some(c=>c.id===g.crop_id),g.crop_id);
 assert.ok(g.sources.length>0,g.crop_id);
 if(g.first_edible_harvest_days)assert.ok(g.first_edible_harvest_days.max>=g.first_edible_harvest_days.min);
}
console.log('PASS: 30 crops, 5 phases, 8 pathways, schemas, 3 source-linked guides; all crop records remain unpublished drafts.');
