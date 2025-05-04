import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { detectLocale } from './lib/detectLocale';
import { getToken } from 'next-auth/jwt';

const supportedLocales = ['en', 'es', 'de'];

export async function middleware(request: NextRequest) {                              // Función middleware para gestionar rutas e idioma
  const { pathname } = request.nextUrl;                                               // Extrae la ruta actual de la URL

  const segments = pathname.split('/');                                               // Divide la ruta en segmentos por "/"
  const localeInPath = supportedLocales.includes(segments[1]) ? segments[1] : null;   // Detecta si el segundo segmento es un idioma soportado

  const pathWithoutLocale = localeInPath                                              // Elimina el idioma de la ruta si existe
    ? '/' + segments.slice(2).join('/') 
    : pathname;

  const protectedPaths = ['/dashboard', '/profile', '/settings', '/articles'];        // Rutas que requieren autenticación

  const isProtectedPath = protectedPaths.some(path => pathWithoutLocale.startsWith(path)); // Comprueba si la ruta es protegida

  if (isProtectedPath) {                                                              // Si es una ruta protegida
    const token = await getToken({ req: request });                                   // Intenta obtener el token de sesión
    const isAuthenticated = !!token;                                                  // Determina si el usuario está autenticado

    if (!isAuthenticated) {                                                           // Si no está autenticado
      const locale = localeInPath || detectLocale(request);                           // Usa el idioma de la URL o lo detecta
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));         // Redirige al login con el idioma correspondiente
    }
  }

  if (supportedLocales.some(locale => pathname.startsWith(`/${locale}`))) return createMiddleware(routing)(request);                 // Si la ruta ya tiene idioma                                     // Delega en next-intl para manejar el enrutamiento

  const preferredLanguage = detectLocale(request);                                    // Detecta el idioma preferido del usuario

  const response = NextResponse.redirect(new URL(`/${preferredLanguage}${pathname}`, request.url)); // Redirige agregando el idioma a la ruta
  response.cookies.set('NEXT_LOCALE', preferredLanguage, { path: '/' });              // Guarda el idioma en una cookie

  return response;                                                                    // Devuelve la respuesta modificada
}


export const config = {
  matcher: [
    '/',
    '/(de|en|es)/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/articles/:path*',
    '/login',
  ],
};

//! OLD:
// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { detectLocale } from './lib/detectLocale';

// const supportedLocales = ['en', 'es', 'de']; // Idiomas soportados
// // const defaultLocale = 'en'; // Idioma por defecto si no se detecta otro

// export function middleware(request: NextRequest) {
//     const { pathname } = request.nextUrl;
    
//     if (supportedLocales.some(locale => pathname.startsWith(`/${locale}`))) { // Si la URL ya contiene un idioma, dejar que `next-intl` maneje la detección
//         return createMiddleware(routing)(request);
//     }

//     // * Código sustituido por la función detectLocale
//     // const localeCookie = request.cookies.get('NEXT_LOCALE')?.value; // Intentar obtener el idioma desde la cookie
//     // if (localeCookie && supportedLocales.includes(localeCookie)) {
//     //     return NextResponse.redirect(new URL(`/${localeCookie}${pathname}`, request.url));
//     // }

//     // const acceptLanguage = request.headers.get('accept-language') || defaultLocale; // Si no hay cookie, usar `Accept-Language` para detectar el idioma preferido
//     // let preferredLanguage = acceptLanguage.split(',')[0].split('-')[0];

//     // if (!supportedLocales.includes(preferredLanguage)) { // Si el idioma detectado no está soportado, usar `defaultLocale`
//     //     preferredLanguage = defaultLocale;
//     // }

//     const preferredLanguage = detectLocale(request);

//     const response = NextResponse.redirect(new URL(`/${preferredLanguage}${pathname}`, request.url)); // Redirigir al usuario a la versión correcta del idioma y guardar la preferencia en una cookie
//     response.cookies.set('NEXT_LOCALE', preferredLanguage, { path: '/' }); // Guardar idioma detectado en cookie

//     return response;
// }

// export const config = {
//     matcher: ['/', '/(de|en|es)/:path*']
// };
