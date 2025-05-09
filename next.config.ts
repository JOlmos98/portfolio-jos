// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    domains: ['medium.com', 'images.unsplash.com', 'i.imgur.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      // { protocol: 'https', hostname: '**', },
      { protocol: 'https', hostname: 'medium.com' },
      { protocol: 'https', hostname: 'dev.to' },
      { protocol: 'https', hostname: 'hashnode.com' },
      { protocol: 'https', hostname: 'freecodecamp.org' },
      { protocol: 'https', hostname: 'css-tricks.com' },
      { protocol: 'https', hostname: 'smashingmagazine.com' },
      { protocol: 'https', hostname: 'uxplanet.org' },
      { protocol: 'https', hostname: 'betterprogramming.pub' },
      { protocol: 'https', hostname: 'javascript.plainenglish.io' },
      { protocol: 'https', hostname: 'towardsdatascience.com' },
      { protocol: 'https', hostname: 'logrocket.com' },
      { protocol: 'https', hostname: 'dzone.com' },
      { protocol: 'https', hostname: 'scotch.io' },
      { protocol: 'https', hostname: 'sitepoint.com' },
      { protocol: 'https', hostname: 'catalins.tech' },
      { protocol: 'https', hostname: 'ui.dev' },
      { protocol: 'https', hostname: 'web.dev' },
      { protocol: 'https', hostname: 'ray.so' },
      { protocol: 'https', hostname: 'daily.dev' },
      { protocol: 'https', hostname: 'images.unsplash.com' }, // imágenes
      { protocol: 'https', hostname: 'i.imgur.com' }, // imágenes
      // {
      //   protocol: 'https',
      //   hostname: 'imgur.com',
      //   port: '',
      //   pathname: '/**',
      //   search: '',
      // },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);