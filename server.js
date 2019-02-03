const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {question} = require('./db/questions-model');

const app = express();
var port = process.env.PORT || 3000;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
	}
	next();
});


app.use(bodyParser.json());

app.get('/questions', (req, res) => {
	question.find().then(questions => {
		res.send(questions);
	});
});	

app.post('/questions', (req, res) => {
	var newQuestion = new question ({
		question: req.body.question,
		answers: req.body.answers,
		correctAnswer: req.body.correctAnswer
	});

	newQuestion.save().then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.delete('/questions', (req, res) => {
	question.findOneAndRemove({_id:req.body.id}).then(doc => {
		res.send(doc)
	}).catch(e => {
		res.send(e);
	});
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);	
});
