export type PendingMutation={id:string;entity:string;operation:'insert'|'update';payload:unknown;createdAt:string};
const KEY='growmeal-offline-queue';
export function enqueue(x:Omit<PendingMutation,'id'|'createdAt'>){const q:PendingMutation[]=JSON.parse(localStorage.getItem(KEY)||'[]');q.push({...x,id:crypto.randomUUID(),createdAt:new Date().toISOString()});localStorage.setItem(KEY,JSON.stringify(q));window.dispatchEvent(new Event('growmeal-sync-change'))}
export function pending(){if(typeof window==='undefined')return 0;return JSON.parse(localStorage.getItem(KEY)||'[]').length}
export async function flush(){if(!navigator.onLine)return;const q:PendingMutation[]=JSON.parse(localStorage.getItem(KEY)||'[]');if(!q.length)return;const r=await fetch('/api/sync',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({mutations:q})});if(r.ok){localStorage.removeItem(KEY);window.dispatchEvent(new Event('growmeal-sync-change'))}}
