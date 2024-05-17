'use client'
import 'easymde/dist/easymde.min.css'
import { TextField, Button, Callout } from '@radix-ui/themes'
// import SimpleMDE from 'react-simplemde-editor'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchema'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'

import dynamic from 'next/dynamic'
import { createNewIssue } from '@/app/actions/createNewIssue'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type IssueFrom = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFrom>({
    resolver: zodResolver(createIssueSchema),
  })
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const onSubmit = handleSubmit(async data => {
    setLoading(true)
    const newIssue = await createNewIssue({ data })
    setLoading(false)
    if (newIssue) {
      router.push('/issues')
    }
  })

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root placeholder='Title' {...register('title')} />
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE {...field} />}
        />
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}

        <Button disabled={loading}>
          Submit New Issue {loading && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default NewIssuePage
