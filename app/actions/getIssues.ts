'use server'

import { Issue } from '@prisma/client'
import axios from 'axios'
import { revalidatePath } from 'next/cache'

export const fetchIssues = async (): Promise<Issue[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/issues`,
    )
    revalidatePath('/issues')

    return response.data
  } catch (error) {
    console.log('Failed to fetch issues')
    return []
  }
}