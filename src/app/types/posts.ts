export type Post = Array<{
  content: string
  created_at: string
  id: string
  user_id: string
  user: {
    name: string | null
    avatar_url: string | null
    username: string | null
  } | null
}> | null
