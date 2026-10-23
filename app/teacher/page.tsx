import Link from 'next/link';
import {createClient} from '@/lib/supabase/server';
import {PageHeader,Panel} from '@/components/ui';

export default async function TeacherDashboard(){
 const db=await createClient();
 const {data:{user},error:authError}=await db.auth.getUser();
 if(authError||!user)return <><PageHeader eyebrow="TEACHER WORKSPACE" title="Teacher Dashboard" description="Sign in to access your authorized teaching workspace."/><Panel title="Authentication required"><p>School and learner records are not available to visitors.</p><Link href="/login?next=/teacher">Sign in →</Link></Panel></>;
 const membership=await db.from('growmeal_memberships').select('school_id,role').eq('user_id',user.id).in('role',['teacher','school_admin','admin']);
 if(membership.error)return <><PageHeader eyebrow="TEACHER WORKSPACE" title="Access unavailable" description="We could not verify your school authorization."/><Panel title="Access check failed"><p>Try again later or contact LIFEWS support.</p></Panel></>;
 const schools=[...new Set((membership.data||[]).map(x=>x.school_id))];
 if(!schools.length)return <><PageHeader eyebrow="TEACHER WORKSPACE" title="Teacher Dashboard" description="Your account has no verified teaching membership."/><Panel title="Awaiting school authorization"><p>Ask an authorized school administrator to assign your teaching role. Selecting a class cannot grant access.</p></Panel></>;
 const classes=await db.from('growmeal_classes').select('id,name,level_id,academic_year,term,school_id,active').in('school_id',schools).eq('active',true).order('name');
 if(classes.error)return <><PageHeader eyebrow="TEACHER WORKSPACE" title="Teacher Dashboard" description="Class records are currently unavailable."/><Panel title="Class retrieval failed"><p>No learner data has been displayed.</p></Panel></>;
 return <><PageHeader eyebrow="TEACHER WORKSPACE" title="Teacher Dashboard" description="Active classes associated with your school membership. This is an initial read-only workspace; verified class assignments are still required."/><Panel title="School classes"><p>{classes.data?.length||0} active class records visible under your current school membership.</p>{classes.data?.length?<ul>{classes.data.map(c=><li key={c.id}><strong>{c.name}</strong> — {c.level_id} · {c.academic_year} · {c.term}</li>)}</ul>:<p>No active classes have been registered.</p>}</Panel><Panel title="Teaching tools — pending authorization review"><p>Lesson assignment, assessment scoring, learner portfolios and attendance will be enabled only after class-level teacher assignment and end-to-end access tests. No demonstration learners or invented scores are displayed.</p><Link href="/teacher/week">Explore lesson planning →</Link></Panel></>;
}
