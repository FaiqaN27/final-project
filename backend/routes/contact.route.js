import express from "express";
import { contactForm, deleteContact, getAllContacts } from "../controllers/contact.controller.js";
import { verifyAdmin } from "../utils/verify.token.js";

const router = express.Router();

router.post("/", contactForm)

// GET route to fetch all contacts (you need this for the React app)
router.get("/", verifyAdmin, getAllContacts);

router.delete('/:id', verifyAdmin, deleteContact)

export default router;
