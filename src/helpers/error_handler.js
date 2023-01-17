function errorHandler(error, req, res, next){
    if(error.name==='UnauthorizedError') return res.status(400).send('UnauthorizedError')
    if(error.name==='ValidationError') return res.status(400).send('ValidationError')
    return res.status(500).send(error)
  }

  module.exports = errorHandler
