import {gardenModels} from './catalog';

/** Proposed educational progression; garden model IDs are reused, not redefined. */
export type SchoolGardenSequenceEntry={
  schoolClass:string;
  firstGardenId:string;
  secondGardenId:string;
  secondLearningObjective:string;
};
export const schoolGardenSequences:readonly SchoolGardenSequenceEntry[]=[
  {
    "schoolClass": "Nursery 1",
    "firstGardenId": "GM-N01",
    "secondGardenId": "GM-N04",
    "secondLearningObjective": "Recognise leaf shapes, colours and simple plant parts"
  },
  {
    "schoolClass": "Nursery 2",
    "firstGardenId": "GM-N02",
    "secondGardenId": "GM-N05",
    "secondLearningObjective": "Count butterflies, compare patterns and observe pollinators safely"
  },
  {
    "schoolClass": "Nursery 3",
    "firstGardenId": "GM-N03",
    "secondGardenId": "GM-N06",
    "secondLearningObjective": "Sort reused containers by shape and size; practise safe planting"
  },
  {
    "schoolClass": "Primary 1",
    "firstGardenId": "GM-P11",
    "secondGardenId": "GM-P16",
    "secondLearningObjective": "Identify raised-bed parts and practise basic planting routines"
  },
  {
    "schoolClass": "Primary 2",
    "firstGardenId": "GM-P12",
    "secondGardenId": "GM-P17",
    "secondLearningObjective": "Count containers and measure a simple recycled vertical garden"
  },
  {
    "schoolClass": "Primary 3",
    "firstGardenId": "GM-P21",
    "secondGardenId": "GM-P23",
    "secondLearningObjective": "Use grid plots to record plant growth and compare observations"
  },
  {
    "schoolClass": "Primary 4",
    "firstGardenId": "GM-P23",
    "secondGardenId": "GM-P26",
    "secondLearningObjective": "Measure drip volumes and explain gravity-fed irrigation"
  },
  {
    "schoolClass": "Primary 5",
    "firstGardenId": "GM-P26",
    "secondGardenId": "GM-P29",
    "secondLearningObjective": "Plan watering schedules and calculate water-use totals"
  },
  {
    "schoolClass": "Primary 6",
    "firstGardenId": "GM-P29",
    "secondGardenId": "GM-P16",
    "secondLearningObjective": "Design a raised-bed layout and calculate area and planting density"
  },
  {
    "schoolClass": "JSS 1",
    "firstGardenId": "GM-J31",
    "secondGardenId": "GM-J35",
    "secondLearningObjective": "Compare intercropping arrangements and crop interactions"
  },
  {
    "schoolClass": "JSS 2",
    "firstGardenId": "GM-J33",
    "secondGardenId": "GM-J36",
    "secondLearningObjective": "Measure irrigation and compare water-management treatments"
  },
  {
    "schoolClass": "JSS 3",
    "firstGardenId": "GM-J34",
    "secondGardenId": "GM-J37",
    "secondLearningObjective": "Investigate compost maturity, decomposition and soil management"
  },
  {
    "schoolClass": "SSS 1",
    "firstGardenId": "GM-S41",
    "secondGardenId": "GM-S44",
    "secondLearningObjective": "Calculate irrigation demand, flow rate and pumping requirements"
  },
  {
    "schoolClass": "SSS 2",
    "firstGardenId": "GM-S42",
    "secondGardenId": "GM-S45",
    "secondLearningObjective": "Compare yield and irrigation-water productivity in trials"
  },
  {
    "schoolClass": "SSS 3",
    "firstGardenId": "GM-S43",
    "secondGardenId": "GM-S46",
    "secondLearningObjective": "Design controlled soilless-system experiments and interpret outcomes"
  }
];

/** Validate catalogue references and distinct first/second selections. */
export function validateSchoolGardenSequences(){
  const catalogue=new Map(gardenModels.filter(g=>g.audience==='education').map(g=>[g.id,g]));
  const problems:string[]=[];
  const classNames=new Set<string>();
  for(const entry of schoolGardenSequences){
    if(classNames.has(entry.schoolClass))problems.push('Duplicate class: '+entry.schoolClass);
    classNames.add(entry.schoolClass);
    const category=entry.schoolClass.split(' ')[0];
    for(const id of [entry.firstGardenId,entry.secondGardenId]){
      const model=catalogue.get(id);
      if(!model)problems.push(entry.schoolClass+': missing catalogue model '+id);
      else if(model.category!==category)problems.push(entry.schoolClass+': wrong category for '+id);
    }
    if(entry.firstGardenId===entry.secondGardenId)problems.push(entry.schoolClass+': second garden repeats first');
    if(!entry.secondLearningObjective.trim())problems.push(entry.schoolClass+': missing objective');
  }
  if(schoolGardenSequences.length!==15)problems.push('Expected exactly 15 class mappings');
  return {valid:problems.length===0,problems,classes:schoolGardenSequences.length,uniqueSecondModels:new Set(schoolGardenSequences.map(x=>x.secondGardenId)).size};
}
