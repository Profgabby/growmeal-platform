import {NextResponse,type NextRequest} from 'next/server';
const schoolPrefixes=['/dashboard','/gardens','/curriculum','/resources','/quizzes','/challenges','/learner','/teacher','/reviewer','/training','/hq','/onboarding'];
export function middleware(request:NextRequest){
 const path=request.nextUrl.pathname;
 if(schoolPrefixes.some(prefix=>path===prefix||path.startsWith(prefix+'/'))){
  // Fail closed until a trusted school membership service is connected to this isolated environment.
  // A locally selected audience or user-editable metadata MUST NOT grant school access.
  const target=request.nextUrl.clone();target.pathname='/school-access-unavailable';target.search='';
  return NextResponse.rewrite(target,{status:403});
 }
 return NextResponse.next();
}
export const config={matcher:['/dashboard/:path*','/gardens/:path*','/curriculum/:path*','/resources/:path*','/quizzes/:path*','/challenges/:path*','/learner/:path*','/teacher/:path*','/reviewer/:path*','/training/:path*','/hq/:path*','/onboarding/:path*']};
