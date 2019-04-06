module.exports = async(req, res) => {
	let accepts = await req.accepts(["text", "html"]);
	switch (accepts) {
		case "text": {
			return res.status(429).send("To many requests, try again later.");
		}
		case "html": {
			return res.status(429).render("429.ejs");
		}
	}
};
