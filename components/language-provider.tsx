'use client';
import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import {languages,ui} from '@/lib/i18n';
const C=createContext<any>(null);
export function LanguageProvider({children}:{children:React.ReactNode}){
 const [lang,setLang]=useState('en');
 useEffect(()=>{const x=localStorage.getItem('growmeal-language'); if(x)setLang(x)},[]);
 useEffect(()=>{localStorage.setItem('growmeal-language',lang);document.documentElement.lang=lang;document.documentElement.dir=languages.find(x=>x.code===lang)?.dir||'ltr'},[lang]);
 const value=useMemo(()=>({lang,setLang,t:ui[lang]||ui.en,languages}),[lang]);
 return <C.Provider value={value}>{children}</C.Provider>
}
export const useLanguage=()=>useContext(C);
