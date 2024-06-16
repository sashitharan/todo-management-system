import {useState} from 'react'
import './App.css'
import ListTodoComponent from "./components/ListTodoComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <HeaderComponent/>
            <ListTodoComponent/>
            <FooterComponent/>
        </>
    )
}

export default App
