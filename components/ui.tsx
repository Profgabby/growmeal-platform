import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Metric, Status } from '@/lib/types';

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <header className="pageHeader"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <div>{action}</div>}</header>
}

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return <div className="metricGrid">{metrics.map(m => <div className="metricCard" key={m.label}><div className="metricLabel">{m.label}</div><div className="metricValue">{m.value}</div><div className={`metricNote ${m.status ?? 'neutral'}`}>{m.note}</div></div>)}</div>
}

export function StatusPill({ children, status='neutral' }: { children: ReactNode; status?: Status }) { return <span className={`pill ${status}`}>{children}</span> }

export function Panel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) { return <section className="panel"><div className="panelHeader"><h2>{title}</h2>{action}</div>{children}</section> }

export function Progress({ value }: { value: number }) { return <div className="progress"><span style={{width:`${value}%`}} /></div> }

export function ButtonLink({ href, children, secondary=false }: { href:string; children:ReactNode; secondary?:boolean }) { return <Link className={secondary?'button secondary':'button'} href={href}>{children}</Link> }
