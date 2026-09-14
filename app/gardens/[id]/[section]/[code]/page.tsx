import Link from 'next/link';
import {notFound} from 'next/navigation';
import {findItem,getGarden,itemTitle,sectionConfig} from '@/lib/garden-content';

const labels:Record<string,string>={
 PA_ID:'Activity ID',Level:'Level',Garden:'Garden',Activity:'Activity',Learning_Objective:'Learning objective',Expected_Evidence:'Expected evidence',
 id:'ID',level:'Level',garden:'Garden',mission_no:'Mission number',title:'Title',mission:'Mission',materials:'Materials',evidence:'Evidence',success:'Success criteria',safety:'Safety',agrishine:'AgriShine task',
 ID:'ID',Ingredient:'Ingredient',Plant_Part:'Plant part',Theme:'Theme',Objective:'Objective',Materials:'Materials',DIY:'DIY / low-cost adaptation',Method:'Method',Evidence:'Evidence',Questions:'Questions',Safety:'Safety',Steps:'Steps',Challenge:'Challenge',
 verb:'Demonstration verb',setup:'Setup',demo:'Demonstration',ask:'Ask learners',observe:'Observe',check:'Check for success',close:'Close the activity',
 Term:'Term',Category:'Category',Definition:'Definition',Example_or_Prompt:'Example / prompt',Garden_Link:'Garden link',domain:'Assessment dimension',question:'Question / task',answer:'Teacher answer / guidance',
 Domain:'Challenge domain',Context:'Context',Scenario:'Scenario',Task:'Learner task',Success_Criteria:'Success criteria',Extension:'Extension',
 Week:'Week',Garden_or_Focus:'Garden / focus',Vocabulary:'Vocabulary',Resource_Links:'Linked resources',Integrated_Extension:'Integrated extension',Assessment:'Assessment',Suggested_Flow:'Suggested lesson flow',
 task:'Task',verification:'Teacher verification'
};
const hide=new Set(['code']);
function display(v:any){return typeof v==='object'?JSON.stringify(v):String(v??'')}
export default async function ItemPage({params}:{params:Promise<{id:string;section:string;code:string}>}){
 const {id,section,code}=await params;const garden=getGarden(id),cfg=sectionConfig[section],item=findItem(id,section,code);if(!garden||!cfg||!item)notFound();
 return <><div className="crumbs"><Link href="/curriculum">Classes & Gardens</Link><span>›</span><Link href={`/gardens/${id}`}>{garden.name}</Link><span>›</span><Link href={`/gardens/${id}/${section}`}>{cfg.title}</Link><span>›</span><b>{item.code}</b></div>
 <div className="item-hero"><div><div className="eyebrow">{cfg.eyebrow} · {item.code}</div><h1>{itemTitle(item,section)}</h1><p className="lead">Full GrowMeal™ content record for {garden.name}.</p></div><img src={garden.image} alt=""/></div>
 <article className="panel content-record">{Object.entries(item).filter(([k,v])=>!hide.has(k)&&v!==''&&v!=null).map(([k,v])=><section key={k}><h3>{labels[k]||k.replaceAll('_',' ')}</h3><p>{display(v)}</p></section>)}</article>
 <div className="next-actions"><Link className="btn" href={`/gardens/${id}/${section}`}>← Back to {cfg.title}</Link>{section==='assessments'&&<Link className="btn primary" href={`/quizzes?garden=${id}`}>Open interactive assessment</Link>}{section==='challenges'&&<Link className="btn primary" href={`/challenges?garden=${id}`}>Open challenge submission</Link>}</div></>
}
