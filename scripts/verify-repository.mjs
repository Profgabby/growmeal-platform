#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const parseCsv=text=>{const rows=[];let row=[],field='',q=false;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(q&&text[i+1]==='"'){field+='"';i++;}else q=!q;}else if(c===','&&!q){row.push(field);field='';}else if((c==='\n'||c==='\r')&&!q){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);if(row.some(v=>v!==''))rows.push(row);row=[];field='';}else field+=c;}if(field||row.length){row.push(field);rows.push(row)}return rows};
const csv=p=>{const rows=parseCsv(read(p));const h=rows.shift().map(x=>x.trim().toLowerCase());return rows.map(r=>Object.fromEntries(h.map((k,i)=>[k,r[i]??''])))};
const aq=csv('data/MASTER_AQ001_AQ500_Assessment_Blueprint.csv');
const fsc=csv('data/MASTER_FSC001_FSC500_Food_Smart_Challenge_Index.csv');
const expected=(prefix)=>Array.from({length:500},(_,i)=>`${prefix}-${String(i+1).padStart(3,'0')}`);
function audit(rows,prefix){const ids=rows.map(x=>x.id).filter(Boolean),set=new Set(ids),exp=expected(prefix);return {rows:rows.length,unique:set.size,missing:exp.filter(x=>!set.has(x)),duplicates:[...new Set(ids.filter((x,i,a)=>a.indexOf(x)!==i))],unexpected:[...set].filter(x=>!exp.includes(x)),blankRequired:rows.filter(x=>!x.id).length};}
const aqAudit=audit(aq,'AQ'),fscAudit=audit(fsc,'FSC');
const curriculum=read('lib/curriculum.ts');
const gardens=[...curriculum.matchAll(/mk\('([NPJ S]\d{2})'/g)].map(m=>m[1]).filter(x=>!x.includes(' '));
const canonical=[...Array.from({length:10},(_,i)=>`N${String(i+1).padStart(2,'0')}`),...Array.from({length:20},(_,i)=>`P${i+11}`),...Array.from({length:10},(_,i)=>`J${i+31}`),...Array.from({length:10},(_,i)=>`S${i+41}`)];
const gardenSet=new Set(gardens);
const routes=['app/page.tsx','app/gardens/page.tsx','app/quizzes/page.tsx','app/challenges/page.tsx','app/resources/page.tsx','app/teacher/page.tsx','app/learner/page.tsx','app/login/page.tsx','app/api/quiz-bank/route.ts','app/api/challenge-bank/route.ts'];
const routeAudit=routes.map(p=>({path:p,exists:exists(p)}));
let imageRows=[];try{imageRows=csv('data/garden-image-map.csv')}catch{}
const imageCodes=new Set(imageRows.map(r=>r.garden_id||r.garden||r.code||r.id).filter(Boolean));
const report={generatedAt:new Date().toISOString(),aq:aqAudit,fsc:fscAudit,gardens:{parsed:gardens.length,unique:gardenSet.size,missing:canonical.filter(x=>!gardenSet.has(x)),unexpected:[...gardenSet].filter(x=>!canonical.includes(x))},routes:routeAudit,images:{mapRows:imageRows.length,missingMappings:imageCodes.size?canonical.filter(x=>!imageCodes.has(x)):['image-map-columns-not-recognized']}};
report.pass=aqAudit.rows===500&&aqAudit.unique===500&&!aqAudit.missing.length&&!aqAudit.duplicates.length&&fscAudit.rows===500&&fscAudit.unique===500&&!fscAudit.missing.length&&!fscAudit.duplicates.length&&gardenSet.size===50&&!report.gardens.missing.length&&routeAudit.every(x=>x.exists);
fs.mkdirSync(path.join(root,'qa'),{recursive:true});fs.writeFileSync(path.join(root,'qa','repository-verification.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));process.exit(report.pass?0:1);
