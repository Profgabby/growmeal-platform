import {test,expect} from '@playwright/test';
/**
 * M1/M2 development acceptance.
 * Browser test accounts must be pre-created in the isolated development Supabase.
 * Never use production accounts or real customer data.
 * Set GM_TEST_USER_A_EMAIL/PASSWORD and GM_TEST_USER_B_EMAIL/PASSWORD
 * in a private CI environment. No test account is created by this file.
 */
const a={email:process.env.GM_TEST_USER_A_EMAIL,password:process.env.GM_TEST_USER_A_PASSWORD};
const b={email:process.env.GM_TEST_USER_B_EMAIL,password:process.env.GM_TEST_USER_B_PASSWORD};
const ready=!!(a.email&&a.password&&b.email&&b.password);
async function signIn(page:import('@playwright/test').Page,identity:typeof a){
 await page.goto('/login?next=/account');
 await page.getByLabel('Email').fill(identity.email!);
 await page.getByLabel('Password').fill(identity.password!);
 await page.getByRole('button',{name:'Sign in'}).click();
 await expect(page).toHaveURL(/\/account/);
 await expect(page.getByRole('heading',{name:'My GrowMeal Account'})).toBeVisible();
}
test('anonymous customer cannot save a draft request',async({page})=>{
 await page.goto('/marketplace-dev');
 await expect(page.getByText('Sign in to save a persistent draft request. Guest checkout and live payments are disabled.')).toBeVisible();
});
test('account profile persists across sign-in sessions',async({browser})=>{
 test.skip(!ready,'Synthetic test account credentials are not configured');
 const context=await browser.newContext();const page=await context.newPage();
 await signIn(page,a);
 const unique='QA Account '+Date.now();
 await page.getByLabel('Full name').fill(unique);
 await page.getByRole('button',{name:'Save account'}).click();
 await expect(page.getByRole('status').last()).toContainText('Account details saved.');
 await context.clearCookies();await page.evaluate(()=>localStorage.clear());
 await signIn(page,a);
 await expect(page.getByLabel('Full name')).toHaveValue(unique);
 await context.close();
});
test('organization ownership is isolated between two accounts',async({browser})=>{
 test.skip(!ready,'Synthetic test account credentials are not configured');
 const org='QA Isolation '+Date.now();
 const ca=await browser.newContext(),pa=await ca.newPage();
 await signIn(pa,a);await pa.getByLabel('Organization name').fill(org);
 await pa.getByRole('button',{name:'Create organization'}).click();
 await expect(pa.getByText(org,{exact:true})).toBeVisible();
 const cb=await browser.newContext(),pb=await cb.newPage();
 await signIn(pb,b);
 await expect(pb.getByText(org,{exact:true})).toHaveCount(0);
 await ca.close();await cb.close();
});
test('authenticated household request persists and cannot be viewed by another customer',async({browser})=>{
 test.skip(!ready,'Synthetic test account credentials are not configured');
 const ca=await browser.newContext(),pa=await ca.newPage();
 await signIn(pa,a);await pa.goto('/marketplace-dev');
 await pa.evaluate(()=>{localStorage.setItem('growmeal-audience','Household');window.dispatchEvent(new Event('growmeal-audience-change'))});
 await pa.locator('article button').first().click();
 await pa.locator('form input').filter({visible:true}).first().fill('QA Household');
 await pa.locator('form input[type=email]').fill(a.email!);
 await pa.locator('form textarea').fill('QA-only test address, not a real customer');
 await pa.locator('form button[type=submit], form button:not([type])').last().click();
 await expect(pa.getByText(/Draft request saved securely/)).toBeVisible();
 const ids=await pa.locator('section').filter({hasText:'My saved draft requests'}).locator('code').allTextContents();
 expect(ids.length).toBeGreaterThan(0);
 await pa.reload();
 await expect(pa.getByText(ids[0])).toBeVisible();
 const cb=await browser.newContext(),pb=await cb.newPage();
 await signIn(pb,b);await pb.goto('/marketplace-dev');
 await expect(pb.getByText(ids[0])).toHaveCount(0);
 await ca.close();await cb.close();
});
