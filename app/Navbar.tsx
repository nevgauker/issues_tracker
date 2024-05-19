'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { Button, useThemeContext } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const Navbar = () => {
  const currentPath = usePathname()
  const { data: session, status } = useSession()

  const currentAccentColor = useThemeContext().accentColor

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center justify-between'>
      <div className='flex items-center space-x-6'>
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
          </div>
        </ul>
      </div>
      <div className='flex items-center'>
        {status === 'authenticated'
          ? session.user?.email ?? ''
          : 'not authenticated'}
        <Image
          className='rounded-full ml-2'
          src={session?.user?.image!}
          alt={''}
          width={33}
          height={33}
        />
      </div>
    </nav>
  )
}

export default Navbar
