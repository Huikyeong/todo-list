import React, { useMemo } from 'react'
import logo from './logo.svg';
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo, option, selectTodo }) {

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

function OptionBtn({ text, index, option, showOption }) {
  const isSelected = (option === index);
  const [hover, setHover] = React.useState(false);

  return (
    <button
      className='show-option'
      style={{ outline: isSelected || hover ? "solid" : "none",
               border: isSelected || hover ? "1px black" : "none" }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onClick={() => showOption(index)}
    >{text}</button>
  );
}

function EditBox ({ edit, index, handleChange, handleKeyDown }) {

  return (
    <input
      className='input'
      type="text"
      value={edit}
      onChange={handleChange}
      onKeyDown={e => handleKeyDown(e, index)}
    />
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    { text: "first todo", isCompleted: false, isEditable: false },
    { text: "second todo", isCompleted: false, isEditable: false },
    { text: "third todo", isCompleted: false, isEditable: false }
  ]);

  const [remain, setRemain] = React.useState(3);
  const [option, setOption] = React.useState(0);
  const [select, setSelect] = React.useState(-1);
  const [editText, setEditText] = React.useState("");

  const addTodo = text => {
    const newTodos = [...todos, { text, isCompleted: false, isEditable: false }];
    setTodos(newTodos);
    setRemain(remain + 1);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    if (newTodos[index].isCompleted) {
      setRemain(remain + 1);
    }else{
      setRemain(remain - 1);
    }
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    if (!newTodos[index].isCompleted) {
      setRemain(remain - 1);
    }
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const showOption = newOption => {
    setOption(newOption);
  };

  const handleClick = (e) => {
    if (e.target.className !== "todo-text" && e.target.className !== "edit-box" && e.target.className !== "input") {
      setSelect(-1);
      setEditText("");
    }
  };

  const selectTodo = index => {
    setSelect(index);
    setEditText(todos[index].text);
  };

  const handleChange = e => {
    setEditText(e.target.value);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      todos[index].text = editText;
      setTodos(todos);
      setSelect(-1);
    }
  };

  const printNum = num => {
    if (num > 1) {
      return String(num) + " items left";
    } else if (num === 1) {
      return String(num) + " item left";
    } else {
      return "no item";
    }
  }

  return (
    <div className='app' onMouseDown={handleClick}>
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
            selectTodo={selectTodo}
          />
        ))}
        <div>
          { printNum( remain ) }
          <OptionBtn
            text={"Completed"}
            index={2}
            option={option}
            showOption={showOption}
          />
          <OptionBtn
            text={"Active"}
            index={1}
            option={option}
            showOption={showOption}
          />
          <OptionBtn
            text={"All"}
            index={0}
            option={option}
            showOption={showOption}
          />
        </div>
      </div>
      {select < 0 ? (
        <div></div>
      ) : (
        <div style={{marginTop: "3px", marginLeft: "20px"}}>
          <EditBox 
            edit={editText} 
            index={select} 
            handleChange={handleChange} 
            handleKeyDown={handleKeyDown} />
          <div style={{display: "flex", justifyContent: "flex-end", fontSize: "10px"}}>
            edit here...
          </div>
        </div>
      )}
    </div>
  );
}

export default App;