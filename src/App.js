import logo from './logo.svg';
import './App.css';
import { GlobalStyle } from './components';
import narutoImg from "./images/naruto.png"
import styled from 'styled-components';
import { Quotes } from './components/quotes';


function App() {
  return (
    <Content>
      <Quotes quote={"DATTEBAYO"} speaker={"DATTEBAY"}/>
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
