<script lang="ts">
  import "../app.css";

  let {children} = $props();
</script>

<svelte:head>
  <meta http-equiv="x-dns-prefetch-control" content="off" />
  <!-- this is for SSO, make sure same page gets same content-->
  <link rel="canonical" href="https://account.proton.me/mail/signup" />
  <meta name="description" content="Sign in to access your account" />
  <!-- OPEN GRAPH -->
  <!-- OPEN GRAPH -->
  <!-- OPEN GRAPH -->
  <!-- title of the page -->
  <meta property="og:title" content="Proton Mail: Sign-in" />
  <!-- description of the page -->
  <meta
    property="og:description"
    content="Sign in to access your Proton Mail account"
  />
  <!-- URL of the page -->
  <meta property="og:url" content="https://account.proton.me/mail" />
  <!-- its a webpage, content can also be "article", "book", "profile", "video.other" etc -->
  <meta property="og:type" content="website" />
  <!-- url of an IMAGE that will appear in the link preview -->
  <meta
    property="og:image"
    content="https://account.proton.me/assets/proton-og-image.png"
  />
  <!--  properties of the image  -->
  <meta property="og:image:alt" content="The shiny Proton logo" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <!-- language and region -->
  <meta property="og:locale" content="en_US" />
  <!-- TWITTER SPECIFIC LINK PREVIEWS -->
  <!-- Twitter:card must be present to be useful for twitter
    (fallback to og: if other twitter: are missing)µ
  -->
  <meta name="twitter:card" content="summary_large_image" />
  <!-- twitter handle of the site -->
  <meta name="twitter:site" content="@ProtonMail" />
  <!-- twitter title -->
  <meta name="twitter:title" content="Proton Mail: Sign-in" />
  <!-- twitter description -->
  <meta
    name="twitter:description"
    content="Sign in to access your Proton Mail account"
  />
  <!-- twitter image and image fallback -->
  <meta
    name="twitter:image"
    content="https://account.proton.me/assets/proton-og-image.png"
  />
  <meta name="twitter:image:alt" content="The shiny Proton logo" />
  <!-- do not offer automatic translation of this site -->
  <meta name="google" content="notranslate" />
  <!-- 
    This entire block is used for enhanced sharing previews and search engine behavior,
    helping Proton Mail's sign-in page look professional and informative when shared on:
    Facebook (Open Graph)
    Twitter (Twitter Cards)
    Google (search and translation)
  -->
  <!-- alternate/hreflang is "lang-region" version of this website -->
  <link
    rel="alternate"
    hreflang="pt-PT"
    href="https://account.proton.me/pt/mail"
  />
  <!--
  <link
    rel="manifest"
    href="/assets/manifest.webmanifest"
    crossorigin="use-credentials"
    integrity="sha384-g0gsHDJ31Q7EEr1SZ+FH3DtEebtvAZo2k+L4ofy0Awc3es2G0CHaza1WYaQWj3Hc"
  />
  content of the manifest
  {
  "name": "Proton",
  "short_name": "Proton",
  "description": "Our encrypted services let you control who has access to your emails, plans, files, and online activity. Free plans are available.",
  "dir": "auto",
  "lang": "en-US",
  "display": "standalone",
  "orientation": "any",
  "start_url": "/",
  "background_color": "#fff",
  "theme_color": "#1b1340",
  "icons": [
    {
      "src": "android-chrome-36x36.png",
      "sizes": "36x36",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "android-chrome-48x48.png",
      "sizes": "48x48",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "android-chrome-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "android-chrome-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "android-chrome-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "android-chrome-256x256.png",
      "sizes": "256x256",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "android-chrome-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "android-chrome-maskable-36x36.png",
      "sizes": "36x36",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "android-chrome-maskable-48x48.png",
      "sizes": "48x48",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "android-chrome-maskable-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "android-chrome-maskable-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "android-chrome-maskable-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "android-chrome-maskable-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "android-chrome-maskable-256x256.png",
      "sizes": "256x256",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "android-chrome-maskable-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "android-chrome-maskable-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
-->
  <!-- set browser ui color -->
  <meta name="theme-color" content="#1b1340" />
  <!-- name of web application, legacy use manifest -->
  <!-- meta name="application-name" content="Proton" /-->
  <!-- apple not fully support pwa manifest (check this)-->
  <link
    rel="apple-touch-icon"
    sizes="57x57"
    href="/assets/apple-touch-icon-57x57.png"
  />
  <!-- required for apple, 1024x1024 is the standard it seems-->
  <link
    rel="apple-touch-icon"
    sizes="1024x1024"
    href="/assets/apple-touch-icon-1024x1024.png"
  />
</svelte:head>

<!-- 
 nothing to do here this is the login form doesnt need a general layout
 this can change later on
  -->
{@render children()}
