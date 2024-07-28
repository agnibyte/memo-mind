// components/Dashboard.js
import React, { useState } from "react";
import AddReminderForm from "./molecules/addReminderForm";
import CommonModal from "./common/commonModal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DocumentsSection from "./layouts/documentsSection";
import EmiSection from "./layouts/emiSection";
import AddDocumentForm from "./molecules/addDocumentForm";

const Dashboard = () => {
  const dashboardTabs = [
    {
      id: "01",
      label: "Document",
      value: "document",
      component: <DocumentsSection />,
    },
    { id: "02", label: "EMI", value: "emi", component: <EmiSection /> },
  ];
  const [reminderModal, setReminderModal] = useState(false);
  const [reminderData, setReminderData] = useState("");
  const [selectedTab, setSelectedTab] = useState(dashboardTabs[0].value);

  const addReminderData = (data) => {
    const existingDataString = localStorage.getItem("reminderData");
    let existingData = existingDataString ? JSON.parse(existingDataString) : [];
    localStorage.setItem(
      "reminderData",
      JSON.stringify([...existingData, data])
    );
  };

  const onClickDashboardTab = (val) => {
    setSelectedTab(val);
  };
  console.log("selectedTab", selectedTab);

  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-light">
            <h1 className="h4 mb-0">DASHBORD</h1>
          </div>
          <button onClick={() => setReminderModal(true)}>Add</button>
          {/* <div className="d-flex border-bottom">
            {dashboardTabs.map((tab, index) => (
              <button
                key={index}
                className={`btn rounded-top ${
                  selectedTab == tab.value && "btn-dark"
                }`}
                onClick={() => onClickDashboardTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div> */}
          <Tabs
            defaultActiveKey={dashboardTabs[0].value}
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            {dashboardTabs.map((tab, index) => (
              <Tab
                key={index}
                onClick={() => onClickDashboardTab(tab.value)}
                eventKey={tab.value}
                title={tab.label}
              >
                {tab.component}
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>

      <CommonModal
        modalTitle={"Add New Reminder"}
        modalOpen={reminderModal}
        setModalOpen={setReminderModal}
        className={""}
      >
        {/* <AddReminderForm
          setReminderModal={setReminderModal}
          reminderModal={reminderModal}
          reminderData={reminderData}
          setReminderData={setReminderData}
          addReminderData={addReminderData}
        /> */}
        <AddDocumentForm
          setReminderModal={setReminderModal}
          addReminderData={addReminderData}
        />
      </CommonModal>
    </>
  );
};

export default Dashboard;
