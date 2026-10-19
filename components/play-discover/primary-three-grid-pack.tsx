'use client';
import {useState} from 'react';
const lessons=[
{title:'Read the Grid',question:'A grid has 3 rows and 4 columns. How many plots?',choices:['7','12','14'],correct:1,why:'3 × 4 = 12 plots.'},
{title:'Label the Treatments',question:'What is a fair way to compare two planting plots?',choices:['Change all conditions','Measure only one plot','Keep conditions similar except the factor being tested'],correct:2,why:'A fair comparison changes the factor under investigation while controlling others.'},
{title:'Record Heights',question:'Plant A is 12 cm tall and Plant B is 17 cm. What is the difference?',choices:['5 cm','29 cm','7 cm'],correct:0,why:'17 − 12 = 5 cm.'},
{title:'Calculate the Area',question:'A rectangular plot is 2 m long and 3 m wide. What is its area?',choices:['5 m²','6 m²','10 m²'],correct:1,why:'Area = length × width = 2 × 3 = 6 m².'},
{title:'Check the Water',question:'Which observation helps compare watering treatments?',choices:['Favourite colour','Classroom noise','Measured water volume and soil moisture'],correct:2,why:'Record water amounts and relevant plant and soil observations.'},
{title:'Interpret the Results',question:'Plot A has 8 seedlings and Plot B has 10. What can we conclude?',choices:['Plot B has 2 more seedlings; more evidence is needed to explain why','Plot B will always yield more','Plot A received no water'],correct:0,why:'The difference is 2; a single count does not establish its cause.'}
] as const;
const btn:React.CSSProperties={border:'1px solid #b9cfbe',borderRadius:12,padding:'12px 16px',minHeight:48,background:'white',color:'#16442c',cursor:'pointer'};
function Scene({index}:{index:number}){return <svg data-asset-id={'GM-P23-PRIMARY3-'+index} role="img" aria-label={lessons[index].title+' grid experiment illustration'} viewBox="0 0 420 260" style={{width:'100%',maxWidth:500,background:'#edf6e9',borderRadius:14}}>
<rect x="44" y="25" width="330" height="204" fill="#9c7950" stroke="#6a4d32" strokeWidth="5"/>
{Array.from({length:12},(_,i)=><g key={i}><rect x={55+(i%4)*78} y={35+Math.floor(i/4)*61} width="68" height="51" fill={index===1&&i%2===0?'#92704e':'#725037'} stroke="#e0c8a2" strokeWidth="2"/><path d={`M${89+(i%4)*78} ${70+Math.floor(i/4)*61}v-14`} stroke="#006B3C" strokeWidth="3"/><ellipse cx={81+(i%4)*78} cy={58+Math.floor(i/4)*61} rx="11" ry="6" fill="#70b35d"/></g>)}
{index===0&&<path d="M45 242h330" stroke="#006B3C" strokeWidth="3" strokeDasharray="8 8"/>}
{index===1&&<path d="M55 29h145" stroke="#FDB515" strokeWidth="5"/>}
{index===2&&<path d="M394 200v-70m-7 9l7 -10 7 10" stroke="#006B3C" strokeWidth="3" fill="none"/>}
{index===3&&<path d="M45 238h330m-340 -9v-204" stroke="#006B3C" strokeWidth="3"/>}
{index===4&&[0,1,2].map(i=><path key={i} d={`M${80+i*85} 12v13`} stroke="#448fc7" strokeWidth="4"/> )}
{index===5&&<circle cx="325" cy="182" r="24" stroke="#FDB515" strokeWidth="5" fill="none"/>}
</svg>}
export default function PrimaryThreeGridPack(){const [index,setIndex]=useState<number|null>(null),[feedback,setFeedback]=useState('');const item=index===null?null:lessons[index];return <section style={{marginTop:16,padding:20,border:'1px solid #d4e3d9',borderRadius:18}}><strong style={{color:'#006B3C'}}>PRIMARY 3 · GM-P23 · GRID EXPERIMENT GARDEN</strong><h2>Observe, Measure and Compare</h2>{item===null?<div style={{display:'grid',gap:10}}>{lessons.map((x,i)=><button key={x.title} style={btn} onClick={()=>{setIndex(i);setFeedback('')}}>{i+1}. {x.title} →</button>)}</div>:<><button style={btn} onClick={()=>{setIndex(null);setFeedback('')}}>← Activities</button><h3>{item.title}</h3><Scene index={index!}/><p>{item.question}</p><div style={{display:'grid',gap:8}}>{item.choices.map((a,i)=><button key={a} style={btn} onClick={()=>setFeedback(i===item.correct?'Correct. '+item.why:'Try again. Review the observation or calculation.')}>{a}</button>)}</div><p role="status" aria-live="polite">{feedback}</p><button style={btn} onClick={()=>{setIndex(index===lessons.length-1?null:index!+1);setFeedback('')}}>Next →</button></>}</section>}
