import app from "./app"
import http from "http"

const port = 3001

const server = http.createServer(app)

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`)
  // eslint-disable-next-line no-console
  console.log(`NODE_ENV, ${process.env.NODE_ENV}`)
  // eslint-disable-next-line no-console
  // console.log(`PARAS, ${process.env.PARAS}`)
  // eslint-disable-next-line no-console
  // console.log("DATABASE_URL", process.env.DATABASE_URL || 'postgres://postgres:@Polinka123@localhost:5432/postgres')
})