import '../globals.css'
import type { Metadata } from 'next'
import DashboardHeader from '@/components/DashboardHeader'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'List Buddy',
  description: 'Create list and share with your buddies',
}

export default async function RootLayout({children,}: {children: React.ReactNode}) {
  const supabase = createServerComponentClient({ cookies });
  const {data} = await supabase.auth.getSession();


  if(!data.session) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body>
        <DashboardHeader user={data.session?.user}/>
      
        {children}
      </body>
    </html>
  )
}
