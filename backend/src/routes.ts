import { Router } from "express";

import OrphanageController from "./controllers/orphanages-controller";

const routes = Router();

routes.post("/orphanages", OrphanageController.create);
routes.get("/orphanages", OrphanageController.index);

export default routes;
