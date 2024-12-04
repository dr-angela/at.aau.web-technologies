let express = require('express');
const app = express();
app.use(express.static('public')); // host public folder
app.get('/', function (req, res) {

    // TODO: set the content type of output to be plain HTML
    res.contentType('text/html') // 'text/' was missing
    res.status(200).send("This is a simple application");
});

// TODO: provide the code to handle a route parameter

app.get('/:param', (req, res) => {
    const param = req.params.param  // get the parameter from the url
    res.contentType('text/html');   // set the content type for html
    res.send(`<h1>This is a simple application receiving ${param}</h1>`)
})

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);
