import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

function TodoList({ todos, onToggleStatus, onEdit, onDelete, onSelectedTodosChange }) {
  const [selectedTodos, setSelectedTodos] = useState([]);

  const handleCheckboxChange = (todoId) => {
    setSelectedTodos(prevSelected => {
      const newSelected = prevSelected.includes(todoId)
        ? prevSelected.filter(id => id !== todoId)
        : [...prevSelected, todoId];
      onSelectedTodosChange(newSelected);
      return newSelected;
    });
  };

  return (
    <div className="todo-list custom-scrollbar">
      {todos.map((todo) => (
        <div 
          key={todo.id} 
          className="card mb-2"
        >
          <div className="card-body d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <Form.Check
                type="checkbox"
                checked={selectedTodos.includes(todo.id)}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <div>
                <h5 
                  className="card-title mb-1" 
                  style={{ 
                    textDecoration: todo.status === 'done' ? 'line-through' : 'none',
                    color: '#5E1B89'
                  }}
                >
                  {todo.name}
                </h5>
                <p className="card-text mb-1">{todo.details}</p>
                <small className="text-muted">
                  {todo.date} {todo.time}
                </small>
              </div>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="link"
                size="sm"
                onClick={() => onToggleStatus(todo.id)}
                style={{ 
                  color: '#5E1B89',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#F4512C'}
                onMouseLeave={(e) => e.target.style.color = '#5E1B89'}
              >
                <FaCheck />
              </Button>
              <Button
                variant="link"
                size="sm"
                onClick={() => onEdit(todo)}
                style={{ 
                  color: '#5E1B89',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#F4512C'}
                onMouseLeave={(e) => e.target.style.color = '#5E1B89'}
              >
                <FaEdit />
              </Button>
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this task?')) {
                    onDelete(todo.id);
                  }
                }}
                style={{ 
                  color: '#5E1B89',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#F4512C'}
                onMouseLeave={(e) => e.target.style.color = '#5E1B89'}
              >
                <FaTrash />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;