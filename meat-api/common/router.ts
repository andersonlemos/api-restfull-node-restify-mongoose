import * as restify from 'restify'
import {EventEmitter} from 'events'

export abstract class Router extends EventEmitter{
  abstract applyRoutes(application : restify.Server)
  
  envelope(document:any):any{
    return document
  }

  render(response:restify.Response,next:restify.Next){
    return (document)=>{
      if(document){
        this.emit('beforeReader',document)
        response.send(this.envelope(document))
      }else{
        response.send(404)
      }
    }
  }

  renderAll(response:restify.Response,next: restify.Next){
    return (documents: any[])=>{
        if(documents){
          documents.forEach((document,index,array) => {
            this.emit('before',document)
            array[index] = this.envelope(document)
          })
          response.json(documents)
        }else{
          response.json([])
        }
        next()
    }
  }
}