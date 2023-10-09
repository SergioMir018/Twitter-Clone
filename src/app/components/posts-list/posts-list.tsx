import PostCard from '@/app/components/post-card/post-card'
import { type Post } from '@/app/types/posts'

export default function PostsList ({ posts }: { posts: Post }) {
  return (
    <div>
      {
        posts?.map(post => {
          const {
            id,
            user,
            content
          } = post

          if (user === null) return null

          const {
            name,
            avatar_url: avatarUrl,
            username
          } = user

          return (
            <PostCard
              avatarUrl={avatarUrl}
              content={content}
              key={id}
              user={name}
              userName={username}
            />
          )
        }
        )
      }
    </div>
  )
}
