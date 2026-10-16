// Run from the repository root: node --test tests/growmeal-nursery-visuals.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=(file)=>readFileSync(new URL('../'+file,import.meta.url),'utf8');
const leaf=read('components/play-discover/nursery-one-leaf-pack.tsx');
const butterfly=read('components/play-discover/nursery-two-butterfly-pack.tsx');
const rebottle=read('components/play-discover/nursery-three-rebottle-pack.tsx');
const alphabet=read('components/play-discover/nursery-alphabet-pack.tsx');
const number=read('components/play-discover/nursery-number-pack.tsx');
const geometry=read('components/play-discover/nursery-geometry-pack.tsx');
const page=read('app/play-discover/page.tsx');
function literalIds(source,prefix){return [...source.matchAll(/id:'(GM-N0[456]-Q\d\d-[A-Z-]+)'/g)].map(m=>m[1]).filter(id=>id.startsWith(prefix))}
for(const [name,source,prefix,count] of [['Leaf',leaf,'GM-N04-',6],['Butterfly',butterfly,'GM-N05-',8],['ReBottle',rebottle,'GM-N06-',6]]){
test(name+' question-specific visuals have unique literal IDs',()=>{const ids=literalIds(source,prefix);assert.equal(ids.length,count);assert.equal(new Set(ids).size,count)});
}
test('Leaf no longer renders the shared emoji triplet',()=>assert.ok(!leaf.includes('🍃 🌿 🍀')));
test('ReBottle includes six distinct scene types',()=>{for(const scene of ['sort','shape','size','plant','water','care'])assert.ok(rebottle.includes("scene:'"+scene+"'"))});
test('ReBottle is wired and excluded from fallback',()=>{assert.ok(page.includes('isNurseryThreeReBottle&&<NurseryThreeReBottlePack/>'));assert.ok(page.includes('!isNurseryThreeReBottle&&!isPrimaryOne'))});
test('Original Nursery scenes carry per-question IDs',()=>{assert.ok(alphabet.includes('GM-N01-'));assert.ok(number.includes('GM-N02-COUNT-'));assert.ok(geometry.includes('GM-N03-DETECT-'))});
test('Original Alphabet flags ambiguous crop emoji',()=>assert.ok(alphabet.includes('misleadingCropLetters')));
// These source checks do not prove rendered image uniqueness, build success, or visual correspondence.

test('Nursery 2 comparison at twenty displays 19 and 20 in that order',()=>assert.ok(number.includes('[number===20?19:number,number===20?20:number+1]')));
test('Nursery 2 stories ask about displayed objects',()=>assert.ok(number.includes('How many {stories[storyPage].name} do you see?')));
test('Nursery 3 does not mislabel a mango as a watermelon',()=>assert.ok(!geometry.includes("name:'Watermelon',shape:'oval',icon:'🥭'")));
test('Nursery 3 oval pond is consistently described',()=>assert.ok(geometry.includes("name:'Oval garden pond',shape:'oval',icon:'⬭'")));

test('Alphabet story answer letters match Banana, Tomato and Watermelon',()=>{
assert.ok(alphabet.includes("letters:['B','D','F'],number:2"));
assert.ok(alphabet.includes("letters:['T','S','U'],number:7"));
assert.ok(alphabet.includes("letters:['W','V','X'],number:8"));
});
test('Alphabet patterns vary by letter and old repeated picture is gone',()=>{
assert.ok(alphabet.includes("GM-N01-PATTERN-"));
assert.ok(alphabet.includes("const first=crops[index],second=crops[(index+1)%26]"));
assert.ok(!alphabet.includes('🍎 🍌 🍎 🍌 ❔'));
});
test('Alphabet story pages have individual visual identifiers',()=>assert.ok(alphabet.includes("GM-N01-STORY-")));

test('Nursery 2 count scenes use asset-dependent layout and exact n items',()=>{
assert.ok(number.includes('Array.from({length:n}'));
assert.ok(number.includes('seed=Array.from(assetId)'));
assert.ok(number.includes('objectShape('));
});
test('Nursery 1 harvest does not display known misleading crop emoji',()=>{
assert.ok(alphabet.includes('misleadingCropLetters.has(crops[i].letter)?crops[i].letter:crops[i].emoji'));
assert.ok(alphabet.includes('GM-N01-HARVEST-'));
});

test('Nursery 3 shape choice and layout diagrams have traceable IDs',()=>{
for(const prefix of ['GM-N03-OPTION-','GM-N03-LAYOUT-CHOICE-','GM-N03-LAYOUT-PLACED-'])assert.ok(geometry.includes(prefix));
});
test('Nursery 1 ambiguous crops explicitly require reference photography',()=>{
assert.ok(alphabet.includes('teacher supplies an accurate reference photograph'));
});

test('Nursery 3 uses named garden-context SVG scenes instead of repeated question emoji',()=>{
assert.ok(geometry.includes('function GardenObjectScene('));
for(const id of ['GM-N03-DETECT-','GM-N03-MATCH-','GM-N03-GROUP-','GM-N03-STORY-'])assert.ok(geometry.includes("sceneId={'"+id));
assert.ok(!geometry.includes('>{item.icon}</div>'));
assert.ok(!geometry.includes('>{stories[story].icon}</div>'));
});

test('Nursery 2 counting stories use readable crop nouns',()=>{
for(const noun of ['tomatoes','bananas','apples','carrots','peppers'])assert.ok(number.includes("name:'"+noun+"'"));
});
test('Nursery 2 matching baskets reuse accurate item-count renderer',()=>{
assert.ok(number.includes("picture(crop.icon,n,'GM-N02-MATCH-'+question+'-'+i)"));
});

test('Nursery 2 harvest scenes are drawn as crop-specific SVGs, not repeated emoji grids',()=>{
assert.ok(number.includes('const objectShape='));
assert.ok(number.includes('const cropIndex=crops.findIndex'));
assert.ok(number.includes("kind==='story'"));
assert.ok(number.includes("kind==='basket'"));
assert.ok(number.includes("kind==='comparison'"));
assert.ok(!number.includes('>{icon}</span>'));
});

// Acceptance trigger: source regression is necessary but not sufficient.
// Release gate additionally requires browser-reviewed, unique, question-matched illustrations
// across Nursery 1–3; do not promote this suite's pass as full visual acceptance.

test('Nursery 3 garden objects include fruit, seed-tray and vegetable-bed visual details',()=>{
for(const term of ['isFruit','isTray','isVegetableBed'])assert.ok(geometry.includes(term));
});
