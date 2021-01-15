import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../src/components/Layout';
import experiments from '../data/experiments';

// const { Tile } = require("@allegria/ixd-react");



function ExperimentCard({title, path, excerpt, image}) {
  return (
    <div className="rounded shadow-md bg-white overflow-hidden">
      <img className="h-48 p-6 w-full object-cover" src={image} alt=""/>
      <div className="relative" style={{height: '240px'}}>
        <div className="bg-gray-200 border-b-2 border-indigo-400 hover:border-indigo-700 py-2">
          <a href={path} rel="noopener noreferrer" className="block mt-1 text-lg leading-tight truncate px-4 text-indigo-600 text-center hover:text-indigo-500 align-middle">
            <span className="inline align-text-bottom">{title}</span>
            <span className="pl-1">→</span>
          </a>
        </div>
        <div className="italic text-gray-600 px-4 py-2 leading-relaxed tracking-wide">
          {excerpt}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <>
      <div
        className="mb-2 flex justify-center items-center"
        style={{height: '300px', background: '#fbfbfb'}}>
        <div>
          <div className="text-center">Welcome to my lab.</div>

          <div className="my-2">
            <a className="btn-outline btn-outline-purple" href="https://ryansukale.com">Back to ryansukale.com</a>
          </div>
        </div>
      </div>
      <Layout>
        <ul className="mt-4 grid md:grid-cols-3 gap-4 mx-4 md:mx-0">
          {experiments.map(exp => <li key={exp.title}><ExperimentCard {...exp} /></li>)}
        </ul>
      </Layout>
    </>
  );
}
