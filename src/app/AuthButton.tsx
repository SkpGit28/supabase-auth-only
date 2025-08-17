'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Session } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function AuthButton({ session }: { session: Session | null }) {
  const router = useRouter()
  const handleSignOut = async () => {
    const supabase = createClientComponentClient()
    await supabase.auth.signOut()
    router.refresh()
  }

  return session ? (
    <div className="flex items-center gap-3 p-3">
      <p className="text-sm text-muted-foreground">
        Welcome, {session.user.user_metadata?.full_name || session.user.email}
      </p>
      <Button variant="outline" size="sm" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  ) : (
    <div className="p-3">
      <Button asChild size="sm">
        <Link href="/login">Sign in</Link>
      </Button>
    </div>
  )
}
