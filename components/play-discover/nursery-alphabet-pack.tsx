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
const tasks=['Colour Identification','Letter Match','Harvest Basket Challenge','Garden Maze Quest','Pattern Play','Story Time'];
const cropChoices=(index:number)=>[index,(index+4)%26,(index+9)%26];
const mazeScenes=[
{question:'Find the path to the apple tree.',target:'🍎',obstacles:['🪨','🪵','🌵']},
{question:'Help the gardener reach the banana plant.',target:'🍌',obstacles:['🪨','🕳️','🌵']},
{question:'Follow the path to the carrots.',target:'🥕',obstacles:['🪵','🪨','🕳️']},
{question:'Find the way to the date palm.',target:'🌴',obstacles:['🕳️','🪨','🪵']},
{question:'Reach the eggplant bed.',target:'🍆',obstacles:['🌵','🪵','🪨']},
{question:'Find the fig tree.',target:'🌳',obstacles:['🪨','🕳️','🪵']},
{question:'Walk to the guava tree.',target:'🍈',obstacles:['🪵','🌵','🪨']},
{question:'Find the hibiscus flowers.',target:'🌺',obstacles:['🕳️','🪵','🪨']},
{question:'Reach the spinach patch.',target:'🥬',obstacles:['🪨','🌵','🪵']},
{question:'Find the jackfruit tree.',target:'🌳',obstacles:['🪵','🕳️','🌵']},
{question:'Walk to the kale bed.',target:'🥬',obstacles:['🕳️','🌵','🪨']},
{question:'Find the lemon tree.',target:'🍋',obstacles:['🪨','🪵','🕳️']},
{question:'Reach the mango tree.',target:'🥭',obstacles:['🌵','🕳️','🪨']},
{question:'Find the nectarine tree.',target:'🍑',obstacles:['🪵','🪨','🌵']},
{question:'Walk to the okra plants.',target:'🌱',obstacles:['🪨','🕳️','🌵']},
{question:'Reach the pepper bed.',target:'🫑',obstacles:['🪵','🌵','🕳️']},
{question:'Find the quinoa crop.',target:'🌾',obstacles:['🌵','🪨','🪵']},
{question:'Walk to the radishes.',target:'🔴',obstacles:['🕳️','🪵','🌵']},
{question:'Find the spinach garden.',target:'🥬',obstacles:['🪨','🪵','🕳️']},
{question:'Reach the tomatoes.',target:'🍅',obstacles:['🌵','🕳️','🪵']},
{question:'Find the ugu leaves.',target:'🌿',obstacles:['🪨','🌵','🕳️']},
{question:'Walk to the bean vines.',target:'🫘',obstacles:['🪵','🪨','🌵']},
{question:'Find the watermelon patch.',target:'🍉',obstacles:['🕳️','🌵','🪵']},
{question:'Reach the xigua patch.',target:'🍉',obstacles:['🪨','🪵','🕳️']},
{question:'Find the yam mound.',target:'🍠',obstacles:['🌵','🪨','🪵']},
{question:'Walk to the zucchini bed.',target:'🥒',obstacles:['🪵','🕳️','🌵']}
];
const mazePaths=[[0,1,2,5,8],[0,3,6,7,8],[0,1,4,7,8],[0,3,4,5,8]];
const mazeDirs=[{label:'Up ↑',delta:-3},{label:'Down ↓',delta:3},{label:'Left ←',delta:-1},{label:'Right →',delta:1}];
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
{activity===3&&<><h3>🧭 Garden Maze Quest</h3><p>{mazeScenes[index].question} Guide the gardener along the safe path. Avoid the rocks and other obstacles.</p>
{(()=>{const path=mazePaths[index%mazePaths.length];const position=path[step];const finished=step===path.length-1;const blocked=Array.from({length:9},(_,i)=>i).filter(i=>!path.includes(i)&&i!==0&&i!==8);
return <><div role="group" aria-label={'Garden maze for '+p.name} style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:8,maxWidth:360,margin:'16px auto'}}>
{Array.from({length:9},(_,i)=><div key={i} aria-label={i===position?'Gardener':i===8?'Destination':blocked.includes(i)?'Obstacle':'Safe path'} style={{aspectRatio:'1',border:'2px solid '+(i===position?'#FDB515':'#c9dacd'),borderRadius:12,display:'grid',placeItems:'center',fontSize:'clamp(25px,6vw,42px)',background:i===position?'#fff4ce':blocked.includes(i)?'#eeeae3':'#eaf6eb'}}>{i===position?'🧑🏽‍🌾':i===8?mazeScenes[index].target:blocked.includes(i)?mazeScenes[index].obstacles[blocked.indexOf(i)%3]:'·'}</div>)}</div>
{finished?<div style={{padding:16,borderRadius:12,background:'#e6f4e9'}}><strong>🎉 You found the {p.name}!</strong><p>Great navigating! Try another garden letter for a different maze.</p><button style={btn} onClick={()=>{setStep(0);setFeedback('')}}>Play again ↻</button></div>:<><p>Choose the next direction. Each maze has a different safe route.</p><div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:10,maxWidth:360,margin:'0 auto'}}>{mazeDirs.map(d=><button key={d.label} style={btn} onClick={()=>{const next=position+d.delta;const valid=next>=0&&next<9&&(Math.abs(d.delta)!==1||Math.floor(next/3)===Math.floor(position/3));if(valid&&next===path[step+1]){setStep(s=>s+1);setFeedback('Good direction! Keep following the safe path.')}else setFeedback('That way is blocked. Try another direction!')}}>{d.label}</button>)}</div></>}
</>})()}</>}
{activity===4&&<><h3>What comes next?</h3><p style={{fontSize:42}}>🍎 🍌 🍎 🍌 ❔</p>{['🍎','🥕','🍌'].map(e=><button key={e} style={{...btn,fontSize:36,marginRight:8}} onClick={()=>answer(e==='🍎','The pattern repeats apple, banana.')}>{e}</button>)}</>}
{activity===5&&<><h3>The Little Seed's Garden</h3><p style={{fontSize:50}}>{['🌰','🌱','🌿'][step]}</p><p>{['A little seed rests in the soil. A gardener plants it carefully.','The gardener checks the soil and waters only when needed. A seedling appears.','The plant grows leaves. The children observe it with their teacher.'][step]}</p><button style={btn} onClick={()=>{setStep(s=>(s+1)%3);setFeedback('What changed in the garden?')}}>Next story page →</button></>}
{feedback&&<p role="status" style={{padding:12,background:'#f0f6eb',borderLeft:'4px solid #FDB515'}}>{feedback}</p>}
<div style={{display:'flex',flexWrap:'wrap',gap:10,alignItems:'center',marginTop:20}}><button style={btn} disabled={index===0} onClick={()=>move(index-1)}>← Previous letter</button><button style={btn} disabled={index===25} onClick={()=>move(index+1)}>Next letter →</button><strong>{p.letter} · {index+1} of 26</strong></div>
<details style={{marginTop:20}}><summary style={{cursor:'pointer',fontWeight:700}}>Teacher & parent guide / answer key</summary><p>Adult-supported practice, 5–10 minutes. Name the colour, say the letter sound and name the crop. Some crops have multiple natural colours; this exercise uses the colour shown in the example.</p><p>Colour answers: {crops.map(x=>x.letter+' '+x.name+' — '+x.colourName).join('; ')}.</p><p>Letter matching answers: {crops.map(x=>x.letter+' — '+x.name).join('; ')}. Pattern: apple. Harvest Basket: choose the named crop, then collect it. Garden Maze Quest: follow the safe route to the target crop. Each letter has a different crop destination and a rotated maze path. Story: seed, seedling, growing plant.</p><p>Images are illustrative emoji, not botanical identification references. Adult supervision is required for real garden activities.</p></details>
</div></>}
</section>;
}
