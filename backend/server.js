import express from 'express'
import usersRoute from './routes/users.route.js'
import cors from "cors"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/users", usersRoute)


// console para debugar erros
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})