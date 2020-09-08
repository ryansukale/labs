import React from 'react';
import Head from 'next/head'

// const primaryItems = [
//   <NavLink
//     href="/"
//   >
//     Home
//   </NavLink>
// ];


// import Navigation from "../components/nav/Navigation";
function Layout({ title = 'JS Labs', children }) {
  return (
    <div className="container mx-auto">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"></link> */}
      </Head>
      <div>{children}</div>
    </div>
  );
}

export default Layout;