import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next)=>{
    const token = req.headers['authorization']; // Captura o token do cabeçalho

    if(!token){
        return res.status(401).json({message: 'Token não fornecido!'})
    }

    try{
       // Remove o prefixo "Bearer " (se necessário) e verifica o token
       const decoded = jwt.verify(token.replace('Bearer', ''), process.env.JWT_SECRET);
       req.user = decoded // Adiciona os dados do usuário ao objeto `req`
       next() // Continua para a próxima middleware ou rota

    }catch(error){
        return res.status(401).json({message: 'Token inválido!'})
    }
};

export default authMiddleware;