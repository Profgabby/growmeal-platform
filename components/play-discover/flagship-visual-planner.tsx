'use client';
import {useState} from 'react';

type Group='Nursery'|'Primary'|'JSS'|'SSS';
const schemes={
 Nursery:{heading:'Picture garden maker',intro:'Choose a picture, then tap a space to place it. Tell a teacher what you made.',items:[['🌱','Seedling'],['🍃','Leaf'],['💧','Water'],['☀️','Sun']],slots:['Space 1','Space 2','Space 3','Space 4']},
 Primary:{heading:'Garden layout planner',intro:'Place beds, a clear access path and a water point. This is a schematic, not a construction drawing.',items:[['🪴','Bed'],['🚶','Path'],['💧','Water point'],['🌿','Crop']],slots:['Northwest','Northeast','Southwest','Southeast']},
 JSS:{heading:'Experimental plot designer',intro:'Assign control and treatment plots, then identify how you will record a fair comparison.',items:[['C','Control'],['T','Treatment'],['M','Measurement'],['P','Access path']],slots:['Plot A','Plot B','Plot C','Plot D']},
 SSS:{heading:'System and monitoring schematic',intro:'Allocate measurement and infrastructure elements. Real installations require qualified review.',items:[['S','Sensor'],['R','Reference'],['D','Data log'],['W','Water system']],slots:['Zone A','Zone B','Zone C','Zone D']}
} as const;
export default function FlagshipVisualPlanner({schoolClass}:{schoolClass:string}){
 const group=schoolClass.split(' ')[0] as Group;
 const plan=schemes[group];
 const [selected,setSelected]=useState<string>('');
 const [placed,setPlaced]=useState<Record<number,string>>({});
 const [review,setReview]=useState(false);
 const [observation,setObservation]=useState('');
 if(!plan)return null;
 const all=plan.items.map(x=>x[1]);
 const values=Object.values(placed);
 const complete=values.length===4&&all.every(x=>values.includes(x));
 const explanation=observation.trim().length>=12;
 const isNursery=group==='Nursery';
 const guidance=group==='Nursery'?'Point to your pictures and tell a teacher what plants need.':group==='Primary'?'Explain how people reach the bed and where water reaches crops. A path is not a planting bed.':group==='JSS'?'Explain which plots are control and treatment, what is measured, and how other conditions remain comparable.': 'Explain sensor location, independent reference checks, logging and safe separation of water from electrical components.';
 const btn:React.CSSProperties={padding:'12px',border:'1px solid #92b3a1',borderRadius:10,background:'#fff',color:'#143b27',cursor:'pointer',minHeight:54};
 return <section aria-label={group+' visual garden planner'} style={{background:'#fff',border:'1px solid #d0dfd5',borderRadius:14,padding:'clamp(12px,3vw,20px)',marginTop:20}}>
 <h3>{plan.heading}</h3><p>{plan.intro}</p><p><strong>Choose an element</strong></p>
 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,125px),1fr))',gap:8}}>{plan.items.map(([symbol,name])=><button type="button" key={name} aria-pressed={selected===name} onClick={()=>{setSelected(name);setReview(false)}} style={{...btn,background:selected===name?'#e4f1e8':'#fff',borderWidth:selected===name?3:1}}><span aria-hidden="true" style={{fontSize:24,display:'block'}}>{symbol}</span>{name}</button>)}</div>
 <p><strong>Place it on your plan</strong></p><div role="group" aria-label="Editable garden layout" style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:10,maxWidth:530}}>{plan.slots.map((slot,i)=><button type="button" key={slot} aria-label={slot+': '+(placed[i]||'empty')} onClick={()=>{if(selected){setPlaced(p=>({...p,[i]:selected}));setReview(false)}}} style={{...btn,minHeight:115,background:placed[i]?'#eaf4eb':'#f5f7f3',borderStyle:'dashed'}}><span style={{fontSize:12,display:'block',marginBottom:8}}>{slot}</span><strong>{placed[i]||'Tap to place'}</strong></button>)}</div>
 <label style={{display:'block',marginTop:16,fontWeight:700}}>{isNursery?'Teacher or learner observation':'Explain your design choice'}<textarea aria-label="Design explanation" value={observation} onChange={e=>{setObservation(e.target.value);setReview(false)}} placeholder={guidance} rows={3} style={{display:'block',marginTop:8,width:'100%',boxSizing:'border-box',border:'1px solid #92b3a1',borderRadius:8,padding:10,fontSize:16}}/></label>
 <div style={{display:'flex',flexWrap:'wrap',gap:8,marginTop:12}}><button type="button" style={btn} onClick={()=>{setPlaced({});setSelected('');setObservation('');setReview(false)}}>Clear layout</button><button type="button" style={{...btn,background:'#006B3C',color:'#fff'}} onClick={()=>setReview(true)}>Review layout</button></div>
 {review&&<p role="status" style={{background:'#f6f8ee',borderLeft:'4px solid #FDB515',padding:12}}>{!complete?'Place each of the four different elements once to complete this introductory layout.':!explanation?'Add a short explanation or teacher observation (at least 12 characters) before review.': 'Your introductory layout contains all four elements and a recorded explanation. A teacher must still assess placement, scientific reasoning, spacing, safety and feasibility; this is not an approved construction design.'}</p>}
 </section>
}
