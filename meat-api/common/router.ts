import * as restify from 'restify'
import {EventEmitter} from 'events'

export abstract class Router extends EventEmitter{
  abstract applyRoutes(application : restify.Server)
  
  render(response:restify.Response,next:restify.Next){
    return (document)=>{
      if(document){
        this.emit('beforeReader',document)
        response.send(document)
      }else{
        response.send(404)
      }
    }
  }

  renderAll(response:restify.Response,next: restify.Next){
    return (documents: any[])=>{
        if(documents){
          documents.forEach(document => {
            this.emit('before',document)
          })
          response.json(documents)
        }else{
          response.json([])
        }
    }
  }
}