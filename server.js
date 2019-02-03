const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {question} = require('./db/questions-model');

const app = express();
var port = process.env.PORT || 3000;

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

app.listen(port, () => {
	console.log('Server is up on port ' + port);	
});