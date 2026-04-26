import React from 'react';

export const ResponsiveHeader = ({ title }) => {
  const parts = title.split('_');
  if (parts.length === 1) return <span>{title}</span>;

  return (
    <>
      {parts[0]}
      <span className="hidden md:inline">_</span>
      <br className="block md:hidden" />
      {parts.slice(1).join('_')}
    </>
  );
};
