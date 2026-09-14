export type Status = 'good' | 'warning' | 'critical' | 'neutral';
export type Metric = { label: string; value: string; note?: string; status?: Status };
export type Task = { title: string; detail: string; due: string; status: Status };
export type Garden = { code: string; name: string; level: string; status: string; maintenance: string; water: string };
export type Learner = { id: string; name: string; progress: number; assessment: number; passport: number; attention?: string };
