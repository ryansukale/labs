import React from 'react';
import Head from 'next/head'

const maxWidth = 1024;

export default function Layout({ title = 'JS Labs', children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{
          margin: `0 auto`,
          maxWidth,
          padding: `0 1.0875rem 1.45rem`,
        }}>
        
        <div>{children}</div>
      </main>
    </>
  );
}