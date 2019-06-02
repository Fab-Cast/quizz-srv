var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizzSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  note: {
    type: Number,
    required: false
  },
  author: {
    type: String,
    required: true
  },
  questions: [{
    title: String,
    note: Number,
    totalTrue: Number,
    totalFalse: Number,
    visible: Boolean,
    timeout: Number,
    answers: [{
        title: String,
        correct: Boolean
    }]
  }]
});

module.exports = mongoose.model('Quizz', QuizzSchema);
