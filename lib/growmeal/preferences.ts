export const audienceOptions=['Household','Community','Urban grower','Institution','Enterprise','School'] as const;
export type GrowAudience=typeof audienceOptions[number];
export const preferenceKey='lifews.growmeal.audience.dev.v1';
export function isGrowAudience(value:unknown):value is GrowAudience{return typeof value==='string'&&audienceOptions.some(a=>a===value)}
export const foodGroups={
 'Leafy vegetables':['Amaranth (green)','Fluted pumpkin (ugu)','Waterleaf','Ewedu (jute mallow)','Bitter leaf','Lettuce','Spinach'],
 'Fruit vegetables':['Tomato','Pepper (chilli)','Sweet pepper','Okra','Garden egg','Cucumber','Eggplant'],
 'Roots & tubers':['Cassava','Sweet potato','Yam','Cocoyam','Carrot'],
 'Legumes':['Cowpea','Groundnut','Soybean','Bambara groundnut','Pigeon pea'],
 'Grains & cereals':['Maize','Sorghum','Millet','Rice'],
 'Herbs & spices':['Scent leaf','Basil','Ginger','Turmeric','Spring onion','Lemongrass'],
 'Fruits':['Plantain','Banana','Pawpaw','Pineapple','Citrus','Watermelon']
} as const;
export const countries=['Nigeria','Ghana','Benin','Togo','Côte d’Ivoire','Senegal','The Gambia','Sierra Leone','Liberia','Guinea','Guinea-Bissau','Mali','Burkina Faso','Niger','Cabo Verde','Other'] as const;
export const nigeriaRegions=['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT Abuja','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'] as const;
export const growingSpaces=['Balcony / containers','Courtyard','Backyard','Community plot','School garden','Rooftop (assessment required)','Farm / field','Indoor growing area'] as const;
