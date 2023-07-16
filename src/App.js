import logo from './logo.svg';
import './App.css';
import React from "react"

function App() {
  //useState Hook
  //this state stores the quotes from the API in an array 
  const [quotes, setQuotes] = React.useState([])
  
  //this state displays the current quote in the screen, (index)
  const [quote, setQuote] = React.useState(null)

  function getRandomQuote(quotes) {
    return quotes[Math.floor(Math.random() * quotes.length)] 
  }

  const getNewQuote = () => {
    setQuote(getRandomQuote(quotes))
  }

  //useEffect Hook
  React.useEffect(() => {
    //fetching the quotes from the API
    //fetch is a built-in JS fucntion
    //used to make HTTP req. to fetch resources
    fetch("https://type.fit/api/quotes")
      //.then is used to handle the result of the promise after it rsolves successfully
      //if promise is true, then
      //it takes a cb func. as an arg. which will be executed when the promise resolves
      //resolve means the resolved response from the 'fetch' req, its passed as an arg to the cb func.
      .then((resolve) => resolve.json())
      //.json is a method available on the resposne object
      //that parses the resposne body as JSON data

      //this .then is chained to the first .then
      //it handles the res json data obtained from the prev .then
      //the cb takes parsed json, array, as a arg
      .then((json) => {
        setQuotes(json) //updating the quotes array with new data
        setQuote(json[0]) //displays the 1st quote
      })
  }, [])//since we're fetching data, it should only work for the 1st render

  return (
    <main className="App">
      <h1>Quote Generator</h1>
      <section>
        <button onClick={getNewQuote}>New Quote</button>
        <h3>
          <span>"</span>
          {quote?.text}
          <span>"</span>
        </h3>
        <i>- {quote?.author}</i>
      </section>
    </main>
  );
}

export default App;
