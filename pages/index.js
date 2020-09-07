import React from 'react';
import Head from 'next/head'
import Link from 'next/link'

const experiments = [
  {
    title: 'A github style contribution map built using D3js',
    techologies: ['d3js'],
    path: '/d3-heatmap'
  }
];

function ExperimentItem({title, path}) {
  return (
    <section>
      <Link href={path}>
        <a>{title}</a>
      </Link>
    </section>
  );
}

export default () => {
  return (
    <div>
      Welcome to my lab.

      <ExperimentItem {...experiments[0]} />
    </div>
  );
}
