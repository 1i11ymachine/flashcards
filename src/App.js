import React, {useState} from 'react';
import FlashcardList from './components/FlashcardList';
import './app.css';



function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
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