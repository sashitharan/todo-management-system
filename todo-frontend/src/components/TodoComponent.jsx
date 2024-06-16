import React, {useEffect, useState} from 'react';
import {getTodo, saveTodo, updateTodo} from "../services/TodoService.js";
import {useNavigate, useParams} from "react-router-dom";

const TodoComponent = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const navigate = useNavigate();

    const {id} = useParams();

    const HOMEPAGE = `/todos`;

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'> Update todo</h2>
        } else {
            return <h2 className='text-center'> Add todo</h2>
        }
    }

    function saveOrUpdateTodo(e) {
        e.preventDefault();

        const todo = {title, description, completed}
        console.log(todo)

        if (id) {
            updateTodo(id, todo).then((response) => {
                navigate(HOMEPAGE)
            }).catch((err => {
                console.error(err)
            }))
        } else {
            saveTodo(todo).then((response) => {
                console.log(response.data)
                navigate(HOMEPAGE)
            }).catch(err => {
                console.error(err)
            })
        }
    }

    // use useEffect hook to populate the todo data in the form for update.
    useEffect(() => {
        return () => {
            if (id) {
                getTodo(id).then((response) => {
                    console.log(response.data)
                    setTitle(response.data.title)
                    setDescription(response.data.description)
                    setCompleted(response.data.completed)
                }).catch(err => {
                    console.error(err)
                })
            }
        };
    }, [id]);


    return (
        <div className='container'>
            <br/>
            <br/>

            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {/*<h2 className='text-center'> Add todo</h2>*/}
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Todo Title</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter todo title'
                                    name='title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Todo Description</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter todo Description'
                                    name='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Todo Completed</label>
                                <select
                                    className='form-control'
                                    value={completed}
                                    onChange={(e) => {
                                        setCompleted(e.target.value)
                                    }}
                                >
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>

                            <button className='btn btn-success'
                                    onClick={(e) => saveOrUpdateTodo(e)}>
                                Submit
                            </button>

                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default TodoComponent;
