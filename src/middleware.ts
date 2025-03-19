import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supportedLocales = ['en', 'es', 'de']; // Idiomas soportados
const defaultLocale = 'en'; // Idioma por defecto si no se detecta otro

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    if (supportedLocales.some(locale => pathname.startsWith(`/${locale}`))) { // Si la URL ya contiene un idioma, dejar que `next-intl` maneje la detección
        return createMiddleware(routing)(request);
    }

    const localeCookie = request.cookies.get('NEXT_LOCALE')?.value; // Intentar obtener el idioma desde la cookie
    if (localeCookie && supportedLocales.includes(localeCookie)) {
        return NextResponse.redirect(new URL(`/${localeCookie}${pathname}`, request.url));
    }

    const acceptLanguage = request.headers.get('accept-language') || defaultLocale; // Si no hay cookie, usar `Accept-Language` para detectar el idioma preferido
    let preferredLanguage = acceptLanguage.split(',')[0].split('-')[0];

    if (!supportedLocales.includes(preferredLanguage)) { // Si el idioma detectado no está soportado, usar `defaultLocale`
        preferredLanguage = defaultLocale;
    }

    const response = NextResponse.redirect(new URL(`/${preferredLanguage}${pathname}`, request.url)); // Redirigir al usuario a la versión correcta del idioma y guardar la preferencia en una cookie
    response.cookies.set('NEXT_LOCALE', preferredLanguage, { path: '/' }); // Guardar idioma detectado en cookie

    return response;
}

export const config = {
    matcher: ['/', '/(de|en|es)/:path*']
};

// import createMiddleware from 'next-intl/middleware';
// import {routing} from './i18n/routing';
 
// export default createMiddleware(routing);
 
// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(de|en|es)/:path*']
// };