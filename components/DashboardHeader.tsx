import Link from "next/link"

export default function DashboardHeader() {
  return (
    <header className=" shadow-sm px-10 py-4">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <Link href={"/"} className="logo">
          List Buddy
        </Link>
        <nav className="nav">
          <Link href={"/login"}>
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}
