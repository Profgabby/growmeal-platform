'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import {levels} from '@/lib/curriculum';
import content from '@/data/garden-content.json';

export default function Gardens(){
  const [level,setLevel]=useState('all');
  const [query,setQuery]=useState('');
  const meta=(content as any).gardens;
  const gardens=useMemo(
    ()=>levels.flatMap(l=>l.gardens.map(g=>({...g,levelId:l.id,levelName:l.name,progression:l.progression}))),
    []
  );
  const rows=gardens.filter(g=>{ const matchesLevel=level==='all'||g.levelId===level; const haystack=`${g.id} ${g.name} ${g.focus} ${g.levelName}`.toLowerCase(); const matchesQuery=!query||haystack.includes(query.toLowerCase()); return matchesLevel&&matchesQuery; });
  return <>
    <div className="eyebrow">ALL 50 GROWMEAL™ GARDENS</div>
    <h1>Garden Directory</h1>
    <p className="lead">Open any garden to reach its photograph, full profile, ten learning-resource sections, AQ assessment items, Food Smart Challenges, passport evidence and applicable downloads.</p>
    <div className="filters">
      <input placeholder="Search garden, code or focus…" value={query} onChange={e=>setQuery(e.target.value)}/>
      <select value={level} onChange={e=>setLevel(e.target.value)}>
        <option value="all">All 50 gardens</option>
        {levels.map(l=><option key={l.id} value={l.id}>{l.name}</option>)}
      </select>
    </div>
    <div className="garden-grid visual-gardens">
      {rows.map(g=>(
        <article className="garden-card" key={g.id}>
          <Link href={`/gardens/${g.id}`} className="garden-image-link">
            <img src={meta[g.id]?.image||`/gardens/${g.id}.webp`} alt={`${g.name} garden`}/>
          </Link>
          <div className="garden-card-body">
            <div className="garden-no">{g.id}</div>
            <div>
              <small>{g.levelName}</small><h3>{g.name}</h3><p>{meta[g.id]?.description||g.focus}</p>
              <div className="chips"><span>{g.practicalRange}</span><span>{g.quizRange}</span><span>{g.challengeRange}</span></div>
              <div className="card-actions"><Link href={`/gardens/${g.id}`}>Open profile</Link><Link href={`/gardens/${g.id}/assessments`}>AQ items</Link><Link href={`/gardens/${g.id}/challenges`}>FSC challenges</Link></div>
            </div>
          </div>
        </article>
      ))}
    </div>
    {!rows.length&&<div className="panel empty-state"><b>No gardens match this search.</b></div>}
  </>
}
