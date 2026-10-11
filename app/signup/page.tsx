'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useState} from 'react';
import {createClient} from '@/lib/supabase/client';
import './signup.css';

export default function Signup(){
 const [name,setName]=useState('');const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [confirm,setConfirm]=useState('');const [msg,setMsg]=useState('');const [busy,setBusy]=useState(false);
 async function go(e:React.FormEvent){e.preventDefault();if(busy)return;if(password!==confirm){setMsg('Passwords do not match.');return}setBusy(true);setMsg('Creating your GrowMeal account…');
  try{const s=createClient();const timeout=new Promise<never>((_,reject)=>setTimeout(()=>reject(new Error('Account creation is taking longer than expected. Please check your connection and try again.')),15000));const signup=s.auth.signUp({email:email.trim(),password,options:{data:{full_name:name.trim()}}});const {data,error}=await Promise.race([signup,timeout]);if(error){setMsg(error.message);return}if(data.user&&data.session){location.assign('/my-garden');return}setMsg('Account created. Check your email to confirm your address, then sign in.');}
  catch(err:any){setMsg(err?.message||'We could not create the account. Please try again.')}finally{setBusy(false)}
 }
 return <div className="signup-page">
  <section className="signup-visual">
   <Image src="/gardens/J31.webp" alt="GrowMeal school production garden" fill priority sizes="(max-width: 900px) 100vw, 58vw"/>
   <div className="signup-shade"/>
   <div className="signup-brand"><Image src="/brand/agrishine-logo.png" alt="AgriShine Schools Initiative" width={92} height={92}/><div><strong>GrowMeal</strong><span>Food gardens for everyone</span></div></div>
   <div className="signup-story"><span className="signup-kicker">LIFEWS AGRISHINE GROWMEAL</span><h1>Grow Your Own.<br/>Know Your Food.<br/>Build Stronger Communities.</h1><p>Grow food at home, at school or in your community. Discover crops, track progress, learn practical skills and grow healthier food systems.</p><div className="signup-pillars"><span>🌱 <b>Grow Food</b></span><span>📖 <b>Learn Skills</b></span><span>👥 <b>Healthy Schools</b></span><span>🌍 <b>Stronger Communities</b></span></div></div>
   <div className="signup-stats"><span><b>32</b> Phase 1 School Gardens</span><span><b>500</b> AQ Activities</span><span><b>500</b> Food Smart Challenges</span><span><b>3,900</b> Vocabulary Entries</span></div>
  </section>
  <section className="signup-form-side"><div className="signup-form-wrap"><div className="mobile-brand"><Image src="/brand/agrishine-logo.png" alt="AgriShine" width={72} height={72}/><b>GrowMeal</b></div><span className="eyebrow">CREATE YOUR ACCOUNT</span><h2>Create Your GrowMeal Account</h2><p className="signup-intro">Create a GrowMeal account to explore crops and save your growing records. School staff access requires separate verified school membership.</p>
   <form onSubmit={go} className="signup-form"><label>Full name<input value={name} onChange={e=>setName(e.target.value)} autoComplete="name" placeholder="Enter your full name" required/></label><label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" required/></label><label>Password<input type="password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} autoComplete="new-password" placeholder="Minimum 8 characters" required/></label><label>Confirm password<input type="password" minLength={8} value={confirm} onChange={e=>setConfirm(e.target.value)} autoComplete="new-password" placeholder="Confirm your password" required/></label><button className="signup-submit" disabled={busy}>{busy?'Creating account…':'Create account'}</button>{msg&&<div className="signup-message" role="status">{msg}</div>}</form>
   <p className="signup-signin">Already have an account? <Link href="/login">Sign in</Link></p><p className="signup-legal">GrowMeal is a LIFEWS food-growing and learning platform for households, schools, communities and enterprises.</p></div></section>
 </div>
}
