import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post(
  "/create-account",
  UserController.register as express.RequestHandler
);

router.post("/login", UserController.loginUser as unknown as express.RequestHandler);

const UserRoutes = router;
export default UserRoutes;
