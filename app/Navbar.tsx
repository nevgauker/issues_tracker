'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { useThemeContext } from '@radix-ui/themes'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
  const currentPath = usePathname()

  const currentAccentColor = useThemeContext().accentColor

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <AiFillBug className='text-black' color={currentAccentColor} />
      </Link>
      <ul className='flex space-x-6'>
        <div className='flex justify-between space-x-6'>
          {links.map(link => (
            <Link
              key={link.href}
              className={classnames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-500': link.href !== currentPath,
                'hover:text-zinc-800 transition-colors': true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          <UserButton />
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
