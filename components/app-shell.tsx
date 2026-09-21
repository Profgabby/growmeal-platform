'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import {useLanguage} from './language-provider';
import {createClient} from '@/lib/supabase/client';

type Role='learner'|'teacher'|'school_admin'|'reviewer'|'trainer'|'platform_admin'|'admin';
type NavItem=[string,string,string,Role[]?];
const items:NavItem[]=[
 ['/dashboard','dashboard','⌂'],
 ['/curriculum','curriculum','▦'],
 ['/resources','resources','▤'],
 ['/quizzes','quizzes','?'],
 ['/challenges','challenges','★'],
 ['/learner/passport','My Passport','◈',['learner']],
 ['/teacher','Teacher Dashboard','⌂',['teacher','school_admin']],
 ['/teacher/week','Teacher Week','✓',['teacher','school_admin']],
 ['/teacher/classes','Classes & Learners','♟',['teacher','school_admin']],
 ['/teacher/enrollments','Memberships & Enrollments','♙',['school_admin']],
 ['/teacher/assessments','assessment','◎',['teacher','school_admin']],
 ['/teacher/challenges','Challenge Review','★',['teacher','school_admin']],
 ['/teacher/passport','Passport Verification','◈',['teacher','school_admin']],
 ['/gardens','gardens','♧'],
 ['/reviewer','M&E Audit','◉',['reviewer','platform_admin','admin']],
 ['/training','Teacher Training','♜',['teacher','school_admin','trainer','platform_admin','admin']],
 ['/hq','LIFEWS HQ','◆',['platform_admin','admin']]
];
const publicAuth=['/signup','/login'];
export default function AppShell({children}:{children:React.ReactNode}){
 const p=usePathname();const {lang,setLang,t,languages}=useLanguage();const [role,setRole]=useState<Role|null>(null);const [checked,setChecked]=useState(false);
 useEffect(()=>{let live=true;(async()=>{try{const s=createClient();const {data:{user}}=await s.auth.getUser();if(!live)return;if(!user){setRole(null);setChecked(true);return}const {data:m}=await s.from('growmeal_memberships').select('role').eq('user_id',user.id).limit(1).maybeSingle();const {data:profile}=await s.from('growmeal_profiles').select('role').eq('id',user.id).maybeSingle();if(!live)return;setRole((m?.role||profile?.role||'learner') as Role);setChecked(true)}catch{if(live)setChecked(true)}})();return()=>{live=false}},[p]);
 if(publicAuth.some(x=>p===x||p.startsWith(x+'/')))return <main className="public-main">{children}</main>;
 const visible=items.filter(([, , ,roles])=>!roles||(checked&&role&&roles.includes(role)));
 return <div className="shell"><aside className="sidebar"><div className="brand"><Image src="/brand/agrishine-logo.png" alt="AgriShine Schools Initiative" width={150} height={84} priority/><div><b>GrowMeal</b><span>AgriShine Schools</span></div></div><nav>{visible.map(([href,key,icon])=><Link className={p===href||p.startsWith(href+'/')?'active':''} href={href} key={href}><i>{icon}</i><span>{t[key]||key}</span></Link>)}</nav><div className="side-bottom"><label>{t.language}</label><select value={lang} onChange={e=>setLang(e.target.value)}>{languages.map((x:any)=><option key={x.code} value={x.code}>{x.native}</option>)}</select><div className="sync"><span></span> Offline-ready</div></div></aside><main className="main">{children}</main></div>
}