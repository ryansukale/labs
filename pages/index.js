import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../src/components/Layout';
import experiments from '../data/experiments';

const { Tile } = require("@allegria/ixd-react");

function ExperimentCard({title, path, description}) {
  return (
    <Tile>
      <section className="m-2">
        <Link href={path}>
          <a>{title}</a>
        </Link>
        {description}
      </section>
    </Tile>
  );
}



export default function Index() {
  return (
    <Layout>
      Welcome to my lab.

      <ul className="grid md:grid-cols-2 gap-4 mx-4 md:mx-0">
        {experiments.map(exp => <li key={exp.title}><ExperimentCard {...exp} /></li>)}
      </ul>
      
    </Layout>
  );
}
