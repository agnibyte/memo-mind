import React from "react";
import docSecStyle from "@/styles/docSec.module.scss";

const DocumentsFilterCard = ({ item, onFilterClick, isSelected }) => {
  return (
    <button
      className={`${docSecStyle.documentCard} col-12 col-md text-center ${
        isSelected ? docSecStyle.selected : ""
      }`}
      onClick={() => onFilterClick(item.value)}
    >
      <div className={docSecStyle.labelWrap}>
        <div className={`${docSecStyle.label} text-primary`}>{item.label}</div>
        <div className={`${docSecStyle.label} text-danger`}>
          {item.withinMonthExpiryCount + item.expiredCount}
        </div>
      </div>
    </button>
  );
};

export default DocumentsFilterCard;
