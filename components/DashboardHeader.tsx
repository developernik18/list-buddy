import Link from "next/link"
import LogoutButton from "./LogoutButton"

export default function DashboardHeader({user}: {user: {email: string}}) {
  return (
    <header className=" shadow-sm px-10 py-4">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <Link href={"/"} className="logo">
          List Buddy
        </Link>
        <nav className="nav">
          {user && (
            <div className="flex flex-row items-center gap-10">
              <Link href={"/profile"}>
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
