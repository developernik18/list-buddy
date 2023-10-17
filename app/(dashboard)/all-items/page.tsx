import { Item } from "@/types/item";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import ItemTable from "./ItemTable";

export default async function AllItems() {
  const supabase = createServerActionClient({cookies})
  let allItems: Item[] | null = [];
  let displayItems: boolean = false;
  const {data: {session}} = await supabase.auth.getSession();

  const response = await supabase
                  .from('items')
                  .select()
                  .eq('user_id', session?.user.id)

  if(response.status === 200) {
    allItems = response.data;
  }

  if(allItems) {
    if(allItems.length > 0) {
      displayItems = true;
    } else {
      displayItems = false;
    }
  }



  return (
    <main className="container px-10 py-10 mx-auto">

      

      {!displayItems && (
        <div>
          <div className="text-center p-10 text-xl ">
            No items Listed.
          </div>
          {/* Create list button container */}
          <div className="create-list-button-container flex flex-row justify-center">
            <Link
              href={"/create-new-list"}
              className="primary-button">
              Create New List
            </Link>
          </div>
        </div>
        
      )}

      {displayItems && allItems && (
        <ItemTable allItems = {allItems}/>
      )}

        
    </main>
  );
}