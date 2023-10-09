import Link from "next/link"
import LogoutButton from "./LogoutButton"
import { User } from "@supabase/supabase-js"

type userType = {
  user: User | undefined
}

export default function DashboardHeader({user}: userType) {
  return (
    <header className=" shadow-sm px-5 md:px-10 py-4 bg-white">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <Link href={"/"} className="logo fade-in">
          List Buddy
        </Link>
        <nav className="nav fade-in">
          {user && (
            <div className="flex flex-row items-center gap-10">
              <Link href={"/all-items"} className="hidden sm:block">
                All Items
              </Link>
              <div className="hidden text-gray-500 sm:block">
                {user.email}
              </div>
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
