import './globals.css';
import {LanguageProvider} from '@/components/language-provider';
import AppShell from '@/components/app-shell';
export const metadata={title:'GrowMeal | AgriShine Schools',description:'LIFEWS AgriShine GrowMeal learning and school garden platform'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><LanguageProvider><AppShell>{children}</AppShell></LanguageProvider></body></html>}
