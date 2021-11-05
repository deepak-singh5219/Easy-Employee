const dataMiddleware = (req,res,next) =>
{
    req.type = 'admin'
    next();
}

module.exports = dataMiddleware;