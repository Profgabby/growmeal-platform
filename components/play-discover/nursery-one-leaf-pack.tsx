'use client';
import {useState} from 'react';
type Task={title:string;instruction:string;options:string[];answer:number;feedback:string};
const tasks:Task[]=[
{title:'Find the leaf',instruction:'Which picture shows a leaf?',options:['🍃 Leaf','🪨 Stone','💧 Water'],answer:0,feedback:'A leaf is a part of a plant. Many leaves are green.'},
{title:'Look at colours',instruction:'What colour is this leaf? 🍃',options:['Green','Purple','Black'],answer:0,feedback:'This picture shows a green leaf. Real leaves can have other colours too.'},
{title:'Count the leaves',instruction:'How many leaves can you see? 🍃 🍃 🍃',options:['Two','Three','Five'],answer:1,feedback:'One, two, three! There are three leaves.'},
{title:'Find the big leaf',instruction:'Which leaf is bigger in this picture?',options:['🍃 Small leaf','🌿 Bigger leafy sprig'],answer:1,feedback:'The second picture shows more leaf growth. Compare real leaves with your teacher.'},
{title:'Match a plant part',instruction:'Which plant part usually grows from the stem and catches sunlight?',options:['Leaf','Stone','Bucket'],answer:0,feedback:'Leaves often capture sunlight to help plants make food.'},
{title:'Care for our leaves',instruction:'What should we do when looking at leaves in our garden?',options:['Pull every leaf off','Look gently with a teacher','Taste unknown leaves'],answer:1,feedback:'Observe gently. Never taste unknown leaves, and ask a teacher before touching plants.'}
];
const button:React.CSSProperties={border:'1px solid #bfd4c2',borderRadius:12,padding:'13px 16px',background:'white',color:'#17452a',minHeight:48,fontSize:17,cursor:'pointer'};
export default function NurseryOneLeafPack(){
const [index,setIndex]=useState(0),[choice,setChoice]=useState<number|null>(null),[done,setDone]=useState<Record<number,boolean>>({}),[collected,setCollected]=useState<string[]>([]),[showGuide,setShowGuide]=useState(false);
const task=tasks[index],completed=Object.keys(done).length;
const next=()=>{setIndex(i=>(i+1)%tasks.length);setChoice(null)};
return <section style={{border:'1px solid #d6e6d9',borderRadius:18,padding:'clamp(16px,3vw,28px)',background:'white',marginTop:16}}>
<strong style={{color:'#006B3C'}}>LIFEWS GROWMEAL · NURSERY 1 · GARDEN 02 · GM-N04</strong><h2>🍃 Our Leaf Discovery Garden</h2>
<p>Look, point, count and care for garden leaves. Ask a teacher or parent to help with the outdoor activities.</p>
<div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap',background:'#eef7eb',padding:14,borderRadius:12,marginBottom:20}}><strong>Activity {index+1} of {tasks.length}</strong><span role="status">{completed} of {tasks.length} activities completed</span></div>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,270px),1fr))',gap:18,alignItems:'center'}}>
<div style={{background:'#f2f8ec',borderRadius:16,padding:20,textAlign:'center'}} aria-label="Leaf discovery pictures"><div style={{fontSize:74,lineHeight:1.4}}>🍃 🌿 🍀</div><strong>Leaves come in many shapes!</strong><p style={{fontSize:15}}>Look at a real leaf with your teacher.</p></div>
<div><h3 style={{fontSize:23}}>{task.title}</h3><p style={{fontSize:19,lineHeight:1.5}}>{task.instruction}</p><div style={{display:'grid',gap:10}}>{task.options.map((option,i)=><button key={option} style={{...button,textAlign:'left',border:choice===i?'3px solid #006B3C':button.border,background:choice===i?'#f4f8dc':'white'}} onClick={()=>{setChoice(i);if(i===task.answer)setDone(p=>({...p,[index]:true}))}}>{option}</button>)}</div>{choice!==null&&<p role="status" style={{background:'#eef7eb',borderLeft:'4px solid #FDB515',padding:12,borderRadius:7}}>{choice===task.answer?'✓ Well done! ':'Try another answer. '}{task.feedback}</p>}</div></div>
<div style={{display:'flex',flexWrap:'wrap',gap:10,marginTop:20,alignItems:'center'}}><button style={button} disabled={index===0} onClick={()=>{setIndex(i=>i-1);setChoice(null)}}>← Back</button><button style={{...button,background:'#006B3C',color:'white'}} onClick={next}>{index===tasks.length-1?'Start again':'Next activity →'}</button><button style={button} onClick={()=>{setIndex(0);setChoice(null);setDone({});setCollected([])}}>Reset progress</button></div>
<div style={{background:'#fff7df',padding:16,borderRadius:12,marginTop:22}}><h3>🌱 Teacher-led leaf hunt</h3><p>Find a leaf on a living plant. Look at its shape and colour. Do not pick, taste or damage plants. Ask your teacher to mark what you observed.</p><div style={{display:'flex',flexWrap:'wrap',gap:8}}>{['Green leaf','Different shape','Leaf on a stem'].map(item=><button key={item} style={{...button,background:collected.includes(item)?'#d9edd4':'white'}} aria-pressed={collected.includes(item)} onClick={()=>setCollected(p=>p.includes(item)?p.filter(x=>x!==item):[...p,item])}>{collected.includes(item)?'✓ ':''}{item}</button>)}</div><p role="status">{collected.length} of 3 observations marked</p></div>
<button style={{...button,marginTop:16}} aria-expanded={showGuide} onClick={()=>setShowGuide(v=>!v)}>{showGuide?'Hide':'Show'} teacher guide and answers</button>
{showGuide&&<div style={{padding:16,marginTop:10,background:'#f2f8ec',borderRadius:12}}><strong>Learning objective</strong><p>Recognise leaves by sight, identify a common leaf colour, count to three and practise respectful observation. Emojis are illustrative and are not botanically precise comparison images.</p><strong>Answer key</strong>{tasks.map((t,i)=><p key={i}>{i+1}. {t.options[t.answer]}. {t.feedback}</p>)}<p>Use actual leaves or teacher-supplied photographs for size comparisons. Supervise all outdoor observation; never ask children to taste unknown plants.</p></div>}
</section>;
}
