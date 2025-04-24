import React from 'react';

export default function SetList({ sets }) {
  return (
    <ul className="set-list">
      {sets.map((set) => (
        <li
          key={set.numero}
          style={{
            backgroundColor: set.vencedor === 'left' ? '#f17d60' : set.vencedor === 'right' ? '#00aad3' : null,
          }}
        >
          <span>{set.numero + 'ºset'}</span>
          <h3>{set.leftScore} x {set.rightScore}</h3>
        </li>
      ))}
    </ul>
  );
}
