import React, { useEffect } from 'react';
import { BRAND_CONFIG } from '../config/brand';

interface SEOProps {
  title: string;
  description: string;
  ogType?: 'website' | 'product' | 'article';
  canonicalUrl?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  ogType = 'website',
  canonicalUrl
}) => {
  useEffect(() => {
    // 1. Update Title
    const formattedTitle = `${title} | ${BRAND_CONFIG.companyName} ${BRAND_CONFIG.productLine}`;
    document.title = formattedTitle;

    // 2. Update Meta Description
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Update OpenGraph Tags
    const ogTags = {
      'og:title': formattedTitle,
      'og:description': description,
      'og:type': ogType,
      'og:site_name': BRAND_CONFIG.companyName
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let ogTag = document.querySelector(`meta[property='${property}']`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    });

    // 4. Update Canonical Link
    if (canonicalUrl) {
      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    }
  }, [title, description, ogType, canonicalUrl]);

  return null; // Side-effect only component
};

export default SEO;
