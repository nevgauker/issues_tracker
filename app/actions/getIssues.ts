'use server'

import { IssueWithCreator } from '@/types/issueWithCreator'
import { Issue } from '@prisma/client'
import axios from 'axios'

export const fetchIssues = async (): Promise<IssueWithCreator[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/issues`,
    )

    const issues: IssueWithCreator[] = response.data
    return issues
  } catch (error) {
    console.log('Failed to fetch issues')
    return []
  }
}
