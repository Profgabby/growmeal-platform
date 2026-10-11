export type GardenModel={id:string;name:string;category:string;audience:'education'|'non-school';legacyId?:string;requiresAssessment?:boolean};
export type PackageTier='Seed'|'Sprout'|'Harvest';
const school=[
['N01','Alphabet Garden'],['N02','Number Garden'],['N03','Geometry Garden'],['N04','Leaf Garden'],['N05','Butterfly Garden'],['N06','ReBottle Garden'],['N07','MicroGrow Garden'],['N08','Mini Table Garden'],
['P11','Alphabet Food Garden'],['P12','Number Food Garden'],['P16','Raised Food Garden'],['P17','ReBottle Wall Garden'],['P21','Raised Food Garden'],['P23','Grid Experiment Garden'],['P26','Gravity Drip Garden'],['P29','Water-Smart Garden'],
['J31','Production Garden'],['J33','Grid Experiment Garden'],['J34','Crop Rotation Garden'],['J35','Intercropping Garden'],['J36','Water-Smart Garden'],['J37','Compost & Soil Garden'],['J38','Soilless Learning Garden'],['J39','Sensor-Ready Garden'],
['S41','Advanced Production Garden'],['S42','Crop Trial Garden'],['S43','Controlled Experiment Garden'],['S44','Irrigation Engineering Garden'],['S45','Water Productivity Garden'],['S46','Advanced Soilless Garden'],['S47','Sensor & Monitoring Garden'],['S50','Integrated Food Systems Laboratory']
] as const;
const external=[
['H01','Family Backyard Food Garden','Home & Household'],['H02','Household Container Garden','Home & Household'],['H03','Kitchen Nutrition Garden','Home & Household'],['H04','Family Fruit & Vegetable Garden','Home & Household'],['H05','Water-Smart Home Garden','Home & Household'],['H06','Accessible Family Garden','Home & Household'],
['C01','Neighborhood Community Garden','Community & Cooperative'],['C02','Cooperative Production Garden','Community & Cooperative'],['C03','Community Nutrition Garden','Community & Cooperative'],['C04','Climate-Resilient Community Garden','Community & Cooperative'],['C05','Community Food Support Garden','Community & Cooperative'],
['U01','Apartment Balcony Food Garden','Urban & Small-Space'],['U02','Urban Rooftop Garden','Urban & Small-Space'],['U03','Vertical Food Wall Garden','Urban & Small-Space'],['U04','Modular Courtyard Garden','Urban & Small-Space'],
['I01','Hospital Nutrition & Wellness Garden','Institutional & Social Impact'],['I02','Faith-Based Community Garden','Institutional & Social Impact'],['I03','Care & Rehabilitation Garden','Institutional & Social Impact'],['I04','NGO Food Security Demonstration Garden','Institutional & Social Impact'],
['E01','Microenterprise Vegetable Garden','Enterprise & Livelihood'],['E02','Seedling Nursery Enterprise','Enterprise & Livelihood'],['E03','Market-Ready Intensive Garden','Enterprise & Livelihood']
] as const;
export const gardenModels:GardenModel[]=[
...school.map(([id,name])=>({id:'GM-'+id,name,category:id.startsWith('N')?'Nursery':id.startsWith('P')?'Primary':id.startsWith('J')?'JSS':'SSS',audience:'education' as const,legacyId:id})),
...external.map(([id,name,category])=>({id:'GM-'+id,name,category,audience:'non-school' as const,requiresAssessment:['H06','U01','U02','U03','I01','I03'].includes(id)}))
];
export const packageTiers:Record<PackageTier,{description:string;includes:string[]}>={
Seed:{description:'Plant the foundation of your food garden',includes:['Core garden structure','Basic planting inputs','Setup guide']},
Sprout:{description:'Grow with tools and learning support',includes:['Everything in Seed','Garden tools and accessories','Learning or operation materials']},
Harvest:{description:'Sustain your garden with extended setup and support',includes:['Everything in Sprout','Installation planning','Commissioning and handover checklist']}
};
export function validateCatalog(){const ids=gardenModels.map(x=>x.id);return {total:ids.length,education:gardenModels.filter(x=>x.audience==='education').length,nonSchool:gardenModels.filter(x=>x.audience==='non-school').length,unique:new Set(ids).size===ids.length};}
