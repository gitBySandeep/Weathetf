import express from "express";
import { fetchdata } from "../Controller/weather.controller.js";
const router = express.Router();
 
router.post('/fetchData',fetchdata);
 
export default router;