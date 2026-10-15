'use client';
import {useState} from 'react';
const green='#006B3C',gold='#FDB515';
type Shape='circle'|'square'|'triangle'|'rectangle'|'oval';
const shapes:Shape[]=['circle','square','triangle','rectangle','oval'];
const items:{name:string;shape:Shape;icon:string;why:string}[]=[
{name:'Tomato',shape:'circle',icon:'🍅',why:'A tomato looks round like a circle.'},
{name:'Square garden bed',shape:'square',icon:'🟩',why:'A square garden bed has four equal sides.'},
{name:'Triangular garden sign',shape:'triangle',icon:'🔺',why:'A triangular sign has three sides.'},
{name:'Long planting bed',shape:'rectangle',icon:'🟫',why:'A rectangular bed has four sides and is longer than it is wide.'},
{name:'Watermelon',shape:'oval',icon:'🍉',why:'Some watermelons are oval, like a stretched circle.'},
{name:'Orange',shape:'circle',icon:'🍊',why:'An orange looks round like a circle.'},
{name:'Square seed tray',shape:'square',icon:'🟨',why:'This seed tray is square.'},
{name:'Triangle marker',shape:'triangle',icon:'🔺',why:'This marker is triangular.'},
{name:'Vegetable plot',shape:'rectangle',icon:'🥬',why:'This garden plot is rectangular.'},
{name:'Mango',shape:'oval',icon:'🥭',why:'Many mangoes have an oval outline.'}
];
const labels:Record<Shape,string>={circle:'Circle',square:'Square',triangle:'Triangle',rectangle:'Rectangle',oval:'Oval'};
const games=['Shape Detective','Match Garden Shapes','Build a Garden Pattern','Where Does It Belong?','Garden Layout Builder','Picture Shape Stories'];
const stories=[
{title:'Tomi Finds a Round Tomato',text:'Tomi sees a round tomato growing in the garden. She points to its shape.',icon:'🍅',shape:'circle' as Shape},
{title:'Ada Builds a Square Bed',text:'Ada and her teacher look at a garden bed with four equal sides.',icon:'🟩',shape:'square' as Shape},
{title:'The Triangle Garden Sign',text:'Bola sees a garden sign with three sides. She points to each side.',icon:'🔺',shape:'triangle' as Shape},
{title:'Chidi Walks by a Long Bed',text:'Chidi walks beside a long rectangular planting bed full of vegetables.',icon:'🥬',shape:'rectangle' as Shape},
{title:'Mimi Finds a Mango',text:'Mimi sees an oval mango on a tree. She compares its outline with a circle.',icon:'🥭',shape:'oval' as Shape}
];
const button:React.CSSProperties={padding:'12px 16px',minHeight:48,border:'1px solid #b6cdbd',borderRadius:12,background:'white',color:'#12452c',fontSize:17,cursor:'pointer'};
function ShapePicture({shape,size=80}:{shape:Shape;size?:number}){return <svg role="img" aria-label={labels[shape]} width={size} height={size} viewBox="0 0 100 100"><title>{labels[shape]}</title>{shape==='circle'&&<circle cx="50" cy="50" r="36" fill={gold} stroke={green} strokeWidth="4"/>}{shape==='square'&&<rect x="17" y="17" width="66" height="66" rx="3" fill="#cde6c9" stroke={green} strokeWidth="4"/>}{shape==='triangle'&&<polygon points="50,12 90,85 10,85" fill={gold} stroke={green} strokeWidth="4"/>}{shape==='rectangle'&&<rect x="7" y="26" width="86" height="48" rx="3" fill="#cde6c9" stroke={green} strokeWidth="4"/>}{shape==='oval'&&<ellipse cx="50" cy="50" rx="41" ry="27" fill={gold} stroke={green} strokeWidth="4"/>}</svg>}
export default function NurseryGeometryPack(){
const [game,setGame]=useState<number|null>(null),[index,setIndex]=useState(0),[feedback,setFeedback]=useState(''),[placed,setPlaced]=useState<Shape[]>([]),[story,setStory]=useState(0);
const change=(g:number|null)=>{setGame(g);setIndex(0);setFeedback('');setPlaced([]);setStory(0)};
const check=(chosen:Shape,expected:Shape)=>setFeedback(chosen===expected?'Correct! '+labels[expected]+' is the shape. 🌟':'Try again. Look at the sides and corners.');
const options=(correct:Shape)=>[correct,shapes[(shapes.indexOf(correct)+2)%5],shapes[(shapes.indexOf(correct)+3)%5]].sort((a,b)=>shapes.indexOf(a)-shapes.indexOf(b));
const optionsUI=(correct:Shape,withPictures=true)=> <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>{options(correct).map(s=><button key={s} style={{...button,minWidth:115,display:'grid',justifyItems:'center',gap:8}} onClick={()=>check(s,correct)}>{withPictures&&<ShapePicture shape={s} size={68}/>}<strong>{labels[s]}</strong></button>)}</div>;
const item=items[index%items.length],target=shapes[index%5],pattern=[target,shapes[(index+1)%5],target,shapes[(index+1)%5]];
return <section style={{background:'white',border:'1px solid #d4e3d9',borderRadius:18,padding:'clamp(14px,3vw,26px)',marginTop:16}}>
<strong style={{color:green}}>NURSERY 3 · GM-N03 · GEOMETRY GARDEN</strong><h2>My Shape Garden</h2>
{game===null?<><p>Explore five basic shapes through real garden objects, pictures, patterns and short read-aloud stories.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,220px),1fr))',gap:12}}>{games.map((g,i)=><button key={g} style={{...button,textAlign:'left',minHeight:90,fontWeight:700}} onClick={()=>change(i)}><span style={{fontSize:27}}>{['🔎','🧩','🔁','🪴','🏡','📖'][i]}</span><div>{g} →</div></button>)}</div></>:<>
<nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap',marginBottom:24}} aria-label="Shape Garden navigation"><button style={button} onClick={()=>change(null)}>← All activities</button><strong>{games[game]} · {game+1} of 6</strong><div style={{display:'flex',gap:8}}><button style={button} disabled={game===0} onClick={()=>change(Math.max(0,game-1))}>← Previous</button><button style={{...button,background:green,color:'white'}} onClick={()=>change(game===5?null:game+1)}>{game===5?'Finish ✓':'Next →'}</button></div></nav>
<div style={{maxWidth:700,margin:'auto'}}>
{game===0&&<><h3>Shape Detective</h3><p>Look at the {item.name.toLowerCase()}. Which shape does it look like?</p><div style={{fontSize:95,margin:'15px 0'}} role="img" aria-label={item.name}>{item.icon}</div>{optionsUI(item.shape)}<p style={{color:'#53685a'}}>{item.why}</p></>}
{game===1&&<><h3>Match Garden Shapes</h3><p>Find the matching shape for this {item.name.toLowerCase()}.</p><div style={{display:'flex',alignItems:'center',gap:22,margin:'16px 0',flexWrap:'wrap'}}><span style={{fontSize:90}} role="img" aria-label={item.name}>{item.icon}</span><span style={{fontSize:26}}>→ ?</span></div>{optionsUI(item.shape)}</>}
{game===2&&<><h3>Build a Garden Pattern</h3><p>Look at the repeating shape pattern. Which shape comes next?</p><div style={{display:'flex',gap:5,alignItems:'center',flexWrap:'wrap',margin:'18px 0'}}>{pattern.map((s,i)=><ShapePicture key={i} shape={s} size={62}/>)}<span style={{fontSize:35}}>?</span></div>{optionsUI(target)}<p>Say the pattern aloud with an adult.</p></>}
{game===3&&<><h3>Where Does It Belong?</h3><p>Place the {item.name.toLowerCase()} in the correct shape group.</p><div style={{fontSize:90,margin:'18px 0'}} role="img" aria-label={item.name}>{item.icon}</div>{optionsUI(item.shape)}</>}
{game===4&&<><h3>Garden Layout Builder</h3><p>Choose the shapes to build your garden: a rectangular bed, a circular water station, a square seed tray and a triangular sign.</p><div style={{display:'flex',gap:10,flexWrap:'wrap'}}>{(['rectangle','circle','square','triangle'] as Shape[]).map(s=><button key={s} style={button} onClick={()=>{if(!placed.includes(s)){setPlaced([...placed,s]);setFeedback(labels[s]+' added to the garden!')}}}><ShapePicture shape={s} size={55}/><div>{labels[s]}</div></button>)}</div><div style={{background:'#eff5e9',border:'2px solid #a7c5a7',borderRadius:14,padding:18,marginTop:18,minHeight:140}}><strong>My garden layout</strong><div style={{display:'flex',gap:15,flexWrap:'wrap',marginTop:12}}>{placed.map(s=><div key={s} style={{textAlign:'center'}}><ShapePicture shape={s} size={65}/><div>{s==='rectangle'?'Garden bed':s==='circle'?'Water station':s==='square'?'Seed tray':'Garden sign'}</div></div>)}</div>{placed.length===4&&<p role="status">Well done! Your garden has four different shapes.</p>}</div><button style={{...button,marginTop:12}} onClick={()=>{setPlaced([]);setFeedback('')}}>Start again</button></>}
{game===5&&<><h3>Picture Shape Stories</h3><p>A parent or teacher reads the story aloud. Look at the picture and find its shape.</p><label>Story <select style={button} value={story} onChange={e=>{setStory(Number(e.target.value));setFeedback('')}}>{stories.map((s,i)=><option value={i} key={s.title}>{i+1}. {s.title}</option>)}</select></label><div style={{border:'1px solid #d6e5da',borderRadius:14,overflow:'hidden',marginTop:14}}><div style={{background:'linear-gradient(#d9eff8 0%,#d9eff8 52%,#cce6b9 52%,#cce6b9 100%)',minHeight:220,display:'grid',placeItems:'center',fontSize:100}} role="img" aria-label={stories[story].title}>{stories[story].icon}</div><div style={{padding:18}}><h4>{stories[story].title}</h4><p>{stories[story].text}</p><p>Which shape can you find?</p>{optionsUI(stories[story].shape)}</div></div><button style={{...button,marginTop:12}} onClick={()=>{setStory((story+1)%stories.length);setFeedback('')}}>Next story →</button></>}
{feedback&&<p role="status" style={{background:'#eef7e9',borderLeft:'4px solid #FDB515',padding:12,marginTop:18}}>{feedback}</p>}
{game!==4&&game!==5&&<div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginTop:22}}><button style={button} disabled={index===0} onClick={()=>{setIndex(i=>i-1);setFeedback('')}}>← Previous question</button><button style={button} disabled={index===9} onClick={()=>{setIndex(i=>i+1);setFeedback('')}}>Next question →</button><strong>{index+1} of 10</strong></div>}
<details style={{marginTop:22}}><summary style={{cursor:'pointer',fontWeight:700}}>Teacher & parent guide / answer key</summary><p>Read aloud. Encourage children to notice curved edges, straight sides and corners. The five target shapes are circle, square, triangle, rectangle and oval. For each object, its correct answer is shown in the explanation. Pattern Play repeats ABAB; the next shape is A. Garden Layout Builder uses rectangle (bed), circle (water station), square (seed tray) and triangle (sign). Story answers: circle, square, triangle, rectangle and oval.</p><p>Real fruits vary in shape; pictures are simplified examples. No physical materials are required.</p></details>
</div></>}
</section>;
}
