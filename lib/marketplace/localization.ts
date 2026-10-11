import type {PackageTier,GardenModel} from '@/lib/marketplace/catalog';
const audience:Record<string,Record<string,string>>={
fr:{School:'École',Household:'Ménage',Community:'Communauté','Urban grower':'Agriculture urbaine',Institution:'Institution',Enterprise:'Entreprise'},
ar:{School:'مدرسة',Household:'أسرة',Community:'مجتمع','Urban grower':'مزارع حضري',Institution:'مؤسسة',Enterprise:'مشروع'},
ha:{School:'Makaranta',Household:'Iyali',Community:'Al’umma','Urban grower':'Manomin birni',Institution:'Cibiya',Enterprise:'Kasuwanci'},
yo:{School:'Ilé-ìwé',Household:'Ìdílé',Community:'Àwùjọ','Urban grower':'Agbẹ ìlú',Institution:'Ilé-iṣẹ́',Enterprise:'Iṣòwò'},
ig:{School:'Ụlọ akwụkwọ',Household:'Ezinụlọ',Community:'Obodo','Urban grower':'Onye ọrụ ubi obodo',Institution:'Ụlọ ọrụ',Enterprise:'Azụmahịa'}
};
const categories:Record<string,Record<string,string>>={
fr:{Nursery:'Maternelle',Primary:'Primaire',JSS:'Collège',SSS:'Lycée','Home & Household':'Maison et famille','Community & Cooperative':'Communauté et coopérative','Urban & Small-Space':'Ville et petits espaces','Institutional & Social Impact':'Institutions et impact social','Enterprise & Livelihood':'Entreprise et moyens de subsistance'},
ar:{Nursery:'روضة',Primary:'ابتدائي',JSS:'إعدادي',SSS:'ثانوي','Home & Household':'المنزل والأسرة','Community & Cooperative':'المجتمع والتعاونيات','Urban & Small-Space':'الزراعة الحضرية','Institutional & Social Impact':'المؤسسات والأثر الاجتماعي','Enterprise & Livelihood':'المشاريع وسبل العيش'},
ha:{Nursery:'Nursery',Primary:'Firamare',JSS:'Ƙaramar sakandare',SSS:'Babbar sakandare','Home & Household':'Gida da iyali','Community & Cooperative':'Al’umma da haɗin gwiwa','Urban & Small-Space':'Birni da ƙaramin fili','Institutional & Social Impact':'Cibiyoyi da al’umma','Enterprise & Livelihood':'Kasuwanci da sana’a'},
yo:{Nursery:'Ilé-ẹ̀kọ́ ọmọ kékeré',Primary:'Ilé-ẹ̀kọ́ alákọ̀ọ́bẹ̀rẹ̀',JSS:'Ilé-ẹ̀kọ́ girama kékeré',SSS:'Ilé-ẹ̀kọ́ girama àgbà','Home & Household':'Ilé àti ìdílé','Community & Cooperative':'Àwùjọ àti àjọṣepọ̀','Urban & Small-Space':'Ìlú àti àyè kékeré','Institutional & Social Impact':'Àwọn ilé-iṣẹ́ àti àwùjọ','Enterprise & Livelihood':'Iṣòwò àti iṣẹ́'},
ig:{Nursery:'Ụlọ akwụkwọ ọta akara',Primary:'Ụlọ akwụkwọ praịmarị',JSS:'Sekọndrị nta',SSS:'Sekọndrị ukwu','Home & Household':'Ụlọ na ezinụlọ','Community & Cooperative':'Obodo na otu mmekọrịta','Urban & Small-Space':'Obodo ukwu na obere oghere','Institutional & Social Impact':'Ụlọ ọrụ na enyemaka obodo','Enterprise & Livelihood':'Azụmahịa na ọrụ'}
};
const enterprise:Record<string,Record<string,string>>={
fr:{'GM-E01':'Jardin maraîcher de microentreprise','GM-E02':'Pépinière commerciale de jeunes plants','GM-E03':'Jardin intensif pour la vente'},
ar:{'GM-E01':'حديقة خضروات لمشروع صغير','GM-E02':'مشروع مشتل شتلات','GM-E03':'حديقة إنتاج مكثف للسوق'},
ha:{'GM-E01':'Lambun kayan lambu na ƙaramar sana’a','GM-E02':'Kasuwancin renon tsirrai','GM-E03':'Lambun noma mai yawa don kasuwa'},
yo:{'GM-E01':'Ọgbà ẹ̀fọ́ fún ìṣòwò kékeré','GM-E02':'Iṣòwò ilé ìtọ́jú irúgbìn','GM-E03':'Ọgbà ọjà tí ń mú èso púpọ̀'},
ig:{'GM-E01':'Ubi akwụkwọ nri maka obere azụmahịa','GM-E02':'Azụmahịa ebe a na-azụ mkpụrụ osisi','GM-E03':'Ubi mmepụta maka ahịa'}
};
const tierCopy:Record<string,Record<PackageTier,{name:string;description:string;includes:string[]}>>={
fr:{Seed:{name:'Semence',description:'Posez les bases de votre jardin alimentaire',includes:['Structure de base du jardin','Premiers intrants de plantation','Guide de démarrage']},Sprout:{name:'Pousse',description:'Développez votre jardin avec des outils et un accompagnement',includes:['Tout le contenu Semence','Outils et accessoires de jardinage','Supports pédagogiques ou opérationnels']},Harvest:{name:'Récolte',description:'Développez durablement votre jardin avec un accompagnement étendu',includes:['Tout le contenu Pousse','Planification de l’installation','Liste de contrôle de mise en service et de remise']}},
ig:{Seed:{name:'Mkpụrụ',description:'Bido ntọala ubi nri gị',includes:['Ihe owuwu ubi mbụ','Ihe mbido ịkụ ihe','Ntuziaka mmalite']},Sprout:{name:'Ome',description:'Jiri ngwa na nkwado mee ka ubi gị too',includes:['Ihe niile dị na Mkpụrụ','Ngwa ọrụ ubi','Ihe mmụta na ọrụ ubi']},Harvest:{name:'Owuwe ihe ubi',description:'Mee ka ubi gị na-aga n’ihu site na nkwado ọzọ',includes:['Ihe niile dị na Ome','Atụmatụ ntinye','Ndepụta nyocha tupu inyefe']}},
ar:{Seed:{name:'بذرة',description:'ابدأ تأسيس حديقة الطعام',includes:['الهيكل الأساسي','مستلزمات الزراعة الأولية','دليل البدء']},Sprout:{name:'برعم',description:'نمِّ حديقتك بالأدوات والدعم',includes:['كل محتويات بذرة','أدوات الحديقة','مواد تعليمية وتشغيلية']},Harvest:{name:'حصاد',description:'حافظ على حديقتك بدعم إضافي',includes:['كل محتويات برعم','تخطيط التركيب','قائمة فحص التسليم']}},
ha:{Seed:{name:'Iri',description:'Fara gina lambun abincinka',includes:['Tsarin lambu na asali','Kayan shuka na farko','Jagorar farawa']},Sprout:{name:'Tsiro',description:'Haɓaka lambu da kayan aiki da taimako',includes:['Duk abin da ke cikin Iri','Kayan aikin lambu','Kayan koyo da gudanarwa']},Harvest:{name:'Girbi',description:'Ci gaba da lambu tare da ƙarin taimako',includes:['Duk abin da ke cikin Tsiro','Tsarin girkawa','Jerin dubawar kammalawa']}},
yo:{Seed:{name:'Irúgbìn',description:'Bẹ̀rẹ̀ ìpìlẹ̀ ọgbà oúnjẹ rẹ',includes:['Ìkọ́lé ọgbà ìbẹ̀rẹ̀','Àwọn ohun èlò gbíngbin','Ìtọ́sọ́nà ìbẹ̀rẹ̀']},Sprout:{name:'Èéhù',description:'Mú ọgbà dàgbà pẹ̀lú irinṣẹ́ àti ìrànlọ́wọ́',includes:['Gbogbo ohun inú Irúgbìn','Irinṣẹ́ ọgbà','Ohun èlò ẹ̀kọ́ àti iṣẹ́']},Harvest:{name:'Ìkórè',description:'Ṣe àtìlẹ́yìn fún ọgbà rẹ ní ìgbà pípẹ́',includes:['Gbogbo ohun inú Èéhù','Ètò fífi sílẹ̀','Àtòjọ àyẹ̀wò àti fífi léni lọ́wọ́']}}
};
export function localizedAudience(lang:string,value:string){return audience[lang]?.[value]||value}
export function localizedCategory(lang:string,value:string){return categories[lang]?.[value]||value}
export function localizedGarden(lang:string,g:GardenModel){return enterprise[lang]?.[g.id]||g.name}
export function localizedTier(lang:string,t:PackageTier,base:{description:string;includes:string[]}){return tierCopy[lang]?.[t]||{name:t,...base}}
