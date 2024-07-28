import React from "react";
import Table from "react-bootstrap/Table";
import { Button } from "reactstrap";
import { formatDate, getConstant } from "@/utilities/utils";
import moment from "moment";

export default function DocumentsTables({ tableData = [] }) {
  const columns = [
    { id: "01", name: "SR No" },
    { id: "02", name: "Master No." },
    { id: "03", name: "Vehicle No." },
    { id: "05", name: "Expire Date" },
    { id: "04", name: "Alert Date" },
    { id: "06", name: "Action" },
  ];

  const getDateBeforeDays = (date, days) => {
    if (!date || typeof days !== "number") return "-";
    return moment(date).subtract(days, "days").format("DD MMM, YYYY");
  };
  return (
    <Table
      striped
      bordered
      hover
    >
      <thead>
        <tr>
          {columns.map((item, i) => (
            <th
              key={i}
              className="p-2"
            >
              {item.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.masterNo || "-"}</td>
            <td>{item.vehicleNo.label || "-"}</td>
            <td>{formatDate(item.expiryDate)}</td>
            <td>
              {getDateBeforeDays(
                item.expiryDate,
                getConstant("DAYS_BEFORE_ALERT")
              )}
            </td>
            <td>
              <Button
                className="btn  btn-outline-warning"
                variant="outline-warning "
                // style={{ backgroundColor: "transparent" }}
              >
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}