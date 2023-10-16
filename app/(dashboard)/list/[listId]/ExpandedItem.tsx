"use client";

import { Item } from "@/types/item";
import { currencyValueToLabel } from "@/util/selection-list/for-currency";
import Styles from "./ExpandedItem.module.css";
import Checkbox from "@/components/Checkbox";
import Link from "next/link";
import Delete from "@/components/Delete";
import { FiEdit } from "react-icons/fi";

export default function ExpandedItem({
  item,
  isClosing,
}: {
  item: Item;
  isClosing: boolean;
}) {
  return (
    <div className={isClosing ? Styles.container + " " + Styles.exit : Styles.container + " " + Styles.entry}>
      <div className={Styles.row + " " + Styles.action }>
        <div className="action-icons flex flex-row">
          <Link
            href={
              "/list/" +
              item.list_id +
              "/" +
              item.id +
              "/edit"
            }
            className="px-3 "
          >
            <FiEdit />
          </Link>
          <div className="pl-3 pr-5 ">
            <Delete item={item} />
          </div>
        </div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.label}>Item Name:</div>
        <div>{item.name}</div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.label}>Item Quantity:</div>
        <div>
          {item.quantity} {item.unit}
        </div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.label}>Item Price:</div>
        <div>
          {currencyValueToLabel(item.currency)} {item.price}
        </div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.label}>Expiry Date:</div>
        <div>
          {item.expiry_date && String(item.expiry_date)}
          {!item.expiry_date && <span> - </span>}
        </div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.label}>Notes:</div>
        <div>{item.notes}</div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.label}>Purchased:</div>
        <div>
          <Checkbox isChecked={item.purchased} item={item} />
        </div>
      </div>
    </div>
  );
}
