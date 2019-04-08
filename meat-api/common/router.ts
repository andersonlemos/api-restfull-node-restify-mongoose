import * as restify from 'restify'
import {EventEmitter} from 'events'

export abstract class Router extends EventEmitter{
  abstract applyRoutes(application : restify.Server)
  
  envelope(document:any):any{
    return document
  }
  envelopeAll(documents: any, options: any = {}):any{
  return documents
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

  renderAll(response:restify.Response,next: restify.Next,options:any = {}){
    return (documents: any[])=>{
        if(documents){
          documents.forEach((document,index,array) => {
            this.emit('before',document)
            array[index] = this.envelope(document)
          })
          response.json(this.envelopeAll(documents,options))
        }else{
          response.json(this.envelopeAll([]))
        }
        next()
    }
  }
}