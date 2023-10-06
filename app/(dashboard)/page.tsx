import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getListItems } from "@/util/server-functions/getListItems";
import { ListItems } from "@/types/listItems";
import { sortListItems } from "@/util/sort-functions/sortListItems";
import { isArrayEmpty } from "@/util/validation/empty";
import { ListCard } from "./ListCard";

const getLists = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {data: {session}} = await supabase.auth.getSession();

  const { data, error } = await supabase
                                  .from("lists")
                                  .select()
                                  .eq('user_id', session?.user.id);

  if (error) {
    // console.log(error);
  }

  return data;
};

const getSharedLists = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {data: {session}} = await supabase.auth.getSession();

  const { data, error } = await supabase
                                  .from("lists")
                                  .select()
                                  .contains('share_with', [session?.user.email]);


  if (error) {
    // console.log(error);
  }

  return data;
}

export default async function Home() {
  const lists = await getLists();
  const sharedLists = await getSharedLists();
  const listItems: ListItems[] = [];

  let displayList: boolean = false;

  if (lists) {
    displayList = isArrayEmpty(lists);
  }

  if (lists) {
    for (const list of lists) {
      let items = await getListItems(list.id, list.list_key);
      if (items) {
        items = sortListItems(items);
      }

      let shouldHideItems = false;
      let noItemPresent = false;

      if (items) {
        if (items?.length > 4) {
          shouldHideItems = true;
        } else if (items.length === 0) {
          noItemPresent = true;
        }
      }

      listItems.push({
        ...list,
        items: items,
        shouldHideItems,
        noItemPresent,
      });
    }
  }

  return (
    <main className="container px-5 md:px-10 py-10 mx-auto">
      <div className="flex flex-row flex-wrap">
        {displayList &&
          listItems?.map((list) => {
            return <ListCard key={list.id} list={list}/>
          })}

        {!displayList && (
          <div className="flex justify-center text-center p-10 text-xl w-full">
            No List created yet.
          </div>
        )}
      </div>

      {/* Create list button container */}
      <div className="create-list-button-container flex flex-row justify-center mt-5">
        <Link href={"/create-new-list"} className="primary-button">
          Create New List
        </Link>
      </div>
    </main>
  );
}
