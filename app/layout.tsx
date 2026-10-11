import './globals.css';
import {LanguageProvider} from '@/components/language-provider';
import AppShell from '@/components/app-shell';
export const metadata={title:'LIFEWS GrowMeal | Food Gardens for Everyone',description:'LIFEWS GrowMeal gardens for schools, households, communities, institutions and growers'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><LanguageProvider><AppShell>{children}</AppShell></LanguageProvider></body></html>}
