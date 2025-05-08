import React, { useState } from 'react';

const AddTest = () => {
  const [testData, setTestData] = useState({
    title: '',
    questions: [{ text: '', answers: ['', ''], correctAnswer: 0 }]
  });

  const handleTestChange = (e, index, field, answerIndex) => {
    const newTestData = { ...testData };

    if (field === 'question') {
      newTestData.questions[index].text = e.target.value;
    } else if (field === 'answer') {
      newTestData.questions[index].answers[answerIndex] = e.target.value;
    } else if (field === 'correctAnswer') {
      newTestData.questions[index].correctAnswer = parseInt(e.target.value);
    } else {
      newTestData[e.target.name] = e.target.value;
    }

    setTestData(newTestData);
  };

  const addQuestion = () => {
    setTestData({
      ...testData,
      questions: [
        ...testData.questions,
        { text: '', answers: ['', ''], correctAnswer: 0 }
      ]
    });
  };

  const addAnswer = (questionIndex) => {
    const newTestData = { ...testData };
    newTestData.questions[questionIndex].answers.push('');
    setTestData(newTestData);
  };

  return (
    <div>
      <h2>Ajouter un test</h2>
      <form>
        <div className="form-group">
          <label htmlFor="testName">Nom du test</label>
          <input
            type="text"
            id="testName"
            className="form-control"
            placeholder="Entrez le nom du test"
            value={testData.title}
            onChange={(e) => handleTestChange(e)}
          />
        </div>
        {testData.questions.map((question, qIndex) => (
          <div key={qIndex}>
            <label>Question {qIndex + 1}</label>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleTestChange(e, qIndex, 'question')}
              className="form-control"
            />
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex}>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => handleTestChange(e, qIndex, 'answer', aIndex)}
                  className="form-control"
                  placeholder={`Réponse ${aIndex + 1}`}
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => addAnswer(qIndex)}
            >
              + Ajouter une réponse
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={addQuestion}
        >
          + Ajouter une question
        </button>
        <button type="submit" className="btn btn-primary mt-3">
          Ajouter le test
        </button>
      </form>
    </div>
  );
};

export default AddTest;
