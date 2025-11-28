import express from "express";

const userRouter = express.Router();

userRouter.use((req, res, next) => {
    console.log('User handler');
    next();
});

userRouter.post("/login", async (req, res) => {
   res.send('login');
});

userRouter.post("/register", async (req, res) => {
    res.send('register');
});

export { userRouter };