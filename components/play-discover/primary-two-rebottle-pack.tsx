'use client';
import {useState} from 'react';
const lessons=[
{title:'Safe ReBottle Materials',question:'Which bottle is suitable for a supervised planter?',answers:['A clean, intact food-grade bottle','A cracked chemical container','A bottle with sharp exposed edges'],correct:0,why:'Use clean, intact, suitable containers with edges made safe by an adult.'},
{title:'Count the Planters',question:'There are 3 rows of 4 bottle planters. How many planters?',answers:['7','12','14'],correct:1,why:'3 × 4 = 12 planters.'},
{title:'Measure the Wall',question:'A garden rack is 80 cm tall and another is 60 cm. What is the difference?',answers:['140 cm','10 cm','20 cm'],correct:2,why:'80 − 60 = 20 cm.'},
{title:'Drainage Matters',question:'Why do bottle planters need suitable drainage?',answers:['To avoid waterlogging','To make soil disappear','To prevent all watering'],correct:0,why:'Drainage helps avoid waterlogging; collected runoff should be managed safely.'},
{title:'Secure the Structure',question:'Who should attach bottles securely to the rack?',answers:['A child without supervision','A trained adult','A passing stranger'],correct:1,why:'An adult should check stable mounting and safe load limits.'},
{title:'Record Plant Growth',question:'A seedling grows from 8 cm to 13 cm. How much has it grown?',answers:['21 cm','3 cm','5 cm'],correct:2,why:'13 − 8 = 5 cm.'}
] as const;
const btn:React.CSSProperties={border:'1px solid #b9cfbe',borderRadius:12,padding:'12px 16px',minHeight:48,background:'white',color:'#16442c',cursor:'pointer'};
function Scene({index}:{index:number}){return <svg data-asset-id={'GM-P17-LESSON-'+index} role="img" aria-label={lessons[index].title+' bottle garden diagram'} viewBox="0 0 400 240" style={{width:'100%',maxWidth:480,background:'#eef7e9',borderRadius:14}}>
<rect x="55" y="24" width="290" height="200" rx="8" fill="#e0e7d5" stroke="#52664f" strokeWidth="9"/>
{[0,1,2].map(row=>[0,1,2,3].map(col=><g key={row+'-'+col}><path d={`M${84+col*65} ${46+row*54}h30l-5 32h-20Z`} fill="#9ed3cb" fillOpacity=".8" stroke="#367f77" strokeWidth="2"/><path d={`M${99+col*65} ${52+row*54}v-13`} stroke="#006B3C" strokeWidth="3"/><ellipse cx={94+col*65} cy={45+row*54} rx="9" ry="5" fill="#6aa954"/></g>))}
{index===0&&<circle cx="99" cy="70" r="22" fill="none" stroke="#FDB515" strokeWidth="5"/>}
{index===1&&<path d="M61 206h270" stroke="#FDB515" strokeWidth="4" strokeDasharray="7 6"/>}
{index===2&&<path d="M366 28v192m-8 -184l8 -8 8 8m-16 176l8 8 8 -8" stroke="#006B3C" strokeWidth="3" fill="none"/>}
{index===3&&[0,1,2].map(i=><path key={i} d={`M${95+i*65} 185v12`} stroke="#468ed1" strokeWidth="3"/> )}
{index===4&&<path d="M55 24l-15 -10m305 10l15 -10" stroke="#FDB515" strokeWidth="5"/>}
{index===5&&<path d="M360 130v-46m-7 6l7 -8 7 8" stroke="#006B3C" strokeWidth="3" fill="none"/>}
</svg>}
export default function PrimaryTwoReBottlePack(){const [index,setIndex]=useState<number|null>(null),[feedback,setFeedback]=useState('');const item=index===null?null:lessons[index];return <section style={{marginTop:16,padding:20,border:'1px solid #d4e3d9',borderRadius:18}}><strong style={{color:'#006B3C'}}>PRIMARY 2 · GM-P17 · REBOTTLE WALL GARDEN</strong><h2>Count, Measure and Grow</h2>{item===null?<div style={{display:'grid',gap:10}}>{lessons.map((x,i)=><button key={x.title} style={btn} onClick={()=>{setIndex(i);setFeedback('')}}>{i+1}. {x.title} →</button>)}</div>:<><button style={btn} onClick={()=>{setIndex(null);setFeedback('')}}>← Activities</button><h3>{item.title}</h3><Scene index={index!}/><p>{item.question}</p><div style={{display:'grid',gap:8}}>{item.answers.map((a,i)=><button key={a} style={btn} onClick={()=>setFeedback(i===item.correct?'Correct. '+item.why:'Try again. Check the garden information.')}>{a}</button>)}</div><p role="status" aria-live="polite">{feedback}</p><button style={btn} onClick={()=>{setIndex(index===lessons.length-1?null:index!+1);setFeedback('')}}>Next →</button></>}</section>}
