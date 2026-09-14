import raw from '@/data/garden-content.json';

type AnyItem=Record<string,any>;
const data=raw as any;
export const gardenMeta:Record<string,any>=data.gardens;
export const gardenContent:Record<string,Record<string,AnyItem[]>>=data.content;

export const sectionConfig:Record<string,{key:string;title:string;eyebrow:string;description:string}>={
 'lesson-plan':{key:'lesson',title:'12-Week Lesson Plan',eyebrow:'TEACHER DELIVERY',description:'The garden-specific weekly lesson objective, resource links, extensions, assessment and recommended flow.'},
 'vocabulary':{key:'vocabulary',title:'Vocabulary & Concept Bank',eyebrow:'LEARN',description:'Garden-linked vocabulary, definitions, prompts and concept language for learners and teachers.'},
 'demonstrations':{key:'demonstrations',title:'Teacher Demonstration Cards',eyebrow:'DEMONSTRATE',description:'Teacher setup, demonstration, questions, observation checks and lesson closure prompts.'},
 'practicals':{key:'practicals',title:'Practical Activity Cards',eyebrow:'PRACTICE',description:'Hands-on practical activities with learning objectives and expected evidence.'},
 'missions':{key:'missions',title:'Garden Mission Cards',eyebrow:'MISSION',description:'Garden missions with materials, evidence, success criteria, safety and AgriShine care tasks.'},
 'assessments':{key:'assessments',title:'AQ Assessment Items',eyebrow:'ASSESS',description:'Ten garden-linked assessment items covering knowledge, practical, investigation/data and mission problem solving.'},
 'ingredient-lab':{key:'ingredientLab',title:'Ingredient Lab Activities',eyebrow:'INGREDIENT LAB',description:'Ingredient investigations connecting plant parts, observation, simple methods, evidence and food-safety practice.'},
 'farm-to-food':{key:'farmToFood',title:'Farm-to-Food Activities',eyebrow:'FARM TO FOOD',description:'Activities tracing food from garden production through harvest, safe handling and use.'},
 'challenges':{key:'challenges',title:'Food Smart Challenges',eyebrow:'FOOD SMART',description:'Food literacy and resource-decision challenges with scenario, task, evidence, success criteria and safety.'},
 'passport':{key:'passport',title:'Food Smart Passport™',eyebrow:'VERIFY',description:'Eight evidence checkpoints used for garden participation, practical skills, investigation, missions, food-system connections and assessment.'},
};

export const orderedSections=['lesson-plan','vocabulary','demonstrations','practicals','missions','assessments','ingredient-lab','farm-to-food','challenges','passport'];

export function getGarden(id:string){return gardenMeta[id]||null}
export function getItems(id:string,slug:string){const cfg=sectionConfig[slug];return cfg?gardenContent[id]?.[cfg.key]||[]:[]}
export function findItem(id:string,slug:string,code:string){return getItems(id,slug).find((x:any)=>String(x.code).toLowerCase()===decodeURIComponent(code).toLowerCase())||null}
export function itemTitle(item:any,slug:string){
 return item.title||item.Activity||item.Term||item.Theme||item.question||item.verb||item.Garden_or_Focus||item.code;
}
export function itemSummary(item:any,slug:string){
 return item.Learning_Objective||item.Definition||item.demo||item.mission||item.Objective||item.question||item.Scenario||item.task||item.description||'';
}
