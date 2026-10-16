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
const misleadingCropLetters=new Set(['D','F','G','I','J','K','N','O','Q','R','S','U','V','X','Y']);
function CropTeachingVisual({crop,activity,index}:{crop:Crop;activity:number;index:number}){
const accurate=!misleadingCropLetters.has(crop.letter);
return <div data-asset-id={'GM-N01-'+activity+'-'+index} role="img" aria-label={crop.name+' learning visual for '+tasks[activity]} style={{border:'2px solid #bfd3c2',borderRadius:16,padding:18,minHeight:160,background:(index+activity)%2===0?'#f0f7e9':'#fff6d8',display:'grid',placeItems:'center',textAlign:'center'}}>
<div style={{fontSize:22,fontWeight:800,color:'#006B3C'}}>{crop.letter} · {crop.name}</div>
{accurate?<span style={{fontSize:64}} aria-hidden="true">{crop.emoji}</span>:<svg viewBox="0 0 220 130" width="220" height="130" role="presentation" aria-hidden="true">
<rect x="8" y="8" width="204" height="114" rx="14" fill="#e9f3df"/>
<path d="M110 102 V47" stroke="#006B3C" strokeWidth="5" strokeLinecap="round"/>
<path d="M110 71 Q66 32 42 65 Q76 91 110 71 M110 60 Q149 22 178 56 Q143 87 110 60" fill="#70a65b" stroke="#006B3C" strokeWidth="2"/>
{['D','F','G','J','N','R','V','X','Y'].includes(crop.letter)?<g>
{Array.from({length:crop.letter==='V'?4:3},(_,i)=><g key={i}><ellipse cx={78+i*30} cy={88+(i%2)*9} rx={crop.letter==='Y'?13:crop.letter==='X'?17:crop.letter==='D'?7:11} ry={crop.letter==='Y'?19:crop.letter==='D'?15:12} fill={crop.colour} stroke="#6e583c" strokeWidth="2"/>{crop.letter==='X'&&<path d={`M${65+i*30} ${88+(i%2)*9}h26`} stroke="#006B3C" strokeWidth="2"/>}</g>)}</g>:
crop.letter==='O'||crop.letter==='Q'?<g>{Array.from({length:5},(_,i)=><path key={i} d={`M${80+i*14} 92q-8 -20 0 -42q8 20 0 42`} stroke="#006B3C" strokeWidth="3" fill="#85b764"/>)}</g>:
<g>{Array.from({length:4},(_,i)=><ellipse key={i} cx={75+i*23} cy={86-(i%2)*8} rx="15" ry="9" fill={crop.colour} stroke="#006B3C" strokeWidth="2"/>)}</g>}
</svg>}
<div style={{fontSize:13}}>Activity {activity+1} · Visual {index+1}</div>
</div>;
}
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
type PictureStory={title:string;pages:{picture:string;text:string}[];letters:[string,string,string];number:number;countPicture:string;countLabel:string};
type Scene={setting:string;people:string[];plant:string;produce:string;count:number;action:string};
const storyScenes:Scene[][]=[
[{setting:'Apple orchard',people:['👧🏽'],plant:'🌳',produce:'🍎',count:3,action:'Looking at apples growing on the tree'},{setting:'Apple harvest',people:['👧🏽','👩🏾‍🏫'],plant:'🌳',produce:'🍎',count:1,action:'Picking one apple with a teacher'},{setting:'Apple lesson',people:['👧🏽'],plant:'🌳',produce:'🍎',count:1,action:'Ada shows an apple'}],
[{setting:'Banana garden',people:['👧🏾'],plant:'🌿',produce:'🍌',count:3,action:'Bola finds a bunch of bananas growing on a banana plant'},{setting:'Banana lesson',people:['👧🏾','👩🏽‍🏫'],plant:'🌿',produce:'🍌',count:2,action:'Teacher shows two yellow bananas'},{setting:'Banana harvest',people:['👧🏾'],plant:'🌿',produce:'🍌',count:1,action:'Bola holds a banana'}],
[{setting:'Carrot bed',people:['👦🏿'],plant:'🌱',produce:'🥕',count:1,action:'Chidi looks at carrot leaves'},{setting:'Carrot harvest',people:['👦🏿','👩🏾‍🏫'],plant:'🌱',produce:'🥕',count:1,action:'Harvesting a carrot together'},{setting:'Counting carrots',people:['👦🏿'],plant:'🌱',produce:'🥕',count:3,action:'Three carrots are ready to count'}],
[{setting:'School garden',people:['👧🏽','👦🏽','👧🏾','👦🏿'],plant:'🌱',produce:'🥬',count:2,action:'Four children visit their garden'},{setting:'Watering garden',people:['👧🏽','👦🏽'],plant:'🪴',produce:'💧',count:1,action:'Children check the soil and water carefully'},{setting:'Growing leaves',people:['👧🏽','👦🏽'],plant:'🌿',produce:'🥬',count:2,action:'Children admire the green leaves'}],
[{setting:'Mango orchard',people:['👧🏿'],plant:'🌳',produce:'🥭',count:3,action:'Mimi sees mangoes on a tree'},{setting:'Mango harvest',people:['👧🏿','👩🏾‍🏫'],plant:'🌳',produce:'🥭',count:5,action:'Teacher places five mangoes in a basket'},{setting:'Mango lesson',people:['👧🏿'],plant:'🌳',produce:'🥭',count:1,action:'Mimi shows a mango'}],
[{setting:'Pepper patch',people:['👦🏽'],plant:'🌱',produce:'🫑',count:2,action:'Payo visits pepper plants'},{setting:'Colourful peppers',people:['👦🏽'],plant:'🌿',produce:'🫑',count:3,action:'Payo notices green, yellow and red peppers'},{setting:'Pepper lesson',people:['👦🏽','👩🏾‍🏫'],plant:'🌿',produce:'🫑',count:1,action:'Teacher shows Payo a pepper'}],
[{setting:'Tomato patch',people:['👧🏾'],plant:'🌿',produce:'🍅',count:3,action:'Tina finds tomatoes on the plant'},{setting:'Tomato basket',people:['👧🏾'],plant:'🌿',produce:'🍅',count:2,action:'Tina gathers tomatoes in a basket'},{setting:'Tomato lesson',people:['👧🏾'],plant:'🌿',produce:'🍅',count:1,action:'Tina shows a ripe tomato'}],
[{setting:'Watermelon garden',people:['👦🏿'],plant:'🌱',produce:'🍉',count:1,action:'Wale finds a watermelon growing on the ground'},{setting:'Watermelon picnic',people:['👦🏿','👩🏽‍🏫'],plant:'🧺',produce:'🍉',count:2,action:'An adult prepares watermelon pieces for sharing'},{setting:'Sharing fruit',people:['👧🏾','👦🏿'],plant:'🧺',produce:'🍉',count:2,action:'Children share watermelon pieces'}],
[{setting:'Yam farm',people:['👩🏿‍🌾','👧🏽'],plant:'🌿',produce:'🍠',count:1,action:'Farmer shows Yemi a yam growing area'},{setting:'Yam harvest',people:['👩🏿‍🌾','👧🏽'],plant:'🌿',produce:'🍠',count:1,action:'Farmer lifts a yam from the soil'},{setting:'Yam lesson',people:['👧🏽'],plant:'🧺',produce:'🍠',count:1,action:'Yemi shows the harvested yam'}],
[{setting:'Food garden',people:['👧🏽','👦🏾'],plant:'🌽',produce:'🌽',count:2,action:'Children visit a garden full of food'},{setting:'Vegetable lesson',people:['👧🏽','👦🏾'],plant:'🌿',produce:'🍅',count:3,action:'Children name and count vegetables'},{setting:'Garden celebration',people:['👧🏽','👦🏾','👩🏾‍🏫'],plant:'🌻',produce:'🥕',count:2,action:'Children and teacher celebrate the garden'}]
];
function StoryScene({storyIndex,pageIndex}:{storyIndex:number;pageIndex:number}){
const scene=storyScenes[storyIndex][pageIndex];
return <div data-asset-id={'GM-N01-STORY-'+storyIndex+'-'+pageIndex} role="img" aria-label={scene.action} style={{minHeight:245,background:'linear-gradient(180deg,#d8efff 0%,#e4f4f8 58%,#d2e7b0 59%,#a8d18c 100%)',borderBottom:'4px solid #006B3C',padding:'18px 12px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',gap:10}}>
<div style={{background:'rgba(255,255,255,.85)',padding:'5px 14px',borderRadius:18,fontSize:15,fontWeight:700,color:'#006B3C'}}>{scene.setting}</div>
<div style={{display:'flex',alignItems:'end',justifyContent:'center',gap:'clamp(12px,4vw,32px)',width:'100%',flexWrap:'wrap'}}>
<div style={{fontSize:'clamp(40px,8vw,75px)',display:'flex',gap:3}}>{scene.people.map((person,i)=><span key={i}>{person}</span>)}</div>
<div style={{fontSize:'clamp(55px,10vw,92px)'}}>{scene.plant}</div>
</div>
<div style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',gap:6,padding:'9px 14px',background:'rgba(255,255,255,.83)',borderRadius:16,fontSize:scene.count>4?30:40}}>
{Array.from({length:scene.count},(_,i)=><span key={i}>{scene.produce}</span>)}
</div></div>;
}
const pictureStories:PictureStory[]=[
{title:'Ada and the Apple Tree',pages:[{picture:'👧🏽 🌳 🍎',text:'Ada sees an apple tree in the garden.'},{picture:'👧🏽 🧺 🍎',text:'She picks one ripe apple with her teacher.'},{picture:'👧🏽 🍎 😊',text:'Ada says, “A is for apple!”'}],letters:['A','B','C'],number:1,countPicture:'🍎',countLabel:'apple'},
{title:'Bola and the Banana Bunch',pages:[{picture:'👧🏾 🌴 🍌',text:'Bola finds bananas growing in the garden.'},{picture:'👩🏽‍🏫 🍌 🍌',text:'Her teacher shows her two yellow bananas.'},{picture:'👧🏾 🍌 😃',text:'Bola says, “B is for banana!”'}],letters:['B','D','F'],number:2,countPicture:'🍌',countLabel:'bananas'},
{title:'The Carrot Surprise',pages:[{picture:'👦🏿 🌱 🥕',text:'Chidi sees green leaves above the soil.'},{picture:'👦🏿 🥕 🧺',text:'He pulls out a carrot with his teacher.'},{picture:'🥕 🥕 🥕',text:'They count three carrots together.'}],letters:['G','H','I'],number:3,countPicture:'🥕',countLabel:'carrots'},
{title:'The Little Garden Helpers',pages:[{picture:'👧🏽 👦🏽 🌱',text:'Four children visit their school garden.'},{picture:'🪴 💧 🌞',text:'They check the soil and water carefully.'},{picture:'🌿 🌿 😊',text:'They smile at the healthy green plants.'}],letters:['J','K','L'],number:4,countPicture:'🌿',countLabel:'leaves'},
{title:'Mango Day',pages:[{picture:'🌳 🥭 👧🏿',text:'Mimi sees mangoes on a tree.'},{picture:'👩🏾‍🏫 🧺 🥭',text:'Her teacher places five mangoes in a basket.'},{picture:'👧🏿 🥭 ⭐',text:'Mimi says, “M is for mango!”'}],letters:['M','N','O'],number:5,countPicture:'🥭',countLabel:'mangoes'},
{title:'The Pepper Patch',pages:[{picture:'👦🏽 🫑 🌱',text:'Payo visits the pepper patch.'},{picture:'🫑 🫑 🫑',text:'He notices peppers in different colours.'},{picture:'👦🏽 👩🏾‍🏫 🫑',text:'His teacher says, “P is for pepper!”'}],letters:['P','Q','R'],number:6,countPicture:'🫑',countLabel:'peppers'},
{title:'The Tomato Harvest',pages:[{picture:'👧🏾 🌿 🍅',text:'Tina finds ripe tomatoes on the plants.'},{picture:'🧺 🍅 🍅',text:'She helps collect tomatoes carefully.'},{picture:'👧🏾 🍅 😊',text:'Tina says, “T is for tomato!”'}],letters:['T','S','U'],number:7,countPicture:'🍅',countLabel:'tomatoes'},
{title:'The Watermelon Picnic',pages:[{picture:'👦🏿 🍉 🌞',text:'Wale sees a big watermelon in the garden.'},{picture:'👩🏽‍🏫 🍉 🔪',text:'An adult safely cuts it for the children.'},{picture:'👧🏾 👦🏿 🍉',text:'The children share the fruit together.'}],letters:['W','V','X'],number:8,countPicture:'🍉',countLabel:'watermelons'},
{title:'Yam from the Soil',pages:[{picture:'👩🏿‍🌾 🌱 🪴',text:'A farmer shows Yemi where yams grow.'},{picture:'👩🏿‍🌾 🍠 🧺',text:'The adult carefully lifts a yam from the soil.'},{picture:'👧🏽 🍠 😊',text:'Yemi says, “Y is for yam!”'}],letters:['Y','Z','A'],number:9,countPicture:'🍠',countLabel:'yams'},
{title:'Our Happy Food Garden',pages:[{picture:'👧🏽 👦🏾 🌽',text:'The children visit a garden full of food.'},{picture:'🍅 🥕 🥬',text:'They name vegetables and count together.'},{picture:'🌻 🧺 ⭐',text:'Everyone celebrates their wonderful garden.'}],letters:['B','M','Z'],number:10,countPicture:'🌽',countLabel:'corn cobs'}
];
const storyNumbers=Array.from({length:20},(_,i)=>i+1);
const btn:React.CSSProperties={padding:'12px 15px',minHeight:48,borderRadius:10,border:'1px solid #a8bdb0',background:'white',color:'#16412b',cursor:'pointer',fontSize:16};
export default function NurseryAlphabetPack(){
const [activity,setActivity]=useState<number|null>(null),[index,setIndex]=useState(0),[feedback,setFeedback]=useState(''),[step,setStep]=useState(0),[storyIndex,setStoryIndex]=useState(0),[storyPage,setStoryPage]=useState(0),[storyLetter,setStoryLetter]=useState(''),[storyNumber,setStoryNumber]=useState<number|null>(null),[harvested,setHarvested]=useState<number[]>([]),[mistakes,setMistakes]=useState(0);
const p=crops[index],reset=(i:number|null)=>{setActivity(i);setIndex(0);setFeedback('');setStep(0);setHarvested([]);setMistakes(0);setStoryIndex(0);setStoryPage(0);setStoryLetter('');setStoryNumber(null)};
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
{activity===0&&<><h3>Which colour is shown for {p.name.toLowerCase()} in this lesson?</h3><p>Use the named colour and your teacher's real crop reference. Tap the matching colour above it.</p>
<div style={{display:'flex',flexWrap:'wrap',gap:10,marginBottom:16}}>{palette.map(v=><button key={v.name} aria-label={v.name} title={v.name} onClick={()=>answer(v.name===p.colourName,'This example of '+p.name+' is '+p.colourName.toLowerCase()+'.')} style={{...btn,width:58,height:58,padding:0,background:v.hex,border:'2px solid #365441'}}><span className="sr-only">{v.name}</span></button>)}</div>
<CropTeachingVisual crop={p} activity={0} index={index}/><p>Say: “{p.letter} is for {p.name}.”</p>{p.hint&&<p style={{fontSize:14,color:'#526459'}}>{p.hint}</p>}</>}
{activity===1&&<><h3>Find the first letter of {p.name}</h3><CropTeachingVisual crop={p} activity={1} index={index}/><div style={{display:'flex',gap:12,flexWrap:'wrap'}}>{[p.letter,crops[(index+5)%26].letter,crops[(index+11)%26].letter].sort().map(l=><button key={l} style={{...btn,fontSize:32,minWidth:70}} onClick={()=>answer(l===p.letter,p.letter+' is for '+p.name+'.')}>{l}</button>)}</div></>}
{activity===2&&<><h3>🧺 Harvest Basket Challenge</h3><p>Find the <strong>{p.name}</strong> and put it in your harvest basket. Look carefully at the pictures.</p>
<div style={{display:'flex',flexWrap:'wrap',gap:12,margin:'16px 0'}}>{cropChoices(index).map(i=><button key={i} disabled={harvested.includes(index)} aria-label={'Pick '+crops[i].name} style={{...btn,minWidth:105,minHeight:110,display:'grid',justifyItems:'center',gap:4,background:harvested.includes(index)&&i===index?'#e6f4e9':'white'}} onClick={()=>{if(i===index){setHarvested(v=>[...v,index]);setFeedback('Wonderful! '+p.name+' is in your basket. Move to the next letter to find another crop.')}else{setMistakes(v=>v+1);setFeedback('That is '+crops[i].name+'. Look for '+p.name+' and try again.')}}}><span data-asset-id={'GM-N01-HARVEST-'+index+'-'+i} style={{fontSize:misleadingCropLetters.has(crops[i].letter)?17:51}}>{misleadingCropLetters.has(crops[i].letter)?crops[i].letter:crops[i].emoji}</span><span style={{fontSize:13}}>{crops[i].name}</span></button>)}</div>
<div style={{background:'#f0f6eb',borderRadius:12,padding:16}}><strong>My harvest basket 🧺</strong><div style={{fontSize:40,marginTop:6}}>{harvested.includes(index)?(misleadingCropLetters.has(p.letter)?p.letter:p.emoji):'🧺'}</div><p style={{marginBottom:0}}>{harvested.includes(index)?'1 crop collected! 🌟':'Tap the correct crop to collect it.'}</p></div>
</>}
{activity===3&&<><h3>🧭 Garden Maze Quest</h3><p>{mazeScenes[index].question} Guide the gardener along the safe path. Avoid the rocks and other obstacles.</p>
{(()=>{const path=mazePaths[index%mazePaths.length];const position=path[step];const finished=step===path.length-1;const blocked=Array.from({length:9},(_,i)=>i).filter(i=>!path.includes(i)&&i!==0&&i!==8);
return <><div role="group" aria-label={'Garden maze for '+p.name} style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:8,maxWidth:360,margin:'16px auto'}}>
{Array.from({length:9},(_,i)=><div key={i} aria-label={i===position?'Gardener':i===8?'Destination':blocked.includes(i)?'Obstacle':'Safe path'} style={{aspectRatio:'1',border:'2px solid '+(i===position?'#FDB515':'#c9dacd'),borderRadius:12,display:'grid',placeItems:'center',fontSize:'clamp(25px,6vw,42px)',background:i===position?'#fff4ce':blocked.includes(i)?'#eeeae3':'#eaf6eb'}}>{i===position?'🧑🏽‍🌾':i===8?mazeScenes[index].target:blocked.includes(i)?mazeScenes[index].obstacles[blocked.indexOf(i)%3]:'·'}</div>)}</div>
{finished?<div style={{padding:16,borderRadius:12,background:'#e6f4e9'}}><strong>🎉 You found the {p.name}!</strong><p>Great navigating! Try another garden letter for a different maze.</p><button style={btn} onClick={()=>{setStep(0);setFeedback('')}}>Play again ↻</button></div>:<><p>Choose the next direction. Each maze has a different safe route.</p><div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:10,maxWidth:360,margin:'0 auto'}}>{mazeDirs.map(d=><button key={d.label} style={btn} onClick={()=>{const next=position+d.delta;const valid=next>=0&&next<9&&(Math.abs(d.delta)!==1||Math.floor(next/3)===Math.floor(position/3));if(valid&&next===path[step+1]){setStep(s=>s+1);setFeedback('Good direction! Keep following the safe path.')}else setFeedback('That way is blocked. Try another direction!')}}>{d.label}</button>)}</div></>}
</>})()}</>}
{activity===4&&<><h3>What comes next?</h3>{(()=>{const first=crops[index],second=crops[(index+1)%26],wrong=crops[(index+2)%26];return <div data-asset-id={'GM-N01-PATTERN-'+index}><p style={{fontSize:19}}>Look at this pattern of garden crops. Which comes next?</p><div style={{display:'flex',gap:8,flexWrap:'wrap',fontSize:30}}>{[first,second,first,second].map((crop,i)=><span key={i} style={{background:'#f0f7e9',padding:10,borderRadius:9}}>{crop.letter} · {crop.name}</span>)}<strong>?</strong></div><div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:14}}>{[first,second,wrong].map(crop=><button key={crop.letter} style={btn} onClick={()=>answer(crop.letter===first.letter,'The pattern repeats '+first.name+', '+second.name+'.')}>{crop.letter} · {crop.name}</button>)}</div></div>})()}</>}
{activity===5&&<><h3>📖 Picture Story Time</h3><p>Choose one of 10 short picture stories. A parent or teacher reads the sentences aloud. After each story, play an alphabet and counting game.</p>
<div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:14}}><label htmlFor="picture-story-choice">Story</label><select id="picture-story-choice" value={storyIndex} onChange={e=>{setStoryIndex(Number(e.target.value));setStoryPage(0);setStoryLetter('');setStoryNumber(null);setFeedback('')}} style={btn}>{pictureStories.map((s,i)=><option key={s.title} value={i}>{i+1}. {s.title}</option>)}</select><strong>{storyIndex+1} of 10</strong></div>
{(()=>{const story=pictureStories[storyIndex];const page=story.pages[storyPage];const completed=storyPage===story.pages.length;const letters=story.letters;
return <><div style={{border:'1px solid #d5e3d9',borderRadius:14,overflow:'hidden',maxWidth:560,margin:'0 auto 16px'}}>
{completed?<div style={{minHeight:200,background:'#e4f4e8',display:'grid',placeItems:'center',fontSize:55}}>📚 🌟 🔤 🔢</div>:<StoryScene storyIndex={storyIndex} pageIndex={storyPage}/>}
<div style={{padding:18,background:'#fff'}}><h4 style={{fontSize:20,margin:'0 0 8px'}}>{story.title}</h4>{!completed?<><p style={{fontSize:18,lineHeight:1.65}}>{page.text}</p><small>Picture {storyPage+1} of {story.pages.length} · Adult reads aloud</small></>:<p>Great listening! Now find a letter and a number.</p>}</div></div>
{!completed?<div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center'}}><button style={btn} disabled={storyPage===0} onClick={()=>setStoryPage(v=>Math.max(0,v-1))}>← Previous picture</button><button style={{...btn,background:'#006B3C',color:'white'}} onClick={()=>setStoryPage(v=>v+1)}>{storyPage===2?'Alphabet & number game →':'Next picture →'}</button></div>:<div style={{maxWidth:560,margin:'0 auto',display:'grid',gap:16}}>
<div style={{border:'1px solid #d5e3d9',padding:15,borderRadius:12}}><h4>🔤 Find the letter {letters[0]}</h4><p>Ask the child to point to the correct letter.</p><div style={{display:'flex',gap:10,flexWrap:'wrap'}}>{letters.map(l=><button key={l} style={{...btn,minWidth:68,fontSize:28,background:storyLetter===l?'#e4f4e8':'white'}} onClick={()=>{setStoryLetter(l);setFeedback(l===letters[0]?'Wonderful! You found letter '+l+'.':'Try another letter.')}}>{l}</button>)}</div></div>
<div style={{border:'1px solid #d5e3d9',padding:15,borderRadius:12}}><h4>🔢 Find number {story.number}</h4><p>Count with an adult. Tap the matching number.</p><div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{[story.number,story.number===20?19:story.number+1,story.number===1?3:story.number-1].sort((x,y)=>x-y).map(n=><button key={n} style={{...btn,minWidth:65,fontSize:24,background:storyNumber===n?'#e4f4e8':'white'}} onClick={()=>{setStoryNumber(n);setFeedback(n===story.number?'Excellent counting! Number '+n+'.':'Try again. Find number '+story.number+'.')}}>{n}</button>)}</div><p style={{fontSize:14,color:'#526459'}}>Number practice: identify 1–20. Count up to {story.number} using fingers or objects with an adult.</p></div>
{storyLetter===letters[0]&&storyNumber===story.number&&<p role="status" style={{padding:14,background:'#e6f4e9',borderRadius:10}}>🌟 Story complete! Great listening, letters and numbers.</p>}
<button style={btn} onClick={()=>{setStoryIndex(v=>(v+1)%pictureStories.length);setStoryPage(0);setStoryLetter('');setStoryNumber(null);setFeedback('')}}>{storyIndex===9?'Back to first story ↻':'Next story →'}</button></div>}
</>})()}</>}
{feedback&&<p role="status" style={{padding:12,background:'#f0f6eb',borderLeft:'4px solid #FDB515'}}>{feedback}</p>}
{activity!==5&&<div style={{display:'flex',flexWrap:'wrap',gap:10,alignItems:'center',marginTop:20}}><button style={btn} disabled={index===0} onClick={()=>move(index-1)}>← Previous letter</button><button style={btn} disabled={index===25} onClick={()=>move(index+1)}>Next letter →</button><strong>{p.letter} · {index+1} of 26</strong></div>}
<details style={{marginTop:20}}><summary style={{cursor:'pointer',fontWeight:700}}>Teacher & parent guide / answer key</summary><p>Adult-supported practice, 5–10 minutes. Name the colour, say the letter sound and name the crop. Some crops have multiple natural colours; this exercise uses the colour shown in the example.</p><p>Colour answers: {crops.map(x=>x.letter+' '+x.name+' — '+x.colourName).join('; ')}.</p><p>Letter matching answers: {crops.map(x=>x.letter+' — '+x.name).join('; ')}. Pattern: apple. Harvest Basket: choose the named crop, then collect it. Garden Maze Quest: follow the safe route to the target crop. Each letter has a different crop destination and a rotated maze path. Picture Story Time: 10 short illustrated three-picture stories, each followed by a letter-identification and number-identification question. Across stories, letters A–Z are included in the choice sets. Number recognition 1–20 is supported by the on-screen number examples and adult counting practice.</p><p>Some crops have no accurate emoji. Those activities explicitly request a teacher-supplied photograph instead of presenting a misleading symbol as the crop. Adult supervision is required for real garden activities.</p></details>
</div></>}
</section>;
}
