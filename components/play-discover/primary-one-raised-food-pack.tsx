'use client';
import {useState} from 'react';
const lessons=[
{title:'Raised-bed walls',question:'What holds soil inside a raised bed?',answers:['Strong side walls','A school bell','A cloud'],correct:0,reason:'Side walls contain growing soil.'},
{title:'Growing soil',question:'What belongs in the planting bed?',answers:['Broken glass','Suitable soil and mature compost','Plastic rubbish'],correct:1,reason:'Suitable growing soil supports roots.'},
{title:'Planting seeds',question:'Where should we place seeds?',answers:['On the walkway','Inside a toolbox','At a suitable depth in prepared soil'],correct:2,reason:'Plant seeds at the recommended depth.'},
{title:'Gentle watering',question:'How should seedlings be watered?',answers:['Gently near their roots','By flooding the path','With unsafe wastewater'],correct:0,reason:'Gentle watering protects seedlings.'},
{title:'Clear paths',question:'Why leave a clear path?',answers:['To bury rubbish','To reach plants without stepping on the bed','To store sharp tools'],correct:1,reason:'Clear paths support safe access.'},
{title:'Clean harvest',question:'What should happen before eating vegetables?',answers:['Place them on the floor','Skip washing','Wash with safe water under adult guidance'],correct:2,reason:'Safe handling helps keep food clean.'}
] as const;
const button:React.CSSProperties={border:'1px solid #b8cdbb',borderRadius:12,padding:'12px 16px',background:'white',color:'#16452e',minHeight:48,cursor:'pointer'};
function GardenScene({index}:{index:number}){return <svg role="img" aria-label={lessons[index].title+' illustration'} data-asset-id={'GM-P16-LESSON-'+index} viewBox="0 0 400 240" style={{width:'100%',maxWidth:480,background:'#edf7e9',borderRadius:14}}>
<path d="M0 185Q200 170 400 185V240H0Z" fill="#c5d8ad"/>
<path d="M40 92L270 92L350 134L115 134Z" fill="#735238" stroke="#493627" strokeWidth="3"/>
<path d="M40 92L115 134V192L40 152Z" fill="#a78151" stroke="#735238" strokeWidth="3"/>
<path d="M115 134H350V192H115Z" fill="#c49b67" stroke="#735238" strokeWidth="3"/>
{Array.from({length:6},(_,i)=><g key={i}><path d={`M${100+i%3*73} ${113+Math.floor(i/3)*17}v-16`} stroke="#006B3C" strokeWidth="3"/><ellipse cx={92+i%3*73} cy={100+Math.floor(i/3)*17} rx="11" ry="6" fill="#66a957"/></g>)}
{index===0&&<path d="M350 164l29 -20" stroke="#FDB515" strokeWidth="5"/>}
{index===1&&<circle cx="197" cy="121" r="7" fill="#d7b58c"/>}
{index===2&&<ellipse cx="210" cy="115" rx="9" ry="5" fill="#f1d58b"/>}
{index===3&&<g><path d="M323 36l-28 56" stroke="#468ed1" strokeWidth="7"/><path d="M300 90l-6 15m16 -15l-6 15" stroke="#468ed1" strokeWidth="3"/></g>}
{index===4&&<path d="M120 220h245" stroke="#dfd1a6" strokeWidth="19" strokeLinecap="round"/>}
{index===5&&[0,1,2].map(i=><circle key={i} cx={303+i*19} cy="216" r="11" fill="#d94c37"/>)}
</svg>}
export default function PrimaryOneRaisedFoodPack(){
const [index,setIndex]=useState<number|null>(null),[feedback,setFeedback]=useState('');
const lesson=index===null?null:lessons[index];
return <section style={{marginTop:16,padding:20,border:'1px solid #d4e3d9',borderRadius:18}}>
<strong style={{color:'#006B3C'}}>PRIMARY 1 · GM-P16 · RAISED FOOD GARDEN</strong><h2>Explore Our Raised Food Garden</h2>
{lesson===null?<div style={{display:'grid',gap:10}}>{lessons.map((item,i)=><button key={item.title} style={button} onClick={()=>{setIndex(i);setFeedback('')}}>{i+1}. {item.title} →</button>)}</div>:<><button style={button} onClick={()=>setIndex(null)}>← Activities</button><h3>{lesson.title}</h3><GardenScene index={index!}/><p>{lesson.question}</p><div style={{display:'grid',gap:8}}>{lesson.answers.map((answer,i)=><button key={answer} style={button} onClick={()=>setFeedback(i===lesson.correct?'Correct. '+lesson.reason:'Try again and consider safe gardening.')}>{answer}</button>)}</div><p role="status" aria-live="polite">{feedback}</p><button style={button} onClick={()=>{setIndex(index===lessons.length-1?null:index!+1);setFeedback('')}}>Next →</button></>}
</section>;
}
