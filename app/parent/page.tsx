import Link from 'next/link';
import {createClient} from '@/lib/supabase/server';
import {PageHeader,Panel} from '@/components/ui';

export default async function ParentDashboard(){
 const db=await createClient();
 const {data:{user},error}=await db.auth.getUser();
 if(error||!user)return <><PageHeader eyebrow="FAMILY WORKSPACE" title="Parent & Guardian Dashboard" description="Private access to your child's GrowMeal learning journey."/><Panel title="Sign in required"><p>Sign in before requesting a verified family link. No learner records are publicly available.</p><Link href="/login?next=/parent">Sign in →</Link></Panel></>;
 return <><PageHeader eyebrow="FAMILY WORKSPACE" title="Parent & Guardian Dashboard" description="Family access is being introduced with learner privacy as a prerequisite."/><Panel title="Verified learner connections"><p>No child records are displayed until a school-approved parent or guardian relationship is recorded and validated.</p><p>Link requests, identity verification, revocation, and consent controls are not yet available. Please contact your school to confirm its onboarding process.</p></Panel><Panel title="Planned family tools"><p>Once verification is implemented, families will be able to view authorized learning milestones, teacher feedback, garden-project updates, and school communications. Assessment edits and teacher-only materials will remain restricted.</p><Link href="/student-preview">Explore the public learning preview →</Link></Panel></>;
}
