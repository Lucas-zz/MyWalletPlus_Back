import cors from "cors";
import express from "express";
import router from "./routers/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

export default app;
