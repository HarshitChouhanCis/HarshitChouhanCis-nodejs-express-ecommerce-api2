import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import authorizeRoles from "../middleware/permission.middleware.js";

import {
  createRole,
  getAllRoles,
  assignRoleToUser,
} from "../controllers/role.controller.js";

const router = Router();

// Create Role
router
  .route("/create")
  .post(
    verifyJWT,
    authorizeRoles("ADMIN"),
    createRole
  );

// Get Roles
router
  .route("/")
  .get(
    verifyJWT,
    authorizeRoles("ADMIN"),
    getAllRoles
  );

// Assign Role
router
  .route("/assign")
  .post(
    verifyJWT,
    authorizeRoles("ADMIN"),
    assignRoleToUser
  );


//authorizeRoles(
//   "ADMIN",
//   "SELLER"
// )
// req.user.role.name

export default router;