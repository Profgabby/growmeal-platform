import {gardenModels} from './catalog';
import {schoolGardenSequences} from './school-garden-sequences';

/** Proposed flagship selection. Existing first and second gardens remain unchanged.
 * Delivery identifies whether a dedicated activity is wired; it does not certify scientific or accessibility acceptance.
 */
export type FlagshipMode='discover'|'solve'|'build'|'investigate'|'innovate';
export type FlagshipExperience={position:number;gardenId:string;mode:FlagshipMode;objective:string;delivery:'existing-module'|'implemented-distinct-experience'|'planned-distinct-experience'};
export type ClassFlagship={schoolClass:string;experiences:readonly FlagshipExperience[]};
export const flagshipSchoolGardens:readonly ClassFlagship[]=[
  {
    "schoolClass": "Nursery 1",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-N01",
        "mode": "discover",
        "objective": "Find garden letters and picture objects",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-N04",
        "mode": "solve",
        "objective": "Match leaf shapes and identify plant parts",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-N07",
        "mode": "build",
        "objective": "Arrange a safe mini-growing space with picture steps",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-N08",
        "mode": "investigate",
        "objective": "Observe seedling growth with picture records",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-N03",
        "mode": "innovate",
        "objective": "Create a shapes-and-plants garden design",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "Nursery 2",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-N02",
        "mode": "discover",
        "objective": "Count seeds and garden objects",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-N05",
        "mode": "solve",
        "objective": "Choose safe ways to observe butterflies",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-N06",
        "mode": "build",
        "objective": "Arrange reused containers with adult supervision",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-N07",
        "mode": "investigate",
        "objective": "Compare seedling size using visual records",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-N08",
        "mode": "innovate",
        "objective": "Design a mini tabletop garden with picture cards",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "Nursery 3",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-N03",
        "mode": "discover",
        "objective": "Identify shapes in a garden layout",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-N06",
        "mode": "solve",
        "objective": "Solve safe container and spacing puzzles",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-N04",
        "mode": "build",
        "objective": "Assemble a leaf-study station with picture steps",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-N05",
        "mode": "investigate",
        "objective": "Observe pollinator visits without touching insects",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-N01",
        "mode": "innovate",
        "objective": "Invent a labelled alphabet-and-plant display",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "Primary 1",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-P11",
        "mode": "discover",
        "objective": "Discover crop names and food origins",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-P16",
        "mode": "solve",
        "objective": "Choose solutions for healthy raised beds",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-P12",
        "mode": "build",
        "objective": "Build a simple number-and-planting plan",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-P17",
        "mode": "investigate",
        "objective": "Compare container watering observations",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-P23",
        "mode": "innovate",
        "objective": "Design a picture-based garden observation chart",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "Primary 2",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-P12",
        "mode": "discover",
        "objective": "Count and group food crops",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-P17",
        "mode": "solve",
        "objective": "Solve reused-container spacing problems",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-P16",
        "mode": "build",
        "objective": "Plan a safe raised-bed planting sequence",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-P26",
        "mode": "investigate",
        "objective": "Compare water movement in a gravity drip demonstration",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-P23",
        "mode": "innovate",
        "objective": "Create a plant-height recording display",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "Primary 3",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-P21",
        "mode": "discover",
        "objective": "Identify bed components and plant needs",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-P23",
        "mode": "solve",
        "objective": "Solve grid-plot measurement challenges",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-P17",
        "mode": "build",
        "objective": "Design a secure recycled planter layout",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-P26",
        "mode": "investigate",
        "objective": "Measure water delivery and plant growth",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-P29",
        "mode": "innovate",
        "objective": "Propose a water-saving garden routine",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "Primary 4",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-P23",
        "mode": "discover",
        "objective": "Read and interpret crop-grid observations",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-P26",
        "mode": "solve",
        "objective": "Calculate simple drip volumes",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-P21",
        "mode": "build",
        "objective": "Prepare a dimensioned raised-bed plan",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-P17",
        "mode": "investigate",
        "objective": "Compare container water retention observations",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-P29",
        "mode": "innovate",
        "objective": "Design a fair water-use improvement challenge",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "Primary 5",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-P26",
        "mode": "discover",
        "objective": "Discover gravity-fed irrigation parts",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-P29",
        "mode": "solve",
        "objective": "Solve weekly water-budget decisions",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-P23",
        "mode": "build",
        "objective": "Build a planting-and-data collection plan",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-P21",
        "mode": "investigate",
        "objective": "Compare grid-plot growth with recorded measurements",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-P17",
        "mode": "innovate",
        "objective": "Propose a low-cost water-smart retrofit",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "Primary 6",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-P29",
        "mode": "discover",
        "objective": "Identify garden water demand drivers",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-P16",
        "mode": "solve",
        "objective": "Solve bed area and planting-density problems",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-P26",
        "mode": "build",
        "objective": "Design a gravity-drip irrigation layout",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-P23",
        "mode": "investigate",
        "objective": "Compare crop observations using graphs",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-P17",
        "mode": "innovate",
        "objective": "Develop a resource-efficient school garden proposal",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "JSS 1",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-J31",
        "mode": "discover",
        "objective": "Explore production-system inputs and outputs",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-J35",
        "mode": "solve",
        "objective": "Solve intercropping compatibility decisions",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-J37",
        "mode": "build",
        "objective": "Prepare a compost management workflow",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-J36",
        "mode": "investigate",
        "objective": "Investigate irrigation treatments with recorded observations",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-J38",
        "mode": "innovate",
        "objective": "Design a safe introductory soilless-growing proposal",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "JSS 2",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-J33",
        "mode": "discover",
        "objective": "Discover plot measurements and trial variables",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-J36",
        "mode": "solve",
        "objective": "Solve water-allocation decisions",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-J35",
        "mode": "build",
        "objective": "Build a balanced intercropping trial plan",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-J37",
        "mode": "investigate",
        "objective": "Compare compost and soil observations",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-J39",
        "mode": "innovate",
        "objective": "Design a basic sensor observation protocol",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "JSS 3",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-J34",
        "mode": "discover",
        "objective": "Discover crop rotation principles",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-J37",
        "mode": "solve",
        "objective": "Diagnose compost maturity and soil-management problems",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-J31",
        "mode": "build",
        "objective": "Develop a season-long production plan",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-J38",
        "mode": "investigate",
        "objective": "Compare soilless growing conditions using recorded data",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-J39",
        "mode": "innovate",
        "objective": "Design a monitored garden improvement project",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "SSS 1",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-S41",
        "mode": "discover",
        "objective": "Discover advanced crop-production system interactions",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-S44",
        "mode": "solve",
        "objective": "Solve irrigation and pump calculations",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-S47",
        "mode": "build",
        "objective": "Build a sensor-measurement plan with safe instrumentation",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-S42",
        "mode": "investigate",
        "objective": "Investigate crop-trial observations and uncertainty",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-S50",
        "mode": "innovate",
        "objective": "Design an integrated food-water-energy concept",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "SSS 2",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-S42",
        "mode": "discover",
        "objective": "Discover crop-trial design and measurement",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-S45",
        "mode": "solve",
        "objective": "Solve yield and water-productivity trade-offs",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-S44",
        "mode": "build",
        "objective": "Design an irrigation engineering workflow",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-S47",
        "mode": "investigate",
        "objective": "Investigate sensor uncertainty and calibration",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-S50",
        "mode": "innovate",
        "objective": "Propose a data-supported integrated resource strategy",
        "delivery": "implemented-distinct-experience"
      }
    ]
  },
  {
    "schoolClass": "SSS 3",
    "experiences": [
      {
        "position": 1,
        "gardenId": "GM-S43",
        "mode": "discover",
        "objective": "Discover controlled experimental designs",
        "delivery": "existing-module"
      },
      {
        "position": 2,
        "gardenId": "GM-S46",
        "mode": "solve",
        "objective": "Solve nutrient and reservoir-balance decisions",
        "delivery": "existing-module"
      },
      {
        "position": 3,
        "gardenId": "GM-S47",
        "mode": "build",
        "objective": "Design a monitoring and data-quality workflow",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 4,
        "gardenId": "GM-S45",
        "mode": "investigate",
        "objective": "Investigate water-productivity sensitivity",
        "delivery": "implemented-distinct-experience"
      },
      {
        "position": 5,
        "gardenId": "GM-S50",
        "mode": "innovate",
        "objective": "Develop a defensible integrated food-system innovation proposal",
        "delivery": "implemented-distinct-experience"
      }
    ]
  }
];

export function validateFlagshipSchoolGardens(){
 const problems:string[]=[];
 const catalog=new Map(gardenModels.filter(g=>g.audience==='education').map(g=>[g.id,g]));
 const modes:FlagshipMode[]=['discover','solve','build','investigate','innovate'];
 const byClass=new Map(flagshipSchoolGardens.map(x=>[x.schoolClass,x]));
 if(flagshipSchoolGardens.length!==15||byClass.size!==15)problems.push('Exactly 15 unique school classes required');
 for(const sequence of schoolGardenSequences){
  const row=byClass.get(sequence.schoolClass);
  if(!row){problems.push('Missing class '+sequence.schoolClass);continue;}
  if(row.experiences.length!==5)problems.push(sequence.schoolClass+': expected five experiences');
  if(row.experiences[0]?.gardenId!==sequence.firstGardenId||row.experiences[1]?.gardenId!==sequence.secondGardenId)problems.push(sequence.schoolClass+': existing first/second garden mapping changed');
  const seen=new Set<string>();
  row.experiences.forEach((x,i)=>{
   if(x.position!==i+1||x.mode!==modes[i])problems.push(sequence.schoolClass+': invalid mode or position '+i);
   if(seen.has(x.gardenId))problems.push(sequence.schoolClass+': repeated garden '+x.gardenId);
   seen.add(x.gardenId);
   const model=catalog.get(x.gardenId);
   if(!model)problems.push(sequence.schoolClass+': missing catalogue ID '+x.gardenId);
   else if(model.category!==sequence.schoolClass.split(' ')[0])problems.push(sequence.schoolClass+': mismatched category '+x.gardenId);
   if(x.objective.trim().length<25)problems.push(sequence.schoolClass+': insufficient learning objective '+x.gardenId);
   if(x.delivery!==(i<2?'existing-module':'planned-distinct-experience'))problems.push(sequence.schoolClass+': incorrect implementation status');
  });
 }
 return {valid:problems.length===0,problems,classes:flagshipSchoolGardens.length,experiences:flagshipSchoolGardens.reduce((n,x)=>n+x.experiences.length,0)};
}
