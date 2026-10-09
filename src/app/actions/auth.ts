'use server'
import { cookies } from 'next/headers'
import prisma from '@/lib/db/prisma'

export async function loginWithEmail(email: string) {
  const dbUser = await prisma.user.findUnique({ where: { email } })
  if (!dbUser) {
    throw new Error("Account not found. Please sign up first.")
  }
  
  const cookieStore = await cookies();
  cookieStore.set('aivar_user_email', email, { path: '/' })
  return { success: true }
}

export async function registerWithEmail(email: string, name: string) {
  let dbUser = await prisma.user.findUnique({ where: { email } })
  if (dbUser) {
    throw new Error("An account with this email already exists.")
  }
  
  await prisma.user.create({ data: { email, name } })
  
  const cookieStore = await cookies();
  cookieStore.set('aivar_user_email', email, { path: '/' })
  return { success: true }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('aivar_user_email')
}
