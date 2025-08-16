'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Session } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AuthButton({ session }: { session: Session | null }) {
  const router = useRouter()
  const handleSignOut = async () => {
    const supabase = createClientComponentClient()
    await supabase.auth.signOut()
    router.refresh()
  }

  return session ? (
    <div>
      <p>Welcome, {session.user.user_metadata.full_name || session.user.email}</p>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  ) : (
    <Link href="/login">
      <button>Sign in</button>
    </Link>
  )
}
