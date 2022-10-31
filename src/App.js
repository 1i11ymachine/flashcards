import React, {useState, useEffect} from 'react';
import FlashcardList from './components/FlashcardList';
import './app.css';
import axios from 'axios';



function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

  useEffect(()=>{
    axios
    .get('https://opentdb.com/api.php?amount=10')
    .then(res=>{
      setFlashcards(res.data.results.map((questionItem, index) =>{
        const answer = decodeString(questionItem.correct_answer);
        const options = [...questionItem.incorrect_answers.map(answer => decodeString(answer)),

          answer]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: questionItem.correct_answer,
          options: options.sort(()=> Math.random()-.5)
        }
      }))
    })
  }, [])

  function decodeString(str){
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

    return (
        <FlashcardList flashcards = {flashcards}/>
    );
  }

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'what is 2+2',
    answer: '4',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 2,
    question: 'question 2',
    answer: 'answer 2',
    options: [
      'answer 1',
      'answer 2',
      'answer 3',
      'answer 4'
    ]
  },
  {
    id: 3,
    question: 'question 3',
    answer: 'answer 3',
    options: [
      'answer4',
      'answer1',
      'answer2',
      'answer3'
    ]
  },
];

export default App;