module.exports = asyncMiddleware => (req,res,next) =>
{
    Promise.resolve(asyncMiddleware(req,res,next)).catch(next);
}