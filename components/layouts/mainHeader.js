import React, { useState } from "react";
import headerStyle from "@/styles/header.module.scss";

export default function MainHeader() {
  // menuData.js
  const menuItems = [
    {
      title: "Dashboard",
      icon: "🌐",
      children: [],
    },
    {
      title: "Widgets",
      icon: "📦",
      children: [],
    },
    {
      title: "UI Elements",
      icon: "🎨",
      children: [
        {
          title: "Basic Elements",
          children: [],
        },
        {
          title: "Advanced Elements",
          children: [],
        },
        {
          title: "Forms & Tables",
          children: [
            { title: "Form Elements" },
            { title: "Advanced Forms" },
            { title: "Basic Tables" },
            { title: "Data Tables" },
          ],
        },
        {
          title: "Icons",
          children: [],
        },
      ],
    },
    {
      title: "Pages",
      icon: "🌍",
      children: [],
    },
    {
      title: "Apps",
      icon: "⚙️",
      children: [],
    },
  ];

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
    setActiveSubMenu(null);
  };

  return (
    <div className={headerStyle["navbar"]}>
      {menuItems.map((item, index) => (
        <div
          className={headerStyle["menu-item"]}
          key={index}
          onMouseLeave={() => {
            setActiveMenu(null);
            setActiveSubMenu(null);
          }}
        >
          <button
            className={headerStyle["menu-button"]}
            onClick={() => toggleMenu(index)}
          >
            {item.icon} {item.title}
            {item.children.length > 0 && (
              <span className={headerStyle["arrow"]}> ▼</span>
            )}
          </button>

          {item.children.length > 0 && activeMenu === index && (
            <div className={headerStyle["dropdown"]}>
              {item.children.map((child, cidx) => (
                <div
                  className={`${headerStyle["dropdown-item"]} ${headerStyle["menu-item"]}`}
                  key={cidx}
                  onMouseEnter={() => setActiveSubMenu(cidx)}
                  onMouseLeave={() => setActiveSubMenu(null)}
                >
                  {child.title}
                  {child.children?.length > 0 && (
                    <span className={headerStyle["arrow"]}> ▶</span>
                  )}

                  {child.children?.length > 0 && activeSubMenu === cidx && (
                    <div className={headerStyle["submenu"]}>
                      {child.children.map((sub, sidx) => (
                        <div
                          className={headerStyle["dropdown-item"]}
                          key={sidx}
                        >
                          {sub.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
