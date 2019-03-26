import {Router} from '../common/router'
import * as restify from 'restify'
import {User} from './users.model'

class UsersRouter extends Router{
  applyRoutes(application : restify.Server){
    application.get('/users',(req,resp,next) => {
      User.find().then(users => {
        resp.json(users)
        next()
      })
    })
    application.get('/users/:id',(req,resp,next) => {
      User.findById(req.params.id).then(user=>{
        if(user){
          resp.json(user)
          return next()
        }
        resp.send(400)
        return next()
      })
    })
  }
}
export const usersRouter = new UsersRouter()