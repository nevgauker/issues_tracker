import { fetchIssues } from '@/app/actions/getIssues'
import { Status } from '@prisma/client'
import Image from 'next/image'
import { IssuesByStatustChart } from './components/charts/IssuessByStatusChart'
import { Text } from '@radix-ui/themes'
export default async function Home() {
  const issues = await fetchIssues()

  const openIssues = issues.filter(issue => issue.status === Status.OPEN)
  const closedIssues = issues.filter(issue => issue.status === Status.CLOSED)
  const inProgressIssues = issues.filter(
    issue => issue.status === Status.IN_PROGRESS,
  )

  const data: { status: Status; count: number }[] = [
    { status: Status.OPEN, count: openIssues.length },
    { status: Status.IN_PROGRESS, count: inProgressIssues.length },
    { status: Status.CLOSED, count: closedIssues.length },
  ]

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-bold underline'>Issues By Status</h1>
      <IssuesByStatustChart data={data} />
    </div>
  )
}
