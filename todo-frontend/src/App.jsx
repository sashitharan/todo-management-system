import './App.css'
import ListTodoComponent from "./components/ListTodoComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TodoComponent from "./components/TodoComponent.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    {/*http://localhost:8080*/}
                    <Route path="/" element={<ListTodoComponent/>}> </Route>
                    {/*http://localhost:3000/todos*/}
                    <Route path="/todos" element={<ListTodoComponent/>}> </Route>
                    {/*http://localhost:3000/add-todo*/}
                    <Route path='/add-todo' element={<TodoComponent/>}> </Route>
                    {/*http://localhost:3000/update-todo/1*/}
                    <Route path='/update-todo/:id' element={<TodoComponent/>}> </Route>

                </Routes>
                <FooterComponent/>
            </BrowserRouter>
        </>
    )
}

export default App
