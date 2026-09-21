'use client';
import {useEffect,useState} from 'react';
import {createClient} from '@/lib/supabase/client';

const routeFor=(role:string|null)=>role==='learner'?'/learner':role==='teacher'?'/teacher':role==='school_admin'?'/teacher':role==='reviewer'?'/reviewer':role==='trainer'?'/training':role==='platform_admin'||role==='admin'?'/hq':'/learner';

export default function DashboardRouter(){
 const [msg,setMsg]=useState('Opening your GrowMeal dashboard…');
 useEffect(()=>{(async()=>{const s=createClient();const {data:{user}}=await s.auth.getUser();if(!user){location.replace('/login?next=/dashboard');return}const {data:m}=await s.from('growmeal_memberships').select('role').eq('user_id',user.id).limit(1).maybeSingle();const {data:p}=await s.from('growmeal_profiles').select('role').eq('id',user.id).maybeSingle();const role=m?.role||p?.role||'learner';setMsg('Personalizing your workspace…');location.replace(routeFor(role))})().catch(()=>setMsg('We could not open your dashboard. Please sign in again.'))},[]);
 return <div className="panel" style={{maxWidth:720,margin:'60px auto'}}><div className="eyebrow">GROWMEAL</div><h1>Your dashboard</h1><p className="lead">{msg}</p></div>
}