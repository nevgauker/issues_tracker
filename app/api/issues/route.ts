import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { createIssueSchema } from '../../validationSchema'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const validation = createIssueSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })

  if (!user) {
    const user = await prisma.user.create({
      data: {
        email: body.email,
      },
    })

    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
        userId: user!.id,
      },
    })
    return NextResponse.json(newIssue, { status: 201 })
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      userId: user!.id,
    },
  })

  return NextResponse.json(newIssue, { status: 201 })
}

export async function GET() {
  try {
    const issues = await prisma.issue.findMany({ include: { creator: true } })
    return NextResponse.json(issues, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to fetch issues' },
      { status: 500 },
    )
  }
}
