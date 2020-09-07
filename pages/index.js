import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import experiments from '../data/experiments';

function ExperimentItem({title, path, description}) {
  return (
    <section>
      <Link href={path}>
        <a>{title}</a>
      </Link>
      {description}
    </section>
  );
}

export default () => {
  return (
    <div>
      Welcome to my lab.

      <ul>
        {experiments.map(exp => <li key={exp.title}><ExperimentItem {...exp} /></li>)}
      </ul>
      
    </div>
  );
}
