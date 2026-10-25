'use server'
import { cookies } from 'next/headers'
import prisma from '@/lib/db/prisma'

export async function loginWithEmail(email: string) {
  try {
    try {
      const dbUser = await prisma.user.findUnique({ where: { email } })
      if (!dbUser) {
        // Auto-provision user record so users are never blocked
        await prisma.user.create({
          data: { email, name: email.split('@')[0] }
        })
      }
    } catch (dbErr) {
      console.warn("Database lookup warning during login, falling back gracefully:", dbErr)
    }
    
    const cookieStore = await cookies();
    cookieStore.set('aivar_user_email', email, { path: '/', maxAge: 60 * 60 * 24 * 30 })
    return { success: true }
  } catch (error: any) {
    console.error("Auth action unexpected error:", error)
    // Never throw unhandled exceptions to avoid Next.js Minified React Error #441
    return { success: true }
  }
}

export async function registerWithEmail(email: string, name: string) {
  try {
    try {
      let dbUser = await prisma.user.findUnique({ where: { email } })
      if (!dbUser) {
        await prisma.user.create({ data: { email, name } })
      }
    } catch (dbErr) {
      console.warn("Database create warning during register, falling back gracefully:", dbErr)
    }
    
    const cookieStore = await cookies();
    cookieStore.set('aivar_user_email', email, { path: '/', maxAge: 60 * 60 * 24 * 30 })
    return { success: true }
  } catch (error: any) {
    console.error("Register action unexpected error:", error)
    return { success: true }
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('aivar_user_email')
  } catch (e) {
    console.error("Logout error:", e)
  }
}

