'use client';
import {useState} from 'react';
const green='#006B3C';
const crops=[{name:'Tomato',icon:'🍅'},{name:'Carrot',icon:'🥕'},{name:'Banana',icon:'🍌'},{name:'Apple',icon:'🍎'},{name:'Pepper',icon:'🫑'},{name:'Corn',icon:'🌽'},{name:'Mango',icon:'🥭'},{name:'Watermelon',icon:'🍉'},{name:'Eggplant',icon:'🍆'},{name:'Lemon',icon:'🍋'}];
const games=['Count the Harvest','Find the Number','Match Number & Quantity','More or Fewer?','Garden Number Trail','Picture Counting Stories'];
const stories=[
{title:'Tomi and the Tomatoes',text:'Tomi finds three ripe tomatoes. She puts them in her basket and counts aloud.',icon:'🍅',count:3},
{title:'Bola Picks Bananas',text:'Bola sees five bananas. Her teacher helps her count each one.',icon:'🍌',count:5},
{title:'Ada and the Apples',text:'Ada collects four apples with her teacher. She counts them before sharing.',icon:'🍎',count:4},
{title:'The Carrot Basket',text:'Chidi helps pick six carrots. He counts them one by one.',icon:'🥕',count:6},
{title:'Our Pepper Patch',text:'The children find eight peppers in the garden. They count together.',icon:'🫑',count:8}
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
const rows=Math.ceil(n/5);
return <div data-asset-id={assetId} role="img" aria-label={n+' '+icon+' garden objects shown for counting in '+rows+' rows'} style={{background:seed%2===0?'#f0f8eb':'#fff6e3',border:'2px solid #bfd7be',borderRadius:15,padding:12,maxWidth:460,margin:'16px 0'}}>
<div style={{fontSize:12,fontWeight:700,color:'#006B3C',marginBottom:8}}>COUNT EACH OBJECT · SCENE {assetId}</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(5,minmax(0,1fr))',gap:7}}>
{Array.from({length:n},(_,i)=><div key={i} style={{display:'grid',placeItems:'center',background:(seed+i)%3===0?'#e1f0d6':'#fff',borderRadius:8,border:'1px solid #c6d8c3',minHeight:52,position:'relative'}}><span aria-hidden="true" style={{fontSize:'clamp(27px,5vw,43px)',transform:`rotate(${((seed+i*7)%7)-3}deg)`}}>{icon}</span><span aria-hidden="true" style={{position:'absolute',bottom:1,right:3,fontSize:9,color:'#59665a'}}>{i+1}</span></div>)}
</div></div>;
};
const answerButtons=(correct:number)=> <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>{options(correct).map(n=><button key={n} style={{...btn,minWidth:70,fontSize:26}} onClick={()=>setFeedback(choose(n,correct))}>{n}</button>)}</div>;
return <section style={{border:'1px solid #d4e3d9',borderRadius:18,padding:'clamp(14px,3vw,26px)',background:'white',marginTop:16,minWidth:0}}>
<strong style={{color:green}}>NURSERY 2 · GM-N02 · NUMBER GARDEN</strong><h2>My Number Garden</h2>
{game===null?<><p>Count real food-garden objects, identify numbers 1–20 and learn through pictures. An adult may read each question aloud.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,220px),1fr))',gap:12}}>{games.map((g,i)=><button key={g} style={{...btn,textAlign:'left',minHeight:90,fontWeight:700}} onClick={()=>next(i)}><span style={{fontSize:28}}>{['🧺','🔢','🌽','⚖️','👣','📖'][i]}</span><div>{g} →</div></button>)}</div></>:<>
<nav aria-label="Number Garden navigation" style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12,marginBottom:22}}><button style={btn} onClick={()=>next(null)}>← All activities</button><strong>{games[game]} · {game+1} of 6</strong><div style={{display:'flex',gap:8}}><button style={btn} disabled={game===0} onClick={()=>next(Math.max(0,game-1))}>← Previous</button><button style={{...btn,background:green,color:'white'}} onClick={()=>next(game===5?null:game+1)}>{game===5?'Finish ✓':'Next →'}</button></div></nav>
<div style={{maxWidth:670,margin:'auto'}}>
{game===0&&<><h3>Count the {crop.name.toLowerCase()} harvest</h3><p>Touch or point to each {crop.name.toLowerCase()} as you count.</p>{picture(crop.icon,number,'GM-N02-COUNT-'+question)}<p>How many do you see?</p>{answerButtons(number)}</>}
{game===1&&<><h3>Find number {number}</h3><p>Tap the number your teacher or parent says.</p>{answerButtons(number)}<p>Can you show {number} using fingers or counting objects?</p></>}
{game===2&&<><h3>Match the number to the harvest</h3><div style={{fontSize:56,fontWeight:800,color:green}}>{number}</div><p>Which basket has exactly {number} {crop.name.toLowerCase()} objects?</p><div style={{display:'flex',gap:12,flexWrap:'wrap'}}>{[number,number===20?18:number+1,number===1?3:number-1].map((n,i)=><button key={i} aria-label={'Basket with '+n+' items'} style={{...btn,display:'grid',gap:4,justifyItems:'center'}} onClick={()=>setFeedback(choose(n,number))}><span style={{fontSize:32}}>🧺</span><span data-asset-id={'GM-N02-MATCH-'+question+'-'+i} style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:3}}>{Array.from({length:n},(_,k)=><span key={k} style={{fontSize:22}}>{crop.icon}</span>)}</span></button>)}</div></>}
{game===3&&<><h3>Which basket has more?</h3><p>Compare two baskets of {crop.name.toLowerCase()} objects.</p><div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:10}}>{[number===20?19:number,number===20?20:number+1].map((n,i)=><button key={i} style={btn} onClick={()=>setFeedback(choose(n,number===20?20:number+1))}><strong>Basket {i+1}</strong>{picture(crop.icon,n,'GM-N02-COMPARE-'+question+'-'+i)}</button>)}</div><p>Count both baskets. Which has more?</p></>}
{game===4&&<><h3>Garden Number Trail</h3><p>Help the gardener find the next number on the path.</p><div style={{fontSize:35,margin:'18px 0'}}>🧑🏾‍🌾 → {number} → {number+1} → ?</div>{answerButtons(number+2)}<p>Count forward along the garden path.</p></>}
{game===5&&<><h3>Picture Counting Stories</h3><p>Adult reads the short story. Child looks at the picture and counts.</p><label>Choose story <select style={btn} value={storyPage} onChange={e=>{setStoryPage(Number(e.target.value));setFeedback('')}}>{stories.map((s,i)=><option value={i} key={s.title}>{i+1}. {s.title}</option>)}</select></label><div style={{border:'1px solid #d6e5da',borderRadius:14,marginTop:14,overflow:'hidden'}}><div style={{background:'#e6f3df',padding:18,minHeight:170,display:'grid',placeItems:'center'}}>{picture(stories[storyPage].icon,stories[storyPage].count,'GM-N02-STORY-'+storyPage)}</div><div style={{padding:18}}><h4>{stories[storyPage].title}</h4><p>{stories[storyPage].text}</p><p>How many {stories[storyPage].icon} objects do you see?</p>{answerButtons(stories[storyPage].count)}</div></div><button style={{...btn,marginTop:12}} onClick={()=>{setStoryPage((storyPage+1)%stories.length);setFeedback('')}}>Next story →</button></>}
{feedback&&<p role="status" style={{background:'#eef7e9',borderLeft:'4px solid #FDB515',padding:12,marginTop:18}}>{feedback}</p>}
{game!==5&&<div style={{display:'flex',alignItems:'center',flexWrap:'wrap',gap:10,marginTop:24}}><button style={btn} disabled={question===0} onClick={()=>{setQuestion(q=>q-1);setFeedback('')}}>← Previous question</button><button style={btn} disabled={question===(game===4?17:19)} onClick={()=>{setQuestion(q=>q+1);setFeedback('')}}>Next question →</button><strong>{question+1} of {game===4?18:20}</strong></div>}
<details style={{marginTop:22}}><summary style={{fontWeight:700,cursor:'pointer'}}>Teacher & parent guide / answer key</summary><p>Read questions aloud and count objects one by one. Number activities cover 1–20. The trail covers numbers 1–20 with the final target at 20. Count the Harvest and Find the Number: correct answer is the target shown. Match: choose the basket with the displayed quantity. More or Fewer: choose the larger basket. Stories: 3, 5, 4, 6 and 8 respectively.</p></details>
</div></>}
</section>;
}
