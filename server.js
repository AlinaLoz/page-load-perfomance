const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3002;
const host = process.env.HOSTNAME || "0.0.0.0";

app.use('*', (req, resp, next) => {
	if (req.baseUrl.includes('fonts')) {
		setTimeout(() => {
			console.log('req.url', req.baseUrl);
			next();
		}, 10000);
	} else {
		next();
	}
});
app.use(express.static('public'));

// Launch Node.js server
app.listen(port, host, () => {
	console.log(`Node.js API server is listening on http://${host}:${port}/`);
});

app.use(
	cors({
		origin(origin, cb) {
			cb(null, true);
		},
		credentials: true
	})
);

// app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/subscription", () => {});

module.exports = app;
