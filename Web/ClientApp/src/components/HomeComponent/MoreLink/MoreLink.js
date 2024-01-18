import React from 'react';

const MoreLink = ({ link }) => {
  return (
    <a href={link} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '5px', color: "black" }}>Переглянути більше</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ verticalAlign: 'middle' }}
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </a>
  );
}

export default MoreLink;
