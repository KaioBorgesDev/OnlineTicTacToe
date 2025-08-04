import express from "express";

export function routes() {
    const router = express.Router();


    // Routes for API
    router.get("/api/v1/teste", (req, res) => {
        res.status(200).send("h1");
    });

    return router;  
}