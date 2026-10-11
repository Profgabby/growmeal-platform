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
test('all three package tiers exist',()=>{for(const tier of ['Starter','Plus','Complete'])assert.match(source,new RegExp(tier+':\\{'));});
test('sandbox does not initiate payments or LIFEWSWORKS jobs',()=>{assert.doesNotMatch(page,/fetch\(|\.from\(|stripe\.checkout|paystack|flutterwave|lifewsworks\.vercel\.app/i);assert.match(page,/localStorage\.setItem/);});
test('schema has RLS and no browser grants',()=>{const tables=['organizations','memberships','models','packages','carts','cart_lines','orders','order_lines','installation_requests','integration_outbox'];for(const t of tables)assert.match(sql,new RegExp('alter table marketplace\\.'+t+' enable row level security'));assert.match(sql,/revoke all on all tables in schema marketplace from public,anon,authenticated/);});
