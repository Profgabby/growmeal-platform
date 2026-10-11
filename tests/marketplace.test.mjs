import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
const source=readFileSync(new URL('../lib/marketplace/catalog.ts',import.meta.url),'utf8');
const page=readFileSync(new URL('../app/marketplace-dev/page.tsx',import.meta.url),'utf8');
const sql=readFileSync(new URL('../docs/sql/marketplace-dev-schema-DRAFT.sql',import.meta.url),'utf8');
test('catalog defines exactly 32 legacy-linked educational and 22 non-school models',()=>{
 const a=[...source.matchAll(/\['([NPJS]\d{2})','[^']+'\]/g)].map(x=>x[1]);
 const b=[...source.matchAll(/\['([HCUIE]\d{2})','[^']+','[^']+'\]/g)].map(x=>x[1]);
 assert.equal(a.length,32);assert.equal(b.length,22);assert.equal(new Set([...a,...b]).size,54);
});
test('all three package tiers exist',()=>{for(const tier of ['Seed','Sprout','Harvest'])assert.match(source,new RegExp(tier+':\\{'));});
test('sandbox does not initiate payments or LIFEWSWORKS jobs',()=>{assert.doesNotMatch(page,/fetch\(|supabase\.from\(|stripe\.checkout|paystack|flutterwave|lifewsworks\.vercel\.app/i);assert.match(page,/localStorage\.setItem/);});
test('schema has RLS and no browser grants',()=>{const tables=['organizations','memberships','models','packages','carts','cart_lines','orders','order_lines','installation_requests','integration_outbox'];for(const t of tables)assert.match(sql,new RegExp('alter table marketplace\\.'+t+' enable row level security'));assert.match(sql,/revoke all on all tables in schema marketplace from public,anon,authenticated/);});

test('navigation serves marketplace and cross-audience growing workspace',()=>{
 const nav=readFileSync(new URL('../components/app-shell.tsx',import.meta.url),'utf8');
 assert.match(nav,/\/marketplace-dev/);assert.match(nav,/\/my-garden/);
 assert.match(nav,/School Gardens · 32/);
});
test('school directory filters to deployed educational garden identifiers',()=>{
 const directory=readFileSync(new URL('../app/gardens/page.tsx',import.meta.url),'utf8');
 assert.match(directory,/gardenModels\.filter\(g=>g\.audience==='education'\)/);
 assert.match(directory,/deployedIds\.has\(g\.id\)/);
});
test('grower dashboard tracks crop stages and watering in a local-only sandbox',()=>{
 const grower=readFileSync(new URL('../app/my-garden/page.tsx',import.meta.url),'utf8');
 assert.match(grower,/localStorage\.setItem/);assert.match(grower,/Record 1 L watering/);
 assert.match(grower,/Growth stage/);assert.match(grower,/DEVELOPMENT DEMO/);
});

test('shared menus and audience-based school menu visibility are defined',()=>{
 const nav=readFileSync(new URL('../components/app-shell.tsx',import.meta.url),'utf8');
 for(const route of ['/growmeal-bank','/growmeal-bot','/growmeal-activities'])assert.ok(nav.includes(route));
 assert.match(nav,/x\.scope==='school'&&school/);
 assert.match(nav,/x\.scope==='grower'&&!school/);
});
test('West African crop preferences, location and DIY activities are available',()=>{
 const preferences=readFileSync(new URL('../lib/growmeal/preferences.ts',import.meta.url),'utf8');
 const grower=readFileSync(new URL('../app/my-garden/page.tsx',import.meta.url),'utf8');
 const activities=readFileSync(new URL('../app/growmeal-activities/page.tsx',import.meta.url),'utf8');
 assert.match(preferences,/Nigeria/);assert.match(preferences,/Ghana/);assert.match(preferences,/Cassava/);
 assert.match(grower,/Food category/);assert.match(grower,/State \/ FCT/);
 assert.match(activities,/DIY challenges/);
});
