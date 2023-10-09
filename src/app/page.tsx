import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import AuthButtonServer from '@/app/components/auth-button/auth-button-sever'
import PostsList from './components/posts-list/posts-list'
import { type Database } from './types/database'
import ComposePost from './components/compose-post/compose-post'

export default async function Home () {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, user: users(name, avatar_url, username)')
    .order('created_at', { ascending: false })

  return (
    <main className="flex min-h-screen flex-col items-center gap-5">
      <section className='max-w-[600px] w-full max-x-auto border-l border-r border-white/20 min-h-screen'>
      <ComposePost avatarUrl={session.user?.user_metadata?.avatar_url} />
      <PostsList posts={posts} />
      </section>
      <AuthButtonServer />
    </main>
  )
}
