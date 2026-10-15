import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const account=source('app/account/page.tsx'),market=source('app/marketplace-dev/page.tsx'),auth=source('app/login/page.tsx');
test('M1 account profile is authenticated and saved in persistent customer table',()=>{
 assert.match(account,/auth\.getUser\(\)/);
 assert.match(account,/growmeal_customer_accounts/);
 assert.match(account,/\.upsert\(/);
 assert.match(account,/user_id:uid/);
});
test('M1 organizations are created with current authenticated owner',()=>{
 assert.match(account,/growmeal_customer_organizations/);
 assert.match(account,/created_by:uid/);
 assert.match(account,/growmeal_customer_memberships/);
});
test('M2 draft submission requires authenticated user and invokes controlled RPC',()=>{
 assert.match(market,/auth\.getUser\(\)/);
 assert.match(market,/if\(!accountId\)/);
 assert.match(market,/growmeal_submit_draft_request/);
 assert.match(market,/p_org:selectedOrg\|\|null/);
 assert.match(market,/p_lines:cart/);
});
test('M2 cloud order history is loaded per authenticated user',()=>{
 assert.match(market,/growmeal_marketplace_orders/);
 assert.match(market,/\.eq\('user_id',user\.id\)/);
});
test('M1-M2 production payment and external dispatch are absent from customer page',()=>{
 assert.doesNotMatch(market,/stripe\.checkout|paystack|flutterwave|lifewsworks\.vercel\.app|\/api\/payments/);
 assert.match(market,/LIFEWSWORKS has not been contacted/);
});
test('M1 sign-in uses Supabase authentication',()=>{
 assert.match(auth,/signInWithPassword/);
});
