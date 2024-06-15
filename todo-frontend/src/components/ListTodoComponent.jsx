import React, {useEffect, useState} from 'react';
import {getAllTodos} from '../services/TodoService'

const ListTodoComponent = () => {

    // const dummyData = [
    //     {
    //         "id": 1,
    //         "title": "Learn Core Java",
    //         "description": "Learn Core Java with Examples",
    //         "completed": false,
    //     },
    //     {
    //         "id": 2,
    //         "title": "Learn Core Spring",
    //         "description": "Learn Core Spring with Examples",
    //         "completed": false,
    //     },
    //     {
    //         "id": 3,
    //         "title": "Learn Core React",
    //         "description": "Learn Core React with Examples",
    //         "completed": false,
    //     }
    // ]

    // const [todos, setTodos] = useState(dummyData);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        listTodos();
    }, []);


    function listTodos() {
        getAllTodos().then((response) => {
            setTodos(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className="container">
            <h2 className='text-center'>List of Todos</h2>
            <div>
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Todo Title</th>
                        <th> Todo Description</th>
                        <th>Todo Completed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(todo =>
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? 'YES' : 'NO'}</td>
                                {/*<td>*/}
                                {/*    <button className='btn btn-info' onClick={() => updateTodo(todo.id)}>Update</button>*/}
                                {/*    <button className='btn btn-danger' onClick={() => removeTodo(todo.id)}*/}
                                {/*            style={{marginLeft: "10px"}}>Delete*/}
                                {/*    </button>*/}
                                {/*    <button className='btn btn-success' onClick={() => markCompleteTodo(todo.id)}*/}
                                {/*            style={{marginLeft: "10px"}}>Complete*/}
                                {/*    </button>*/}
                                {/*    <button className='btn btn-info' onClick={() => markInCompleteTodo(todo.id)}*/}
                                {/*            style={{marginLeft: "10px"}}>In Complete*/}
                                {/*    </button>*/}
                                {/*</td>*/}
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default ListTodoComponent;

