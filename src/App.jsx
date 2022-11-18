import { useState, useEffect } from 'react'
import KanaQuiz from './KanaQuiz'
import KanaLearn from './KanaLearn'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();


function App() {


  const [quiz, setQuiz] = useState('');
  const [learn, setLearn] = useState('');
  const [show, setShow] = useState(true);
  const [difficulty, setDifficulty] = useState(10);
  const [isDakutan, setIsDakutan] = useState(false);


  function handleDifficulty(event) {
    setDifficulty(event.target.value);
  }

  function handleDakutan(event) {
    setIsDakutan(event.target.checked);
  }


  function handleQuizChoice(quizType){
    setShow(false)
    setQuiz(quizType)
  }

  function handleLearnChoice(learnType){
    setShow(false)
    setLearn(learnType)

  }
  
  return (
    <div>
    {show &&
      <div data-aos="slide-up"  className=" min-h-screen  centerFlex ">
        <div className=" text-white max-w-lg rounded-lg overflow-hidden shadow-lg bg-white soft-shadow pr-16 pl-16">
          <header className="p-6 mb-4 text-center">
            <img className='scale-75' src="/src/assets/logo.png"/>
          </header>
        <div className='mb-5 '> 
          <h1 className='text-1xl font-bold uppercase mt-5 mb-3 text-black	' > Learn</h1>
          <button className="transition ease-in-out delay-50 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-200 ... bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleLearnChoice('hiragana')}> Hiragana</button>
          <button className="transition ease-in-out delay-50 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-200 ... bg-blue-500 text-white font-bold py-2 px-4 rounded m-4" onClick={() => handleLearnChoice('katakana')}> Katakana</button>
        </div>

        <hr className='mt-3 mb-3'/>

        <h1 className='text-1xl font-bold uppercase mt-5 mb-3 text-black	' > Quiz</h1>
        <div class="flex" onChange={handleDifficulty}>
          <div class="flex items-center mr-4">
            <input  
              checked={difficulty == 10} 
              id="inline-radio" 
              type="radio" 
              value={10} 
              name="inline-radio-group" 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="inline-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Easy</label>
          </div>
          <div class="flex items-center mr-4">
            <input 
              checked={difficulty == 6} 
              id="inline-2-radio" 
              type="radio" 
              value={6} 
              name="inline-radio-group" 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="inline-2-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medium</label>
          </div>
          <div class="flex items-center mr-4">
            <input 
              checked={difficulty == 3} 
              id="inline-3-radio" 
              type="radio" 
              value={3} 
              name="inline-radio-group" 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="inline-3-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hard</label>
          </div>
        </div>

        <div class="flex items-center mb-4 mt-4">
          <input 
            id="default-checkbox" 
            type="checkbox" 
            onChange={handleDakutan} 
            value="" 
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Include dakuten and handakuon</label>
        </div>
        <div className='mb-5 '>
          <button className="transition ease-in-out delay-100 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-200 ... bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleQuizChoice('hiragana')}> Hiragana</button>
          <button className="transition ease-in-out delay-100 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-200 ... bg-blue-500 text-white font-bold py-2 px-4 rounded m-4" onClick={() => handleQuizChoice('katakana')}> Katakana</button>
        </div>
      </div>
    </div>}
      {quiz && <KanaQuiz quiz={quiz} difficulty={difficulty} dakutan={isDakutan} stateChanger={setShow}/>}
      {learn && <KanaLearn quiz={learn} stateChanger={setShow}/>}

      <div className='bg-scroll'> </div>
    </div> 
    )
  }


export default App
