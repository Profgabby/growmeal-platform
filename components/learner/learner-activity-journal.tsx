'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {createClient} from '@/lib/supabase/client';
type Lane='learning'|'growing'|'languages';
type Entry={id:string;activity_key:string;class_label:string;note:string;status:string;updated_at:string};
export default function LearnerActivityJournal({lane,classLabel}:{lane:Lane;classLabel:string}){
 const identity=useRef<string|null>(null);
 const [uid,setUid]=useState<string|null>(null),[entries,setEntries]=useState<Entry[]>([]),[activity,setActivity]=useState(''),[note,setNote]=useState(''),[status,setStatus]=useState('in_progress'),[message,setMessage]=useState('Checking your saved work…'),[busy,setBusy]=useState(false);
 useEffect(()=>{
  let active=true;
  let request=0;
  const db=createClient();
  async function refresh(userId:string|null){
   const current=++request;
   identity.current=userId;
   setUid(userId);
   setEntries([]);
   setActivity('');
   setNote('');
   setStatus('in_progress');
   if(!userId){setMessage('Sign in to save and review your own work.');return;}
   setMessage('Loading your saved work…');
   const r=await db.from('growmeal_learner_activity').select('id,activity_key,class_label,note,status,updated_at').eq('learner_id',userId).eq('lane',lane).order('updated_at',{ascending:false}).limit(30);
   if(!active||current!==request||identity.current!==userId)return;
   setEntries(r.data||[]);
   setMessage(r.error?'Could not load saved work. Please retry.':'');
  }
  const {data:{subscription}}=db.auth.onAuthStateChange((_event,session)=>{
   // Defer database calls outside the auth callback to avoid auth-client lock contention.
   const id=session?.user?.id||null;
   identity.current=id;
   setUid(id);
   setEntries([]);
   void Promise.resolve().then(()=>{if(active)void refresh(id);});
  });
  void db.auth.getUser().then(({data:{user},error})=>{
   if(active&&(!identity.current||identity.current===user?.id))void refresh(error?null:user?.id||null);
  });
  return()=>{active=false;request++;subscription.unsubscribe();identity.current=null;};
 },[lane]);

 async function save(e:React.FormEvent){e.preventDefault();if(!uid||identity.current!==uid||busy)return;const key=activity.trim();if(!key||key.length>120)return;setBusy(true);setMessage('Saving…');const db=createClient();const result=await db.from('growmeal_learner_activity').upsert({learner_id:uid,lane,activity_key:key,class_label:classLabel,note:note.trim(),status,updated_at:new Date().toISOString()},{onConflict:'learner_id,lane,activity_key'}).select('id,activity_key,class_label,note,status,updated_at').single();if(identity.current!==uid)return;if(result.error){setMessage('Save failed. Your entry was not recorded.');}else{setEntries(prev=>[result.data as Entry,...prev.filter(x=>x.activity_key!==key)].slice(0,30));setMessage('Your work was saved to your account.');setActivity('');setNote('');setStatus('in_progress')}setBusy(false)}
 return <section className="student-card" aria-label="My saved activity journal"><h2>My saved {lane==='learning'?'learning':lane==='growing'?'garden project':'language practice'} journal</h2><p>Record what you actually did. These are personal activity notes, not teacher-verified scores or official lesson completion.</p>{uid?<form className="gm-account-form" onSubmit={save}><label>Activity or project name<input required maxLength={120} value={activity} onChange={e=>setActivity(e.target.value)} placeholder="e.g. Seed observation"/></label><label>My observation or reflection<textarea maxLength={2000} rows={3} value={note} onChange={e=>setNote(e.target.value)} placeholder="What did you do or learn?"/></label><label>My self-reported stage<select value={status} onChange={e=>setStatus(e.target.value)}><option value="in_progress">In progress</option><option value="completed">Completed (self-reported)</option></select></label><button className="btn primary" type="submit" disabled={busy}>{busy?'Saving…':'Save my work'}</button></form>:<Link className="btn primary" href="/login?next=/student-preview">Sign in to save →</Link>}<p role="status" className="student-info">{message}</p>{entries.length>0&&<div><h3>Recent saved entries</h3><ul className="gm-account-org-list">{entries.map(x=><li key={x.id} style={{display:'block'}}><strong>{x.activity_key}</strong><p>{x.note||'No reflection entered.'}</p><small>{x.class_label} · {x.status==='completed'?'Self-reported complete':'In progress'} · {new Date(x.updated_at).toLocaleDateString()}</small></li>)}</ul></div>}</section>
}