'use client';
import {useState} from 'react';
type Q={question:string;answers:[string,string,string];correct:0|1|2;explain:string};
const modules:{title:string;icon:string;description:string;questions:Q[]}[]=[
{title:'Trace the Water Path',icon:'🚰',description:'Understand how a raised water container supplies drip irrigation.',questions:[
{question:'Which sequence best describes a simple gravity-drip system?',answers:['Tank → pipe → drippers → soil','Soil → sun → tank → leaves','Drippers → sky → tank → soil'],correct:0,explain:'Water moves from an elevated tank through a pipe and drippers to the root zone.'},
{question:'What provides the pressure in a gravity-fed system?',answers:['The colour of the tank','The vertical water-level difference','The number of leaves'],correct:1,explain:'A height difference creates hydrostatic pressure.'},
{question:'Why should a water tank be secured on a stable support?',answers:['To prevent tipping and injury','To change the water into soil','To stop evaporation completely'],correct:0,explain:'Stable supports reduce the risk of a falling tank.'},
{question:'What is the purpose of a drip emitter?',answers:['To deliver water slowly near plants','To make seeds larger','To collect sunlight'],correct:0,explain:'Emitters release water at controlled locations near plant roots.'},
{question:'Why might a filter be fitted before drip tubing?',answers:['To reduce particles that clog emitters','To make the tank taller','To increase soil salt'],correct:0,explain:'Filtering helps keep particles from blocking small openings.'}
]},
{title:'Explore Water Pressure',icon:'📐',description:'Relate water height to pressure using safe classroom examples.',questions:[
{question:'Two identical tanks have water surfaces 1 m and 2 m above an outlet. Which has greater hydrostatic pressure at the outlet?',answers:['1 m tank','2 m tank','Both must be equal'],correct:1,explain:'Pressure increases with the height of water above the outlet.'},
{question:'If the vertical water head doubles, what happens to ideal hydrostatic pressure?',answers:['It halves','It stays the same','It doubles'],correct:2,explain:'Hydrostatic pressure is proportional to head: p = ρgh.'},
{question:'Which unit measures pressure?',answers:['Pascal (Pa)','Litre (L)','Metre (m)'],correct:0,explain:'Pressure is measured in pascals.'},
{question:'What happens to the water head as a tank drains if the outlet height stays fixed?',answers:['It decreases','It always increases','It becomes negative immediately'],correct:0,explain:'As the water surface falls, the height difference decreases.'},
{question:'Why can two identical drippers have different flows along a long pipe?',answers:['Pressure may vary along the pipe','They must always have identical flow','The soil changes their colour'],correct:0,explain:'Pressure losses and elevation differences can affect emitter flow.'}
]},
{title:'Measure Drip Flow',icon:'⏱️',description:'Calculate flow rate from collected volume and elapsed time.',questions:[
{question:'An emitter releases 200 mL in 10 minutes. What is its average flow rate?',answers:['10 mL/min','20 mL/min','2000 mL/min'],correct:1,explain:'200 ÷ 10 = 20 mL/min.'},
{question:'A dripper supplies 1 litre in 30 minutes. How much in 60 minutes at the same rate?',answers:['1 L','2 L','3 L'],correct:1,explain:'At a constant rate, doubling time doubles volume to 2 L.'},
{question:'Four emitters each deliver 0.5 L per hour. What is the combined rate?',answers:['2 L/h','4 L/h','0.5 L/h'],correct:0,explain:'4 × 0.5 = 2 L/h.'},
{question:'A tank loses 6 L over 3 hours through a system. What is the average delivery rate?',answers:['2 L/h','3 L/h','18 L/h'],correct:0,explain:'6 ÷ 3 = 2 L/h, assuming the loss is through the system.'},
{question:'Which tools can measure an emitter’s average flow?',answers:['A marked container and a timer','A ruler alone','A thermometer alone'],correct:0,explain:'Measure the collected volume and divide by elapsed time.'}
]},
{title:'Plan an Irrigation Schedule',icon:'🗓️',description:'Use soil observations and water quantities to plan irrigation.',questions:[
{question:'A bed needs 8 L during a planned irrigation. Four emitters together deliver 4 L/h. How long should they run at that rate?',answers:['1 hour','2 hours','4 hours'],correct:1,explain:'8 L ÷ 4 L/h = 2 hours.'},
{question:'What should students check before deciding to irrigate?',answers:['Soil moisture and crop needs','Only the clock','The colour of the tank'],correct:0,explain:'Irrigation decisions should consider moisture, weather and plant needs.'},
{question:'A 20 L tank contains 12 L. How much more water can it hold?',answers:['8 L','12 L','32 L'],correct:0,explain:'20 − 12 = 8 L.'},
{question:'A bed receives 3 L each day for 4 days. How much total?',answers:['7 L','12 L','16 L'],correct:1,explain:'3 × 4 = 12 L.'},
{question:'Why is watering the same amount every day not always best?',answers:['Plant and weather conditions change','All plants use exactly the same water','Soil never stores water'],correct:0,explain:'Demand and available soil water vary with conditions.'}
]},
{title:'Find and Fix Water Problems',icon:'🔧',description:'Diagnose blockages, leaks and uneven irrigation safely.',questions:[
{question:'One emitter stops dripping while others work. What is a sensible first check?',answers:['Look for a blockage with teacher supervision','Increase pressure without limits','Break the tank'],correct:0,explain:'A blocked emitter or line is a possible cause.'},
{question:'Water is leaking from a pipe connection. What should students do?',answers:['Tell the teacher and isolate the flow safely','Ignore it forever','Touch electrical equipment nearby'],correct:0,explain:'Leaks should be reported and the system made safe before repair.'},
{question:'Why measure output from several emitters?',answers:['To assess how evenly water is delivered','To count the leaves','To change the crop species'],correct:0,explain:'Comparing emitter volumes reveals uneven distribution.'},
{question:'Which action helps prevent dripper clogging?',answers:['Use clean water and suitable filtration','Add soil to the pipe','Leave the pipe open to dirt'],correct:0,explain:'Particles can block emitters; filtration and maintenance help.'},
{question:'A tank support appears unstable. What is the safest action?',answers:['Stop use and alert an adult','Climb on it','Add more water immediately'],correct:0,explain:'An unstable elevated water container is a safety hazard.'}
]},
{title:'Compare Water-Saving Results',icon:'📊',description:'Interpret illustrative records and evaluate claims.',questions:[
{question:'Bed A used 18 L and Bed B used 12 L. What is the difference?',answers:['6 L','12 L','30 L'],correct:0,explain:'18 − 12 = 6 L.'},
{question:'If Bed A used 20 L and Bed B used 15 L, what percentage less did B use relative to A?',answers:['5%','25%','75%'],correct:1,explain:'(20 − 15) ÷ 20 × 100 = 25%.'},
{question:'Why should two irrigation methods be tested on comparable beds?',answers:['To reduce other causes of differences','To guarantee a winner','To avoid measurements'],correct:0,explain:'Comparable crops, soil and conditions make results easier to interpret.'},
{question:'Two beds use different water volumes but produce equal harvest masses. What should be compared?',answers:['Water used per unit of harvest','Only the bed colours','The number of school bells'],correct:0,explain:'Water productivity compares harvest output with water input.'},
{question:'Can a small classroom test prove drip irrigation always saves the same amount everywhere?',answers:['No; results depend on conditions','Yes; every garden is identical','Yes; measurement is unnecessary'],correct:0,explain:'Conclusions must be limited to the conditions and evidence of the test.'}
]}
];
const btn:React.CSSProperties={border:'1px solid #b6ccba',borderRadius:11,padding:'12px 16px',background:'white',color:'#17452d',minHeight:48,fontSize:16,cursor:'pointer'};
export default function PrimaryFiveDripPack(){
const [module,setModule]=useState<number|null>(null),[index,setIndex]=useState(0),[answer,setAnswer]=useState<number|null>(null),[passed,setPassed]=useState<Record<string,boolean>>({});
const navigate=(n:number|null)=>{setModule(n);setIndex(0);setAnswer(null)};
const q=module===null?null:modules[module].questions[index];
return <section style={{border:'1px solid #d5e5d9',borderRadius:18,padding:'clamp(14px,3vw,28px)',background:'white',marginTop:16}}>
<strong style={{color:'#006B3C'}}>PRIMARY 5 · GM-P26 · GRAVITY DRIP GARDEN</strong><h2>Water Engineering Discovery Lab</h2>
{module===null?<><p>Explore a gravity-fed drip system, measure water flow and make evidence-based irrigation decisions. Choose one activity.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,230px),1fr))',gap:12}}>{modules.map((m,i)=><button key={m.title} style={{...btn,textAlign:'left',minHeight:135}} onClick={()=>navigate(i)}><div style={{fontSize:30}}>{m.icon}</div><strong>{m.title} →</strong><p style={{fontSize:14,marginBottom:0}}>{m.description}</p></button>)}</div></>:<>
<nav aria-label="Primary 5 activity navigation" style={{display:'flex',flexWrap:'wrap',gap:10,alignItems:'center',justifyContent:'space-between',marginBottom:22}}><button style={btn} onClick={()=>navigate(null)}>← All activities</button><strong>{modules[module].title} · {module+1} of 6</strong><div style={{display:'flex',gap:8}}><button style={btn} disabled={module===0} onClick={()=>navigate(module-1)}>← Previous</button><button style={{...btn,background:'#006B3C',color:'white'}} onClick={()=>navigate(module===5?null:module+1)}>{module===5?'Finish ✓':'Next →'}</button></div></nav>
<div style={{maxWidth:760,margin:'auto'}}><h3>{modules[module].icon} {modules[module].title}</h3><p>{modules[module].description}</p>
{module===0&&<div aria-label="Gravity drip schematic" style={{background:'#eff7ed',padding:18,borderRadius:12,marginBottom:18}}><div style={{fontSize:27}}>🛢️ <span aria-hidden="true">↓</span> 🚰 <span aria-hidden="true">→</span> 💧 <span aria-hidden="true">↓</span> 🌱</div><p>Elevated water tank → pipe → drip emitter → plant root zone</p><small>Conceptual diagram; actual installation requires secure support and adult supervision.</small></div>}
{module===2&&<div style={{background:'#eff7ed',padding:18,borderRadius:12,marginBottom:18}}><strong>Flow-rate formula</strong><p>Average flow rate = collected water volume ÷ collection time</p><p>Example: 200 mL ÷ 10 min = 20 mL/min</p></div>}
{module===5&&<div style={{background:'#eff7ed',padding:18,borderRadius:12,marginBottom:18}}><strong>Illustrative irrigation record</strong><table style={{width:'100%',textAlign:'left'}}><thead><tr><th>Bed</th><th>Water applied</th></tr></thead><tbody><tr><td>A</td><td>18 L</td></tr><tr><td>B</td><td>12 L</td></tr></tbody></table></div>}
<p style={{fontSize:20,lineHeight:1.6}}>{q?.question}</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,195px),1fr))',gap:10}}>{q?.answers.map((choice,i)=><button key={i} style={{...btn,border:answer===i?'2px solid #006B3C':btn.border}} onClick={()=>{setAnswer(i);if(i===q.correct)setPassed(p=>({...p,[module+'-'+index]:true}))}}>{choice}</button>)}</div>
{answer!==null&&<p role="status" style={{padding:14,marginTop:18,background:'#eef7e9',borderLeft:'4px solid #FDB515'}}>{answer===q?.correct?'✓ Correct! ':'Try again. '}{q?.explain}</p>}
<div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginTop:24}}><button style={btn} disabled={index===0} onClick={()=>{setIndex(i=>i-1);setAnswer(null)}}>← Previous question</button><button style={btn} disabled={index===4} onClick={()=>{setIndex(i=>i+1);setAnswer(null)}}>Next question →</button><strong>{index+1} of 5</strong><span>Correct: {Array.from({length:5},(_,i)=>passed[module+'-'+i]).filter(Boolean).length}/5</span></div>
<details style={{marginTop:22}}><summary style={{fontWeight:700,cursor:'pointer'}}>Teacher & parent guide / complete answer key</summary><p>All volumes, rates and example comparisons are illustrative educational scenarios. Do not let children construct or adjust elevated tanks, pressurized components or electrical systems without qualified adult supervision.</p>{modules[module].questions.map((item,i)=><p key={i}><strong>{i+1}.</strong> {item.explain}</p>)}</details>
</div></>}
</section>;
}
