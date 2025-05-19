'use client'

import { useState } from 'react'
import { TodoObject } from '@/models/Todo';
import { v4 as uuid } from 'uuid';

const Home: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<TodoObject[]>([]);

  const addTodo = () => {
    setTodos([{ id: uuid(), value: todo, done: false }, ...todos]);
    setTodo('');
  }

  const markTodoDone = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo)); 
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-red-600 to-purple-700 text-white p-6">
        <h1 className="text-4xl font-semibold">Todos</h1>
      </header>
      <main className="flex flex-col items-center justify-center p-6">
        <div className="flex w-full max-w-xl space-x-4">
          <input 
            type="text" 
            placeholder='Enter a new todo' 
            className="w-full p-4 rounded-lg shadow-md border-2 border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button 
            className="p-4 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none"
            onClick={() => addTodo()}
          >
            Add Todo
          </button>
        </div>

        <ul className="w-full max-w-xl mt-8 space-y-3">
          {todos.map(todo => (
            <li 
              key={todo.id} 
              className={`text-xl cursor-pointer p-4 rounded-lg border-2 border-gray-300 shadow-md ${todo.done ? 'bg-green-100 line-through' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => markTodoDone(todo.id)}  
            >
              {todo.value}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Home;
