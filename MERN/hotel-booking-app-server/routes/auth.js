import express from 'express';

const authRouter = express.Router();

authRouter.get("/:message", (req, res) => {
    res.status(200).send(req.params.message);
})

export default authRouter;

