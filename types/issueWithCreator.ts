import { Issue, User } from '@prisma/client'

export interface IssueWithCreator extends Issue {
  creator: User
}
