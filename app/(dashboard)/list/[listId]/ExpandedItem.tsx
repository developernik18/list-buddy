"use client"

import { Item } from "@/types/item"
import { currencyValueToLabel } from "@/util/selection-list/for-currency"
import Styles from "./ExpandedItem.module.css";
import Checkbox from "@/components/Checkbox";

export default function ExpandedItem({item, isExpanded}: {item: Item, isExpanded: boolean}) {

  return (
    <div className={Styles.container}>
      <div className={Styles.row}>
        <div className={Styles.label}>
          Item Name:
        </div>
        <div>
          {item.name}
        </div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.label}>
          Item Quantity:
        </div>
        <div>
          {item.quantity} {" "} {item.unit}
        </div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.label}>
          Item Price:
        </div>
        <div>
          {currencyValueToLabel(item.currency)} {" "} {item.price}
        </div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.label}>
          Expiry Date:
        </div>
        <div>
          {item.expiry_date && String(item.expiry_date)}
          {!item.expiry_date && <span> - </span>}
        </div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.label}>
          Notes:
        </div>
        <div>
          {item.notes}
        </div>
      </div>  
      <div className={Styles.row}>
        <div className={Styles.label}>
          Purchased:
        </div>
        <div>
          <Checkbox isChecked={item.purchased} item={item} />

        </div>
      </div>  




    </div>
  )
}