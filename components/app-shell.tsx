'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import {useLanguage} from './language-provider';
import {createClient} from '@/lib/supabase/client';
import {gmText} from '@/lib/growmeal/translations';
import {localizedAudience} from '@/lib/marketplace/localization';
import {audienceOptions,isGrowAudience,preferenceKey,type GrowAudience} from '@/lib/growmeal/preferences';

type Role='learner'|'teacher'|'school_admin'|'reviewer'|'trainer'|'platform_admin'|'admin';
type NavItem={href:string;label:string;icon:string;scope:'all'|'school'|'grower'|'staff';roles?:Role[]};
const items:NavItem[]=[
 {href:'/my-garden',label:'My Growing Dashboard',icon:'✿',scope:'all'},
 {href:'/student-preview',label:'Student Dashboards · Preview',icon:'📚',scope:'all'},
 {href:'/account',label:'Customer Account',icon:'♙',scope:'all'},
 {href:'/marketplace-dev',label:'Garden Marketplace',icon:'▣',scope:'all'},
 {href:'/library',label:'Knowledge & Resource Library',icon:'📚',scope:'all'},
 {href:'/growmeal-bank',label:'GrowMeal Knowledge Bank',icon:'▤',scope:'all'},
 {href:'/growmeal-bot',label:'GrowMeal Bot',icon:'◎',scope:'all'},
 {href:'/growmeal-activities',label:'Quizzes & DIY Challenges',icon:'★',scope:'grower'},
 {href:'/play-discover',label:'Play & Discover',icon:'✦',scope:'all'},
 {href:'/dashboard',label:'School Learning Dashboard',icon:'⌂',scope:'school'},
 {href:'/gardens',label:'32 School Gardens',icon:'♧',scope:'school'},
 {href:'/curriculum',label:'School Curriculum',icon:'▦',scope:'school'},
 {href:'/resources',label:'School Resources',icon:'▤',scope:'school'},
 {href:'/quizzes',label:'School Quizzes',icon:'?',scope:'school'},
 {href:'/challenges',label:'School Challenges',icon:'★',scope:'school'},
 {href:'/learner/passport',label:'My Passport',icon:'◈',scope:'school',roles:['learner']},
 {href:'/teacher',label:'Teacher Dashboard',icon:'⌂',scope:'staff',roles:['teacher','school_admin']},
 {href:'/teacher/week',label:'Teacher Week',icon:'✓',scope:'staff',roles:['teacher','school_admin']},
 {href:'/teacher/classes',label:'Classes & Learners',icon:'♟',scope:'staff',roles:['teacher','school_admin']},
 {href:'/teacher/enrollments',label:'Memberships & Enrollments',icon:'♙',scope:'staff',roles:['school_admin']},
 {href:'/teacher/assessments',label:'School Assessment',icon:'◎',scope:'staff',roles:['teacher','school_admin']},
 {href:'/teacher/challenges',label:'Challenge Review',icon:'★',scope:'staff',roles:['teacher','school_admin']},
 {href:'/teacher/passport',label:'Passport Verification',icon:'◈',scope:'staff',roles:['teacher','school_admin']},
 {href:'/reviewer',label:'M&E Audit',icon:'◉',scope:'staff',roles:['reviewer','platform_admin','admin']},
 {href:'/training',label:'Teacher Training',icon:'♜',scope:'staff',roles:['teacher','school_admin','trainer','platform_admin','admin']},
 {href:'/hq',label:'LIFEWS HQ',icon:'◆',scope:'staff',roles:['platform_admin','admin']}
];
const publicAuth=['/signup','/login'];
export default function AppShell({children}:{children:React.ReactNode}){
 const p=usePathname();const {lang,setLang,languages}=useLanguage();const tx=(n:number)=>gmText(lang,n);
 const [role,setRole]=useState<Role|null>(null),[checked,setChecked]=useState(false),[audience,setAudience]=useState<GrowAudience>('Household');
 useEffect(()=>{try{const saved=localStorage.getItem(preferenceKey);if(isGrowAudience(saved))setAudience(saved)}catch{}},[p]);
 useEffect(()=>{let live=true;(async()=>{try{const s=createClient();const {data:{user}}=await s.auth.getUser();if(!live)return;if(!user){setRole(null);setChecked(true);return}const {data:m}=await s.from('growmeal_memberships').select('role').eq('user_id',user.id).limit(1).maybeSingle();const {data:profile}=await s.from('growmeal_profiles').select('role').eq('id',user.id).maybeSingle();if(!live)return;setRole((m?.role||profile?.role||'learner') as Role);setChecked(true)}catch{if(live)setChecked(true)}})();return()=>{live=false}},[p]);
 if(publicAuth.some(x=>p===x||p.startsWith(x+'/')))return <main className="public-main">{children}</main>;
 // The public design previews supply their own sidebar; avoid nesting the marketplace sidebar.
 if(p==='/teacher'||p==='/parent')return <main style={{minHeight:'100vh'}}>{children}</main>;
 const school=audience==='School';
 const visible=items.filter(x=>(x.scope==='all'||(x.scope==='school'&&school)||(x.scope==='grower'&&!school)||(x.scope==='staff'&&school&&checked&&role&&(!x.roles||x.roles.includes(role))))&&(!x.roles||x.scope==='staff'||(checked&&role&&x.roles.includes(role))));
 function choose(value:string){if(!isGrowAudience(value))return;setAudience(value);try{localStorage.setItem(preferenceKey,value);window.dispatchEvent(new Event('growmeal-audience-change'))}catch{}}
 return <div className="shell" dir={lang==='ar'?'rtl':'ltr'}><aside className="sidebar"><div className="brand"><div style={{width:52,height:52,background:'#FDB515',borderRadius:12,color:'#006B3C',display:'grid',placeItems:'center',fontSize:26,fontWeight:900}}>G</div><div><b>LIFEWS GrowMeal</b><span>{lang==='fr'?'Cultivez vous-même · Connaissez vos aliments':lang==='ar'?'ازرع غذاءك · اعرف طعامك':lang==='ha'?'Shuka abincinka · San abincinka':lang==='yo'?'Gbin oúnjẹ rẹ · Mọ oúnjẹ rẹ':lang==='ig'?'Kụọ nri gị · Mara nri gị':'Grow your own · Know your food'}</span></div></div>
 <div style={{padding:'0 8px 14px'}}><label htmlFor="growmeal-audience" style={{display:'block',fontSize:12,marginBottom:5}}>{tx(9)}</label><select id="growmeal-audience" value={audience} onChange={e=>choose(e.target.value)} style={{width:'100%',padding:10,borderRadius:9,border:0}}>{audienceOptions.map(a=><option key={a} value={a}>{localizedAudience(lang,a)}</option>)}</select></div>
 <nav aria-label="GrowMeal main navigation">{visible.slice(0,school?14:9).map(x=><Link className={p===x.href||p.startsWith(x.href+'/')?'active':''} href={x.href} key={x.href}><i>{x.icon}</i><span>{({'/my-garden':tx(11),'/account':lang==='fr'?'Mon compte':lang==='ar'?'حسابي':lang==='ha'?'Asusuna':lang==='yo'?'Àkọọ́lẹ̀ mi':lang==='ig'?'Akaụntụ m':'My Account','/marketplace-dev':tx(0),'/growmeal-bank':tx(12),'/growmeal-bot':tx(13),'/growmeal-activities':tx(14),'/dashboard':tx(15),'/gardens':tx(16),'/curriculum':tx(17),'/resources':tx(18),'/quizzes':tx(19),'/challenges':tx(20)} as Record<string,string>)[x.href]||x.label}</span></Link>)}{school&&visible.length>14&&<details style={{padding:'6px 8px'}}><summary style={{cursor:'pointer',padding:9}}>{tx(22)}</summary>{visible.slice(14).map(x=><Link href={x.href} key={x.href}><i>{x.icon}</i><span>{x.label}</span></Link>)}</details>}</nav>
 <div className="side-bottom"><label>{tx(10)}</label><select value={lang} onChange={e=>setLang(e.target.value)}>{languages.map((x:any)=><option key={x.code} value={x.code}>{x.native}</option>)}</select><div className="sync">Development preview · preferences saved locally</div></div></aside><main className="main">{children}</main></div>
}
