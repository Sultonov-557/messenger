module.exports = (req, res, next) => {
	const cook = req.cookies;
	if (cook == undefined) {
		res.redirect("./auth");
	}
	next();
};
