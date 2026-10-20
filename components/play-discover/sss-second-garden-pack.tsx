'use client';
import {useState} from 'react';
const banks={
'GM-S44':{heading:'SSS 1 · Irrigation and Pumping',questions:[
['A tank holds 150 L and a pump transfers 45 L to the garden. How much remains, ignoring other losses?','105 L','195 L','45 L','150 − 45 = 105 L; measure other losses separately.'],
['Net demand is 60 L and efficiency is 75%. Gross demand?','80 L','45 L','135 L','60 ÷ 0.75 = 80 L.'],
['Four emitters each discharge 2 L/h. Total?','8 L/h','2 L/h','6 L/h','4 × 2 = 8 L/h.'],
['At 15 L/min, how long to deliver 90 L?','6 min','15 min','1350 min','90 ÷ 15 = 6 min.'],
['Hydraulic power at 0.001 m³/s and 10 m head (ρ=1000, g=9.81)?','98.1 W','9.81 W','981 W','1000 × 9.81 × 0.001 × 10 = 98.1 W.'],
['Who should install powered irrigation equipment?','Qualified personnel','Unsupervised pupils','Anyone','Electrical installation requires qualified personnel.']]},
'GM-S45':{heading:'SSS 2 · Yield and Water Productivity',questions:[
['18 kg harvest from 6 m². Yield per area?','3 kg/m²','12 kg/m²','108 kg/m²','18 ÷ 6 = 3 kg/m².'],
['Two treatments yield 20 kg each, but one uses 80 L and the other 100 L. What is the yield-preserving irrigation reduction relative to 100 L?','20%','25%','80%','(100 − 80) ÷ 100 × 100 = 20%; equal yield is assumed for this comparison.'],
['Control 200 L, treatment 150 L. Percentage water saving?','25%','50%','75%','(200 − 150) ÷ 200 × 100 = 25%.'],
['A trial records harvest mass only from the largest plant in each plot. What is the main sampling problem?','Selection bias','Improved randomization','More independent replicates','Choosing only the largest plant biases the sample; use a predefined representative sampling protocol.'],
['Three independent plot yields are 8, 10 and 24 kg. Which statistic is less affected by the high value?','Median 10 kg','Mean 14 kg','Maximum 24 kg','The median is 10 kg and is less sensitive to the unusually high observation than the mean of 14 kg.'],
['Water use and yield both fall. What should be reported?','Both outcomes and uncertainty','Only savings','Only yield','Trade-offs require both outcomes.']]},
'GM-S46':{heading:'SSS 3 · Controlled Soilless Experiments',questions:[
['Testing nutrient concentration: what changes deliberately?','Concentration','Every growing condition','Container colour','Vary the treatment factor, control others.'],
['Dilute 1 L of 1000 mg/L stock to 5 L total. Concentration?','200 mg/L','5000 mg/L','995 mg/L','1000 × 1 ÷ 5 = 200 mg/L.'],
['Start 40 L, add 5 L, lose 12 L. Remaining?','33 L','57 L','28 L','40 + 5 − 12 = 33 L.'],
['Three hydroponic channels share one reservoir and receive one nutrient treatment. How many independently treated nutrient reservoirs are present?','One','Three','Nine','The treatment is delivered through one shared reservoir; channels are not independent nutrient-treatment replicates.'],
['A seedling increases from 12 cm to 18 cm in seven days. What is its relative height increase?','50%','6%','150%','(18 − 12) ÷ 12 × 100 = 50%; height change alone does not establish a treatment effect.'],
['Which records best compare soilless systems?','Growth, yield, water and variability','Only height','Only solution use','Multiple measured outcomes support interpretation.']]}
} as const;
export default function SssSecondGardenPack({garden}:{garden:keyof typeof banks}){const [step,setStep]=useState<number|null>(null),[answer,setAnswer]=useState<number|null>(null);const bank=banks[garden],q=step===null?null:bank.questions[step];return <section style={{padding:'clamp(12px,3vw,24px)',border:'1px solid #c8decf',borderRadius:12,minWidth:0,maxWidth:'100%'}}><h2>{bank.heading}</h2>{q===null?bank.questions.map((item,i)=><button key={i} style={{display:'block',padding:14,margin:'8px 0',width:'100%',textAlign:'left',whiteSpace:'normal',overflowWrap:'anywhere',borderRadius:9,border:'1px solid #b7cebb',background:'#fff',minHeight:48}} onClick={()=>{setStep(i);setAnswer(null)}}>{i+1}. {item[0]}</button>):<><button style={{minHeight:44,padding:10}} onClick={()=>{setStep(null);setAnswer(null)}}>← Activities</button><h3>Activity {step!+1} of 6</h3><p>{q[0]}</p>{([q[1],q[2],q[3]] as string[]).map((_,i,choices)=>{const sourceIndex=(i+step!+1)%choices.length;return <button key={i} style={{display:'block',padding:14,margin:'8px 0',width:'100%',textAlign:'left',whiteSpace:'normal',overflowWrap:'anywhere',minHeight:48,border:'1px solid #a8c6af',borderRadius:9,background:answer===sourceIndex?(answer===0?'#e0f3e3':'#fff0e5'):'#fff'}} onClick={()=>setAnswer(sourceIndex)}>{choices[sourceIndex]}</button>})}<p role="status" aria-live="polite">{answer===null?'':answer===0?'Correct. '+q[4]:'Try again and check the calculation.'}</p><button style={{minHeight:44,padding:10}} onClick={()=>{setStep(step===5?null:step!+1);setAnswer(null)}}>{step===5?'Finish activities':'Next activity →'}</button></>}</section>}
