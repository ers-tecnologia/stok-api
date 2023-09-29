const { decodeAuthToken } = require("../helpers/tokenHelper");
const asyncHandler = require("express-async-handler");

class AuthMiddleware {
  static apply(roles = []) {
    return (req, res, next) => {
      try {
        const authHeader = req.headers.authorization;
        
        // Verifique se o cabeçalho de autorização começa com "Bearer"
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).send("Não Autorizado!");
        }

        const [, tokenAuthorization] = authHeader.split(" ");

        if (!tokenAuthorization) {
          return res.status(401).send("Não Autorizado!");
        }

        const decodedToken = decodeAuthToken(tokenAuthorization);

        if (roles.includes(decodedToken.perfil)) {
          req.user = decodedToken;
          return next();
        }

        return res.status(401).send("Não Autorizado!");
      } catch (e) {
        return res.status(401).send("Não Autorizado!");
      }
    };
  }
}

const isAdmin = asyncHandler((req, res, next) => {
    if (req.user.perfil !== 'ADMINISTRADOR') {
      return res.status(401).json({ message: 'Você não é um administrador' });
    }
  
    next();
  });

module.exports = { AuthMiddleware, isAdmin };
