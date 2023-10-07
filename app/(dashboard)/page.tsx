import Link from "next/link";
import { getListItems } from "@/util/server-functions/getListItems";
import { ListItems } from "@/types/listItems";
import { sortListItems } from "@/util/sort-functions/sortListItems";
import { isArrayEmpty } from "@/util/validation/empty";
import { ListCard } from "./ListCard";
import { getSharedLists } from "@/util/server-functions/getSharedLists";
import { getUserLists } from "@/util/server-functions/getUserLists";
import { List, ListWithoutOrigin } from "@/types/list";
import ErrorBlock from "@/components/ErrorBlock";

const createSingleListArray = (
  userLists: ListWithoutOrigin[] | null,
  sharedLists: ListWithoutOrigin[] | null
) => {
  let list1: List[] = [];
  let list2: List[] = [];

  if (userLists) {
    list1 = userLists.map((list) => {
      return { ...list, origin: "self" };
    });
  }

  if (sharedLists) {
    list2 = sharedLists.map((list) => {
      return { ...list, origin: "shared" };
    });
  }

  return [...list1, ...list2];
};


export default async function Home() {
  const { 
    data: userLists, 
    errorMessage: userListsErrorMessage 
  } = await getUserLists();

  const { 
    data: sharedLists, 
    errorMessage: sharedListsErrorMessage 
  } = await getSharedLists();

  let lists: List[] = createSingleListArray(userLists, sharedLists);
  let displayList: boolean = isArrayEmpty(lists);
  const listItems: ListItems[] = [];
  
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

  return (
    <main className="container px-5 md:px-10 py-10 mx-auto">
      {userListsErrorMessage && (
        <ErrorBlock errorMessage={userListsErrorMessage} />
      )}
      {sharedListsErrorMessage && (
        <ErrorBlock errorMessage={sharedListsErrorMessage} />
      )}

      <div className="flex flex-row flex-wrap">
        {displayList &&
          listItems?.map((list) => {
            return <ListCard key={list.id} list={list} />;
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
