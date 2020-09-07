import React from 'react';
import Head from 'next/head'
import Link from 'next/link'

export default () => {
  return (
    <div>
      <Link href="/lab-gsap">
        <a className="text-lg font-aleo">Gsap Lab</a>
      </Link>
    </div>
  );
}
