'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const supabase = createClientComponentClient()

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/reset-password`,
    })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Password reset link sent to your email.')
    }
  }

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send reset link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
