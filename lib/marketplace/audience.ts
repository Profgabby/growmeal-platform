import type {GrowAudience} from '@/lib/growmeal/preferences';
import type {GardenModel} from '@/lib/marketplace/catalog';
export function marketplaceAudience(g:GardenModel,a:GrowAudience){
 if(a==='School')return g.audience==='education';
 if(g.audience==='education')return false;
 if(a==='Household')return g.category==='Home & Household';
 if(a==='Community')return g.category==='Community & Cooperative';
 if(a==='Urban grower')return g.category==='Urban & Small-Space';
 if(a==='Institution')return g.category==='Institutional & Social Impact';
 if(a==='Enterprise')return g.category==='Enterprise & Livelihood';
 return false;
}
