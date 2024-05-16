import { updateIssueStatusSchema } from '@/app/validationSchema'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json()
  const validation = updateIssueStatusSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const status = body.state
  const updatedissue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      status: body.status,
    },
  })

  if (!updatedissue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 400 })
  }

  return NextResponse.json(updatedissue, { status: 200 })
}
