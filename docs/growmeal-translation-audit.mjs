import {gardenModels,packageTiers} from '../../lib/marketplace/catalog.ts';
import {localizedGarden,localizedTier} from '../../lib/marketplace/localization.ts';
const languages=['en','fr','ar','ha','yo','ig'];
const rows=languages.map(lang=>{
 const untranslated=gardenModels.filter(g=>lang!=='en'&&localizedGarden(lang,g)===g.name).map(g=>g.id);
 const untranslatedTiers=Object.keys(packageTiers).filter(t=>lang!=='en'&&localizedTier(lang,t,packageTiers[t]).name===t);
 return {language:lang,translatedGardens:gardenModels.length-untranslated.length,totalGardens:gardenModels.length,untranslatedGardenIds:untranslated,untranslatedTiers};
});
console.log(JSON.stringify(rows,null,2));
if(process.env.REQUIRE_COMPLETE_TRANSLATIONS==='1'&&rows.some(x=>x.untranslatedGardenIds.length||x.untranslatedTiers.length))process.exitCode=1;
