import Link from "next/link"

export default function Home() {
  return (
    <main className="container px-10 py-10 mx-auto">
      <div className="flex flex-row flex-wrap">
        <div className="flex basis-1/3 flex-col p-5">
          <div className="shadow">
            <h2 className=" bg-indigo-200 p-5 text-primary-default text-lg font-medium">
              List Title 1
            </h2>
            <div className="p-5 flex flex-row">
              <div className="basis-1/2">
                Rice
              </div>
              <div className="divider basis-1/4">
                -
              </div>
              <div className="basis-1/2">
                Quantity
              </div>
            </div>
          </div>
        </div>
        <div className="flex basis-1/3 flex-col p-5">
          <div className="shadow">
            <h2 className=" bg-indigo-200 p-5 text-primary-default text-lg font-medium">
              List Title 1
            </h2>
            <div className="p-5 flex flex-row">
              <div className="basis-1/2">
                Rice
              </div>
              <div className="divider basis-1/4">
                -
              </div>
              <div className="basis-1/2">
                Quantity
              </div>
            </div>
          </div>
        </div>
        <div className="flex basis-1/3 flex-col p-5">
          <div className="shadow">
            <h2 className=" bg-indigo-200 p-5 text-primary-default text-lg font-medium">
              List Title 1
            </h2>
            <div className="p-5 flex flex-row">
              <div className="basis-1/2">
                Rice
              </div>
              <div className="divider basis-1/4">
                -
              </div>
              <div className="basis-1/2">
                Quantity
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create list button container */}
      <div className="create-list-button-container flex flex-row justify-center">
        <Link
          href={"/create-new-list"}
          className="primary-button">
          Create New List
        </Link>
      </div>
    </main>
  )
}
