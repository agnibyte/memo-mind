import React, { useEffect, useState } from "react";
import styles from "@/styles/common/tabComponent.module.scss";

// const tabsData = [
//   { id: "one", label: "One" },
//   { id: "two", label: "Two" },
//   { id: "three", label: "Three" },
//   { id: "four", label: "Four" },
// ];

const TabComponent = ({ tabsData }) => {
  const [activeTab, setActiveTab] = useState("");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  console.log(activeTab)

  useEffect(() => {
    if (tabsData && tabsData.length > 0) {
      setActiveTab(tabsData[0].id);
    }
  }, []);

  return (
    <div className={`${styles.tabs} ${styles.group}`}>
      {tabsData &&
        tabsData.map((tab) => (
          <div
            key={tab.id}
            className={activeTab === tab.id ? styles.active : ""}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className={`${styles.tabsLabel}`}>{tab.label}</span>
          </div>
        ))}
    </div>
  );
};

export default TabComponent;
