#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const BASE=(process.env.GROWMEAL_BASE_URL||process.argv[2]||'https://growmeal-platform.vercel.app').replace(/\/$/,'');
const ROOT=process.cwd();
const gardenCodes=[...Array.from({length:10},(_,i)=>`N${String(i+1).padStart(2,'0')}`),...Array.from({length:20},(_,i)=>`P${String(i+11).padStart(2,'0')}`),...Array.from({length:10},(_,i)=>`J${i+31}`),...Array.from({length:10},(_,i)=>`S${i+41}`)];
const pad=n=>String(n).padStart(3,'0');
const num=s=>Number(String(s||'').replace(/\D/g,''));
function parseCsv(text){const rows=[];let row=[],field='',q=false;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(q&&text[i+1]==='"'){field+='"';i++;}else q=!q;}else if(c===','&&!q){row.push(field);field='';}else if((c==='\n'||c==='\r')&&!q){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);if(row.some(v=>v!==''))rows.push(row);row=[];field='';}else field+=c;}if(field||row.length){row.push(field);rows.push(row)}return rows;}
function csvIds(file){const rows=parseCsv(fs.readFileSync(path.join(ROOT,file),'utf8'));const head=rows.shift().map(x=>x.trim().toLowerCase());const ix=head.indexOf('id');return rows.map(r=>r[ix]).filter(Boolean)}
function validateIds(ids,prefix){const expected=Array.from({length:500},(_,i)=>`${prefix}-${pad(i+1)}`);const set=new Set(ids);return {count:ids.length,unique:set.size,missing:expected.filter(x=>!set.has(x)),duplicates:[...new Set(ids.filter((x,i,a)=>a.indexOf(x)!==i))],unexpected:[...set].filter(x=>!expected.includes(x))};}
async function get(url,opts={}){const started=Date.now();try{const r=await fetch(url,{redirect:'follow',...opts});const text=await r.text();return {ok:r.ok,status:r.status,url:r.url,ms:Date.now()-started,text,headers:Object.fromEntries(r.headers.entries())};}catch(e){return {ok:false,status:0,url,ms:Date.now()-started,text:'',error:String(e)}}}
function codes(items){return items.map(x=>x.code||x.id).filter(Boolean)}
const aq=validateIds(csvIds('data/MASTER_AQ001_AQ500_Assessment_Blueprint.csv'),'AQ');
const fsc=validateIds(csvIds('data/MASTER_FSC001_FSC500_Food_Smart_Challenge_Index.csv'),'FSC');
const gardenResults=[];
for(let i=0;i<gardenCodes.length;i++){
  const garden=gardenCodes[i],start=i*10+1;
  const expectedAQ=Array.from({length:10},(_,j)=>`AQ-${pad(start+j)}`),expectedFSC=Array.from({length:10},(_,j)=>`FSC-${pad(start+j)}`);
  const [qr,cr,page]=await Promise.all([get(`${BASE}/api/quiz-bank?garden=${garden}`),get(`${BASE}/api/challenge-bank?garden=${garden}`),get(`${BASE}/quizzes?garden=${garden}`)]);
  let q=[],c=[];try{q=JSON.parse(qr.text)}catch{}try{c=JSON.parse(cr.text)}catch{}
  const qcodes=Array.isArray(q)?codes(q):[],ccodes=Array.isArray(c)?codes(c):[];
  gardenResults.push({garden,aqExpected:`${expectedAQ[0]}–${expectedAQ[9]}`,fscExpected:`${expectedFSC[0]}–${expectedFSC[9]}`,quizStatus:qr.status,challengeStatus:cr.status,pageStatus:page.status,quizCount:qcodes.length,challengeCount:ccodes.length,quizExact:JSON.stringify(qcodes)===JSON.stringify(expectedAQ),challengeExact:JSON.stringify(ccodes)===JSON.stringify(expectedFSC),pageOk:page.ok,latencyMs:{quiz:qr.ms,challenge:cr.ms,page:page.ms}});
  process.stdout.write(`${garden}: AQ ${qcodes.length}/10 ${gardenResults.at(-1).quizExact?'✓':'✗'} | FSC ${ccodes.length}/10 ${gardenResults.at(-1).challengeExact?'✓':'✗'} | page ${page.status}\n`);
}
const routeChecks={};
for(const p of ['/','/gardens','/quizzes','/challenges','/resources']){const r=await get(BASE+p);routeChecks[p]={status:r.status,ok:r.ok,finalUrl:r.url,ms:r.ms};}
const invalid={};
for(const p of ['/api/quiz-bank?garden=BAD','/api/challenge-bank?garden=BAD']){const r=await get(BASE+p);invalid[p]={status:r.status,passes:r.status===404};}
const resources=JSON.parse(fs.readFileSync(path.join(ROOT,'data/resource-archive.json'),'utf8'));
const resourceRows=Array.isArray(resources)?resources:(resources.resources||resources.items||[]);
let resourceFailures=[];let tested=0;
for(const x of resourceRows){const href=x.href||x.url||x.path||x.download||x.download_url;if(!href||!String(href).startsWith('/'))continue;tested++;const r=await get(BASE+href,{method:'HEAD'});if(!r.ok)resourceFailures.push({href,status:r.status});}
const pass=aq.count===500&&aq.unique===500&&!aq.missing.length&&!aq.duplicates.length&&fsc.count===500&&fsc.unique===500&&!fsc.missing.length&&!fsc.duplicates.length&&gardenResults.every(x=>x.quizExact&&x.challengeExact&&x.pageOk)&&Object.values(routeChecks).every(x=>x.ok)&&Object.values(invalid).every(x=>x.passes)&&resourceFailures.length===0;
const report={generatedAt:new Date().toISOString(),baseUrl:BASE,pass,canonical:{aq,fsc},gardens:{total:gardenResults.length,passed:gardenResults.filter(x=>x.quizExact&&x.challengeExact&&x.pageOk).length,results:gardenResults},routes:routeChecks,invalidGardenChecks:invalid,downloads:{catalogRows:resourceRows.length,tested,failures:resourceFailures}};
fs.mkdirSync(path.join(ROOT,'qa'),{recursive:true});fs.writeFileSync(path.join(ROOT,'qa','production-verification.json'),JSON.stringify(report,null,2));
console.log(`\nPRODUCTION VERIFICATION: ${pass?'PASS':'FAIL'} | gardens ${report.gardens.passed}/50 | download failures ${resourceFailures.length}`);process.exit(pass?0:1);
