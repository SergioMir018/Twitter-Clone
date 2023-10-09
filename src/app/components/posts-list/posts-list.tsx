import PostCard from '@/app/components/post-card/post-card'
import { type Post } from '@/app/types/posts'

export default function PostsLlist ({ posts }: { posts: Post[] }) {
  return (
    <div>
      {
        posts?.map(post => {
          const {
            id,
            user,
            content
          } = post

          const {
            username,
            name,
            avatar_url: avatarUrl
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
