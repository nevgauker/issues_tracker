'use server'

import { Issue, Status } from '@prisma/client'
import axios from 'axios'
import { revalidatePath } from 'next/cache'

export const updateIssueStatus = async ({
  status,
  issue,
}: {
  status: Status
  issue: Issue
}): Promise<Issue | undefined> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/issues/${issue.id}`,
      { status: status },
    )
    revalidatePath('/issues')
    return response.data
  } catch (error) {
    console.log('Failed to update issue status')
    return undefined
  }
}
