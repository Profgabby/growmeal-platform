export const materialTypes=[
 {slug:'student-workbooks',title:'Student Workbooks',desc:'Student-facing learning tasks, journals and activity pathways organized by level and garden.',section:'lesson-plan'},
 {slug:'journals',title:'Observation / Research Journals',desc:'Observation, investigation and research journals for Nursery through SSS.',section:'passport'},
 {slug:'flashcards',title:'1,000 Concept Flashcards',desc:'Garden-linked concept language and vocabulary for recognition, explanation and review.',section:'vocabulary'},
 {slug:'practical-activities',title:'500 Practical Activity Cards',desc:'Hands-on practical activities with learning objectives and expected evidence.',section:'practicals'},
 {slug:'garden-missions',title:'500 Garden Mission Cards',desc:'Mission-based garden challenges with evidence, safety and AgriShine care tasks.',section:'missions'},
 {slug:'assessments',title:'500 Assessment Items',desc:'AQ-001–AQ-500 across knowledge, practical, investigation/data and mission problem solving.',section:'assessments'},
 {slug:'teacher-practical-manuals',title:'Teacher Practical Manuals',desc:'Teacher implementation guidance for the practical activity system.',section:'practicals'},
 {slug:'demonstrations',title:'500 Demonstration Cards',desc:'Teacher setup, demonstration, questioning, observation and closure cards.',section:'demonstrations'},
 {slug:'vocabulary',title:'3,900 Vocabulary Entries',desc:'Progressive GrowMeal vocabulary and concept definitions linked to garden learning.',section:'vocabulary'},
 {slug:'farm-to-food',title:'500 Farm-to-Food Activities',desc:'Activities connecting production, harvest, food handling and food-use pathways.',section:'farm-to-food'},
 {slug:'ingredient-lab',title:'500 Ingredient Lab Activities',desc:'Ingredient and plant-part investigations with methods, evidence and safety.',section:'ingredient-lab'},
 {slug:'food-smart-challenges',title:'500 Food Smart Challenges',desc:'Scenario-based food literacy, stewardship and evidence-based decision challenges.',section:'challenges'},
 {slug:'passport',title:'Food Smart Passport™',desc:'Evidence checkpoints, teacher verification and badge progression.',section:'passport'},
 {slug:'lesson-plans',title:'12-Week Lesson Plans',desc:'Level-by-level term delivery maps connecting all GrowMeal resources.',section:'lesson-plan'},
 {slug:'teacher-training',title:'Teacher Training & Certification',desc:'Teacher implementation, competency and certification resources.',section:'demonstrations'},
 {slug:'school-me',title:'School M&E & Certification',desc:'School implementation, monitoring, evaluation and certification resources.',section:'passport'},
] as const;
export function getMaterial(slug:string){return materialTypes.find(x=>x.slug===slug)}
