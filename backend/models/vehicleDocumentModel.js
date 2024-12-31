import executeQuery from "@/helpers/dbConnection";

export function addNewVehicleDocument(request) {
  return new Promise((resolve, reject) => {
    const tempObj = {
      vehicleNo: request.vehicleNo,
      documentType: request.documentType,
      expiryDate: request.expiryDate,
      note: request.note,
    };

    const insertQuery = `INSERT INTO vehicle_documents SET ?`;

    executeQuery(insertQuery, [tempObj])
      .then((insertResult) => {
        if (insertResult.affectedRows > 0) {
          const id = insertResult.insertId;
          resolve({
            success: true,
            id,
            message: "Vehicle document added successfully",
          });
        } else {
          reject(new Error("Insertion failed"));
        }
      })
      .catch((error) => {
        console.error("Error inserting vehicle document:", error);
        reject(error);
      });
  });
}

export function getAllVehicleDocuments() {
  return new Promise((resolve, reject) => {
    const selectQuery = `SELECT * FROM vehicle_documents`;

    executeQuery(selectQuery)
      .then((result) => {
        resolve({
          success: true,
          data: result,
        });
      })
      .catch((error) => {
        console.error("Error fetching vehicle documents:", error);
        reject(error);
      });
  });
}

export function deleteVehicleDocumentById(id) {
  return new Promise((resolve, reject) => {
    const deleteQuery = `DELETE FROM vehicle_documents WHERE id = ?`;

    executeQuery(deleteQuery, [id])
      .then((deleteResult) => {
        if (deleteResult.affectedRows > 0) {
          resolve({
            success: true,
            message: "Vehicle document deleted successfully",
          });
        } else {
          reject(new Error("No record found with the given ID"));
        }
      })
      .catch((error) => {
        console.error("Error deleting vehicle document:", error);
        reject(error);
      });
  });
}

export function editVehicleDocumentById(id, updatedFields) {
  return new Promise((resolve, reject) => {
    const updateQuery = `UPDATE vehicle_documents SET ? WHERE id = ?`;

    executeQuery(updateQuery, [updatedFields, id])
      .then((updateResult) => {
        if (updateResult.affectedRows > 0) {
          resolve({
            success: true,
            message: "Vehicle document updated successfully",
          });
        } else {
          reject(
            new Error("No record found with the given ID or no changes made")
          );
        }
      })
      .catch((error) => {
        console.error("Error updating vehicle document:", error);
        reject(error);
      });
  });
}
