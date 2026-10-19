'use client';
import {useState} from 'react';
export default function SssSecondGardenPack({garden}:{garden:'GM-S44'|'GM-S45'|'GM-S46'}){const [step,setStep]=useState(0);return <section><h2>{garden} · SSS investigation</h2><p>Activity {step+1} of 6</p><button onClick={()=>setStep((step+1)%6)}>Next activity →</button></section>}
