import {NextRequest,NextResponse} from 'next/server';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {levels} from '@/lib/curriculum';

function parseCsv(text:string){
  const rows:string[][]=[];let row:string[]=[];let field='';let q=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];
    if(c==='"'){
      if(q&&text[i+1]==='"'){field+='"';i++;}else q=!q;
    }else if(c===','&&!q){row.push(field);field='';}
    else if((c==='\n'||c==='\r')&&!q){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);if(row.some(v=>v!==''))rows.push(row);row=[];field='';}
    else field+=c;
  }
  if(field||row.length){row.push(field);rows.push(row)}
  return rows;
}

function num(code:string){return Number((code||'').replace(/\D/g,''))}

export async function GET(req:NextRequest){
  const garden=req.nextUrl.searchParams.get('garden')||'N01';
  const all=levels.flatMap(l=>l.gardens.map(g=>({...g,level:l.name})));
  const g=all.find(x=>x.id===garden);
  if(!g)return NextResponse.json({error:'Unknown garden'},{status:404});
  const [from,to]=g.quizRange.split('–').map(num);
  const file=path.join(process.cwd(),'data','MASTER_AQ001_AQ500_Assessment_Blueprint.csv');
  const rows=parseCsv(readFileSync(file,'utf8'));
  const head=rows.shift()||[];
  const idx=Object.fromEntries(head.map((h,i)=>[h.trim(),i]));
  const out=rows.filter(r=>{const n=num(r[idx.id]);return n>=from&&n<=to})
    .map(r=>({id:r[idx.id],code:r[idx.id],garden_id:garden,dimension:(r[idx.domain]||'knowledge').toLowerCase().replaceAll('/','_').replaceAll(' ','_'),prompt:r[idx.question],answer:{guidance:r[idx.answer]}}));
  return NextResponse.json(out);
}
