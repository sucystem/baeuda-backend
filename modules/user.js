var jwt = require('jsonwebtoken');

async function tokenToUser(req, res, next) {
    const token = req.headers.auth_token;
	if(!token) return res.status(200).send({
		result: 'false',
		data: [],
		msg: '로그인이 필요합니다.'
	});
	try { 
		const verified = jwt.verify(JSON.parse(token),process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (e) {
		console.log(e);
		res.status(200).send({
			result: "false",
			data: [],
			msg: '잘못된 토큰입니다.'});
	}
}
function checkLogin(req, res, next) {
	if(!req.user) throw {};
	next();
}
module.exports = { tokenToUser, checkLogin };
