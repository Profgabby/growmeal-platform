import {NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';

export const dynamic='force-dynamic';
export const revalidate=0;

/** Read-only, authenticated relationship lookup. All rows are additionally constrained by RLS. */
export async function GET(){
 const headers={'Cache-Control':'private, no-store, max-age=0'};
 const db=await createClient();
 const {data:{user},error}=await db.auth.getUser();
 if(error||!user)return NextResponse.json({error:'Authentication required'},{status:401,headers});
 const [teacher,guardian]=await Promise.all([
  db.from('growmeal_teacher_class_assignments').select('id,class_id,approval_status,approved_at').eq('teacher_id',user.id).eq('approval_status','approved'),
  db.from('growmeal_guardian_learner_links').select('id,learner_id,relationship,approval_status,approved_at').eq('guardian_id',user.id).eq('approval_status','approved')
 ]);
 if(teacher.error||guardian.error)return NextResponse.json({error:'Unable to verify school relationships'},{status:503,headers});
 return NextResponse.json({teacherAssignments:teacher.data||[],guardianLinks:guardian.data||[]},{headers});
}
