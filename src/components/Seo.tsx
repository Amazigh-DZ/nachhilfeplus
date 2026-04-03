import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://nachhilfe-plus.de';

const ROUTE_SEO = {
  '/': {
    title: 'Nachhilfe in Goettingen | Nachhilfe Plus',
    description:
      'Nachhilfe Plus bietet individuelle Nachhilfe in Goettingen und online mit qualifizierten Lehrkraeften, flexiblen Modellen und persoenlicher Foerderung.',
    canonical: `${SITE_URL}/`,
  },
  '/impressum': {
    title: 'Impressum | Nachhilfe Plus Goettingen',
    description:
      'Impressum von Nachhilfe Plus mit Kontaktdaten und rechtlichen Angaben fuer den Standort Goettingen.',
    canonical: `${SITE_URL}/impressum`,
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Startseite',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Impressum',
          item: `${SITE_URL}/impressum`,
        },
      ],
    },
  },
  '/datenschutz': {
    title: 'Datenschutz | Nachhilfe Plus Goettingen',
    description:
      'Datenschutzhinweise von Nachhilfe Plus fuer Interessierte, Eltern, Schuelerinnen, Schueler und Bewerber in Goettingen.',
    canonical: `${SITE_URL}/datenschutz`,
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Startseite',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Datenschutz',
          item: `${SITE_URL}/datenschutz`,
        },
      ],
    },
  },
} as const;

const upsertMetaTag = (
  attribute: 'name' | 'property',
  key: string,
  content: string
) => {
  let tag = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  ) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

const upsertCanonicalTag = (href: string) => {
  let tag = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!tag) {
    tag = document.createElement('link');
    tag.rel = 'canonical';
    document.head.appendChild(tag);
  }

  tag.href = href;
};

const upsertBreadcrumbJsonLd = (breadcrumb?: object) => {
  const existing = document.getElementById('breadcrumb-json-ld');

  if (!breadcrumb) {
    existing?.remove();
    return;
  }

  let script = existing as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.id = 'breadcrumb-json-ld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(breadcrumb);
};

const scrollToHashTarget = (hash: string) => {
  const targetId = hash.replace('#', '');
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  const offset = 100;
  const elementTop = target.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: elementTop - offset,
    behavior: 'smooth',
  });
};

export default function Seo() {
  const location = useLocation();

  useEffect(() => {
    const seo =
      ROUTE_SEO[location.pathname as keyof typeof ROUTE_SEO] ?? ROUTE_SEO['/'];

    document.title = seo.title;
    upsertMetaTag('name', 'description', seo.description);
    upsertMetaTag('name', 'robots', 'index, follow');
    upsertMetaTag('property', 'og:title', seo.title);
    upsertMetaTag('property', 'og:description', seo.description);
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:url', seo.canonical);
    upsertCanonicalTag(seo.canonical);
    upsertBreadcrumbJsonLd('breadcrumb' in seo ? seo.breadcrumb : undefined);
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const timeoutId = window.setTimeout(() => {
      scrollToHashTarget(location.hash);
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.hash]);

  return null;
}
