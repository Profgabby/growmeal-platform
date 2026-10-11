import {readFileSync} from 'node:fs';
const catalog=readFileSync(new URL('../lib/marketplace/catalog.ts',import.meta.url),'utf8');
const localization=readFileSync(new URL('../lib/marketplace/localization.ts',import.meta.url),'utf8');
const ids=[...catalog.matchAll(/\['([NPJSHCUIE]\d{2})','([^']+)'/g)].map(x=>'GM-'+x[1]);
const languages=['en','fr','ar','ha','yo','ig'];
const enterpriseBlock=localization.split('const enterprise:')[1]?.split('const tierCopy:')[0]||'';
const rows=languages.map(lang=>{
 const segment=enterpriseBlock.match(new RegExp('(?:^|\\n)'+lang+':\\{([^\\n]*)'))?.[1]||'';
 const translated=new Set([...segment.matchAll(/'GM-[A-Z]\d{2}'/g)].map(x=>x[0].slice(1,-1)));
 return {language:lang,translatedGardenNames:lang==='en'?ids.length:ids.filter(id=>translated.has(id)).length,totalGardenNames:ids.length,untranslatedGardenIds:lang==='en'?[]:ids.filter(id=>!translated.has(id))};
});
console.log(JSON.stringify(rows,null,2));
if(process.env.REQUIRE_COMPLETE_TRANSLATIONS==='1'&&rows.some(r=>r.untranslatedGardenIds.length))process.exitCode=1;
