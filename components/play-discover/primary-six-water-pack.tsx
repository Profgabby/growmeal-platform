'use client';
import {useState} from 'react';
type Task={question:string;options:[string,string,string];answer:number;explain:string};
const units:{title:string;icon:string;summary:string;tasks:Task[]}[]=[
{title:'Build a Water Budget',icon:'🧮',summary:'Track stored water, inflows, use and remaining supply.',tasks:[
{question:'A tank starts with 120 L. Rain adds 30 L and irrigation uses 45 L. How much remains?',options:['75 L','105 L','195 L'],answer:1,explain:'120 + 30 − 45 = 105 L.'},
{question:'A garden has 80 L available and uses 15 L daily. How much remains after 4 days?',options:['20 L','60 L','65 L'],answer:0,explain:'80 − (15 × 4) = 20 L.'},
{question:'Why record water entering and leaving a storage tank?',options:['To check the water balance','To change the tank colour','To stop rainfall'],answer:0,explain:'A water balance tracks inflows, outflows and changes in storage.'},
{question:'A tank stores 150 L and the garden needs 25 L per day. How many full days can it supply at that rate?',options:['5','6','8'],answer:1,explain:'150 ÷ 25 = 6 days, ignoring losses and other inflows.'},
{question:'A class uses 40 L of its 100 L supply. What percentage was used?',options:['25%','40%','60%'],answer:1,explain:'40 ÷ 100 × 100 = 40%.'}
]},
{title:'Compare Irrigation Methods',icon:'💧',summary:'Calculate relative water use and avoid unsupported claims.',tasks:[
{question:'Method A uses 50 L and Method B uses 35 L. How much less water does B use?',options:['15 L','35 L','85 L'],answer:0,explain:'50 − 35 = 15 L.'},
{question:'Using A = 50 L as the reference, what percentage less water does B = 35 L use?',options:['15%','30%','70%'],answer:1,explain:'(50 − 35) ÷ 50 × 100 = 30%.'},
{question:'What else should be checked before calling one method better?',options:['Crop growth and comparable conditions','Only the pipe colour','The day of the week'],answer:0,explain:'Water use alone does not show crop performance or fairness of comparison.'},
{question:'Two beds produce 8 kg each. Bed A uses 40 L and Bed B uses 32 L. Which has greater harvest per litre?',options:['Bed A','Bed B','They are equal'],answer:1,explain:'A: 8 ÷ 40 = 0.20 kg/L; B: 8 ÷ 32 = 0.25 kg/L.'},
{question:'Why is a repeated comparison more reliable than a single observation?',options:['It can reveal variation','It guarantees identical outcomes','It removes the need to record data'],answer:0,explain:'Repeated observations help reveal variability and uncertainty.'}
]},
{title:'Interpret Garden Data',icon:'📊',summary:'Read a weekly record and calculate trends.',tasks:[
{question:'In the example table, how many litres were used in Week 1?',options:['20 L','24 L','28 L'],answer:2,explain:'The example record lists 28 L for Week 1.'},
{question:'How much water was used across all three weeks?',options:['60 L','72 L','84 L'],answer:1,explain:'28 + 24 + 20 = 72 L.'},
{question:'How much less water was used in Week 3 than in Week 1?',options:['4 L','8 L','12 L'],answer:1,explain:'28 − 20 = 8 L.'},
{question:'What was the mean weekly water use?',options:['20 L','24 L','28 L'],answer:1,explain:'72 ÷ 3 = 24 L per week.'},
{question:'Can declining weekly water use alone prove that plants received enough water?',options:['No, crop and soil observations are needed','Yes, always','Only if the tank is blue'],answer:0,explain:'Lower input is not automatically sufficient or better.'}
]},
{title:'Plan for Dry Weather',icon:'☀️',summary:'Prioritise crop needs under a limited water supply.',tasks:[
{question:'A tank has 60 L and planned irrigation is 12 L daily. How many days of supply remain?',options:['4','5','6'],answer:1,explain:'60 ÷ 12 = 5 days.'},
{question:'Which action best supports careful watering during a dry spell?',options:['Check soil moisture and prioritise plant needs','Leave taps open','Water pathways instead of beds'],answer:0,explain:'Use observations to decide when and where water is needed.'},
{question:'A garden receives 15 L of collected rainwater and uses 9 L. What is the net change in stored water?',options:['Increase of 6 L','Decrease of 6 L','Increase of 24 L'],answer:0,explain:'15 − 9 = 6 L added, assuming no other losses.'},
{question:'Why can mulch sometimes help conserve soil water?',options:['It can reduce soil evaporation','It always creates rain','It replaces all irrigation'],answer:0,explain:'Suitable mulch can reduce evaporation from exposed soil.'},
{question:'What should students do if plants wilt despite wet soil?',options:['Report observations and investigate with the teacher','Always add more water','Ignore the plants'],answer:0,explain:'Wilting can have multiple causes, including waterlogging or root problems.'}
]},
{title:'Manage Soil and Crop Health',icon:'🌿',summary:'Connect irrigation with soil conditions and crop response.',tasks:[
{question:'Why is waterlogged soil potentially harmful to roots?',options:['It can limit oxygen','It increases sunlight','It removes gravity'],answer:0,explain:'Excess water can displace air needed for root respiration.'},
{question:'What should be kept similar when comparing irrigation treatments?',options:['Crop variety and soil conditions','Every possible treatment','Only garden labels'],answer:0,explain:'Comparable conditions help isolate the irrigation effect.'},
{question:'A seedling grows from 14 cm to 22 cm. What is its growth?',options:['6 cm','8 cm','36 cm'],answer:1,explain:'22 − 14 = 8 cm.'},
{question:'Which observation could help assess plant response to watering?',options:['Plant height and leaf condition','Shoe size','Fence paint colour'],answer:0,explain:'Growth and leaf condition provide useful plant observations.'},
{question:'What is the best way to report unexpected trial results?',options:['Record them accurately and discuss possible causes','Change them to match expectations','Delete all measurements'],answer:0,explain:'Scientific records must reflect observations.'}
]},
{title:'Make a Garden Management Plan',icon:'📝',summary:'Combine water availability, safety and evidence in decisions.',tasks:[
{question:'The tank has 90 L and three beds each need 20 L. How much remains after watering all three?',options:['30 L','60 L','70 L'],answer:0,explain:'90 − (3 × 20) = 30 L.'},
{question:'A pipe begins leaking near electrical equipment. What should students do?',options:['Keep clear and alert the teacher','Touch the electrical equipment','Continue using the system'],answer:0,explain:'Avoid the hazard and alert a responsible adult immediately.'},
{question:'Which set of records best supports a water-smart management decision?',options:['Water used, soil moisture, weather and plant growth','Only the garden name','Only the colour of the tank'],answer:0,explain:'Decisions benefit from water, soil, weather and crop observations.'},
{question:'A class wants to claim a new system saves water. What evidence is needed?',options:['Comparable measurements across methods','A colourful poster alone','A guess based on pipe length'],answer:0,explain:'Claims should be supported by measured, comparable data.'},
{question:'What should a good garden management plan include?',options:['Responsibilities, schedule, measurements and safety','Only a drawing','Only a list of student names'],answer:0,explain:'Plans should identify actions, monitoring and safe responsibilities.'}
]}
];
const style:React.CSSProperties={border:'1px solid #b6ceba',borderRadius:11,padding:'12px 16px',background:'white',color:'#17462e',minHeight:48,fontSize:16,cursor:'pointer'};
export default function PrimarySixWaterPack(){
const [unit,setUnit]=useState<number|null>(null),[step,setStep]=useState(0),[choice,setChoice]=useState<number|null>(null),[done,setDone]=useState<Record<string,boolean>>({}),[allocation,setAllocation]=useState([20,20,20]);
const navigate=(n:number|null)=>{setUnit(n);setStep(0);setChoice(null)};
const task=unit===null?null:units[unit].tasks[step];
const total=allocation.reduce((a,b)=>a+b,0);
return <section style={{border:'1px solid #d6e5d9',borderRadius:18,padding:'clamp(14px,3vw,28px)',background:'white',marginTop:16}}>
<strong style={{color:'#006B3C'}}>PRIMARY 6 · GM-P29 · WATER-SMART GARDEN</strong><h2>Water-Smart Garden Management Lab</h2>
{unit===null?<><p>Investigate how water, soil, crops and planning work together. Apply calculations to garden-management decisions using example records.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,230px),1fr))',gap:12}}>{units.map((m,i)=><button key={m.title} style={{...style,textAlign:'left',minHeight:135}} onClick={()=>navigate(i)}><div style={{fontSize:30}}>{m.icon}</div><strong>{m.title} →</strong><p style={{fontSize:14,marginBottom:0}}>{m.summary}</p></button>)}</div></>:<>
<nav aria-label="Primary 6 activity navigation" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:22}}><button style={style} onClick={()=>navigate(null)}>← All activities</button><strong>{units[unit].title} · {unit+1} of 6</strong><div style={{display:'flex',gap:8}}><button style={style} disabled={unit===0} onClick={()=>navigate(unit-1)}>← Previous</button><button style={{...style,background:'#006B3C',color:'white'}} onClick={()=>navigate(unit===5?null:unit+1)}>{unit===5?'Finish ✓':'Next →'}</button></div></nav>
<div style={{maxWidth:760,margin:'auto'}}><h3>{units[unit].icon} {units[unit].title}</h3><p>{units[unit].summary}</p>
{unit===0&&<div style={{background:'#eef7eb',borderRadius:12,padding:16,marginBottom:18}}><strong>Water budget</strong><p>Starting storage + inflow − outflow = ending storage</p><p>120 L + 30 L − 45 L = <strong>105 L</strong></p></div>}
{unit===2&&<div style={{background:'#eef7eb',borderRadius:12,padding:16,marginBottom:18}}><strong>Illustrative weekly irrigation record</strong><table style={{width:'100%',textAlign:'left'}}><thead><tr><th>Week</th><th>Water used</th></tr></thead><tbody>{[28,24,20].map((v,i)=><tr key={i}><td>{i+1}</td><td>{v} L</td></tr>)}</tbody></table></div>}
{unit===5&&<div style={{background:'#eef7eb',borderRadius:12,padding:16,marginBottom:18}}><strong>Try allocating a 90 L water supply</strong><p>Adjust the planned water for each of three beds. This is a budgeting exercise, not an irrigation recommendation.</p>{allocation.map((v,i)=><label key={i} style={{display:'block',margin:'12px 0'}}>Bed {i+1}: <strong>{v} L</strong><input type="range" min="0" max="50" step="5" value={v} onChange={e=>setAllocation(a=>a.map((x,j)=>j===i?Number(e.target.value):x))} style={{width:'100%',accentColor:'#006B3C'}}/></label>)}<p role="status">Allocated: <strong>{total} L</strong> · Remaining: <strong>{90-total} L</strong>{total>90?' · Over budget: revise your plan.':''}</p></div>}
<p style={{fontSize:20,lineHeight:1.6}}>{task?.question}</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,190px),1fr))',gap:10}}>{task?.options.map((option,i)=><button key={i} style={{...style,border:choice===i?'2px solid #006B3C':style.border}} onClick={()=>{setChoice(i);if(i===task.answer)setDone(s=>({...s,[unit+'-'+step]:true}))}}>{option}</button>)}</div>
{choice!==null&&<p role="status" style={{background:'#eef7e9',borderLeft:'4px solid #FDB515',padding:14,marginTop:18}}>{choice===task?.answer?'✓ Correct! ':'Try again. '}{task?.explain}</p>}
<div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginTop:22}}><button style={style} disabled={step===0} onClick={()=>{setStep(i=>i-1);setChoice(null)}}>← Previous question</button><button style={style} disabled={step===4} onClick={()=>{setStep(i=>i+1);setChoice(null)}}>Next question →</button><strong>{step+1} of 5</strong><span>Correct: {Array.from({length:5},(_,i)=>done[unit+'-'+i]).filter(Boolean).length}/5</span></div>
<details style={{marginTop:22}}><summary style={{cursor:'pointer',fontWeight:700}}>Teacher & parent guide / complete answer key</summary><p>All water-use figures are illustrative classroom exercises, not measured field data or universal irrigation requirements. Supervise any physical garden work, elevated tanks and electrical equipment.</p>{units[unit].tasks.map((q,i)=><p key={i}><strong>{i+1}.</strong> {q.explain}</p>)}</details>
</div></>}
</section>;
}
