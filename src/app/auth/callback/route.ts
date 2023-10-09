import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

// This is an option to avoid to cache in a static manner the route and
// always execute it on the server
export const dynamic = 'force-dynamic'

export async function GET (request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code !== null) {
    const supabase = createRouteHandlerClient({ cookies })
    // Using the code passed by url it returns the user session
    await supabase.auth.exchangeCodeForSession(code)
  }

  // requestUrl.origin will return the user to the page source of the previous request
  return NextResponse.redirect(requestUrl.origin)
}
