import React from 'react'

const JSONLD = ({ data }) => {
    return (
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    );
  };

export default JSONLD
