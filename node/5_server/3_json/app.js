const http = require('http');

const courses = [
	{ name: 'HTML' },
	{ name: 'CSS' },
	{ name: 'JavaScript' },
	{ name: 'Node' },
];

const server = http.createServer((req, res) => {
	console.log('RUN Server');

	const url = req.url; // what?
	const method = req.method; // how?, action?
	res.setHeader('Content-Type', 'text/html');
	if (url === '/courses') {
		if (method === 'GET') {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(courses));
		} else if (method === 'POST') {
			const body = [];
			req.on('data', (chunk) => {
				console.log(chunk);
				body.push(chunk);
			});

			req.on('end', () => {
				const bodyStr = Buffer.concat(body).toString();
				const course = JSON.parse(bodyStr);
				courses.push(course);
				console.log(course);
				res.writeHead(201);
				res.end();
			});
		}
	}
});

server.listen(8080);

// console.log(http.STATUS_CODES);
