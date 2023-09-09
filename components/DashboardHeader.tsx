import Link from "next/link"
import LogoutButton from "./LogoutButton"
import { User } from "@supabase/supabase-js"

type userType = {
  user: User | undefined
}

export default function DashboardHeader({user}: userType) {
  return (
    <header className=" shadow-sm px-10 py-4">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <Link href={"/"} className="logo">
          List Buddy
        </Link>
        <nav className="nav">
          {user && (
            <div className="flex flex-row items-center gap-10">
              <Link href={"/profile"} className="hidden sm:block">
                {user.email}
              </Link>
              <LogoutButton />
            </div>
          )}

          {!user && (
            <Link href={"/login"}>
              Login
            </Link>
          )}

        </nav>
      </div>
    </header>
  )
}
