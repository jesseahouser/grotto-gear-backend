import express from "express"
import cors from "cors"
import grottogear from "./api/grottogear.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/grottogear", grottogear)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app