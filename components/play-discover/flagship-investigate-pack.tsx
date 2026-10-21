'use client';
import {useState} from 'react';
import {flagshipSchoolGardens} from '@/lib/marketplace/flagship-school-gardens';

const byLevel={
 Nursery:{title:'Look, notice, tell',measure:'Picture observation',unit:'',question:'What did you notice about the plant today?',hint:'Ask a teacher to write what you saw. Do not invent a measurement.'},
 Primary:{title:'Measure and compare',measure:'Observed height',unit:'cm',question:'What changed between observations?',hint:'Measure from the soil surface to the same point on the plant each time. Record the date.'},
 JSS:{title:'Fair comparison log',measure:'Observed value',unit:'cm',question:'What was held the same between the comparison groups?',hint:'State what was measured, the units, and what conditions were kept comparable.'},
 SSS:{title:'Evidence and uncertainty log',measure:'Observed value',unit:'',question:'What instrument, unit, and reference check support your observation?',hint:'Use a consistent measurement protocol and document missing values; do not infer a causal effect from one reading.'}
} as const;
export default function FlagshipInvestigatePack({schoolClass,gardenId}:{schoolClass:string;gardenId:string}){
 const item=flagshipSchoolGardens.find(x=>x.schoolClass===schoolClass)?.experiences[3];
 const level=schoolClass.split(' ')[0] as keyof typeof byLevel;
 const plan=byLevel[level];
 const [date,setDate]=useState('');const [value,setValue]=useState('');const [note,setNote]=useState('');
 const [records,setRecords]=useState<{date:string;value:string;note:string}[]>([]);const [message,setMessage]=useState('');
 if(!plan||item?.gardenId!==gardenId)return null;
 const add=()=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||note.trim().length<10||(level!=='Nursery'&&(!value.trim()||!Number.isFinite(Number(value))||Number(value)<0))){setMessage('Enter a date, a meaningful observation, and a valid nonnegative measurement where required.');return;}
 if(records.some(r=>r.date===date)){setMessage('An observation already exists for this date. Choose another date or clear the log.');return;}
 setRecords(p=>[...p,{date,value:value.trim(),note:note.trim()}].sort((a,b)=>a.date.localeCompare(b.date)));setValue('');setNote('');setMessage('Observation recorded locally for this activity.');};
 const button:React.CSSProperties={border:'1px solid #8cae9b',borderRadius:9,padding:'10px 12px',background:'#fff',color:'#153b27',minHeight:44,cursor:'pointer'};
 return <section aria-label={schoolClass+' Investigate garden'} style={{background:'#f8fbf7',border:'1px solid #c8dccd',borderRadius:14,padding:'clamp(12px,3vw,24px)',marginTop:16}}>
 <p style={{color:'#006B3C',fontWeight:800}}>INVESTIGATE · FLAGSHIP 4 OF 5</p><h2>{plan.title}</h2><p><strong>Garden {gardenId}:</strong> {item.objective}</p><p>{plan.hint}</p>
 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,210px),1fr))',gap:12}}><label>Observation date<input aria-label="Observation date" type="date" value={date} onChange={e=>setDate(e.target.value)} style={{...button,display:'block',width:'100%',boxSizing:'border-box'}}/></label>
 {level!=='Nursery'&&<label>{plan.measure}{plan.unit?' ('+plan.unit+')':''}<input aria-label="Observed measurement" type="number" min="0" step="any" value={value} onChange={e=>setValue(e.target.value)} placeholder="Actual measurement only" style={{...button,display:'block',width:'100%',boxSizing:'border-box'}}/></label>}</div>
 <label style={{display:'block',marginTop:12}}>{plan.question}<textarea aria-label="Observation notes" rows={3} value={note} onChange={e=>setNote(e.target.value)} placeholder="Write only what you observed or measured" style={{...button,display:'block',width:'100%',boxSizing:'border-box',fontSize:16}}/></label>
 <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:12}}><button type="button" style={{...button,background:'#006B3C',color:'#fff'}} onClick={add}>Record observation</button><button type="button" style={button} onClick={()=>{setRecords([]);setDate('');setValue('');setNote('');setMessage('Observation log cleared.')}}>Clear observations</button></div>
 {message&&<p role="status">{message}</p>}
 <h3>Observation log ({records.length})</h3>{records.length===0?<p>No observations recorded yet. Record real observations on separate dates.</p>:<ol>{records.map(r=><li key={r.date} style={{marginBottom:10}}><strong>{r.date}</strong>{r.value?' · '+r.value+(plan.unit?' '+plan.unit:''):''} — {r.note}</li>)}</ol>}
 <p style={{fontSize:13,color:'#526459'}}>This log stays in the current browser activity and is not saved to a learner account. No sample readings are presented as field evidence. A teacher should review measurement quality and interpretations.</p>
 </section>;
}
