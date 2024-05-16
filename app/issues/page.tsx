import { fetchIssues } from '@/actions/getIssues'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import { RiProgress3Line } from 'react-icons/ri'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import { FaDoorClosed } from 'react-icons/fa'
import { Status } from '@prisma/client'
import IssueRow from './IssueRow'

export default async function Issues() {
  const issues = await fetchIssues()

  const iconForStatus = (status: Status) => {
    switch (status) {
      case Status.CLOSED:
        return <FaDoorClosed className='mx-1' />
      case Status.OPEN:
        return <FaEnvelopeOpenText className='mx-1' />
      case Status.IN_PROGRESS:
        return <RiProgress3Line className='mx-1' />
    }
  }

  return (
    <div>
      <Link href='/issues/new'>
        <Button>New Issue</Button>
      </Link>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <IssueRow issue={issue} key={issue.id} />
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
