'use client';
import {useState} from 'react';
type Q={q:string;options:string[];answer:number;why:string};
const modules:{title:string;icon:string;intro:string;questions:Q[]}[]=[
{title:'Map the Experimental Grid',icon:'🗺️',intro:'Read rows and columns to identify precise plot locations.',questions:[
{q:'On a 4 × 4 grid, how many plots are there?',options:['8','12','16'],answer:2,why:'4 rows × 4 columns = 16 plots.'},
{q:'Which label identifies row 2, column 3?',options:['R2-C3','R3-C2','R2-C4'],answer:0,why:'R2-C3 means row 2 and column 3.'},
{q:'Which plot is directly below R1-C2?',options:['R2-C2','R1-C3','R3-C1'],answer:0,why:'Move down one row while keeping column 2.'},
{q:'How many plots are in one row of this grid?',options:['2','4','8'],answer:1,why:'Each row contains four plots.'},
{q:'Which plots are adjacent horizontally?',options:['R3-C1 and R3-C2','R1-C1 and R4-C4','R2-C1 and R3-C1'],answer:0,why:'They share the same row and neighbouring columns.'}
]},
{title:'Set Up a Fair Test',icon:'⚖️',intro:'Keep conditions consistent while changing one treatment.',questions:[
{q:'To test the effect of mulch, what should differ between the two otherwise similar plots?',options:['Mulch treatment','Crop type and soil and water','Every condition'],answer:0,why:'Change the mulch treatment while keeping other conditions as similar as possible.'},
{q:'Why should both plots have the same crop variety?',options:['To reduce a source of variation','To guarantee identical harvests','To remove the need for water'],answer:0,why:'Using the same variety makes the comparison fairer.'},
{q:'Which plot is a useful control for testing mulch?',options:['A similar plot without mulch','A plot with no plants and no soil','A plot with a different crop and irrigation'],answer:0,why:'A comparable unmulched plot provides a reference.'},
{q:'What should be recorded before the experiment starts?',options:['Starting conditions and treatment','Only the final harvest','A guess about results'],answer:0,why:'Record baseline conditions before applying treatments.'},
{q:'Why repeat the treatment on more than one plot when practical?',options:['To see whether results are consistent','To make measurements unnecessary','To change all variables'],answer:0,why:'Replication helps reveal variability.'}
]},
{title:'Measure Plant Performance',icon:'📏',intro:'Calculate changes in height and compare measured plants.',questions:[
{q:'Plant A grows from 12 cm to 19 cm. How much does it grow?',options:['7 cm','19 cm','31 cm'],answer:0,why:'19 − 12 = 7 cm.'},
{q:'Plant B grows from 10 cm to 16 cm. How much does it grow?',options:['26 cm','6 cm','10 cm'],answer:1,why:'16 − 10 = 6 cm.'},
{q:'Plant A grows 7 cm and Plant B grows 6 cm. Which grows more?',options:['Plant A by 1 cm','Plant B by 1 cm','They grow equally'],answer:0,why:'7 − 6 = 1 cm.'},
{q:'What unit is suitable for measuring seedling height?',options:['Centimetres','Litres','Kilograms'],answer:0,why:'Centimetres measure length.'},
{q:'What is the average of heights 12 cm, 15 cm and 18 cm?',options:['15 cm','18 cm','45 cm'],answer:0,why:'(12 + 15 + 18) ÷ 3 = 15 cm.'}
]},
{title:'Water and Soil Observations',icon:'💧',intro:'Interpret simple soil-moisture and water-use records.',questions:[
{q:'Plot A receives 4 L and Plot B receives 6 L. How much more does B receive?',options:['2 L','10 L','24 L'],answer:0,why:'6 − 4 = 2 L.'},
{q:'Which tool helps measure the amount of irrigation water?',options:['Marked measuring container','Ruler alone','Magnifying glass'],answer:0,why:'A graduated container can measure water volume.'},
{q:'What should be checked before watering an experimental plot?',options:['The agreed treatment and soil conditions','Only the colour of the bucket','The tallest child'],answer:0,why:'Follow the test plan and record relevant soil conditions.'},
{q:'Why should water applied to each plot be recorded?',options:['To interpret differences fairly','To change the crop name','To avoid all calculations'],answer:0,why:'Water input is important when comparing plot performance.'},
{q:'Two plots receive equal water but one remains wetter. What is the best response?',options:['Record the difference and investigate','Invent matching measurements','Assume both are identical'],answer:0,why:'Record observed differences and investigate possible causes.'}
]},
{title:'Read the Experiment Data',icon:'📊',intro:'Use a sample dataset to interpret treatment outcomes.',questions:[
{q:'The mulched plot has 18 leaves and the control has 14. What is the difference?',options:['4','14','32'],answer:0,why:'18 − 14 = 4 leaves.'},
{q:'Plot A has heights 12, 14 and 16 cm. What is their average?',options:['14 cm','16 cm','42 cm'],answer:0,why:'(12 + 14 + 16) ÷ 3 = 14 cm.'},
{q:'Plot B has heights 10, 12 and 14 cm. What is their average?',options:['10 cm','12 cm','14 cm'],answer:1,why:'(10 + 12 + 14) ÷ 3 = 12 cm.'},
{q:'Which plot has the higher mean height in this example?',options:['Plot A','Plot B','They are equal'],answer:0,why:'Plot A averages 14 cm; Plot B averages 12 cm.'},
{q:'Can this small example prove that mulch always improves plant growth?',options:['No, more evidence is needed','Yes, in every location','Yes, for every crop'],answer:0,why:'A small classroom example cannot establish a universal effect.'}
]},
{title:'Make an Evidence-Based Decision',icon:'🧠',intro:'Evaluate results, uncertainties and safe garden practices.',questions:[
{q:'One plant is damaged by an animal during the trial. What should the class do?',options:['Record the incident','Change its measurements','Hide the observation'],answer:0,why:'Unexpected events belong in the experiment record.'},
{q:'The two treatments have similar results. What is a fair conclusion?',options:['No clear difference was observed in this trial','One treatment must always be best','The experiment should be erased'],answer:0,why:'Conclusions should reflect the observed evidence.'},
{q:'Which statement is a measured result?',options:['Plot A produced 2.5 kg of vegetables','Plot A is magical','All plots will always produce the same yield'],answer:0,why:'Harvest mass is a measurable outcome.'},
{q:'What should students do with sharp or damaged garden equipment?',options:['Report it to the teacher','Use it without supervision','Leave it on the path'],answer:0,why:'Teachers should manage hazards and damaged equipment.'},
{q:'Why include the date on an observation sheet?',options:['To track changes over time','To change the results','To avoid naming plots'],answer:0,why:'Dates establish when each observation occurred.'}
]}
];
const btn:React.CSSProperties={padding:'12px 16px',border:'1px solid #b9cebf',borderRadius:11,background:'white',color:'#16442b',minHeight:48,fontSize:16,cursor:'pointer'};
export default function PrimaryFourGridPack(){
const [active,setActive]=useState<number|null>(null),[index,setIndex]=useState(0),[picked,setPicked]=useState<number|null>(null),[plot,setPlot]=useState<string|null>(null),[correct,setCorrect]=useState<Record<string,boolean>>({});
const change=(a:number|null)=>{setActive(a);setIndex(0);setPicked(null);setPlot(null)};
const question=active===null?null:modules[active].questions[index];
return <section style={{border:'1px solid #d6e5d9',borderRadius:18,background:'white',padding:'clamp(14px,3vw,28px)',marginTop:16}}>
<strong style={{color:'#006B3C'}}>PRIMARY 4 · GM-P23 · GRID EXPERIMENT GARDEN</strong><h2>Garden Experiment Explorer</h2>
{active===null?<><p>Use a plot grid, plan fair tests, measure growth and interpret evidence. Each investigation has its own screen and teacher answer key.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,225px),1fr))',gap:12}}>{modules.map((m,i)=><button key={m.title} style={{...btn,textAlign:'left',minHeight:128}} onClick={()=>change(i)}><span style={{fontSize:28}}>{m.icon}</span><div><strong>{m.title} →</strong></div><small>{m.intro}</small></button>)}</div></>:<>
<nav aria-label="Primary 4 navigation" style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',marginBottom:20}}><button style={btn} onClick={()=>change(null)}>← All activities</button><strong>{modules[active].title} · {active+1} of 6</strong><div style={{display:'flex',gap:8}}><button style={btn} disabled={active===0} onClick={()=>change(active-1)}>← Previous</button><button style={{...btn,background:'#006B3C',color:'white'}} onClick={()=>change(active===5?null:active+1)}>{active===5?'Finish ✓':'Next →'}</button></div></nav>
<div style={{maxWidth:760,margin:'auto'}}>
<h3>{modules[active].icon} {modules[active].title}</h3><p>{modules[active].intro}</p>
{active===0&&<><p>Select any plot to inspect its row and column.</p><div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:8,maxWidth:430,background:'#e8f2e3',padding:12,borderRadius:12}}>{Array.from({length:16},(_,i)=>{const label='R'+(Math.floor(i/4)+1)+'-C'+(i%4+1);return <button key={label} style={{...btn,background:plot===label?'#FDB515':'#fff',padding:8,fontSize:13}} onClick={()=>setPlot(label)}>🌱<div>{label}</div></button>})}</div>{plot&&<p role="status">Selected plot: <strong>{plot}</strong></p>}</>}
{active===4&&<div style={{background:'#eef6e9',padding:16,borderRadius:12,marginBottom:15}}><strong>Illustrative classroom measurements</strong><table style={{width:'100%',textAlign:'left'}}><thead><tr><th>Plant</th><th>Plot A (cm)</th><th>Plot B (cm)</th></tr></thead><tbody>{[[1,12,10],[2,14,12],[3,16,14]].map(([n,a,b])=><tr key={n}><td>{n}</td><td>{a}</td><td>{b}</td></tr>)}</tbody></table><p>Leaf counts: Mulched plot 18 · Control plot 14</p></div>}
<p style={{fontSize:20,lineHeight:1.6}}>{question?.q}</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,190px),1fr))',gap:10}}>{question?.options.map((option,i)=><button key={i} style={{...btn,border:picked===i?'2px solid #006B3C':btn.border}} onClick={()=>{setPicked(i);if(i===question.answer)setCorrect(v=>({...v,[active+'-'+index]:true}))}}>{option}</button>)}</div>
{picked!==null&&<p role="status" style={{padding:14,marginTop:16,background:'#eff7eb',borderLeft:'4px solid #FDB515'}}>{picked===question?.answer?'✓ Correct! ':'Try again. '}{question?.why}</p>}
<div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center',marginTop:24}}><button style={btn} disabled={index===0} onClick={()=>{setIndex(i=>i-1);setPicked(null)}}>← Previous question</button><button style={btn} disabled={index===4} onClick={()=>{setIndex(i=>i+1);setPicked(null)}}>Next question →</button><strong>{index+1} of 5</strong><span>Correct: {Array.from({length:5},(_,i)=>correct[active+'-'+i]).filter(Boolean).length}/5</span></div>
<details style={{marginTop:22}}><summary style={{cursor:'pointer',fontWeight:700}}>Teacher & parent guide / complete answer key</summary><p>Use the grid as an interactive representation. Example measurements are invented classroom exercises, not real trial data. Supervise any hands-on work and encourage students to explain the basis for each conclusion.</p>{modules[active].questions.map((q,i)=><p key={i}><strong>{i+1}.</strong> {q.why}</p>)}</details>
</div></>}
</section>;
}
