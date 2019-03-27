import * as restify from 'restify'

const mpContentType = 'application/merge-patch+json'

export const mergePatchBodyParser = (req,resp,next)=>{
  if(req.getContentType()===mpContentType && req.method==='PATCH'){
    (<any>req).raqBody=req.body
    try {
      req.body = JSON.parse(req.body)
    } catch (error) {
      return next(new Error('Invalid content: ${error.message}'))
    }
    return next()
  }
}