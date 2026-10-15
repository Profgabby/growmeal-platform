'use client';
import {useState} from 'react';
type Question={prompt:string;choices:string[];correct:number;explanation:string};
const green='#006B3C',gold='#FDB515';
const button:React.CSSProperties={border:'1px solid #b9cfbe',borderRadius:12,padding:'12px 16px',background:'white',color:'#16442c',fontSize:16,minHeight:48,cursor:'pointer'};
const units=[
{title:'Design a Raised Bed',icon:'📐',intro:'Choose dimensions, calculate space and keep safe walking paths.',questions:[
{prompt:'A rectangular raised bed is 3 m long and 2 m wide. What is its area?',choices:['5 m²','6 m²','10 m²'],correct:1,explanation:'Area = length × width = 3 × 2 = 6 m².'},
{prompt:'A bed is 4 m long and 1 m wide. What is the distance around it (perimeter)?',choices:['5 m','8 m','10 m'],correct:2,explanation:'Perimeter = 2 × (4 + 1) = 10 m.'},
{prompt:'Why leave a clear path between raised beds?',choices:['To allow safe access without stepping on crops','To block all sunlight','To waste garden space'],correct:0,explanation:'Paths provide safe access and reduce trampling and soil compaction.'},
{prompt:'A bed has 4 rows with 5 planting positions per row. How many positions are available?',choices:['9','20','25'],correct:1,explanation:'4 × 5 = 20 planting positions.'},
{prompt:'Which design helps prevent standing water around roots?',choices:['A bed with appropriate drainage','A sealed bed filled to the top with water','A bed covered with plastic underneath and no outlet'],correct:0,explanation:'Appropriate drainage helps maintain air in the root zone.'},
{prompt:'A bed is 2 m long and 1 m wide. What is its area?',choices:['2 m²','3 m²','6 m²'],correct:0,explanation:'2 × 1 = 2 m².'}
]},
{title:'Know Your Soil',icon:'🪱',intro:'Investigate soil texture, compost and healthy roots.',questions:[
{prompt:'Which soil property describes the relative amounts of sand, silt and clay?',choices:['Texture','Colour of a bucket','Height of a fence'],correct:0,explanation:'Soil texture refers to the proportions of sand, silt and clay.'},
{prompt:'Why can mature compost be useful in a garden bed?',choices:['It may improve soil structure and nutrient supply','It replaces sunlight','It makes all plants grow at the same speed'],correct:0,explanation:'Well-made compost can improve soil structure and contribute nutrients.'},
{prompt:'Why do plant roots need air in the soil?',choices:['For respiration','To make the soil disappear','To turn leaves blue'],correct:0,explanation:'Roots use oxygen for respiration.'},
{prompt:'What may happen when a bed remains waterlogged?',choices:['Roots may lack oxygen','All roots immediately become longer','Soil no longer contains water'],correct:0,explanation:'Waterlogging can restrict oxygen availability around roots.'},
{prompt:'What is a fair way to compare two soil mixtures?',choices:['Use similar plants and watering conditions','Change everything at once','Measure only the pot colour'],correct:0,explanation:'Control other factors to make the comparison meaningful.'},
{prompt:'Which observation can be recorded during a soil test?',choices:['How quickly water drains','A guess about next year’s weather','The colour of a pupil’s shoes'],correct:0,explanation:'Drainage time is an observable property.'}
]},
{title:'Plan the Planting',icon:'🌱',intro:'Use spacing, germination and planting records.',questions:[
{prompt:'You plant 3 rows of 6 seeds. How many seeds do you plant?',choices:['9','18','36'],correct:1,explanation:'3 × 6 = 18 seeds.'},
{prompt:'Of 20 planted seeds, 15 germinate. How many do not germinate?',choices:['5','15','35'],correct:0,explanation:'20 − 15 = 5 seeds.'},
{prompt:'Why should seeds be planted at a suitable depth?',choices:['To support emergence and establishment','To keep all seeds in darkness forever','To prevent roots from growing'],correct:0,explanation:'Planting depth affects seedling emergence.'},
{prompt:'What information belongs in a planting record?',choices:['Crop, date and number planted','Only the teacher’s favourite colour','Nothing until harvest'],correct:0,explanation:'Record crop, date and planting quantity.'},
{prompt:'A class has 24 seedlings for 4 equal rows. How many seedlings per row?',choices:['4','6','8'],correct:1,explanation:'24 ÷ 4 = 6.'},
{prompt:'Why should plants have suitable spacing?',choices:['To reduce overcrowding and competition','To stop them needing light','To remove all insects'],correct:0,explanation:'Spacing helps plants access light, water and nutrients.'}
]},
{title:'Water the Bed Wisely',icon:'💧',intro:'Read moisture observations and calculate irrigation amounts.',questions:[
{prompt:'A class uses 2 L of water on each of 3 beds. What is the total?',choices:['5 L','6 L','8 L'],correct:1,explanation:'2 × 3 = 6 L.'},
{prompt:'What should you check before deciding to irrigate?',choices:['Soil moisture and plant needs','Only the day of the week','The colour of a watering can'],correct:0,explanation:'Check moisture and crop needs rather than watering automatically.'},
{prompt:'A 10 L can contains 7 L. How much more water would fill it?',choices:['3 L','7 L','17 L'],correct:0,explanation:'10 − 7 = 3 L.'},
{prompt:'Why is a gentle watering method useful for young seedlings?',choices:['It can reduce soil disturbance','It removes every nutrient','It makes seeds grow without water'],correct:0,explanation:'Gentle watering helps avoid washing seeds or soil away.'},
{prompt:'What is one possible sign that a bed is too wet?',choices:['Standing water and persistently saturated soil','A clear path','A labelled seed tray'],correct:0,explanation:'Standing water may indicate poor drainage or excess irrigation.'},
{prompt:'A bed receives 4 L on Monday and 3 L on Wednesday. How much in total?',choices:['1 L','7 L','12 L'],correct:1,explanation:'4 + 3 = 7 L.'}
]},
{title:'Record Plant Growth',icon:'📊',intro:'Read measurements, compare results and draw conclusions.',questions:[
{prompt:'A plant grows from 8 cm to 14 cm. What is the increase?',choices:['6 cm','8 cm','22 cm'],correct:0,explanation:'14 − 8 = 6 cm.'},
{prompt:'Two seedlings are 12 cm and 16 cm tall. What is their height difference?',choices:['4 cm','12 cm','28 cm'],correct:0,explanation:'16 − 12 = 4 cm.'},
{prompt:'Why should you measure plants on several dates?',choices:['To observe changes over time','To avoid keeping records','To change the plant type'],correct:0,explanation:'Repeated measurements show growth trends.'},
{prompt:'Plant A grows 5 cm and Plant B grows 3 cm. Which grows more during the period?',choices:['Plant A','Plant B','Both equally'],correct:0,explanation:'5 cm is greater than 3 cm.'},
{prompt:'Which is a useful measurement tool for seedling height?',choices:['Ruler','Sieve','Broom'],correct:0,explanation:'Use a ruler and record centimetres.'},
{prompt:'A class records 5, 7 and 9 leaves on three plants. What is the total?',choices:['19','21','23'],correct:1,explanation:'5 + 7 + 9 = 21 leaves.'}
]},
{title:'Solve Garden Challenges',icon:'🧠',intro:'Make safe, evidence-based decisions about common garden problems.',questions:[
{prompt:'Several leaves have holes. What should students do first?',choices:['Observe and report to the teacher','Apply an unknown pesticide','Destroy every plant'],correct:0,explanation:'Observe symptoms and ask a supervising adult to assess the cause.'},
{prompt:'A raised bed has standing water after irrigation. What should be checked?',choices:['Drainage and watering practices','The school bell','The colour of the fence'],correct:0,explanation:'Review drainage and irrigation before taking corrective action.'},
{prompt:'A plant is wilting. What is the best first step?',choices:['Check soil moisture and growing conditions','Always add more water without checking','Cut all the roots'],correct:0,explanation:'Wilting has several possible causes, so check conditions first.'},
{prompt:'A student finds broken glass near the bed. What should happen?',choices:['Tell the teacher and keep others away','Pick it up with bare hands','Bury it in the bed'],correct:0,explanation:'Report hazards and let a responsible adult arrange safe removal.'},
{prompt:'Two beds show different growth. How should the class investigate?',choices:['Compare measurements and conditions','Assume the taller plants are always healthier','Ignore all observations'],correct:0,explanation:'Use measurements and observations to investigate differences.'},
{prompt:'At the end of a lesson, what is good practice?',choices:['Clean and store tools safely and record findings','Leave tools across paths','Leave water running'],correct:0,explanation:'Safe cleanup and recordkeeping are part of garden management.'}
]}
] satisfies {title:string;icon:string;intro:string;questions:Question[]}[];
export default function PrimaryThreeGardenPack(){
const [unit,setUnit]=useState<number|null>(null),[question,setQuestion]=useState(0),[choice,setChoice]=useState<number|null>(null),[completed,setCompleted]=useState<Record<string,boolean>>({});
const open=(n:number|null)=>{setUnit(n);setQuestion(0);setChoice(null)};
const current=unit===null?null:units[unit].questions[question];
const answered=choice!==null&&current!==null;
const correct=answered&&choice===current.correct;
return <section style={{border:'1px solid #d6e5d9',borderRadius:18,background:'white',padding:'clamp(14px,3vw,28px)',marginTop:16}}>
<strong style={{color:green}}>PRIMARY 3 · GM-P21 · RAISED FOOD GARDEN</strong><h2>Raised-Bed Garden Explorer</h2>
{unit===null?<><p>Plan a raised bed, investigate soil and water, plant responsibly, measure growth and solve garden problems. Choose one investigation.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,235px),1fr))',gap:12}}>{units.map((u,i)=><button key={u.title} onClick={()=>open(i)} style={{...button,textAlign:'left',minHeight:135}}><div style={{fontSize:32}}>{u.icon}</div><strong>{u.title} →</strong><p style={{fontSize:14,marginBottom:0}}>{u.intro}</p></button>)}</div></>:<>
<nav aria-label="Primary 3 activity navigation" style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',marginBottom:24}}><button style={button} onClick={()=>open(null)}>← All activities</button><strong>{units[unit].title} · {unit+1} of 6</strong><div style={{display:'flex',gap:8}}><button style={button} disabled={unit===0} onClick={()=>open(unit-1)}>← Previous</button><button style={{...button,background:green,color:'white'}} onClick={()=>open(unit===5?null:unit+1)}>{unit===5?'Finish ✓':'Next →'}</button></div></nav>
<div style={{maxWidth:740,margin:'0 auto'}}>
<h3>{units[unit].icon} {units[unit].title}</h3><p>{units[unit].intro}</p>
{unit===0&&<div style={{background:'#edf6e9',padding:16,borderRadius:12,marginBottom:20}}><div style={{border:'8px solid #9b724c',background:'#684d35',maxWidth:310,height:130,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,padding:12}}>{Array.from({length:8},(_,i)=><span key={i} style={{textAlign:'center',fontSize:25}}>🌱</span>)}</div><small>Illustrative raised-bed plan, not drawn to scale</small></div>}
{unit===2&&<div style={{background:'#edf6e9',padding:16,borderRadius:12,marginBottom:20}}><strong>Planting record example</strong><p>Crop: Okra · Date: 15 October · Seeds planted: 18</p></div>}
{unit===4&&<div style={{background:'#edf6e9',padding:16,borderRadius:12,marginBottom:20}}><strong>Growth observation example</strong><table style={{width:'100%',textAlign:'left'}}><thead><tr><th>Week</th><th>Plant A</th><th>Plant B</th></tr></thead><tbody>{[[1,8,9],[2,11,12],[3,14,16]].map(([w,a,b])=><tr key={w}><td>{w}</td><td>{a} cm</td><td>{b} cm</td></tr>)}</tbody></table></div>}
<p style={{fontSize:20,lineHeight:1.6}}>{current?.prompt}</p>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,190px),1fr))',gap:10}}>{current?.choices.map((c,i)=><button key={i} style={{...button,border:choice===i?'2px solid '+green:'1px solid #b9cfbe'}} onClick={()=>{setChoice(i);if(i===current.correct)setCompleted(prev=>({...prev,[unit+'-'+question]:true}))}}>{c}</button>)}</div>
{answered&&<p role="status" style={{padding:14,background:'#edf7e9',borderLeft:'4px solid '+gold,marginTop:18}}>{correct?'✓ Correct! ':'Not quite. '}{current?.explanation}</p>}
<div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginTop:22}}><button style={button} disabled={question===0} onClick={()=>{setQuestion(i=>i-1);setChoice(null)}}>← Previous question</button><button style={button} disabled={question===5} onClick={()=>{setQuestion(i=>i+1);setChoice(null)}}>Next question →</button><strong>{question+1} of 6</strong><span>Correct: {Array.from({length:6},(_,i)=>completed[unit+'-'+i]).filter(Boolean).length}/6</span></div>
<details style={{marginTop:24}}><summary style={{cursor:'pointer',fontWeight:700}}>Teacher & parent guide / complete answer key</summary><p>Use the illustrated bed and sample records to support discussion. These figures are illustrative, not measurements from an actual school installation. Supervise garden tools and all physical investigations.</p>{units[unit].questions.map((q,i)=><p key={i}><strong>{i+1}.</strong> {q.explanation}</p>)}</details>
</div></>}
</section>;
}
