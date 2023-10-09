'use client'

import { useEffect, useRef } from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export default function ComposePostTextarea () {
  const { pending } = useFormStatus()
  const alreadySent = useRef(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current === null) return

    if (!pending && alreadySent.current) {
      alreadySent.current = false
      textAreaRef.current.value = ''
      return
    }

    alreadySent.current = pending
  }, [pending])

  return (
    <textarea
      ref={textAreaRef}
      name="post"
      rows={4}
      className='w-full text-lg bg-black placeholder-grey-500 p-2'
      placeholder="what's going on? "
    ></textarea>
  )
}
