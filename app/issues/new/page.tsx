'use client'
import 'easymde/dist/easymde.min.css'
import { TextField, Button, Callout } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
// import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchema'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'

// type IssueFrom = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<IssueFrom>({
  //   resolver: zodResolver(createIssueSchema),
  // })
  // // const router = useRouter()
  // const [error, setError] = useState('')
  // const [loading, setLoading] = useState(false)
  // const onSubmit = handleSubmit(async data => {
  //   try {
  //     setLoading(true)
  //     await axios.post('/api/issues', data)
  //     // router.push('/issues')
  //   } catch (err) {
  //     setError('An unexpected error ocurred.')
  //     setLoading(false)
  //   }
  // })

  return (
    <></>
    // <div className='max-w-xl'>
    //   {error && (
    //     <Callout.Root color='red' className='mb-5'>
    //       <Callout.Text>{error}</Callout.Text>
    //     </Callout.Root>
    //   )}
    //   <form className='space-y-3' onSubmit={onSubmit}>
    //     <TextField.Root placeholder='Title' {...register('title')} />
    //     {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
    //     <Controller
    //       name='description'
    //       control={control}
    //       render={({ field }) => <SimpleMDE {...field} />}
    //     />
    //     {<ErrorMessage>{errors.description?.message}</ErrorMessage>}

    //     <Button disabled={loading}>
    //       Submit New Issue {loading && <Spinner />}
    //     </Button>
    //   </form>
    // </div>
  )
}

export default NewIssuePage
