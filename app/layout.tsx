import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'HANZ | Batu Nisan Peribadi',description:'Batu nisan berilhamkan warisan Malaysia. Terokai koleksi, peribadikan reka bentuk dan bincangkan sebut harga bersama HANZ.',metadataBase:new URL('https://hanz-batu-nisan-farhan.loftyauk65.chatgpt.site'),openGraph:{title:'HANZ | Sebuah nama. Sejuta kenangan.',description:'Terokai batu nisan peribadi berilhamkan warisan Malaysia.',images:['/images/og.jpg']}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="ms"><body>{children}</body></html>}
