import express from 'express'
import usersRoute from './routes/users.route.js'
const app = express()
const port = 3000


app.use("/users", usersRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})