import React, {useState, useEffect, useRef} from 'react';
import FlashcardList from './components/FlashcardList';
import './app.css';
import axios from 'axios';



function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios
    .get('https://opentdb.com/api_category.php')
    .then(res =>{
      setCategories(res.data.trivia_categories);
    })
  }, []);

  useEffect(()=>{

  }, [])



  function decodeString(str){
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(event){
    event.preventDefault(); //prevent our form from submitting the normal way and forcing it to go through our set up react code
    axios
    .get('https://opentdb.com/api.php', {
      params:{
        amount: amountEl.current.value,
        category: categoryEl.current.value,
      }
    })
    .then(res=>{
      setFlashcards(res.data.results.map((questionItem, index) =>{
        const answer = decodeString(questionItem.correct_answer);
        const options = [...questionItem.incorrect_answers.map(answer => decodeString(answer)), answer]

        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: questionItem.correct_answer, //why not decodeString() here??
          options: options.sort(()=> Math.random()-.5)
        }
      }))
    })
  }

  //<> </> <-- shorthand for <React.Fragment></React.Fragment>

  return (
    <>
      <form className = "header" onSubmit = {handleSubmit}>
        <div className = "form-group">
          <label htmlFor = "category">Category</label>
          <select id = "category" ref ={categoryEl}>
            {categories.map(category =>{
              return  <option value = {category.id} key ={category.id}>{category.name}</option>
            })}

          </select>
        </div>
        <div className = "form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input type = "number" id="amount" min="1" step="1" defaultValue = {10} ref={amountEl} />
        </div>
        <div className = "form-group">
            <button className="btn"> generate </button>
        </div>
      </form>
      <div className= "container">
        <FlashcardList flashcards = {flashcards}/>
      </div>
    </>
  );
}


export default App;