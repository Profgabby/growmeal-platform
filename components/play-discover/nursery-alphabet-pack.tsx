'use client';
import {useState} from 'react';

type Crop={letter:string;name:string;emoji:string;colour:string;colourName:string;hint?:string};
const crops:Crop[]=[
{letter:'A',name:'Apple',emoji:'🍎',colour:'#d83b36',colourName:'Red',hint:'Apples can also be green or yellow.'},
{letter:'B',name:'Banana',emoji:'🍌',colour:'#f2c438',colourName:'Yellow'},
{letter:'C',name:'Carrot',emoji:'🥕',colour:'#ed8739',colourName:'Orange'},
{letter:'D',name:'Date',emoji:'🌴',colour:'#925a36',colourName:'Brown'},
{letter:'E',name:'Eggplant',emoji:'🍆',colour:'#754399',colourName:'Purple'},
{letter:'F',name:'Fig',emoji:'🟣',colour:'#754399',colourName:'Purple'},
{letter:'G',name:'Guava',emoji:'🍈',colour:'#62a85a',colourName:'Green'},
{letter:'H',name:'Hibiscus',emoji:'🌺',colour:'#d83b36',colourName:'Red',hint:'Hibiscus flowers are used to make some drinks.'},
{letter:'I',name:'Indian spinach',emoji:'🥬',colour:'#388e56',colourName:'Green'},
{letter:'J',name:'Jackfruit',emoji:'🍈',colour:'#62a85a',colourName:'Green'},
{letter:'K',name:'Kale',emoji:'🥬',colour:'#388e56',colourName:'Green'},
{letter:'L',name:'Lemon',emoji:'🍋',colour:'#f2c438',colourName:'Yellow'},
{letter:'M',name:'Mango',emoji:'🥭',colour:'#ed8739',colourName:'Orange',hint:'Mangoes may be green, yellow, orange or red depending on variety and ripeness.'},
{letter:'N',name:'Nectarine',emoji:'🍑',colour:'#d83b36',colourName:'Red'},
{letter:'O',name:'Okra',emoji:'🌱',colour:'#388e56',colourName:'Green'},
{letter:'P',name:'Pepper',emoji:'🫑',colour:'#388e56',colourName:'Green',hint:'Peppers also come in red, yellow and orange.'},
{letter:'Q',name:'Quinoa',emoji:'🌾',colour:'#d8b57b',colourName:'Tan',hint:'Quinoa is a seed crop.'},
{letter:'R',name:'Radish',emoji:'🔴',colour:'#d83b36',colourName:'Red'},
{letter:'S',name:'Spinach',emoji:'🥬',colour:'#388e56',colourName:'Green'},
{letter:'T',name:'Tomato',emoji:'🍅',colour:'#d83b36',colourName:'Red'},
{letter:'U',name:'Ugu (fluted pumpkin)',emoji:'🥬',colour:'#388e56',colourName:'Green'},
{letter:'V',name:'Velvet bean',emoji:'🫘',colour:'#925a36',colourName:'Brown',hint:'Velvet bean is a legume; it must not be eaten without appropriate processing.'},
{letter:'W',name:'Watermelon',emoji:'🍉',colour:'#388e56',colourName:'Green',hint:'The outside is green; the inside is often red.'},
{letter:'X',name:'Xigua (watermelon)',emoji:'🍉',colour:'#388e56',colourName:'Green',hint:'Xigua is another name for watermelon.'},
{letter:'Y',name:'Yam',emoji:'🍠',colour:'#925a36',colourName:'Brown'},
{letter:'Z',name:'Zucchini',emoji:'🥒',colour:'#388e56',colourName:'Green'}
];
const palette=[{name:'Red',hex:'#d83b36'},{name:'Green',hex:'#388e56'},{name:'Yellow',hex:'#f2c438'},{name:'Orange',hex:'#ed8739'},{name:'Purple',hex:'#754399'},{name:'Brown',hex:'#925a36'},{name:'Tan',hex:'#d8b57b'}];
const tasks=['Colour Identification','Letter Match','Harvest Basket Challenge','Grow a Seed Adventure','Pattern Play','Story Time'];
const cropChoices=(index:number)=>[index,(index+4)%26,(index+9)%26];
const seedStages=[{name:'Prepare the soil',picture:'🪴',options:['🪴','🧸','🚗'],correct:'🪴',why:'Plants need a suitable place to grow.'},{name:'Plant the seed',picture:'🌰',options:['🍭','🌰','⚽'],correct:'🌰',why:'Put the seed into the prepared soil.'},{name:'Check the soil and water if needed',picture:'💧',options:['💧','🧃','🧸'],correct:'💧',why:'A little water helps when the soil needs it. Do not flood the seed.'},{name:'Find the seedling',picture:'🌱',options:['🍰','🌱','🚙'],correct:'🌱',why:'The seed can sprout into a young plant.'},{name:'Watch the leaves grow',picture:'🌿',options:['🌿','🧤','🎈'],correct:'🌿',why:'Leaves help the plant capture sunlight.'}];
const btn:React.CSSProperties={padding:'12px 15px',minHeight:48,borderRadius:10,border:'1px solid #a8bdb0',background:'white',color:'#16412b',cursor:'pointer',fontSize:16};
export default function NurseryAlphabetPack(){
const [activity,setActivity]=useState<number|null>(null),[index,setIndex]=useState(0),[feedback,setFeedback]=useState(''),[step,setStep]=useState(0),[harvested,setHarvested]=useState<number[]>([]),[mistakes,setMistakes]=useState(0);
const p=crops[index],reset=(i:number|null)=>{setActivity(i);setIndex(0);setFeedback('');setStep(0);setHarvested([]);setMistakes(0)};
const move=(n:number)=>{setIndex(Math.min(25,Math.max(0,n)));setFeedback('');setStep(0);setHarvested([]);setMistakes(0)};
const answer=(correct:boolean,explanation:string)=>setFeedback(correct?'Correct! '+explanation:'Try again. Look carefully and choose another answer.');
return <section style={{border:'1px solid #d5e3d9',borderRadius:16,padding:'clamp(12px,3vw,22px)',background:'white',minWidth:0,marginTop:16}}>
<div style={{color:'#006B3C',fontWeight:800}}>NURSERY 1 · GM-N01 · PILOT LEARNING PACK</div><h2 style={{margin:'8px 0'}}>My Alphabet Garden</h2>
{activity===null?<><p>Explore A–Z through fruits, vegetables, crops and edible garden plants. Choose one activity to begin.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,210px),1fr))',gap:12}}>{tasks.map((t,i)=><button key={t} style={{...btn,textAlign:'left',fontWeight:700,minHeight:92}} onClick={()=>reset(i)}><span style={{fontSize:28}}>{['🎨','🔤','🔎','🧭','🧩','📖'][i]}</span><span style={{display:'block',marginTop:7}}>{t} →</span></button>)}</div></>:<>
<nav aria-label="Activity navigation" style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:10,margin:'16px 0 22px'}}>
<button style={btn} onClick={()=>reset(null)}>← All activities</button><strong>{tasks[activity]} · {activity+1} of 6</strong>
<div style={{display:'flex',gap:8,flexWrap:'wrap'}}><button style={btn} disabled={activity===0} onClick={()=>reset(Math.max(0,activity-1))}>← Previous</button><button style={{...btn,background:'#006B3C',color:'white'}} onClick={()=>reset(activity===5?null:activity+1)}>{activity===5?'Finish ✓':'Next →'}</button></div>
</nav>
<div style={{maxWidth:740,margin:'0 auto',minWidth:0,minHeight:250}}>
{activity===0&&<><h3>Which colour matches the {p.name.toLowerCase()}?</h3><p>Look at the picture. Tap the matching colour above it.</p>
<div style={{display:'flex',flexWrap:'wrap',gap:10,marginBottom:16}}>{palette.map(v=><button key={v.name} aria-label={v.name} title={v.name} onClick={()=>answer(v.name===p.colourName,'This example of '+p.name+' is '+p.colourName.toLowerCase()+'.')} style={{...btn,width:58,height:58,padding:0,background:v.hex,border:'2px solid #365441'}}><span className="sr-only">{v.name}</span></button>)}</div>
<div role="img" aria-label={p.name} style={{width:'min(100%,230px)',height:190,border:'1px solid #b5cbbd',borderRadius:14,display:'grid',placeItems:'center',background:'#f7faf8',fontSize:86}}>{p.emoji}</div><p>Say: “{p.letter} is for {p.name}.”</p>{p.hint&&<p style={{fontSize:14,color:'#526459'}}>{p.hint}</p>}</>}
{activity===1&&<><h3>Find the first letter of {p.name}</h3><p style={{fontSize:76,margin:'8px 0'}}>{p.emoji}</p><div style={{display:'flex',gap:12,flexWrap:'wrap'}}>{[p.letter,crops[(index+5)%26].letter,crops[(index+11)%26].letter].sort().map(l=><button key={l} style={{...btn,fontSize:32,minWidth:70}} onClick={()=>answer(l===p.letter,p.letter+' is for '+p.name+'.')}>{l}</button>)}</div></>}
{activity===2&&<><h3>🧺 Harvest Basket Challenge</h3><p>Find the <strong>{p.name}</strong> and put it in your harvest basket. Look carefully at the pictures.</p>
<div style={{display:'flex',flexWrap:'wrap',gap:12,margin:'16px 0'}}>{cropChoices(index).map(i=><button key={i} disabled={harvested.includes(index)} aria-label={'Pick '+crops[i].name} style={{...btn,minWidth:105,minHeight:110,display:'grid',justifyItems:'center',gap:4,background:harvested.includes(index)&&i===index?'#e6f4e9':'white'}} onClick={()=>{if(i===index){setHarvested(v=>[...v,index]);setFeedback('Wonderful! '+p.name+' is in your basket. Move to the next letter to find another crop.')}else{setMistakes(v=>v+1);setFeedback('That is '+crops[i].name+'. Look for '+p.name+' and try again.')}}}><span style={{fontSize:51}}>{crops[i].emoji}</span><span style={{fontSize:13}}>{crops[i].name}</span></button>)}</div>
<div style={{background:'#f0f6eb',borderRadius:12,padding:16}}><strong>My harvest basket 🧺</strong><div style={{fontSize:40,marginTop:6}}>{harvested.includes(index)?p.emoji:'🧺'}</div><p style={{marginBottom:0}}>{harvested.includes(index)?'1 crop collected! 🌟':'Tap the correct crop to collect it.'}</p></div>
</>}
{activity===3&&<><h3>🌱 Grow a Seed Adventure</h3><p>Help a little seed grow by choosing the right garden action. Complete all five steps!</p>
<div aria-label={'Growing progress '+step+' of '+seedStages.length} style={{display:'flex',gap:7,flexWrap:'wrap',marginBottom:16}}>{seedStages.map((s,i)=><span key={s.name} style={{borderRadius:20,padding:'7px 11px',background:i<step?'#d9f1df':i===step?'#FDB515':'#f0f2f0',fontWeight:i===step?700:400}}>{i<step?'✓':i+1}</span>)}</div>
{step<seedStages.length?<><h4 style={{fontSize:19}}>{seedStages[step].name}</h4><div style={{fontSize:50,margin:'8px 0'}}>🧑🏽‍🌾 {step>0?'🌱':''}</div><p>Which picture helps us next?</p><div style={{display:'flex',gap:12,flexWrap:'wrap'}}>{seedStages[step].options.map(o=><button key={o} aria-label={'Choose '+o} style={{...btn,minWidth:85,minHeight:85,fontSize:44}} onClick={()=>{if(o===seedStages[step].correct){setFeedback('Great choice! '+seedStages[step].why);setStep(s=>s+1)}else{setMistakes(m=>m+1);setFeedback('Not quite. Try the garden action: '+seedStages[step].name.toLowerCase()+'.')}}}>{o}</button>)}</div></>:<div style={{padding:20,background:'#e6f4e9',borderRadius:12}}><div style={{fontSize:58}}>🌱🌿🎉</div><h3>Garden grown! Five steps completed.</h3><p>You helped the seed grow. Great gardening!</p><button style={btn} onClick={()=>{setStep(0);setFeedback('');setMistakes(0)}}>Play again ↻</button></div>}</>}
{activity===4&&<><h3>What comes next?</h3><p style={{fontSize:42}}>🍎 🍌 🍎 🍌 ❔</p>{['🍎','🥕','🍌'].map(e=><button key={e} style={{...btn,fontSize:36,marginRight:8}} onClick={()=>answer(e==='🍎','The pattern repeats apple, banana.')}>{e}</button>)}</>}
{activity===5&&<><h3>The Little Seed's Garden</h3><p style={{fontSize:50}}>{['🌰','🌱','🌿'][step]}</p><p>{['A little seed rests in the soil. A gardener plants it carefully.','The gardener checks the soil and waters only when needed. A seedling appears.','The plant grows leaves. The children observe it with their teacher.'][step]}</p><button style={btn} onClick={()=>{setStep(s=>(s+1)%3);setFeedback('What changed in the garden?')}}>Next story page →</button></>}
{feedback&&<p role="status" style={{padding:12,background:'#f0f6eb',borderLeft:'4px solid #FDB515'}}>{feedback}</p>}
<div style={{display:'flex',flexWrap:'wrap',gap:10,alignItems:'center',marginTop:20}}><button style={btn} disabled={index===0} onClick={()=>move(index-1)}>← Previous letter</button><button style={btn} disabled={index===25} onClick={()=>move(index+1)}>Next letter →</button><strong>{p.letter} · {index+1} of 26</strong></div>
<details style={{marginTop:20}}><summary style={{cursor:'pointer',fontWeight:700}}>Teacher & parent guide / answer key</summary><p>Adult-supported practice, 5–10 minutes. Name the colour, say the letter sound and name the crop. Some crops have multiple natural colours; this exercise uses the colour shown in the example.</p><p>Colour answers: {crops.map(x=>x.letter+' '+x.name+' — '+x.colourName).join('; ')}.</p><p>Letter matching answers: {crops.map(x=>x.letter+' — '+x.name).join('; ')}. Pattern: apple. Harvest Basket: choose the named crop, then collect it. Grow a Seed: prepare soil, plant seed, check soil moisture and water when needed, identify seedling, observe leaves. Story: seed, seedling, growing plant.</p><p>Images are illustrative emoji, not botanical identification references. Adult supervision is required for real garden activities.</p></details>
</div></>}
</section>;
}
