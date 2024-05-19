'use server'
import { revalidatePath } from 'next/cache'
import { Issue } from '@prisma/client'
import axios from 'axios'
import { auth } from '@/auth'

export const createNewIssue = async ({
  data,
}: {
  data: {
    title: string
    description: string
  }
}): Promise<Issue | undefined> => {
  const session = await auth()
  const sessionUser = session?.user
  if (!sessionUser) {
    return
  }

  const email = sessionUser.email
  if (!email) {
    return
  }

  try {
    const respose = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/issues`,
      { email, ...data },
    )
    revalidatePath('/issues')
    return respose.data
  } catch (error) {
    console.log(`Failed to create new issue: ${error}`)
    return undefined
  }
}
