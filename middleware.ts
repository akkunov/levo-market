import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

// список защищённых роутов
const protectedPaths = ['/admin']

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    // проверяем, есть ли сессия
    const {
        data: { session },
    } = await supabase.auth.getSession()

    const pathname = req.nextUrl.pathname

    // если путь начинается с /admin и нет сессии → редирект на /login
    if (protectedPaths.some(path => pathname.startsWith(path)) && !session) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/login'
        redirectUrl.searchParams.set('redirectedFrom', pathname)
        return NextResponse.redirect(redirectUrl)
    }

    return res
}

// указываем, на какие пути действует middleware
export const config = {
    matcher: ['/admin/:path*'],
}
