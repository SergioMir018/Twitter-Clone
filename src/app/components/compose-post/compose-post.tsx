import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import ComposePostTextarea from '../compose-post-textarea/compose-post-textarea'

export default function ComposePost ({
  avatarUrl
}: {
  avatarUrl: string
}) {
  const addPost = async (formData: FormData) => {
    'use server'

    const content = formData.get('post')

    if (content === null) return

    const supabase = createServerActionClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()

    if (user === null) return

    await supabase.from('posts').insert({ content, user_id: user.id })

    revalidatePath('/')
  }

  return (
    <form
      action={addPost}
      className='flex flex-row p-3 border-b border-white/20'
    >
      <img className='rounded-full w-10 h-10 object-contain' src={avatarUrl} />
      <div className='flex flex-1 flex-col gap-y-4'>
        <ComposePostTextarea />
        <button
          className='bg-sky-500 font-bold rounded-full px-5 py-2 self-end'
          type='submit'
        >
          Post
        </button>
      </div>
    </form>
  )
}
