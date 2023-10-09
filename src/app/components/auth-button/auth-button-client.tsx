'use client'

import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

import { GitHubIcon } from './icons'
import { Button } from '@nextui-org/button'

interface Props {
  session: Session | null
}

export default function AuthButton ({ session }: Props) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSingIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  const handleSingOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header>
      {
        session === null
          ? (
          <button onClick={handleSingIn} type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
            <GitHubIcon /> Sign in with Github
          </button>
            )
          : (
          <Button
          onClick={handleSingOut}
          >
            Sing Out
          </Button>
            )
      }
    </header>
  )
}
