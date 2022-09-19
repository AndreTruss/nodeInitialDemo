const noCacheMiddleware = (req, res ,next) => {
  try {
    res.set('Cache-control', 'no-cache')
    next()
  } catch (err) { next(err) }
}

const authentication = ( req, res, next ) => {
  
  const authHeader = req.headers.authorization;
  if(!authHeader){
    const err = new Error("you could not be authorized");
      err.status = 401;
      next(err);
      return;
  }
//console.log('authHeader :'+authHeader);

const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//console.log(auth)
const user = auth[0];
const pass = auth[1];
  if (user == 'admin' && pass =='1234') {
      next();

  }else{
    const err = new Error("you could not be authorized");
      err.status = 401;
      next(err);

  }
}

module.exports = { noCacheMiddleware, authentication}