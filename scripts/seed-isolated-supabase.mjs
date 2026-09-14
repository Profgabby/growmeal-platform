import fs from 'node:fs/promises';

const URL = process.env.GROWMEAL_SUPABASE_URL;
const KEY = process.env.GROWMEAL_SUPABASE_PUBLISHABLE_KEY;
if (!URL || !KEY) throw new Error('Missing GrowMeal Supabase environment variables');

function parseCsv(text){
  const rows=[]; let row=[], field='', q=false;
  for(let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(q){ if(c==='"'&&n==='"'){field+='"';i++;} else if(c==='"'){q=false;} else field+=c; }
    else { if(c==='"') q=true; else if(c===','){row.push(field);field='';} else if(c==='\n'){row.push(field.replace(/\r$/,''));rows.push(row);row=[];field='';} else field+=c; }
  }
  if(field.length||row.length){row.push(field.replace(/\r$/,''));rows.push(row);}
  const head=rows.shift();
  return rows.filter(r=>r.some(Boolean)).map(r=>Object.fromEntries(head.map((h,i)=>[h,r[i]??''])));
}

function gardenId(code){
  const n=Number(code.match(/(\d{3})/)?.[1]);
  if(n<=100) return `N${String(Math.floor((n-1)/10)+1).padStart(2,'0')}`;
  if(n<=200) return `P${Math.floor((n-101)/10)+11}`;
  if(n<=300) return `P${Math.floor((n-201)/10)+21}`;
  if(n<=400) return `J${Math.floor((n-301)/10)+31}`;
  return `S${Math.floor((n-401)/10)+41}`;
}

function levelFromGarden(g){
  if(g.startsWith('N')) return 'nursery';
  if(/^P1/.test(g)||g==='P20') return 'primary-1-3';
  if(/^P2/.test(g)||g==='P30') return 'primary-4-6';
  if(g.startsWith('J')) return 'jss';
  if(g.startsWith('S')) return 'sss';
  return null;
}

async function upsert(table, rows, conflict, batch=100){
  for(let i=0;i<rows.length;i+=batch){
    const part=rows.slice(i,i+batch);
    const res=await fetch(`${URL}/rest/v1/${table}?on_conflict=${conflict}`,{method:'POST',headers:{apikey:KEY,Authorization:`Bearer ${KEY}`,'Content-Type':'application/json',Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(part)});
    if(!res.ok) throw new Error(`${table} ${res.status}: ${await res.text()}`);
    console.log(`${table}: ${Math.min(i+batch,rows.length)}/${rows.length}`);
  }
}

async function count(table){
  const res=await fetch(`${URL}/rest/v1/${table}?select=*`,{headers:{apikey:KEY,Authorization:`Bearer ${KEY}`,Prefer:'count=exact',Range:'0-0'}});
  if(!res.ok) throw new Error(`count ${table}: ${res.status} ${await res.text()}`);
  const range=res.headers.get('content-range')||'';
  return Number(range.split('/')[1]||0);
}

const aq=parseCsv(await fs.readFile('data/MASTER_AQ001_AQ500_Assessment_Blueprint.csv','utf8'));
const quizzes=aq.map(r=>({
  garden_id:gardenId(r.id), code:r.id, language:'en', dimension:r.domain.toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,''),
  prompt:r.question, answer:{guidance:r.answer}, rubric:{scale:'0-3','0':'Not demonstrated','1':'Beginning','2':'Developing','3':'Secure'},
  options:null, title:`${r.id} Assessment`, payload:{source:'MASTER_AQ001_AQ500_Assessment_Blueprint.csv'}, published:true
}));

const fsc=parseCsv(await fs.readFile('data/MASTER_FSC001_FSC500_Food_Smart_Challenge_Index.csv','utf8'));
const challenges=fsc.map(r=>({
  garden_id:gardenId(r.ID), code:r.ID, language:'en', title:r.Domain, scenario:r.Scenario, task:r.Task, evidence:r.Evidence,
  success_criteria:r.Success_Criteria, safety:r.Safety, payload:{context:r.Context,extension:r.Extension,source:'MASTER_FSC001_FSC500_Food_Smart_Challenge_Index.csv'}, published:true
}));

const archive=JSON.parse(await fs.readFile('data/resource-archive.json','utf8'));
function inferGarden(path){const m=path.match(/(?:AQ|FSC|GM|PA|TD|IL|FF)[-_]?(\d{3})/i);return m?gardenId(m[1]):null;}
const archiveRows=archive.map(r=>{const g=inferGarden(r.path);return {garden_id:g,level_id:g?levelFromGarden(g):null,resource_type:r.type,resource_code:`ARCHIVE:${r.path}`,title:r.title,language:'en',file_path:r.path,content:{search:r.search||''},metadata:{source:'resource-archive.json'},published:true};});

const src=await fs.readFile('lib/resource-catalog.ts','utf8');
const curated=[];
const re=/\{title:'([^']+)',type:'([^']+)',level:(null|'([^']+)'),path:'([^']+)'\}/g;
for(const m of src.matchAll(re)) curated.push({garden_id:null,level_id:m[4]||null,resource_type:m[2],resource_code:`CURATED:${m[5]}`,title:m[1],language:'en',file_path:m[5],content:{},metadata:{source:'resource-catalog.ts'},published:true});

if(quizzes.length!==500) throw new Error(`Expected 500 AQ rows, got ${quizzes.length}`);
if(challenges.length!==500) throw new Error(`Expected 500 FSC rows, got ${challenges.length}`);
if(archiveRows.length!==402) throw new Error(`Expected 402 archive resources, got ${archiveRows.length}`);
if(curated.length!==17) throw new Error(`Expected 17 curated resources, got ${curated.length}`);

await upsert('growmeal_quizzes',quizzes,'code');
await upsert('growmeal_challenges',challenges,'code');
await upsert('growmeal_resources',[...archiveRows,...curated],'resource_code');

const result={quizzes:await count('growmeal_quizzes'),challenges:await count('growmeal_challenges'),resources:await count('growmeal_resources')};
console.log('SEED_COUNTS',JSON.stringify(result));
if(result.quizzes!==500||result.challenges!==500||result.resources!==419) throw new Error(`Verification failed: ${JSON.stringify(result)}`);
