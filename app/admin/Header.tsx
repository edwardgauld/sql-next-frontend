'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { SidebarToggle } from '@/components/Sidebars';
import { Button } from '@/components/Buttons';
import Link from 'next/link';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  const pathname = usePathname();

  return (
    <>
      <header className="z-50 w-full bg-white text-sm border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <nav
          className="w-full flex items-center justify-between"
          aria-label="Global"
        >
          {pathname === '/admin/lessons' || pathname === '/admin/questions' ? (
            <SidebarToggle />
          ) : (
            <></>
          )}
          <Link href="/admin">Dashboard</Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
