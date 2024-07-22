// components/Dashboard.js
import React, { useState } from "react";
import CommonModal from "./common/commonModal";
import AddReminderForm from "./molecules/addReminderForm";

const Dashboard = () => {
  const items = [
    { name: "PUC", count: 0 },
    { name: "INSURANCE", count: 0 },
    { name: "FITNESS", count: 0 },
    { name: "PERMIT", count: 0 },
    { name: "TAX", count: 0 },
  ];
  const [addReminder, setAddReminder] = useState(false);

  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-light">
            <h1 className="h4 mb-0">DASHBORD</h1>
          </div>
          <button onClick={() => setAddReminder(true)}>Add </button>
          <div className="d-flex border-bottom">
            <button className="btn btn-dark flex-fill">Document</button>
            <button
              className="btn btn-light flex-fill"
              disabled
            >
              EMI
            </button>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="col text-center"
                >
                  <div className="h5">{item.name}</div>
                  <div className="text-danger display-6">{item.count}</div>
                </div>
              ))}
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  {[
                    "SR No",
                    "Master No.",
                    "Vehicle No.",
                    "Alert Date",
                    "Expire Date",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="p-2"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    No Data Found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CommonModal
        modalOpen={addReminder}
        setModalOpen={setAddReminder}
        className={""}
      >
        <AddReminderForm />
      </CommonModal>
    </>
  );
};

export default Dashboard;
