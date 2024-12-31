import { deleteVehicleDocumentController } from "@/backend/controllers/vehicleDocumentController";

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    const request = req.body;
    const response = {
      status: false,
    };

    deleteVehicleDocumentController(request)
      .then((result) => {
        res.status(200).json(result);
        resolve(result);
      })
      .catch((error) => {
        response.error = error;
        res.status(200).json(response);
        resolve();
      });
  });
}
