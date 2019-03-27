import * as restify from 'restify'

export abstract class Router {
  abstract applyRoutes(application : restify.Server)
  render(response:restify.Response,next:restify.Next){
    return (document)=>{
      if(document){
        response.send(document)
      }else{
        response.send(404)
      }
    }
  }
}