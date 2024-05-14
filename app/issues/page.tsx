import { Button } from '@radix-ui/themes'
import Link from 'next/link'

export default function Issues() {
  return (
    <div>
      <Link href='/issues/new'>
        <Button>New Issue</Button>
      </Link>
    </div>
  )
}
