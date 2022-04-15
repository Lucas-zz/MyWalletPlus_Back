export async function validateTokenMiddleware(req, res, next) {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    next();
}