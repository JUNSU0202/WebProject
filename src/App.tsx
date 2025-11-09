import { useState, useRef,type FormEvent, type ChangeEvent } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
//import { preconnect } from 'react-dom';

export type Todo ={
  id: number;
  text: string;
  done: boolean;
};


export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const nextId = useRef(1);

  const handleAdd = (text: string) => {
    setTodos((prev) => [
      ...prev, 
      { id: nextId.current++, text, done: false }
    ]);
  };

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleRemove = ( id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
  <TodoTemplate>
    <h1>Todo List</h1>
    {/* 여기 todoInsert 수정 */}
    <TodoInsert onAdd={handleAdd}/>
    <TodoList 
      todos={todos}
      onToggle={handleToggle}
      onRemove={handleRemove}
    />
  </TodoTemplate>
  );
}

function TodoTemplate({children}: {children: React.ReactNode}){
  return <div>{children}</div>
}

function TodoInsert({onAdd}: { onAdd: (text: string) => void}){
  const [value, setValue] = useState(""); 

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return ;


    onAdd(text);
    setValue("");
  }

  return (
    <form onSubmit={onSubmit}
      style={{
        display: "flex",
        gap: "8px",
        marginBottom: "12px",
      }}
    >
      <input 
        value={value}
        onChange={onChange}
        placeholder="할 일을 입력하세요 Enter"
        style={{
          flex: 1,
          padding: "8px 10px",
        }}
        />
      <button type="submit"
        style={{
          padding: "8px 16px",
        }}
      >추가</button>
    </form>
  );
}

function TodoList({todos, onToggle, onRemove,}: { todos: Todo[];
   onToggle: (id: number) => void;
   onRemove: (id: number) => void;
 }){
  return(
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        textAlign: "left",   // 부모의 text-align: center 덮어쓰기
      }}
    >
      {todos.map((t) => (
        <TodoItem 
        key ={t.id}
        todo={t} 
        onToggle={onToggle}
        onRemove={onRemove}
        />
      ))}
    </ul>
  );
}

function TodoItem({ todo, onToggle, onRemove,}: 
  { todo: Todo
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
  }) {
  return (
    <li style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom:"10px" }}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.done ? "line-through" : "none",
          flex: 1,
        }}
      >
        {todo.text}
      </span>
      <button type="button" onClick={() => onRemove(todo.id)}>
        ×
      </button>
    </li>
  );
}