import express from 'express'
import userRouter from "./routers/user.router";
import cors from 'cors'
import recipeRouter from "./routers/recipe.router";
import favRouter from "./routers/favorite.router";

const app = express()
app.use(cors(
    {
        origin: 'http://localhost:4200',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }
))
const PORT = 3000

app.use(express.json())

app.use("/user", userRouter)
app.use('/recipe', recipeRouter)
app.use('/fav', favRouter)

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Welcome to the recipez!')
})

app.listen(PORT, () => {
    console.log(`server is running on the port: ${PORT}`)
})