'use client';
import {useState} from 'react';
const green='#006B3C';
const btn:React.CSSProperties={border:'1px solid #b8cdbb',borderRadius:12,padding:'12px 16px',background:'white',color:'#16452e',fontSize:17,minHeight:48,cursor:'pointer'};
const activities=['Harvest Word Problems','Measure & Compare','Garden Multiplication','Read a Garden Record','Plan the Planting Beds','Garden Investigation'];
type Q={prompt:string;choices:string[];correct:number;why:string};
const sets:Q[][]=[
[
{prompt:'A class picks 18 tomatoes on Monday and 15 on Tuesday. How many tomatoes altogether?',choices:['23','33','43'],correct:1,why:'18 + 15 = 33 tomatoes.'},
{prompt:'A basket has 42 carrots. The children use 17. How many are left?',choices:['25','35','29'],correct:0,why:'42 − 17 = 25 carrots.'},
{prompt:'Two beds contain 24 and 19 lettuce plants. How many plants are there?',choices:['43','34','45'],correct:0,why:'24 + 19 = 43 plants.'},
{prompt:'The school harvests 50 peppers and shares 28. How many remain?',choices:['32','22','18'],correct:1,why:'50 − 28 = 22 peppers.'},
{prompt:'The children collect 16 okra pods and then 27 more. How many do they have?',choices:['33','43','53'],correct:1,why:'16 + 27 = 43 pods.'},
{prompt:'A tray holds 60 seeds. The class plants 35. How many seeds are unused?',choices:['35','25','15'],correct:1,why:'60 − 35 = 25 seeds.'}
],
[
{prompt:'Bed A is 80 cm long. Bed B is 60 cm long. How much longer is Bed A?',choices:['20 cm','30 cm','140 cm'],correct:0,why:'80 − 60 = 20 cm.'},
{prompt:'One watering can holds 5 litres. Another holds 3 litres. What is their combined capacity?',choices:['2 L','8 L','15 L'],correct:1,why:'5 + 3 = 8 litres.'},
{prompt:'A seedling grows from 12 cm to 19 cm. How much did it grow?',choices:['7 cm','9 cm','31 cm'],correct:0,why:'19 − 12 = 7 cm.'},
{prompt:'A garden path is 2 metres long. How many centimetres is that?',choices:['20 cm','200 cm','2000 cm'],correct:1,why:'1 metre = 100 centimetres, so 2 metres = 200 cm.'},
{prompt:'A bottle contains 1 litre of water. Which quantity is equal to it?',choices:['100 mL','1000 mL','10 mL'],correct:1,why:'1 litre = 1000 millilitres.'},
{prompt:'Two plants are 15 cm and 21 cm tall. What is the height difference?',choices:['6 cm','36 cm','5 cm'],correct:0,why:'21 − 15 = 6 cm.'}
],
[
{prompt:'There are 3 rows with 4 cabbage plants in each row. How many plants?',choices:['7','12','14'],correct:1,why:'3 × 4 = 12.'},
{prompt:'Four baskets each contain 5 mangoes. How many mangoes?',choices:['9','20','25'],correct:1,why:'4 × 5 = 20.'},
{prompt:'There are 2 beds with 6 pepper plants in each. How many plants?',choices:['12','8','16'],correct:0,why:'2 × 6 = 12.'},
{prompt:'Five children each plant 3 seeds. How many seeds are planted?',choices:['8','15','18'],correct:1,why:'5 × 3 = 15.'},
{prompt:'There are 6 rows with 2 carrots in each row. How many carrots?',choices:['12','8','14'],correct:0,why:'6 × 2 = 12.'},
{prompt:'Three trays each hold 7 seedlings. How many seedlings?',choices:['10','21','24'],correct:1,why:'3 × 7 = 21.'}
],
[
{prompt:'Monday: 8 tomatoes. Tuesday: 12 tomatoes. Which day had the larger harvest?',choices:['Monday','Tuesday','Equal'],correct:1,why:'12 is greater than 8.'},
{prompt:'Monday: 8 tomatoes. Tuesday: 12 tomatoes. How many more were picked Tuesday?',choices:['4','6','20'],correct:0,why:'12 − 8 = 4.'},
{prompt:'Wednesday: 10 tomatoes. Thursday: 6 tomatoes. What is the total?',choices:['16','4','26'],correct:0,why:'10 + 6 = 16.'},
{prompt:'Which day recorded the smallest tomato harvest?',choices:['Monday','Tuesday','Thursday'],correct:2,why:'Thursday has 6, the smallest count.'},
{prompt:'What is the total harvest over Monday (8), Tuesday (12), Wednesday (10), and Thursday (6)?',choices:['34','36','38'],correct:1,why:'8 + 12 + 10 + 6 = 36.'},
{prompt:'Which two days together produced 18 tomatoes?',choices:['Monday and Wednesday','Tuesday and Wednesday','Monday and Thursday'],correct:0,why:'8 + 10 = 18. The other pairs total 22 and 14.'}
],
[
{prompt:'A bed has 3 rows and 4 planting spaces per row. How many spaces?',choices:['7','12','14'],correct:1,why:'3 × 4 = 12 spaces.'},
{prompt:'You need to plant 10 seedlings in two equal rows. How many in each row?',choices:['5','8','20'],correct:0,why:'10 ÷ 2 = 5.'},
{prompt:'A teacher asks you to keep a clear walking path. Where should the path go?',choices:['Across seedlings','Between beds','Inside a water tank'],correct:1,why:'Paths between beds protect plants and help people walk safely.'},
{prompt:'Which plan uses water more carefully?',choices:['Check soil before watering','Leave the tap running','Flood all beds daily'],correct:0,why:'Check soil moisture and water when needed.'},
{prompt:'There are 16 seedlings and 4 equal rows. How many seedlings per row?',choices:['4','8','12'],correct:0,why:'16 ÷ 4 = 4.'},
{prompt:'What should be recorded after planting?',choices:['Number and date planted','Only shoe colour','Nothing'],correct:0,why:'Recording planting dates and counts supports garden learning.'}
],
[
{prompt:'Two identical seedlings receive different amounts of water. What should you measure to compare their growth?',choices:['Plant height','Shoe size','Desk colour'],correct:0,why:'Plant height is a measurable growth indicator.'},
{prompt:'Why should two test plants be the same type?',choices:['To make the comparison fairer','To make the soil disappear','To change the weather'],correct:0,why:'Keeping plant type the same helps isolate the tested difference.'},
{prompt:'A plant is 10 cm tall on Monday and 13 cm on Friday. What is the increase?',choices:['3 cm','23 cm','13 cm'],correct:0,why:'13 − 10 = 3 cm.'},
{prompt:'What tool is best for measuring seedling height?',choices:['Ruler','Plate','Spoon'],correct:0,why:'A ruler measures length in centimetres.'},
{prompt:'What should you do when your result is unexpected?',choices:['Record it accurately','Change it to a bigger number','Erase the whole experiment'],correct:0,why:'Good investigations record observations honestly.'},
{prompt:'Which statement is an observation?',choices:['This leaf is 6 cm long','All plants will grow forever','The garden is magical'],correct:0,why:'A measured leaf length is an observation.'}
]
];
const records=[['Monday',8],['Tuesday',12],['Wednesday',10],['Thursday',6]] as const;
export default function PrimaryTwoGardenPack(){
const [activity,setActivity]=useState<number|null>(null),[index,setIndex]=useState(0),[feedback,setFeedback]=useState(''),[score,setScore]=useState<Record<string,boolean>>({});
const open=(n:number|null)=>{setActivity(n);setIndex(0);setFeedback('')};
const q=activity===null?null:sets[activity][index];
const answer=(n:number)=>{if(!q||activity===null)return;const correct=n===q.correct||('accept' in q&&Array.isArray(q.accept)&&q.accept.includes(n));setFeedback((correct?'✓ Correct! ':'Try again. ')+q.why);if(correct)setScore(v=>({...v,[activity+'-'+index]:true}))};
return <section style={{border:'1px solid #d5e4d9',background:'white',borderRadius:18,padding:'clamp(14px,3vw,28px)',marginTop:16}}>
<strong style={{color:green}}>PRIMARY 2 · GM-P12 · NUMBER FOOD GARDEN</strong><h2>My Garden Maths & Discovery Lab</h2>
{activity===null?<><p>Use garden information to solve problems, read measurements, plan planting rows and carry out simple investigations. These are Primary 2 challenges, not nursery number-recognition games.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,230px),1fr))',gap:12}}>{activities.map((name,i)=><button key={name} style={{...btn,textAlign:'left',minHeight:116}} onClick={()=>open(i)}><span style={{fontSize:30}}>{['🧺','📏','✖️','📊','🪴','🔬'][i]}</span><div><strong>{name} →</strong></div><small>6 questions</small></button>)}</div></>:<>
<nav aria-label="Primary 2 navigation" style={{display:'flex',gap:10,alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',marginBottom:20}}><button style={btn} onClick={()=>open(null)}>← All activities</button><strong>{activities[activity]} · {activity+1} of 6</strong><div style={{display:'flex',gap:8}}><button style={btn} disabled={activity===0} onClick={()=>open(activity-1)}>← Previous</button><button style={{...btn,background:green,color:'white'}} onClick={()=>open(activity===5?null:activity+1)}>{activity===5?'Finish ✓':'Next →'}</button></div></nav>
<div style={{maxWidth:740,margin:'auto'}}>
<h3>{activities[activity]}</h3>
{activity===3&&<div style={{background:'#eff7eb',borderRadius:12,padding:16,marginBottom:18}}><strong>Tomato harvest record</strong><table style={{width:'100%',borderCollapse:'collapse',marginTop:10}}><thead><tr><th style={{textAlign:'left'}}>Day</th><th style={{textAlign:'left'}}>Tomatoes</th></tr></thead><tbody>{records.map(([day,n])=><tr key={day}><td style={{padding:7,borderTop:'1px solid #d1e1d0'}}>{day}</td><td style={{padding:7,borderTop:'1px solid #d1e1d0'}}>{n}</td></tr>)}</tbody></table></div>}
{activity===4&&<div aria-label="Three garden rows with four spaces each" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:9,maxWidth:310,background:'#edf5e9',padding:14,borderRadius:12,marginBottom:16}}>{Array.from({length:12},(_,i)=><span key={i} style={{fontSize:32,textAlign:'center'}}>🌱</span>)}</div>}
{activity===1&&<div style={{display:'flex',gap:15,alignItems:'end',padding:14,background:'#eff7eb',borderRadius:12,marginBottom:16}}><div style={{height:75,width:90,background:'#bbdfb5',border:'2px solid #438b5a'}}/><div style={{height:55,width:90,background:'#e1c79e',border:'2px solid #9b7945'}}/><small>Compare garden measurements</small></div>}
<p style={{fontSize:20,lineHeight:1.55}}>{q?.prompt}</p>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,190px),1fr))',gap:12}}>{q?.choices.map((choice,i)=><button key={i} style={btn} onClick={()=>answer(i)}>{choice}</button>)}</div>
{feedback&&<p role="status" style={{marginTop:18,padding:14,background:'#eef7e9',borderLeft:'4px solid #FDB515'}}>{feedback}</p>}
<div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center',marginTop:24}}><button style={btn} disabled={index===0} onClick={()=>{setIndex(i=>i-1);setFeedback('')}}>← Previous question</button><button style={btn} disabled={index===5} onClick={()=>{setIndex(i=>i+1);setFeedback('')}}>Next question →</button><strong>{index+1} of 6</strong><span>Correct questions: {Array.from({length:6},(_,i)=>score[activity+'-'+i]).filter(Boolean).length}/6</span></div>
<details style={{marginTop:20}}><summary style={{fontWeight:700,cursor:'pointer'}}>Teacher & parent guide / complete answer key</summary>{sets[activity].map((question,i)=><p key={i}><strong>{i+1}.</strong> {question.why}</p>)}<p>Use real harvest records where available. Measurements and numerical scenarios are illustrative teaching data, not claims about a particular school garden.</p></details>
</div></>}
</section>;
}
