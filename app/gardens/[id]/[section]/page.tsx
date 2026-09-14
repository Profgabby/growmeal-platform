import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getGarden,getItems,itemSummary,itemTitle,sectionConfig} from '@/lib/garden-content';

export default async function GardenSection({params}:{params:Promise<{id:string;section:string}>}){
 const {id,section}=await params; const garden=getGarden(id),cfg=sectionConfig[section]; if(!garden||!cfg)notFound(); const items=getItems(id,section);
 return <><div className="crumbs"><Link href="/curriculum">Classes & Gardens</Link><span>›</span><Link href={`/gardens/${id}`}>{garden.name}</Link><span>›</span><b>{cfg.title}</b></div>
 <div className="eyebrow">{cfg.eyebrow} · {id}</div><h1>{cfg.title}</h1><p className="lead">{cfg.description}</p><div className="section-cover"><img src={garden.image} alt=""/><div><b>{garden.name}</b><p>{garden.focus}</p><span>{items.length} full content items</span></div></div>
 {items.length?<div className="full-content-list">{items.map((item:any,i:number)=><Link key={item.code||i} href={`/gardens/${id}/${section}/${encodeURIComponent(item.code||String(i+1))}`} className="full-content-card"><div className="content-code">{item.code||String(i+1).padStart(2,'0')}</div><div><h3>{itemTitle(item,section)}</h3><p>{itemSummary(item,section)}</p><span>Open full content →</span></div></Link>)}</div>:<div className="panel empty-state"><b>Content is being assigned.</b><p>This section has no garden-specific records yet.</p></div>}
 </>
}
