import React, { useState } from "react";
import styles from "@/styles/common/tabComponent.module.scss";

const tabsData = [
  { id: "one", label: "One" },
  { id: "two", label: "Two" },
  { id: "three", label: "Three" },
  { id: "four", label: "Four" },
];

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("one");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className={`${styles.tabs} ${styles.group}`}>
      {tabsData.map((tab) => (
        <div
          key={tab.id}
          className={activeTab === tab.id ? styles.active : ""}
          onClick={() => handleTabClick(tab.id)}
        >
          <span  className={`${styles.tabsLabel}`}>{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TabComponent;
