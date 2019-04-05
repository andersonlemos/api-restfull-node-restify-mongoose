import { Server } from './server/server'
import { usersRouter } from './Users/users.router'
import { restaurantsRouter } from './restaurants/restaurants.router'
import { reviewsRouter } from "./reviews/reviews.router"
import { mainRouter } from './main.router'

const server = new Server()

server.bootstrap([
  usersRouter,
  restaurantsRouter,
  reviewsRouter,
  mainRouter
]).then(server => {
  console.log('Server is running on:', server.application.address())
}).catch(error => {
  console.log('Server failed to start')
  console.error(error)
  process.exit(1)
})

