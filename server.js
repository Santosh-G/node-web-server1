
const express=require('express');
const hbs=require('hbs');
const fs = require('fs');

const port=process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view Engine','hbs');


app.use((req,res,next)=>{
	var now =new Date().toString();
	var log = `${now} : ${req.method} ${req.url}\n`;

	console.log(log)
	fs.appendFile('server.log',log);
	next();
});

// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('streamIt',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{

	res.render('home.hbs',{
		pageTitle:'Welcome Page',
		welcomeMessage:'Welcome to my site'
	});
});

app.get('/about',(req,res)=>{
	// res.send("About page");
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad',(req,res)=>{
	res.send({
		errorMessage:"Unable to handle Error Message"
	});
});

app.listen(port,()=>{
	console.log(`Server is up on port ${port}`);
});

