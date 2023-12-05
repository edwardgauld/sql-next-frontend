import React from 'react';
import Header from './Header';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
}
