'use client';
import {useState} from 'react';
const banks={
'GM-S44':{heading:'SSS 1 · Irrigation and Pumping',questions:[
['12 m² receives 5 mm irrigation. Volume?','60 L','2.4 L','600 L','12 × 5 = 60 L.'],
['Net demand is 60 L and efficiency is 75%. Gross demand?','80 L','45 L','135 L','60 ÷ 0.75 = 80 L.'],
['Four emitters each discharge 2 L/h. Total?','8 L/h','2 L/h','6 L/h','4 × 2 = 8 L/h.'],
['At 15 L/min, how long to deliver 90 L?','6 min','15 min','1350 min','90 ÷ 15 = 6 min.'],
['Hydraulic power at 0.001 m³/s and 10 m head (ρ=1000, g=9.81)?','98.1 W','9.81 W','981 W','1000 × 9.81 × 0.001 × 10 = 98.1 W.'],
['Who should install powered irrigation equipment?','Qualified personnel','Unsupervised pupils','Anyone','Electrical installation requires qualified personnel.']]},
'GM-S45':{heading:'SSS 2 · Yield and Water Productivity',questions:[
['18 kg harvest from 6 m². Yield per area?','3 kg/m²','12 kg/m²','108 kg/m²','18 ÷ 6 = 3 kg/m².'],
['24 kg harvest with 120 L irrigation. Irrigation-water productivity?','0.2 kg/L','5 kg/L','144 kg/L','24 ÷ 120 = 0.2 kg/L.'],
['Control 200 L, treatment 150 L. Percentage water saving?','25%','50%','75%','(200 − 150) ÷ 200 × 100 = 25%.'],
['Which trial design is most defensible?','Randomized replicated comparable plots','Different soils','One plant per treatment','Replication and randomization reduce confounding.'],
['Plot yields are 8, 10 and 12 kg. Mean?','10 kg','12 kg','30 kg','(8 + 10 + 12) ÷ 3 = 10 kg.'],
['Water use and yield both fall. What should be reported?','Both outcomes and uncertainty','Only savings','Only yield','Trade-offs require both outcomes.']]},
'GM-S46':{heading:'SSS 3 · Controlled Soilless Experiments',questions:[
['Testing nutrient concentration: what changes deliberately?','Concentration','Every growing condition','Container colour','Vary the treatment factor, control others.'],
['Dilute 1 L of 1000 mg/L stock to 5 L total. Concentration?','200 mg/L','5000 mg/L','995 mg/L','1000 × 1 ÷ 5 = 200 mg/L.'],
['Start 40 L, add 5 L, lose 12 L. Remaining?','33 L','57 L','28 L','40 + 5 − 12 = 33 L.'],
['Why replicate independent units?','Estimate variability','Guarantee success','Avoid measurement','Replication estimates variability.'],
['Heights 12, 15 and 18 cm. Mean?','15 cm','18 cm','45 cm','(12 + 15 + 18) ÷ 3 = 15 cm.'],
['Which records best compare soilless systems?','Growth, yield, water and variability','Only height','Only solution use','Multiple measured outcomes support interpretation.']]}
} as const;
function Evidence({garden,step,question}:{garden:string;step:number;question:readonly string[]}){const items=[question[1],question[2],question[3]];return <svg viewBox="0 0 480 175" role="img" aria-label={'Activity '+(step+1)+' answer comparison'} data-asset-id={garden+'-SSS-'+step} style={{width:'100%',maxWidth:520,background:'#f2f8f0',borderRadius:12}}><text x="18" y="30" fontSize="16" fill="#006B3C">Compare the possible answers</text>{items.map((item,i)=><g key={i}><rect x={18+i*154} y="50" width="145" height="90" rx="8" fill={i===0?'#d9efdf':i===1?'#fff0c7':'#e3ecf4'} stroke="#006B3C"/><text x={90+i*154} y="99" fontSize="13" textAnchor="middle" fill="#273b2e">{item}</text></g>)}<text x="18" y="161" fontSize="11" fill="#516052">Answer-choice comparison · not an experimental measurement</text></svg>}
export default function SssSecondGardenPack({garden}:{garden:keyof typeof banks}){const [step,setStep]=useState<number|null>(null),[answer,setAnswer]=useState<number|null>(null);const bank=banks[garden],q=step===null?null:bank.questions[step];return <section style={{padding:20,border:'1px solid #c8decf',borderRadius:12}}><h2>{bank.heading}</h2>{q===null?bank.questions.map((item,i)=><button key={i} style={{display:'block',padding:14,margin:8}} onClick={()=>{setStep(i);setAnswer(null)}}>{i+1}. {item[0]}</button>):<><button onClick={()=>setStep(null)}>← Activities</button><h3>Activity {step!+1} of 6</h3><p>{q[0]}</p><Evidence garden={garden} step={step!} question={q}/>{([q[1],q[2],q[3]] as string[]).map((_,i,choices)=>{const sourceIndex=(i+step!+1)%choices.length;return <button key={i} style={{display:'block',padding:14,margin:8}} onClick={()=>setAnswer(sourceIndex)}>{choices[sourceIndex]}</button>})}<p role="status" aria-live="polite">{answer===null?'':answer===0?'Correct. '+q[4]:'Try again and check the calculation.'}</p><button onClick={()=>{setStep(step===5?null:step!+1);setAnswer(null)}}>Next →</button></>}</section>}
