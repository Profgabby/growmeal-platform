'use client';
import {useState} from 'react';
const GREEN='#006B3C';
const btn:React.CSSProperties={border:'1px solid #adc9b7',background:'white',color:'#16442c',borderRadius:12,padding:'12px 16px',minHeight:48,fontSize:17,cursor:'pointer'};
const lessons=[
{title:'Read the Garden',icon:'📚',description:'Read a short passage and answer a question.'},
{title:'Make a Food Sentence',icon:'✏️',description:'Put words in order to make a meaningful sentence.'},
{title:'Garden Maths',icon:'➕',description:'Solve addition and subtraction problems using harvests.'},
{title:'What Does a Plant Need?',icon:'🌱',description:'Understand the roles of light, water, air and soil.'},
{title:'Explore the Garden Map',icon:'🗺️',description:'Follow directions and locate objects in a garden.'},
{title:'Garden Decisions',icon:'🧠',description:'Choose safe, responsible actions in real garden situations.'}
] as const;
const reading=[
{title:'Amina and the Okra',text:'Amina plants okra seeds in the school garden. She waters the soil gently. After several days, small green seedlings appear. Amina keeps the garden path clean.',q:'What appears after the seeds begin to grow?',answers:['Small green seedlings','Ripe mangoes','A new watering can'],correct:0,explain:'The passage says small green seedlings appear.'},
{title:'The Tomato Basket',text:'Tunde and his teacher harvest six ripe tomatoes. They put the tomatoes in a clean basket. Before eating them, they wash the tomatoes with safe water.',q:'Why do they wash the tomatoes?',answers:['To make them heavier','To remove dirt before eating','To change their colour'],correct:1,explain:'Washing fresh produce helps remove dirt.'},
{title:'The Shady Corner',text:'Bola sees two garden beds. One receives more sunlight than the other. Her teacher asks her to observe the plants and write down what she notices.',q:'What does the teacher ask Bola to do?',answers:['Observe and record','Pull out every plant','Cover both beds with plastic'],correct:0,explain:'Observation and recording help us compare plants.'},
{title:'Water for the Garden',text:'Chidi checks the soil before watering. It feels moist, so he waits. The next day, the soil feels dry near the surface. His teacher helps him water the bed.',q:'What does Chidi check before watering?',answers:['The school bell','The soil moisture','The colour of his shoes'],correct:1,explain:'Checking soil moisture helps avoid unnecessary watering.'},
{title:'A Clean Harvest',text:'Mimi picks leafy vegetables with her teacher. They place them in a clean container. The class learns to wash the leaves carefully before preparing food.',q:'Where do they place the vegetables?',answers:['On a dirty floor','In a clean container','Beside sharp tools'],correct:1,explain:'Clean containers help keep harvested food safe.'},
{title:'The Garden Team',text:'Four children work in the garden. Two observe leaves, one counts plants, and one records their findings. They share what they learned with the class.',q:'Who records the findings?',answers:['One child','Every visitor','Nobody'],correct:0,explain:'One child records the observations.'}
];
const sentences=[
{words:['We','grow','okra','in','our','garden.'],hint:'What do we grow in our garden?'},
{words:['The','tomato','is','red.'],hint:'Describe the tomato.'},
{words:['Plants','need','water','to','grow.'],hint:'What do plants need?'},
{words:['I','wash','vegetables','before','eating.'],hint:'What should I do before eating vegetables?'},
{words:['Our','teacher','shows','us','the','seeds.'],hint:'What does our teacher show us?'},
{words:['We','keep','the','garden','clean.'],hint:'How do we care for the garden?'}
];
const maths=[
{a:4,b:3,kind:'+',crop:'🍅',text:'Amina picks 4 tomatoes. Tunde picks 3 more. How many tomatoes do they have altogether?'},
{a:9,b:4,kind:'−',crop:'🥕',text:'There are 9 carrots. The class harvests 4. How many remain?'},
{a:6,b:5,kind:'+',crop:'🫑',text:'One bed has 6 peppers and another has 5. How many peppers are there altogether?'},
{a:12,b:3,kind:'−',crop:'🍋',text:'There are 12 lemons. Three are picked. How many remain?'},
{a:7,b:6,kind:'+',crop:'🥬',text:'The class counts 7 lettuce plants and 6 spinach plants. How many plants altogether?'},
{a:15,b:5,kind:'−',crop:'🍅',text:'There are 15 tomatoes in a basket. Five are shared. How many are left?'}
] as const;
const needs=[
{title:'Sunlight',icon:'☀️',q:'Why is sunlight important for green plants?',answers:['It helps plants make food','It turns soil into plastic','It removes all roots'],correct:0,explain:'Green plants use light energy to make food through photosynthesis.'},
{title:'Water',icon:'💧',q:'What can happen if a plant receives too little water?',answers:['It may wilt','It becomes a stone','It grows without limits'],correct:0,explain:'Plants need water to maintain their tissues and support growth.'},
{title:'Air',icon:'🌬️',q:'Which part of the plant exchanges gases with the air?',answers:['Leaves','A plastic pot','A metal spoon'],correct:0,explain:'Leaves exchange gases with the surrounding air.'},
{title:'Soil',icon:'🟫',q:'What can soil provide to many garden plants?',answers:['Support, water and nutrients','Electricity from wires','Plastic toys'],correct:0,explain:'Soil anchors roots and stores water and nutrients.'},
{title:'Roots',icon:'🌱',q:'What is an important job of roots?',answers:['Absorb water','Make garden signs','Wash vegetables'],correct:0,explain:'Roots take up water and mineral nutrients.'},
{title:'Leaves',icon:'🍃',q:'What do green leaves help a plant do?',answers:['Make food using light','Turn into stones','Carry watering cans'],correct:0,explain:'Green leaves contain chlorophyll and capture light for photosynthesis.'}
];
const decisions=[
{q:'The soil is still moist. What should you do?',answers:['Check again before watering','Pour water continuously','Flood the pathway'],correct:0,explain:'Check moisture and water when needed.'},
{q:'You find a sharp tool beside a garden bed. What should you do?',answers:['Pick it up and play','Tell the teacher','Hide it in the soil'],correct:1,explain:'Ask a supervising adult to handle sharp tools.'},
{q:'A tomato falls on dirty ground. What should you do before eating it?',answers:['Eat it immediately','Clean it properly with safe water','Rub it on your shirt'],correct:1,explain:'Wash produce using safe water before eating.'},
{q:'Your friend steps on young seedlings. What is a helpful response?',answers:['Show them the garden path','Step on more seedlings','Pull out the plants'],correct:0,explain:'Use designated paths to protect growing plants.'},
{q:'You notice yellow leaves on a plant. What should you do?',answers:['Observe and tell the teacher','Add random chemicals','Throw away every plant'],correct:0,explain:'Record observations and seek adult guidance before treatment.'},
{q:'The class finishes harvesting. What should happen next?',answers:['Leave waste on paths','Clean tools and tidy the area','Leave food in the sun all day'],correct:1,explain:'Good garden practice includes cleaning and safe storage.'}
];
const positions=['Top left','Top right','Middle left','Middle right','Bottom left','Bottom right'];
const objects=['🥕','🍅','🪴','💧','🥬','🧺'];
export default function PrimaryOneFoodPack(){
const [activity,setActivity]=useState<number|null>(null),[index,setIndex]=useState(0),[feedback,setFeedback]=useState(''),[chosen,setChosen]=useState<number[]>([]);
const select=(a:number|null)=>{setActivity(a);setIndex(0);setFeedback('');setChosen([])};
const nextQuestion=(delta:number)=>{setIndex(v=>v+delta);setFeedback('');setChosen([])};
const check=(correct:boolean,why:string)=>setFeedback(correct?'✓ Correct! '+why:'Not quite. Read the question and try again.');
const questionCount=activity===1?sentences.length:activity===2?maths.length:6;
const choiceButtons=(answers:string[],correct:number,explain:string)=><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,180px),1fr))',gap:10}}>{answers.map((answer,i)=><button key={i} style={btn} onClick={()=>check(i===correct,explain)}>{answer}</button>)}</div>;
const math=maths[index],result=math.kind==='+'?math.a+math.b:math.a-math.b;
const wordSet=sentences[index].words;
const availableWords=wordSet.map((word,i)=>({word,i})).filter(({i})=>!chosen.includes(i)).sort((a,b)=>(a.i*3+2)%wordSet.length-(b.i*3+2)%wordSet.length);
return <section style={{border:'1px solid #d6e5d9',borderRadius:18,padding:'clamp(14px,3vw,28px)',background:'white',marginTop:16}}>
<strong style={{color:GREEN}}>PRIMARY 1 · GM-P11 · ALPHABET FOOD GARDEN</strong><h2>My Food Learning Garden</h2>
{activity===null?<><p>Read, write, calculate, investigate and make good garden decisions. Each activity develops a different Primary 1 skill.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,245px),1fr))',gap:14}}>{lessons.map((lesson,i)=><button key={lesson.title} onClick={()=>select(i)} style={{...btn,textAlign:'left',minHeight:130}}><div style={{fontSize:32}}>{lesson.icon}</div><strong>{lesson.title} →</strong><p style={{fontSize:14,marginBottom:0}}>{lesson.description}</p></button>)}</div></>:<>
<nav aria-label="Primary 1 learning navigation" style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',marginBottom:24}}><button style={btn} onClick={()=>select(null)}>← All activities</button><strong>{lessons[activity].title} · {activity+1} of 6</strong><div style={{display:'flex',gap:8}}><button style={btn} disabled={activity===0} onClick={()=>select(activity-1)}>← Previous</button><button style={{...btn,background:GREEN,color:'white'}} onClick={()=>select(activity===5?null:activity+1)}>{activity===5?'Finish ✓':'Next →'}</button></div></nav>
<div style={{maxWidth:760,margin:'0 auto'}}>
{activity===0&&<><h3>{reading[index].title}</h3><article style={{background:'#f3f8ef',padding:20,borderRadius:12,fontSize:19,lineHeight:1.7}}>{reading[index].text}</article><h4>{reading[index].q}</h4>{choiceButtons(reading[index].answers,reading[index].correct,reading[index].explain)}</>}
{activity===1&&<><h3>Make a Food Sentence</h3><p>{sentences[index].hint} Tap the words in the correct order to form a sentence.</p><div aria-live="polite" style={{background:'#f0f7ed',padding:18,minHeight:75,borderRadius:12,fontSize:21}}>{chosen.map(i=>wordSet[i]).join(' ')||'Your sentence appears here...'}</div><div style={{display:'flex',gap:9,flexWrap:'wrap',marginTop:16}}>{availableWords.map(({word,i})=><button style={btn} key={i} onClick={()=>{setChosen(v=>[...v,i]);setFeedback('')}}>{word}</button>)}</div><div style={{display:'flex',gap:9,marginTop:15,flexWrap:'wrap'}}><button style={btn} onClick={()=>{setChosen(v=>v.slice(0,-1));setFeedback('')}} disabled={!chosen.length}>Undo word</button><button style={btn} onClick={()=>{setChosen([]);setFeedback('')}}>Start again</button><button style={{...btn,background:GREEN,color:'white'}} onClick={()=>check(chosen.map(i=>wordSet[i]).join(' ')===wordSet.join(' '),'You made a complete sentence!')}>Check sentence</button></div></>}
{activity===2&&<><h3>Garden Maths</h3><p style={{fontSize:19}}>{math.text}</p><div style={{background:'#f3f8ef',padding:20,borderRadius:12,fontSize:30,fontWeight:700}}>{math.a} {math.kind} {math.b} = ?</div><p>Choose the correct answer.</p>{choiceButtons([String(result+2),String(result),String(Math.max(0,result-2))],1,math.a+' '+math.kind+' '+math.b+' = '+result+'.')}</>}
{activity===3&&<><h3>{needs[index].icon} {needs[index].title}</h3><p style={{fontSize:19}}>{needs[index].q}</p>{choiceButtons(needs[index].answers,needs[index].correct,needs[index].explain)}</>}
{activity===4&&<><h3>Explore the Garden Map</h3><p>Look at the garden map. Which object is at the <strong>{positions[index]}</strong>?</p><div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:10,maxWidth:430,background:'#e7f1e2',padding:12,borderRadius:14}}>{objects.map((o,i)=><div key={i} style={{background:'white',border:'2px solid #b5d0b7',borderRadius:10,padding:14,textAlign:'center',fontSize:45}} aria-label={positions[i]}>{o}</div>)}</div><p>Use top, middle, bottom, left and right to describe positions.</p>{choiceButtons([objects[index],objects[(index+2)%6],objects[(index+4)%6]],0,'You found the object at '+positions[index]+'.')}</>}
{activity===5&&<><h3>Garden Decisions</h3><p style={{fontSize:19}}>{decisions[index].q}</p>{choiceButtons(decisions[index].answers,decisions[index].correct,decisions[index].explain)}</>}
{feedback&&<p role="status" style={{background:'#eef7e9',borderLeft:'4px solid #FDB515',padding:14,marginTop:20}}>{feedback}</p>}
<div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginTop:24}}><button style={btn} disabled={index===0} onClick={()=>nextQuestion(-1)}>← Previous question</button><button style={btn} disabled={index===questionCount-1} onClick={()=>nextQuestion(1)}>Next question →</button><strong>{index+1} of {questionCount}</strong></div>
<details style={{marginTop:24}}><summary style={{cursor:'pointer',fontWeight:700}}>Teacher & parent guide / answer key</summary><p>Primary 1 emphasizes reading short passages, constructing sentences, addition and subtraction, plant science, spatial directions and safe garden decisions. Questions provide corrective feedback. In the sentence activity, the correct order is the natural sentence displayed in the lesson data. Garden maths uses the stated addition or subtraction. Teachers can ask learners to explain their answers orally or in writing.</p></details>
</div></>}
</section>;
}
