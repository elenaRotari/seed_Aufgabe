import express from "express";

import {
  deleteOne,
  getAll,
  getOne,
  postOne,
  updateOne,
} from "../controller/photoController.js";
// set photoRouter
const photoRouter = express.Router();
// set routes in root
photoRouter.route("/").get(getAll).post(postOne);
// set routes on param
photoRouter.route("/:id").get(getOne).put(updateOne).delete(deleteOne);

export default photoRouter;
