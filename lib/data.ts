import type { Garden, Learner, Metric, Task } from './types';

export const hqMetrics: Metric[] = [
  { label: 'Active schools', value: '128', note: '+14 this term', status: 'good' },
  { label: 'Teachers', value: '462', note: '78% certified', status: 'good' },
  { label: 'Learners', value: '12,840', note: '5 active levels', status: 'good' },
  { label: 'Operational gardens', value: '736', note: '41 maintenance due', status: 'warning' },
  { label: 'Lesson delivery', value: '86%', note: 'current term', status: 'good' },
  { label: 'Passport completion', value: '71%', note: 'target 80%', status: 'warning' }
];

export const schoolMetrics: Metric[] = [
  { label: 'Classes', value: '12', note: '3 levels', status: 'good' },
  { label: 'Teachers', value: '18', note: '14 certified', status: 'good' },
  { label: 'Learners', value: '428', note: '94% active', status: 'good' },
  { label: 'Operational gardens', value: '17/20', note: '2 due maintenance', status: 'warning' },
  { label: 'Lessons this week', value: '28/32', note: '4 pending', status: 'warning' },
  { label: 'M&E score', value: '82%', note: 'Gold School', status: 'good' }
];

export const teacherTasks: Task[] = [
  { title: 'Score Primary 4A garden mission', detail: '7 learners awaiting scores', due: 'Today', status: 'warning' },
  { title: 'Verify Food Smart Passport', detail: '12 entries waiting', due: 'Today', status: 'neutral' },
  { title: 'Water-Smart Garden inspection', detail: 'Record emitter and drainage check', due: 'Tomorrow', status: 'neutral' },
  { title: 'Close Week 6 lesson', detail: 'Journal evidence incomplete for 3 learners', due: 'Friday', status: 'warning' }
];

export const gardens: Garden[] = [
  { code: 'GD-21', name: 'Raised Food Garden', level: 'Primary 4–6', status: 'Operational', maintenance: '18 Sep', water: 'Gravity drip' },
  { code: 'GD-23', name: 'Grid Experiment Garden', level: 'Primary 4–6', status: 'Operational', maintenance: '20 Sep', water: 'Measured watering' },
  { code: 'GD-26', name: 'Gravity Drip Garden', level: 'Primary 4–6', status: 'Maintenance Due', maintenance: 'Overdue', water: 'Tank + drip' },
  { code: 'GD-29', name: 'Water-Smart Garden', level: 'Primary 4–6', status: 'Operational', maintenance: '22 Sep', water: 'Controlled drip' },
  { code: 'GD-30', name: 'Intro Soilless Garden', level: 'Primary 4–6', status: 'Temporarily Closed', maintenance: 'Reservoir repair', water: 'Recirculating' }
];

export const learners: Learner[] = [
  { id: 'LRN-001', name: 'Amina Musa', progress: 88, assessment: 82, passport: 90 },
  { id: 'LRN-002', name: 'Chinedu Okafor', progress: 74, assessment: 69, passport: 72, attention: 'Mission evidence missing' },
  { id: 'LRN-003', name: 'Zainab Bello', progress: 93, assessment: 91, passport: 94 },
  { id: 'LRN-004', name: 'Tobi Adeyemi', progress: 67, assessment: 61, passport: 65, attention: 'Practical reassessment' },
  { id: 'LRN-005', name: 'Mariam Garba', progress: 81, assessment: 78, passport: 84 }
];

export const weekSequence = [
  ['1','Learning Objective','Investigate how gravity-fed drip irrigation distributes water across a school garden.','Complete'],
  ['2','Vocabulary','gravity, pressure, emitter, flow, distribution, efficiency','Complete'],
  ['3','Flashcards','Review the six core irrigation terms with the class.','Complete'],
  ['4','Teacher Demonstration','Demonstrate tank → mainline → lateral → emitter flow.','Complete'],
  ['5','Practical Activity','Measure emitter output at three positions for 2 minutes.','In progress'],
  ['6','Journal','Record water volume and compare emitter positions.','Not started'],
  ['7','Garden Mission','Find one source of unequal water distribution and propose a fix.','Not started'],
  ['8','Food Smart Extension','Connect efficient irrigation to responsible resource use.','Not started'],
  ['9','Assessment','Score investigation/data and mission problem-solving evidence.','Not started'],
  ['10','Passport Verification','Verify Week 6 practical and mission evidence.','Not started']
] as const;

export const auditDomains = [
  ['D1','Leadership & Readiness',10,3.4],['D2','Garden Operations & Safety',15,3.1],['D3','Teacher Delivery Quality',20,3.3],['D4','Learner Participation & Practical Competence',15,3.2],['D5','Investigation, Data & Problem Solving',15,2.8],['D6','Food Literacy & Resource Stewardship',10,3.5],['D7','Assessment, Passport & Moderation',10,3.0],['D8','Reporting, Improvement & Community Engagement',5,2.9]
] as const;
