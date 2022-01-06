import logo from './logo.svg';
import './App.css';
import { GlobalStyle } from './components';
import narutoImg from "./images/naruto.png"
import styled from 'styled-components';
import { Quotes } from './components/quotes';
import { getQuote } from './service';
import { useState } from 'react';
import jutsuSound from "./sounds/jutsu.mp3"

const audio= new Audio(jutsuSound);

function App() {
const [quoteState,setQuoteState] = useState({speaker : "test quote", quote: "test speaker"});


const onUpdate=async () =>{
  const quote= await getQuote();
  audio.play();
  setQuoteState(quote);
}

  return (
    <Content>
      <Quotes
       {...quoteState} 
       onUpdate={onUpdate}
       />
      <NarutoImg src={narutoImg} alt="Naruto with a kunai"/>
    </Content>
  );
}

const Content =styled.div `
  height : 100vh;
  padding : 0 50px;
  display : flex;
  justify-content : center;
  align-items : center;
`

const NarutoImg= styled.img `
max-width : 50vw;
align-self : flex-end;
`

export default App;
