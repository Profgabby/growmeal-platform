import Link from 'next/link';
import {notFound} from 'next/navigation';
import {levels} from '@/lib/curriculum';
import {downloads} from '@/lib/resource-catalog';
import {getGarden,getItems,orderedSections,sectionConfig} from '@/lib/garden-content';

export default async function GardenPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params; const meta=getGarden(id); const local=levels.flatMap(l=>l.gardens.map(g=>({...g,level:l}))).find(x=>x.id===id); if(!meta||!local)notFound();
 const docs=downloads.filter(d=>!d.level||d.level===local.level.id);
 return <>
 <div className="garden-profile-hero">
   <img src={meta.image} alt={`${meta.name} learning garden`} />
   <div className="garden-profile-copy"><div className="eyebrow">{local.level.name} · {id}</div><h1>{meta.name}</h1><p className="lead">{meta.description}</p><div className="hero-actions"><Link className="btn primary" href={`/gardens/${id}/lesson-plan`}>Open full learning pathway</Link><Link className="btn" href={`/gardens/${id}/assessments`}>Assessment</Link><Link className="btn" href={`/gardens/${id}/challenges`}>Challenges</Link></div></div>
 </div>
 <section className="panel garden-about"><h2>About this garden</h2><div className="grid2"><div><h3>Learning focus</h3><p>{meta.focus}</p><h3>Progression</h3><p>{local.level.progression}</p></div><div><h3>Expected learner outcomes</h3><ul>{meta.outcomes.map((x:string)=><li key={x}>{x}</li>)}</ul></div></div></section>
 <section className="section-gap"><div className="section-title-row"><div><div className="eyebrow">FULL GARDEN CONTENT</div><h2>Open every learning resource</h2></div><span className="count-chip">{orderedSections.reduce((n,s)=>n+getItems(id,s).length,0)} content records</span></div><div className="content-section-grid">{orderedSections.map(slug=>{const cfg=sectionConfig[slug],items=getItems(id,slug);return <Link className="content-section-card" key={slug} href={`/gardens/${id}/${slug}`}><span>{cfg.eyebrow}</span><h3>{cfg.title}</h3><p>{cfg.description}</p><b>{items.length} {items.length===1?'item':'items'} →</b></Link>})}</div></section>
 <section className="panel section-gap"><h2>Garden resource downloads</h2><p>Level-wide journals, teacher manuals, implementation guides and technical resources that apply to this garden.</p><div className="mini-downloads">{docs.map(d=><a href={d.path} key={d.path} target={d.path.endsWith('.pdf')?'_blank':undefined}><span>↗</span><div><b>{d.title}</b><small>{d.type} · open/download</small></div></a>)}</div></section>
 </>
}
