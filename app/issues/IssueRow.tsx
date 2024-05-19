'use client'
import { updateIssueStatus } from '@/app/actions/updateIssueStatus'
import { Issue, Status } from '@prisma/client'
import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  Heading,
  HoverCard,
  Table,
  Text,
  Avatar,
} from '@radix-ui/themes'
import { FaDoorClosed, FaEnvelopeOpenText } from 'react-icons/fa'
import { RiProgress3Line } from 'react-icons/ri'
import { FaRegEye } from 'react-icons/fa'
import Link from 'next/link'
import { IssueWithCreator } from '@/types/issueWithCreator'

const IssueRow = ({ issue }: { issue: IssueWithCreator }) => {
  const iconForStatus = (status: Status) => {
    switch (status) {
      case Status.CLOSED:
        return <FaDoorClosed className='mx-1' />
      case Status.OPEN:
        return <FaEnvelopeOpenText className='mx-1' />
      case Status.IN_PROGRESS:
        return <RiProgress3Line className='mx-1' />
    }
  }

  const updateStatus = async ({
    status,
    issue,
  }: {
    status: Status
    issue: IssueWithCreator
  }) => {
    await updateIssueStatus({ status: status, issue: issue })
  }
  return (
    <Table.Row key={issue.id}>
      <Table.RowHeaderCell>
        <div className='flex items-center'>
          <Text className='pr-4 text-lg'>{issue.title}</Text>
          <HoverCard.Root>
            <HoverCard.Trigger>
              <Link href='https://twitter.com/radix_ui' target='_blank'>
                <FaRegEye />
              </Link>
            </HoverCard.Trigger>
            <HoverCard.Content maxWidth='300px'>
              <Flex gap='4'>
                <Avatar
                  size='3'
                  fallback='R'
                  radius='full'
                  src='https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png'
                />
                <Box>
                  <Heading size='3' as='h3'>
                    {issue.title}
                  </Heading>
                  <Text as='div' size='2' color='gray' mb='2'>
                    @description
                  </Text>
                  <Text as='div' size='2'>
                    {issue.description}
                  </Text>
                </Box>
              </Flex>
            </HoverCard.Content>
          </HoverCard.Root>{' '}
        </div>
      </Table.RowHeaderCell>
      <Table.Cell>
        <div className='flex items-center space-x-3'>
          <Text className='md-4 text-lg'>{`${issue.status} - `}</Text>
          {iconForStatus(issue.status)}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant='soft'>
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item
                shortcut='⌘ O'
                onClick={() =>
                  updateStatus({ status: Status.OPEN, issue: issue })
                }
              >
                Open
              </DropdownMenu.Item>
              <DropdownMenu.Item
                shortcut='⌘ I'
                onClick={() =>
                  updateStatus({ status: Status.IN_PROGRESS, issue: issue })
                }
              >
                In Progress
              </DropdownMenu.Item>
              <DropdownMenu.Item
                shortcut='⌘ C'
                onClick={() =>
                  updateStatus({ status: Status.CLOSED, issue: issue })
                }
              >
                Close
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </Table.Cell>
      <Table.Cell>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant='soft'>
              Options
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item shortcut='⌘ E'>Edit</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut='⌘ ⌫' color='red'>
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Table.Cell>
      <Table.Cell>{issue.creator.email}</Table.Cell>
    </Table.Row>
  )
}
export default IssueRow
