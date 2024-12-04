import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetMetadata = ({ title, description, keywords }) => (
  <Helmet>
    {/* Dynamic Page Title */}
    <title>{title}</title>
    {/* Meta Tags for SEO */}
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="robots" content="index, follow" />
    {/* Favicon (Optional) */}
    <link rel="icon" href="/favicon.ico" />
    {/* Additional Open Graph / Social Media Metadata (Optional) */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/og-image.jpg" />
  </Helmet>
);

export default HelmetMetadata;
