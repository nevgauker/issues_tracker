'use server'
import { revalidatePath } from 'next/cache'
import { Issue } from '@prisma/client'
import axios from 'axios'

export const createNewIssue = async ({
  data,
}: {
  data: {
    title: string
    description: string
  }
}): Promise<Issue | undefined> => {
  try {
    const respose = await axios.post('/api/issues', data)
    revalidatePath('/issues')
    return respose.data
  } catch (error) {
    console.log('Failed to create new issue')
    return undefined
  }
}
