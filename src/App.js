import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo, option, editTodo }) {
  const [isEditable, setIsEditable] = React.useState(todo.isEditable);
  const [text, setText] = React.useState(todo.text);

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      setIsEditable(false);
      editTodo(text, index);
    }
  };

  const handleDoubleClick = () => {
    setIsEditable(true);
  }

  if (option === 1 && todo.isCompleted) {
    return (<div></div>);
  } else if (option === 2 && !todo.isCompleted) {
    return (<div></div>);
  }

  return (
    <div>
      {isEditable ? (
        <input
          className='input'
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className='todo' style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
          <div onDoubleClick={handleDoubleClick}>
            {todo.text}
          </div>
          <div>
            <button onClick={() => completeTodo(index)} style={{ width: "75px" }}>{todo.isCompleted ? 'Cancel' : 'Complete'}</button>
            <button onClick={() => removeTodo(index)}>x</button>
          </div>
        </div>
      )}
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "12px" }}>
      <input
        type='text'
        className='input'
        placeholder='type here...'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function TodoState({ remainTodo, option, showOption }) {
  const printNum = num => {
    if (num > 1) {
      return String(num) + " items left";
    } else if (num === 1) {
      return String(num) + " item left";
    } else {
      return "no item";
    }
  }

  const handleHoverIn = e => {
    e.preventDefault();
    e.target.style.border = "1px black";
    e.target.style.outline = "solid";
  };

  const handleHoverOut = (e, t) => {
    e.preventDefault();
    if (t !== option) {
      e.target.style.border = "none";
      e.target.style.outline = "none";
    }
  };

  return (
    <div>
      { printNum( remainTodo() ) }
      <button
        className='show-option'
        style={{ outline: option === 2 ? "solid" : "none", border: option === 2 ? "1px black" : "none" }}
        onMouseOver={handleHoverIn}
        onMouseOut={e => handleHoverOut(e, 2)}
        onClick={() => showOption(2)}
      >Completed</button>
      <button
        className='show-option'
        style={{ outline: option === 1 ? "solid" : "none", border: option === 1 ? "1px black" : "none" }}
        onMouseOver={handleHoverIn}
        onMouseOut={e => handleHoverOut(e, 1)}
        onClick={() => showOption(1)}
      >Active</button>
      <button
        className='show-option'
        style={{ outline: option === 0 ? "solid" : "none", border: option === 0 ? "1px black" : "none" }}
        onMouseOver={handleHoverIn}
        onMouseOut={e => handleHoverOut(e, 0)}
        onClick={() => showOption(0)}
      >All</button>
    </div>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    { text: "first todo", isCompleted: false, isEditable: false },
    { text: "second todo", isCompleted: false, isEditable: false },
    { text: "third todo", isCompleted: false, isEditable: false }
  ]);

  const [option, setOption] = React.useState(0);

  const addTodo = text => {
    const newTodos = [...todos, { text, isCompleted: false, isEditable: false }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const remainTodo = () => {
    var count = 0;
    for (let i = 0; i < todos.length; i++) {
      if (!todos[i].isCompleted) {
        count++;
      }
    }
    return count;
  };

  const showOption = newOption => {
    setOption(newOption);
  };

  const editTodo = (newText, index) => {
    todos[index].text = newText;
  };

  // const handleKeyDown = (e, index) => {
  //   if (e.key === "enter") {
  //     todos[index].isEditable = false;
  //     todos[index].text = e.target.value
  //   }
  // };

  // const handleDoubleClick = index => {
  //   todos[index].isEditable = true;
  // };

  return (
    <div className='app'>
      <div className='todo-list'>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            option={option}
            editTodo={editTodo}
          />
        ))}
        <TodoState
          remainTodo={remainTodo}
          option={option}
          showOption={showOption}
        />
      </div>
    </div>
  );
}

export default App;