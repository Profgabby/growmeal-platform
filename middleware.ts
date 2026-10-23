import {NextResponse,type NextRequest} from 'next/server';
import {createServerClient,type CookieOptions} from '@supabase/ssr';
const publicDesignPreviews=['/teacher','/parent'];
const schoolPrefixes=['/dashboard','/gardens','/curriculum','/resources','/quizzes','/challenges','/learner','/teacher','/reviewer','/training','/hq','/onboarding'];
export async function middleware(request:NextRequest){
 const path=request.nextUrl.pathname;
 if(publicDesignPreviews.includes(path))return NextResponse.next();
 if(!schoolPrefixes.some(prefix=>path===prefix||path.startsWith(prefix+'/')))return NextResponse.next();
 // Staff and administration routes remain closed until fine-grained role and school-ID authorization is implemented.
 if(['/teacher','/reviewer','/training','/hq','/onboarding'].some(prefix=>path===prefix||path.startsWith(prefix+'/')))return denied(request);
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)return denied(request);
 const response=NextResponse.next();
 const supabase=createServerClient(url,key,{cookies:{
  getAll(){return request.cookies.getAll()},
  setAll(values:Array<{name:string;value:string;options:CookieOptions}>){values.forEach(({name,value,options})=>{request.cookies.set(name,value);response.cookies.set(name,value,options)})}
 }});
 try{
  const {data:{user},error:userError}=await supabase.auth.getUser();
  if(userError||!user)return denied(request);
  const {data:allowed,error:accessError}=await supabase.rpc('growmeal_has_school_access');
  if(accessError||allowed!==true)return denied(request);
  return response;
 }catch{return denied(request)}
}
function denied(request:NextRequest){const target=request.nextUrl.clone();target.pathname='/school-access-unavailable';target.search='';return NextResponse.rewrite(target,{status:403})}
export const config={matcher:['/dashboard/:path*','/gardens/:path*','/curriculum/:path*','/resources/:path*','/quizzes/:path*','/challenges/:path*','/learner/:path*','/teacher/:path*','/reviewer/:path*','/training/:path*','/hq/:path*','/onboarding/:path*']};
