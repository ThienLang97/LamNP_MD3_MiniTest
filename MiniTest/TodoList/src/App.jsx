import { BiCheckboxChecked } from "react-icons/bi";
import { MdAutoFixNormal } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import './App.scss';
import shortid from "shortid";

export default function App() {
  let [todos, setTodos] = useState([])
  let [title, setTitle] = useState("")
  let [hidden, setHidden] = useState(null)
  let [newTodo, setNewTodo] = useState([])
  let [isLoaded, setIsLoaded] = useState(false)
  let [statusBox, setStatusBox] = useState(false)
  let [quantity, setQuantity] = useState(0)
  let data = async () => {
    let res = await axios.get("http://localhost:3000/api/v1/todos")
    setTodos(res.data.todos)

  }


  useEffect(() => {
    data()
  }, [isLoaded, statusBox])


  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const titleChange = (e) => {
    setTitle(e.target.value)
  }
  const upLoad = async () => {
    const newTodo = {
      userId: 1,
      title: title,
      completed: true,
      id: shortid.generate()
    };

    await axios.post('http://localhost:3000/api/v1/todos', newTodo);
    setTitle("");
    const res = await axios.get("http://localhost:3000/api/v1/todos");
    setTodos(res.data.todos);
    setIsLoaded(!isLoaded)
  };
  const mouseEnter = (id) => {
    setHidden(id)
  }
  const mouseLeave = () => {
    setHidden(false)
  }
  const removeToDo = async (item) => {
    let confirm1 = confirm("Xóa?")
    if (confirm1) {
      await axios.delete(`http://localhost:3000/api/v1/todos/${item.id}`)
    }
    setIsLoaded(!isLoaded)
  }
  const fixToDo = (item) => {
    setTitle(item.title)
    setNewTodo(item)

    setIsLoaded(!isLoaded)

  }
  const handleSave = async () => {
    let newArr = todos.find((item) => {
      if (item.id == newTodo.id) {
        item.title = title

        return item
      }
    })

    await axios.put(`http://localhost:3000/api/v1/todos/${newTodo.id}`, newArr)
    setIsLoaded(!isLoaded)
    setTitle("")

  }
  const checkBox = async (item) => {

    item.completed = !item.completed
    setStatusBox(!item.completed)
    let changedTodo = [{
      userId: item.userId,
      id: item.id,
      title: item.title,
      completed: statusBox
    }]

    await axios.patch(`http://localhost:3000/api/v1/todos/${item.id}`, changedTodo)

  }
  const completedTodos = todos.filter((item) => item.completed == true);
  useEffect(() => {
    setQuantity(completedTodos)

  }, [statusBox])
  return (
    <div className='All'>
      <form onSubmit={handleSubmit}>
        <h1>Có {completedTodos.length} công việc</h1>
        <h2>Todo List</h2>
        <div className='upper'>
          <input type="text" name='title' onChange={titleChange} value={title} />
          <button onClick={upLoad}>+</button>
          <button onClick={handleSave}>Save</button>
        </div>
        <div className='down'>
          {todos.map((item) => {
            return <div key={item.id} className='pTag'>
              {item.completed == false ? (<p
                onMouseEnter={() => mouseEnter(item.id)}
                onMouseLeave={mouseLeave}
                style={{ textDecoration: 'line-through' }}
              >
                {item.title}
                {hidden == item.id && (<div className="button"><button onClick={() => checkBox(item)}><BiCheckboxChecked /></button>
                  <button onClick={() => fixToDo(item)}><MdAutoFixNormal /></button>
                  <button onClick={() => removeToDo(item)}><AiFillDelete /></button>
                </div>)}

              </p>) : (<p
                onMouseEnter={() => mouseEnter(item.id)}
                onMouseLeave={mouseLeave}

              >
                {item.title}
                {hidden == item.id && (<div className="button"><button onClick={() => checkBox(item)}><BiCheckboxChecked /></button>
                  <button onClick={() => fixToDo(item)}><MdAutoFixNormal /></button>
                  <button onClick={() => removeToDo(item)}><AiFillDelete /></button>
                </div>)}

              </p>)}

            </div>
          })}
        </div>
      </form>
    </div>
  )
}
