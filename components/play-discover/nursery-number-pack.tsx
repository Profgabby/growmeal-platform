'use client';
import {useState} from 'react';
const green='#006B3C';
const crops=[{name:'Tomato',icon:'🍅'},{name:'Carrot',icon:'🥕'},{name:'Banana',icon:'🍌'},{name:'Apple',icon:'🍎'},{name:'Pepper',icon:'🫑'},{name:'Corn',icon:'🌽'},{name:'Mango',icon:'🥭'},{name:'Watermelon',icon:'🍉'},{name:'Eggplant',icon:'🍆'},{name:'Lemon',icon:'🍋'}];
const games=['Count the Harvest','Find the Number','Match Number & Quantity','More or Fewer?','Garden Number Trail','Picture Counting Stories'];
const stories=[
{title:'Tomi and the Tomatoes',text:'Tomi finds three ripe tomatoes. She puts them in her basket and counts aloud.',icon:'🍅',name:'tomatoes',count:3},
{title:'Bola Picks Bananas',text:'Bola sees five bananas. Her teacher helps her count each one.',icon:'🍌',name:'bananas',count:5},
{title:'Ada and the Apples',text:'Ada collects four apples with her teacher. She counts them before sharing.',icon:'🍎',name:'apples',count:4},
{title:'The Carrot Basket',text:'Chidi helps pick six carrots. He counts them one by one.',icon:'🥕',name:'carrots',count:6},
{title:'Our Pepper Patch',text:'The children find eight peppers in the garden. They count together.',icon:'🫑',name:'peppers',count:8}
];
const btn:React.CSSProperties={border:'1px solid #b6cdbd',borderRadius:12,background:'white',color:'#12452c',padding:'12px 16px',minHeight:48,cursor:'pointer',fontSize:17};
const choose=(answer:number,correct:number)=>answer===correct?'Wonderful! That is correct. 🌟':'Try again. Count carefully with an adult.';
export default function NurseryNumberPack(){
const [game,setGame]=useState<number|null>(null),[question,setQuestion]=useState(0),[feedback,setFeedback]=useState(''),[storyPage,setStoryPage]=useState(0);
const next=(i:number|null)=>{setGame(i);setQuestion(0);setFeedback('');setStoryPage(0)};
const crop=crops[question%10],number=question+1;
const options=(n:number)=>Array.from(new Set([n,n>=20?18:n+1,n<=1?3:n-1])).sort((a,b)=>a-b);
const picture=(icon:string,n:number,assetId:string)=> {
const seed=Array.from(assetId).reduce((a,c)=>((a*31+c.charCodeAt(0))>>>0),7);
const kind=assetId.includes('STORY')?'story':assetId.includes('MATCH')?'basket':assetId.includes('COMPARE')?'comparison':'harvest';
const cropIndex=crops.findIndex(c=>c.icon===icon);
const cropName=crops[cropIndex]?.name??'garden produce';
const objectShape=(x:number,y:number,i:number)=>{
 const wobble=((seed+i*17)%7)-3;
 const cx=x+wobble,cy=y+((seed+i*11)%5)-2;
 const fill=['#d54a32','#ed8b32','#efc84e','#cf4935','#63a24d','#e8ba4b','#e4a02c','#4f9a64','#704c9d','#efc54b'][Math.max(0,cropIndex)];
 const leaf=<path d={`M${cx} ${cy-10} q-9 -10 -13 -2 q8 6 13 2 q7 -10 13 -2 q-9 7 -13 2`} fill="#006B3C"/>;
 if(cropIndex===1)return <g key={i} transform={`rotate(${wobble*3} ${cx} ${cy})`}><path d={`M${cx-9} ${cy-10} L${cx+9} ${cy-10} L${cx+3} ${cy+12} Q${cx} ${cy+17} ${cx-3} ${cy+12}Z`} fill={fill} stroke="#915e24" strokeWidth="1.4"/>{leaf}</g>;
 if(cropIndex===2)return <g key={i}><path d={`M${cx-12} ${cy-8} Q${cx-4} ${cy+19} ${cx+13} ${cy-8} Q${cx+6} ${cy+6} ${cx-12} ${cy-8}Z`} fill={fill} stroke="#9b7020" strokeWidth="1.5"/><path d={`M${cx-11} ${cy-9}q2 -5 6 -5`} stroke="#006B3C" strokeWidth="2" fill="none"/></g>;
 if(cropIndex===5)return <g key={i}><rect x={cx-8} y={cy-13} width="16" height="27" rx="6" fill={fill} stroke="#9a7725"/>{Array.from({length:4},(_,k)=><path key={k} d={`M${cx-7} ${cy-8+k*6}h14`} stroke="#f8e8a3" strokeWidth="1.5"/>)}<path d={`M${cx} ${cy-13}v-6`} stroke="#006B3C" strokeWidth="3"/></g>;
 if(cropIndex===7)return <g key={i}><ellipse cx={cx} cy={cy} rx="13" ry="10" fill="#408a53" stroke="#006B3C" strokeWidth="1.5"/><path d={`M${cx-10} ${cy-2}q10 -7 20 0 M${cx-10} ${cy+4}q10 -7 20 0`} stroke="#a4d29c" strokeWidth="1.5" fill="none"/></g>;
 if(cropIndex===8)return <g key={i}><ellipse cx={cx} cy={cy} rx="9" ry="14" fill={fill} stroke="#513779" strokeWidth="1.5"/>{leaf}</g>;
 return <g key={i}><ellipse cx={cx} cy={cy} rx={cropIndex===6?12:10} ry={cropIndex===6?13:11} fill={fill} stroke="#7c653c" strokeWidth="1.4"/>{cropIndex===9?<ellipse cx={cx-3} cy={cy-3} rx="3" ry="6" fill="#f9e69c"/>:leaf}</g>;
};
const columns=kind==='story'?Math.min(4,n):kind==='comparison'?4:5;
const rows=Math.ceil(n/columns);
const cell=38;
const width=columns*cell+36,height=rows*cell+67;
return <div data-asset-id={assetId} role="img" aria-label={n+' illustrated '+cropName.toLowerCase()+' in a '+kind+' scene'} style={{background:'#fffaf0',border:'2px solid #bfd7be',borderRadius:15,padding:8,maxWidth:'100%',margin:'12px 0'}}>
<svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{maxWidth:width,height:'auto',display:'block'}} aria-hidden="true">
<rect x="4" y="4" width={width-8} height={height-8} rx="13" fill={kind==='story'?'#f6e9d0':kind==='basket'?'#eaf3e0':kind==='comparison'?'#f4f0df':'#e5f3e3'}/>
{kind==='story'&&<><circle cx={width-28} cy="25" r="13" fill="#FDB515"/><path d={`M6 ${height-28} Q${width/2} ${height-43} ${width-6} ${height-28}`} fill="none" stroke="#9fc78e" strokeWidth="6"/></>}
{kind==='basket'&&<><path d={`M12 42 Q${width/2} 15 ${width-12} 42 L${width-22} ${height-12} H22 Z`} fill="#dbbd83" stroke="#9a753f" strokeWidth="3"/>{Array.from({length:4},(_,i)=><path key={i} d={`M22 ${height-25-i*8} H${width-22}`} stroke="#ac874d" strokeWidth="2"/>)}</>}
{kind==='comparison'&&<rect x="10" y="45" width={width-20} height={height-57} rx="9" fill="#e1c99b" stroke="#aa8451" strokeWidth="2"/>}
{kind==='harvest'&&Array.from({length:columns},(_,i)=><path key={i} d={`M${18+i*cell} 46 v${height-60}`} stroke="#c9dabb" strokeWidth="1.5"/> )}
{Array.from({length:n},(_,i)=>objectShape(18+(i%columns)*cell+cell/2,55+Math.floor(i/columns)*cell,i))}
</svg><span style={{display:'block',fontSize:12,color:'#006B3C',fontWeight:700}}>Count each {cropName.toLowerCase()} carefully.</span></div>;
};
const answerButtons=(correct:number)=> <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>{options(correct).map(n=><button key={n} style={{...btn,minWidth:70,fontSize:26}} onClick={()=>setFeedback(choose(n,correct))}>{n}</button>)}</div>;
return <section style={{border:'1px solid #d4e3d9',borderRadius:18,padding:'clamp(14px,3vw,26px)',background:'white',marginTop:16,minWidth:0}}>
<strong style={{color:green}}>NURSERY 2 · GM-N02 · NUMBER GARDEN</strong><h2>My Number Garden</h2>
{game===null?<><p>Count real food-garden objects, identify numbers 1–20 and learn through pictures. An adult may read each question aloud.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,220px),1fr))',gap:12}}>{games.map((g,i)=><button key={g} style={{...btn,textAlign:'left',minHeight:90,fontWeight:700}} onClick={()=>next(i)}><span style={{fontSize:28}}>{['🧺','🔢','🌽','⚖️','👣','📖'][i]}</span><div>{g} →</div></button>)}</div></>:<>
<nav aria-label="Number Garden navigation" style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12,marginBottom:22}}><button style={btn} onClick={()=>next(null)}>← All activities</button><strong>{games[game]} · {game+1} of 6</strong><div style={{display:'flex',gap:8}}><button style={btn} disabled={game===0} onClick={()=>next(Math.max(0,game-1))}>← Previous</button><button style={{...btn,background:green,color:'white'}} onClick={()=>next(game===5?null:game+1)}>{game===5?'Finish ✓':'Next →'}</button></div></nav>
<div style={{maxWidth:670,margin:'auto'}}>
{game===0&&<><h3>Count the {crop.name.toLowerCase()} harvest</h3><p>Touch or point to each {crop.name.toLowerCase()} as you count.</p>{picture(crop.icon,number,'GM-N02-COUNT-'+question)}<p>How many do you see?</p>{answerButtons(number)}</>}
{game===1&&<><h3>Find number {number}</h3><p>Tap the number your teacher or parent says.</p>{answerButtons(number)}<p>Can you show {number} using fingers or counting objects?</p></>}
{game===2&&<><h3>Match the number to the harvest</h3><div style={{fontSize:56,fontWeight:800,color:green}}>{number}</div><p>Which basket has exactly {number} {crop.name.toLowerCase()} objects?</p><div style={{display:'flex',gap:12,flexWrap:'wrap'}}>{[number,number===20?18:number+1,number===1?3:number-1].map((n,i)=><button key={i} aria-label={'Basket with '+n+' items'} style={{...btn,display:'grid',gap:4,justifyItems:'center'}} onClick={()=>setFeedback(choose(n,number))}><span style={{fontSize:32}}>🧺</span>{picture(crop.icon,n,'GM-N02-MATCH-'+question+'-'+i)}</button>)}</div></>}
{game===3&&<><h3>Which basket has more?</h3><p>Compare two baskets of {crop.name.toLowerCase()} objects.</p><div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:10}}>{[number===20?19:number,number===20?20:number+1].map((n,i)=><button key={i} style={btn} onClick={()=>setFeedback(choose(n,number===20?20:number+1))}><strong>Basket {i+1}</strong>{picture(crop.icon,n,'GM-N02-COMPARE-'+question+'-'+i)}</button>)}</div><p>Count both baskets. Which has more?</p></>}
{game===4&&<><h3>Garden Number Trail</h3><p>Help the gardener find the next number on the path.</p><div style={{fontSize:35,margin:'18px 0'}}>🧑🏾‍🌾 → {number} → {number+1} → ?</div>{answerButtons(number+2)}<p>Count forward along the garden path.</p></>}
{game===5&&<><h3>Picture Counting Stories</h3><p>Adult reads the short story. Child looks at the picture and counts.</p><label>Choose story <select style={btn} value={storyPage} onChange={e=>{setStoryPage(Number(e.target.value));setFeedback('')}}>{stories.map((s,i)=><option value={i} key={s.title}>{i+1}. {s.title}</option>)}</select></label><div style={{border:'1px solid #d6e5da',borderRadius:14,marginTop:14,overflow:'hidden'}}><div style={{background:'#e6f3df',padding:18,minHeight:170,display:'grid',placeItems:'center'}}>{picture(stories[storyPage].icon,stories[storyPage].count,'GM-N02-STORY-'+storyPage)}</div><div style={{padding:18}}><h4>{stories[storyPage].title}</h4><p>{stories[storyPage].text}</p><p>How many {stories[storyPage].name} do you see?</p>{answerButtons(stories[storyPage].count)}</div></div><button style={{...btn,marginTop:12}} onClick={()=>{setStoryPage((storyPage+1)%stories.length);setFeedback('')}}>Next story →</button></>}
{feedback&&<p role="status" style={{background:'#eef7e9',borderLeft:'4px solid #FDB515',padding:12,marginTop:18}}>{feedback}</p>}
{game!==5&&<div style={{display:'flex',alignItems:'center',flexWrap:'wrap',gap:10,marginTop:24}}><button style={btn} disabled={question===0} onClick={()=>{setQuestion(q=>q-1);setFeedback('')}}>← Previous question</button><button style={btn} disabled={question===(game===4?17:19)} onClick={()=>{setQuestion(q=>q+1);setFeedback('')}}>Next question →</button><strong>{question+1} of {game===4?18:20}</strong></div>}
<details style={{marginTop:22}}><summary style={{fontWeight:700,cursor:'pointer'}}>Teacher & parent guide / answer key</summary><p>Read questions aloud and count objects one by one. Number activities cover 1–20. The trail covers numbers 1–20 with the final target at 20. Count the Harvest and Find the Number: correct answer is the target shown. Match: choose the basket with the displayed quantity. More or Fewer: choose the larger basket. Stories: 3, 5, 4, 6 and 8 respectively.</p></details>
</div></>}
</section>;
}
