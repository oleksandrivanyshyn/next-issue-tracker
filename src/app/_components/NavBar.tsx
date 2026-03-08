'use client';
import React from 'react';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { Box } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';

const NavBar = () => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/public">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={cn(
                'hover:text-zinc-800 transition-colors',
                link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500',
              )}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && (
          <Link href="/api/auth/signout">Logout</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
