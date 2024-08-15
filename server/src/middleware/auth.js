const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


const authMiddleware = async (req, res, next) => {
    try {
        const { id, pw } = req.body; 

        const user = await prisma.users.findFirst({
            where: {
                id: id,
                pw: pw
            }
        });

        if (user) {
            next();
        } else {
            res.status(401).json({ error: "id나 비밀번호가 다릅니다." });
        }
    } catch (error) {
        res.status(500).json({ error: "서버 오류 발생" });
    }
}

module.exports = authMiddleware;

