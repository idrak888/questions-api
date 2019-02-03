const { mongoose } = require('./mongoose');

var QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answers: [ans: String],
    correctAnswer: {
        type: String,
        required: true
    }
});

var question = mongoose.model('question', QuestionSchema);

module.exports = {
    question
}
