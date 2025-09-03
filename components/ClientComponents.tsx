'use client';

import dynamic from 'next/dynamic';

// Dinamički učitavanje komponenti da izbjegnemo SSR probleme
export const ClientHeader = dynamic(() => import('./Header'), { ssr: false });
export const ClientHero = dynamic(() => import('./Hero'), { ssr: false });
export const ClientServices = dynamic(() => import('./Services'), { ssr: false });
export const ClientAbout = dynamic(() => import('./About'), { ssr: false });
export const ClientContact = dynamic(() => import('./Contact'), { ssr: false });
export const ClientFooter = dynamic(() => import('./Footer'), { ssr: false });