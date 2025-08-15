// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="Opal Jhane Spa" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Opal Jhane Spa" />
          <meta name="description" content="Your sanctuary for relaxation and rejuvenation." />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" /> {/* Optional, for IE/Edge older versions */}
          <meta name="msapplication-TileColor" content="#3C1F76" /> {/* Your theme color */}
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#3C1F76" /> {/* Your theme color, for browser UI */}

          <link rel="apple-touch-icon" href="/images/icons/icon-192x192.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" /> {/* Ensure you have a favicon in /public */}

          {/* You can add more meta tags or link tags here for SEO or other purposes */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;