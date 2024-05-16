import { Status } from '@prisma/client'
import { z } from 'zod'

export const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1, 'Description is required.'),
})

const IssueStatusEnum = z.enum([Status.OPEN, Status.IN_PROGRESS, Status.CLOSED])

export const updateIssueStatusSchema = z.object({
  status: IssueStatusEnum,
})
