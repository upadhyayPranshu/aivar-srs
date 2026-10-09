'use server'
import { cookies } from 'next/headers'
import prisma from '@/lib/db/prisma'

export async function loginWithEmail(email: string) {
  // Ensure user exists in DB
  let dbUser = await prisma.user.findUnique({ where: { email } })
  if (!dbUser) {
    dbUser = await prisma.user.create({ data: { email, name: email.split('@')[0] } })
  }
  
  const cookieStore = await cookies();
  cookieStore.set('aivar_user_email', email, { path: '/' })
  return { success: true }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('aivar_user_email')
}
