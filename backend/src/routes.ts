import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import "./database/connection";
import Orphanage from "./models/orphanage";

const routes = Router();

routes.post("/orphanages", async (request: Request, response: Response) => {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends
  } = request.body;

  const orphanagesRepository = getRepository(Orphanage);

  const orphanage = orphanagesRepository.create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends
  });

  await orphanagesRepository.save(orphanage);

  return response.status(201).json(orphanage);
});

export default routes;
