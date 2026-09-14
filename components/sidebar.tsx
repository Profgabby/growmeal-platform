import Link from 'next/link';
const nav = [
  ['Overview','/'],['HQ Dashboard','/hq'],['School Dashboard','/school'],['Teacher','/teacher'],['Current Week','/teacher/week'],['Assessments','/teacher/assessments'],['Passport','/teacher/passport'],['Classes','/teacher/classes'],['Invitations','/teacher/invitations'],['Classes','/teacher/classes'],['Invitations','/teacher/invitations'],['Learner','/learner'],['Gardens','/gardens'],['M&E Audit','/reviewer'],['Training','/training']
];
export function Sidebar(){return <aside className="sidebar"><div className="brand"><div className="brandMark">G</div><div><strong>GrowMeal™</strong><span>AgriShine Schools</span></div></div><nav>{nav.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav><div className="sidebarFoot"><div className="syncDot"/> Live curriculum · Supabase-backed<br/><small>School-scoped operations</small></div></aside>}
