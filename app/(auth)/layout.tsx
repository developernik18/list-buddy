import '../globals.css'
import type { Metadata } from 'next'
import AuthHeader from "@/components/AuthHeader";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'List Buddy',
  description: 'Create list and share with your buddies',
}

export default async function RootLayout({children,}: {children: React.ReactNode}) {
  const supabase = createServerComponentClient({ cookies });
  const {data} = await supabase.auth.getSession();

  if(data.session) {
    redirect("/");
  }

  return (
    <html lang="en">
      <body>
        <AuthHeader/>
        {children}
      </body>
    </html>
  )
}
