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
{name:'Oval garden pond',shape:'oval',icon:'⬭',why:'The pond has an oval outline, longer than a circle.'},
{name:'Orange',shape:'circle',icon:'🍊',why:'An orange looks round like a circle.'},
{name:'Square seed tray',shape:'square',icon:'🟨',why:'This seed tray is square.'},
{name:'Triangle marker',shape:'triangle',icon:'🔺',why:'This marker is triangular.'},
{name:'Vegetable plot',shape:'rectangle',icon:'🟫',why:'This top-view garden plot is rectangular.'},
{name:'Mango',shape:'oval',icon:'🥭',why:'Many mangoes have an oval outline.'}
];
const labels:Record<Shape,string>={circle:'Circle',square:'Square',triangle:'Triangle',rectangle:'Rectangle',oval:'Oval'};
const games=['Shape Detective','Match Garden Shapes','Build a Garden Pattern','Where Does It Belong?','Garden Layout Builder','Picture Shape Stories'];
const stories=[
{title:'Tomi Finds a Round Tomato',text:'Tomi sees a round tomato growing in the garden. She points to its shape.',icon:'🍅',shape:'circle' as Shape},
{title:'Ada Builds a Square Bed',text:'Ada and her teacher look at a garden bed with four equal sides.',icon:'🟩',shape:'square' as Shape},
{title:'The Triangle Garden Sign',text:'Bola sees a garden sign with three sides. She points to each side.',icon:'🔺',shape:'triangle' as Shape},
{title:'Chidi Walks by a Long Bed',text:'Chidi walks beside a long rectangular planting bed full of vegetables.',icon:'🟫',shape:'rectangle' as Shape},
{title:'Mimi Finds a Mango',text:'Mimi sees an oval mango on a tree. She compares its outline with a circle.',icon:'🥭',shape:'oval' as Shape}
];
const button:React.CSSProperties={padding:'12px 16px',minHeight:48,border:'1px solid #b6cdbd',borderRadius:12,background:'white',color:'#12452c',fontSize:17,cursor:'pointer'};
function ShapePicture({shape,size=80,sceneId}:{shape:Shape;size?:number;sceneId?:string}){return <svg data-asset-id={sceneId} role="img" aria-label={labels[shape]} width={size} height={size} viewBox="0 0 100 100"><title>{labels[shape]}</title>{shape==='circle'&&<circle cx="50" cy="50" r="36" fill={gold} stroke={green} strokeWidth="4"/>}{shape==='square'&&<rect x="17" y="17" width="66" height="66" rx="3" fill="#cde6c9" stroke={green} strokeWidth="4"/>}{shape==='triangle'&&<polygon points="50,12 90,85 10,85" fill={gold} stroke={green} strokeWidth="4"/>}{shape==='rectangle'&&<rect x="7" y="26" width="86" height="48" rx="3" fill="#cde6c9" stroke={green} strokeWidth="4"/>}{shape==='oval'&&<ellipse cx="50" cy="50" rx="41" ry="27" fill={gold} stroke={green} strokeWidth="4"/>}</svg>}
function GardenObjectScene({name,shape,sceneId}:{name:string;shape:Shape;sceneId:string}){
const seed=Array.from(sceneId).reduce((a,c)=>((a*33+c.charCodeAt(0))>>>0),13);
const fruit=/^(Tomato|Orange|Mango)$/.test(name);
const isPond=name==='Oval garden pond';
const isTray=name==='Square seed tray';
const isBed=/bed|plot/i.test(name);
const isMarker=/sign|marker/i.test(name);
const offset=seed%7-3;
return <div data-asset-id={sceneId} data-object-name={name} role="img" aria-label={name+' with a '+labels[shape].toLowerCase()+' outline'} style={{minHeight:175,display:'grid',placeItems:'center',background:'#f3f7e9',border:'2px solid #b6d2b8',borderRadius:15,padding:12,margin:'12px 0'}}>
<svg width="240" height="145" viewBox="0 0 240 145" aria-hidden="true">
<rect x="8" y="8" width="224" height="129" rx="13" fill="#e9f4e2" stroke="#c1d8ba"/>
{fruit&&<g transform={`translate(${offset} 0)`}>
{name==='Tomato'&&<><circle cx="120" cy="75" r="38" fill="#d94837" stroke="#a32f25" strokeWidth="3"/><path d="M120 40 l-12 12 12 -5 12 5 -12 -12 -3 14 3 -14 3 14" stroke="#006B3C" strokeWidth="4" strokeLinejoin="round" fill="#428b46"/><path d="M120 40q-2 -10 4 -15" stroke="#006B3C" strokeWidth="4" fill="none"/></>}
{name==='Orange'&&<><circle cx="120" cy="75" r="38" fill="#ee9635" stroke="#c47721" strokeWidth="3"/><path d="M120 38q-2 -13 6 -17" stroke="#006B3C" strokeWidth="4" fill="none"/><path d="M125 28q15 -17 30 -6q-11 14 -30 6" fill="#4e9a4f"/>{Array.from({length:13},(_,i)=><circle key={i} cx={92+(i%5)*12} cy={59+Math.floor(i/5)*13} r="1.5" fill="#d37e28"/>)}</>}
{name==='Mango'&&<><path d="M91 99 C67 74 86 35 122 34 C162 28 176 59 154 95 C136 120 108 116 91 99Z" fill="#e7ac36" stroke="#ad7626" strokeWidth="3"/><path d="M123 35q-2 -14 8 -19" stroke="#006B3C" strokeWidth="4" fill="none"/><path d="M130 23q20 -18 37 -6q-14 16 -37 6" fill="#5b9d50"/><path d="M93 86q-5 -23 12 -38" stroke="#f4d278" strokeWidth="6" fill="none"/></>}
</g>}
{isPond&&<><ellipse cx="120" cy="75" rx="75" ry="39" fill="#79c8dc" stroke="#638d61" strokeWidth="7"/><path d="M75 70q12 -10 24 0m33 16q12 -10 24 0" stroke="#e2f5fa" strokeWidth="3" fill="none"/><ellipse cx="72" cy="43" rx="12" ry="5" fill="#63a45d"/></>}
{isBed&&<g><rect x={shape==='square'?65:38} y={shape==='square'?29:46} width={shape==='square'?110:164} height={shape==='square'?100:66} fill="#9b744b" stroke="#6f5638" strokeWidth="6"/><rect x={shape==='square'?75:48} y={shape==='square'?39:56} width={shape==='square'?90:144} height={shape==='square'?80:46} fill="#68472e"/>{Array.from({length:shape==='square'?9:8},(_,i)=><g key={i}><path d={`M${shape==='square'?88+(i%3)*30:60+(i%4)*38} ${shape==='square'?58+Math.floor(i/3)*27:74+Math.floor(i/4)*20}v-9`} stroke="#7bc06c" strokeWidth="3"/><ellipse cx={shape==='square'?84+(i%3)*30:56+(i%4)*38} cy={shape==='square'?52+Math.floor(i/3)*27:68+Math.floor(i/4)*20} rx="7" ry="4" fill="#78b85f"/></g>)}</g>}
{isTray&&<g><rect x="61" y="19" width="118" height="112" rx="4" fill="#6b5845" stroke="#353b30" strokeWidth="4"/>{Array.from({length:9},(_,i)=><g key={i}><rect x={69+(i%3)*35} y={27+Math.floor(i/3)*32} width="29" height="26" rx="3" fill="#5d4432" stroke="#ae9c82"/><path d={`M${83+(i%3)*35} ${42+Math.floor(i/3)*32}v-8`} stroke="#79bc68" strokeWidth="2"/><ellipse cx={79+(i%3)*35} cy={35+Math.floor(i/3)*32} rx="5" ry="3" fill="#83c16b"/></g>)}</g>}
{isMarker&&<g><path d="M120 95v35" stroke="#795c3c" strokeWidth="8"/>{shape==='triangle'?<polygon points="120,22 172,100 68,100" fill="#FDB515" stroke="#006B3C" strokeWidth="5"/>:<rect x="78" y="31" width="84" height="64" fill="#FDB515" stroke="#006B3C" strokeWidth="5"/>}</g>}
</svg><strong style={{fontSize:15,color:'#006B3C'}}>{name}</strong></div>;
}
export default function NurseryGeometryPack(){
const [game,setGame]=useState<number|null>(null),[index,setIndex]=useState(0),[feedback,setFeedback]=useState(''),[placed,setPlaced]=useState<Shape[]>([]),[story,setStory]=useState(0);
const change=(g:number|null)=>{setGame(g);setIndex(0);setFeedback('');setPlaced([]);setStory(0)};
const check=(chosen:Shape,expected:Shape)=>setFeedback(chosen===expected?'Correct! '+labels[expected]+' is the shape. 🌟':'Try again. Look at the sides and corners.');
const options=(correct:Shape)=>[correct,shapes[(shapes.indexOf(correct)+2)%5],shapes[(shapes.indexOf(correct)+3)%5]].sort((a,b)=>shapes.indexOf(a)-shapes.indexOf(b));
const optionsUI=(correct:Shape,withPictures=true)=> <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>{options(correct).map(s=><button key={s} style={{...button,minWidth:115,display:'grid',justifyItems:'center',gap:8}} onClick={()=>check(s,correct)}>{withPictures&&<ShapePicture shape={s} size={68} sceneId={'GM-N03-OPTION-'+game+'-'+index+'-'+story+'-'+s}/>}<strong>{labels[s]}</strong></button>)}</div>;
const item=items[index%items.length],target=shapes[index%5],pattern=[target,shapes[(index+1)%5],target,shapes[(index+1)%5]];
return <section style={{background:'white',border:'1px solid #d4e3d9',borderRadius:18,padding:'clamp(14px,3vw,26px)',marginTop:16}}>
<strong style={{color:green}}>NURSERY 3 · GM-N03 · GEOMETRY GARDEN</strong><h2>My Shape Garden</h2>
{game===null?<><p>Explore five basic shapes through real garden objects, pictures, patterns and short read-aloud stories.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,220px),1fr))',gap:12}}>{games.map((g,i)=><button key={g} style={{...button,textAlign:'left',minHeight:90,fontWeight:700}} onClick={()=>change(i)}><span style={{fontSize:27}}>{['🔎','🧩','🔁','🪴','🏡','📖'][i]}</span><div>{g} →</div></button>)}</div></>:<>
<nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap',marginBottom:24}} aria-label="Shape Garden navigation"><button style={button} onClick={()=>change(null)}>← All activities</button><strong>{games[game]} · {game+1} of 6</strong><div style={{display:'flex',gap:8}}><button style={button} disabled={game===0} onClick={()=>change(Math.max(0,game-1))}>← Previous</button><button style={{...button,background:green,color:'white'}} onClick={()=>change(game===5?null:game+1)}>{game===5?'Finish ✓':'Next →'}</button></div></nav>
<div style={{maxWidth:700,margin:'auto'}}>
{game===0&&<><h3>Shape Detective</h3><p>Look at the {item.name.toLowerCase()}. Which shape does it look like?</p><GardenObjectScene name={item.name} shape={item.shape} sceneId={'GM-N03-DETECT-'+index}/>{optionsUI(item.shape)}<p style={{color:'#53685a'}}>{item.why}</p></>}
{game===1&&<><h3>Match Garden Shapes</h3><p>Find the matching shape for this {item.name.toLowerCase()}.</p><div style={{display:'flex',alignItems:'center',gap:22,margin:'16px 0',flexWrap:'wrap'}}><GardenObjectScene name={item.name} shape={item.shape} sceneId={'GM-N03-MATCH-'+index}/><span style={{fontSize:26}}>→ ?</span></div>{optionsUI(item.shape)}</>}
{game===2&&<><h3>Build a Garden Pattern</h3><p>Look at the repeating shape pattern. Which shape comes next?</p><div data-asset-id={'GM-N03-PATTERN-'+index} style={{display:'flex',gap:5,alignItems:'center',flexWrap:'wrap',margin:'18px 0'}}>{pattern.map((s,i)=><ShapePicture key={i} shape={s} size={62} sceneId={'GM-N03-PATTERN-'+index+'-'+i}/>)}<span style={{fontSize:35}}>?</span></div>{optionsUI(target)}<p>Say the pattern aloud with an adult.</p></>}
{game===3&&<><h3>Where Does It Belong?</h3><p>Place the {item.name.toLowerCase()} in the correct shape group.</p><GardenObjectScene name={item.name} shape={item.shape} sceneId={'GM-N03-GROUP-'+index}/>{optionsUI(item.shape)}</>}
{game===4&&<><h3>Garden Layout Builder</h3><p>Choose the shapes to build your garden: a rectangular bed, a circular water station, a square seed tray and a triangular sign.</p><div style={{display:'flex',gap:10,flexWrap:'wrap'}}>{(['rectangle','circle','square','triangle'] as Shape[]).map(s=><button key={s} style={button} onClick={()=>{if(!placed.includes(s)){setPlaced([...placed,s]);setFeedback(labels[s]+' added to the garden!')}}}><ShapePicture shape={s} size={55} sceneId={'GM-N03-LAYOUT-CHOICE-'+s}/><div>{labels[s]}</div></button>)}</div><div style={{background:'#eff5e9',border:'2px solid #a7c5a7',borderRadius:14,padding:18,marginTop:18,minHeight:140}}><strong>My garden layout</strong><div style={{display:'flex',gap:15,flexWrap:'wrap',marginTop:12}}>{placed.map(s=><div key={s} style={{textAlign:'center'}}><ShapePicture shape={s} size={65} sceneId={'GM-N03-LAYOUT-PLACED-'+s}/><div>{s==='rectangle'?'Garden bed':s==='circle'?'Water station':s==='square'?'Seed tray':'Garden sign'}</div></div>)}</div>{placed.length===4&&<p role="status">Well done! Your garden has four different shapes.</p>}</div><button style={{...button,marginTop:12}} onClick={()=>{setPlaced([]);setFeedback('')}}>Start again</button></>}
{game===5&&<><h3>Picture Shape Stories</h3><p>A parent or teacher reads the story aloud. Look at the picture and find its shape.</p><label>Story <select style={button} value={story} onChange={e=>{setStory(Number(e.target.value));setFeedback('')}}>{stories.map((s,i)=><option value={i} key={s.title}>{i+1}. {s.title}</option>)}</select></label><div style={{border:'1px solid #d6e5da',borderRadius:14,overflow:'hidden',marginTop:14}}><GardenObjectScene name={stories[story].title} shape={stories[story].shape} sceneId={'GM-N03-STORY-'+story}/><div style={{padding:18}}><h4>{stories[story].title}</h4><p>{stories[story].text}</p><p>Which shape can you find?</p>{optionsUI(stories[story].shape)}</div></div><button style={{...button,marginTop:12}} onClick={()=>{setStory((story+1)%stories.length);setFeedback('')}}>Next story →</button></>}
{feedback&&<p role="status" style={{background:'#eef7e9',borderLeft:'4px solid #FDB515',padding:12,marginTop:18}}>{feedback}</p>}
{game!==4&&game!==5&&<div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginTop:22}}><button style={button} disabled={index===0} onClick={()=>{setIndex(i=>i-1);setFeedback('')}}>← Previous question</button><button style={button} disabled={index===9} onClick={()=>{setIndex(i=>i+1);setFeedback('')}}>Next question →</button><strong>{index+1} of 10</strong></div>}
<details style={{marginTop:22}}><summary style={{cursor:'pointer',fontWeight:700}}>Teacher & parent guide / answer key</summary><p>Read aloud. Encourage children to notice curved edges, straight sides and corners. The five target shapes are circle, square, triangle, rectangle and oval. For each object, its correct answer is shown in the explanation. Pattern Play repeats ABAB; the next shape is A. Garden Layout Builder uses rectangle (bed), circle (water station), square (seed tray) and triangle (sign). Story answers: circle, square, triangle, rectangle and oval.</p><p>Real fruits vary in shape; pictures are simplified examples. No physical materials are required.</p></details>
</div></>}
</section>;
}
