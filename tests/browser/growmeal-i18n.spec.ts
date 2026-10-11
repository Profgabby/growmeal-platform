import {test,expect} from '@playwright/test';
const langs=['en','fr','ar','ha','yo','ig'] as const;
test.describe('GrowMeal six-language marketplace',()=>{
 for(const lang of langs){
  test(lang+' switches content and direction',async({page})=>{
   await page.goto('/marketplace-dev');
   await page.locator('.side-bottom select').selectOption(lang);
   await expect(page.locator('html')).toHaveAttribute('lang',lang);
   await expect(page.locator('html')).toHaveAttribute('dir',lang==='ar'?'rtl':'ltr');
   const heading=page.locator('h1').first();
   await expect(heading).not.toBeEmpty();
   await expect(page.getByRole('navigation',{name:'GrowMeal main navigation'})).toBeVisible();
   await page.locator('.sidebar select').first().selectOption('Enterprise');
   await expect(page.locator('article').filter({hasText:'GM-E01'})).toBeVisible();
   await expect(page.locator('article').filter({hasText:'GM-N01'})).toHaveCount(0);
   await expect(page.locator('article').filter({hasText:'GM-H01'})).toHaveCount(0);
   await expect(page.locator('article').filter({hasText:'GM-E02'})).toBeVisible();
   if(lang!=='en')await expect(page.locator('article').filter({hasText:'GM-E01'})).not.toContainText('Microenterprise Vegetable Garden');
   await page.reload();
   await expect(page.locator('html')).toHaveAttribute('lang',lang);
   await expect(page.locator('article').filter({hasText:'GM-E01'})).toBeVisible();
  });
 }
 test('school and household catalogs remain separated',async({page})=>{
  await page.goto('/marketplace-dev');
  await page.locator('.sidebar select').first().selectOption('School');
  await expect(page.locator('article').filter({hasText:'GM-N01'})).toBeVisible();
  await expect(page.locator('article').filter({hasText:'GM-E01'})).toHaveCount(0);
  await page.locator('.sidebar select').first().selectOption('Household');
  await expect(page.locator('article').filter({hasText:'GM-H01'})).toBeVisible();
  await expect(page.locator('article').filter({hasText:'GM-N01'})).toHaveCount(0);
 });
 test('Arabic responsive layout has no horizontal overflow',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/marketplace-dev');
  await page.locator('.side-bottom select').selectOption('ar');
  await expect(page.locator('html')).toHaveAttribute('dir','rtl');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2)).toBeTruthy();
 });
});
