import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo, option, editTodo, selectTodo }) {
  const [isEditable, setIsEditable] = React.useState(todo.isEditable);
  
  const handleDoubleClick = () => {
    setIsEditable(true);
  }

  if (option === 1 && todo.isCompleted) {
    return (<div></div>);
  } else if (option === 2 && !todo.isCompleted) {
    return (<div></div>);
  }

  return (
    <div className='todo'>
      <div className='todo-text' style={{ textDecoration: todo.isCompleted ? "line-through" : "" }} onClick={() => selectTodo(index)}>
        {todo.text}
      </div>
      <div>
        <button onClick={() => completeTodo(index)} style={{ width: "75px" }}>{todo.isCompleted ? 'Cancel' : 'Complete'}</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
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

  const handleHoverOut = (e, btnNum) => {
    e.preventDefault();
    if (btnNum !== option) {
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

function EditBox ({ todo, index, editTodo }) {
  const [text, setText] = React.useState(todo.text);

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      editTodo(text, index);
    }
  };

  return (
    <input
      className='input'
      type="text"
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    { text: "first todo", isCompleted: false, isEditable: false },
    { text: "second todo", isCompleted: false, isEditable: false },
    { text: "third todo", isCompleted: false, isEditable: false }
  ]);

  const [option, setOption] = React.useState(0);
  const [select, setSelect] = React.useState(-1);

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
    setTodos(todos);
    setSelect(-1);
  };

  const handleClick = (e) => {
    if (e.target.className !== "todo-text" && e.target.className !== "edit-box" && e.target.className !== "input") {
      setSelect(-1);
    }
  };

  const selectTodo = index => {
    setSelect(index);
  };

  return (
    <div className='app' onClick={handleClick}>
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
            selectTodo={selectTodo}
          />
        ))}
        <TodoState
          remainTodo={remainTodo}
          option={option}
          showOption={showOption}
        />
      </div>
      <div className='edit-box'>
        {select < 0 ? (<div></div>) : (<EditBox todo={todos[select]} index={select} editTodo={editTodo} />)}
      </div>
    </div>
  );
}

export default App;