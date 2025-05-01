import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { detectLocale } from './lib/detectLocale';
import { getToken } from 'next-auth/jwt';

const supportedLocales = ['en', 'es', 'de']; // Idiomas soportados

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Primero, verificar autenticación para rutas protegidas
  // Extraer el locale de la URL si existe
  const segments = pathname.split('/');
  const localeInPath = supportedLocales.includes(segments[1]) ? segments[1] : null;
  
  // Determinar la ruta sin el prefijo de idioma
  const pathWithoutLocale = localeInPath 
    ? '/' + segments.slice(2).join('/') 
    : pathname;
  
  // Rutas que requieren autenticación
  const protectedPaths = ['/dashboard', '/profile', '/settings'];
  
  // Comprobar si la ruta actual está protegida
  const isProtectedPath = protectedPaths.some(path => 
    pathWithoutLocale.startsWith(path)
  );
  
  if (isProtectedPath) {
    // Verificar autenticación
    const token = await getToken({ req: request });
    const isAuthenticated = !!token;
    
    if (!isAuthenticated) {
      // Determinar el locale para la redirección
      const locale = localeInPath || detectLocale(request);
      
      // Redirigir a login con el locale correcto
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }
  
  // Verificar si la URL ya contiene un idioma
  if (supportedLocales.some(locale => pathname.startsWith(`/${locale}`))) {
    // Si la ruta ya tiene locale, dejar que next-intl maneje la detección
    return createMiddleware(routing)(request);
  }
  
  // Si no tiene locale, detectar y redirigir
  const preferredLanguage = detectLocale(request);
  
  const response = NextResponse.redirect(new URL(`/${preferredLanguage}${pathname}`, request.url));
  response.cookies.set('NEXT_LOCALE', preferredLanguage, { path: '/' });
  
  return response;
}

// Actualizar el matcher para incluir todas las rutas protegidas
export const config = {
  matcher: [
    '/',
    '/(de|en|es)/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
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
