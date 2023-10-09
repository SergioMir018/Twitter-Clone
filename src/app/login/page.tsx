import AuthButtonServer from '@/app/components/auth-button/auth-button-sever'

export default function Login () {
  return (
    <section className='grid place-content-center min-h-screen'>
      <h1 className='text-lg font-bold mb-4'>
        Sing in Twitter Clone
      </h1>
      <AuthButtonServer />
    </section>
  )
}
