import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import AddTask from './AddTask';
import TodoList from './TodoList';
import { FaPlus, FaCheck, FaTrash } from 'react-icons/fa';

function Body() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodos, setSelectedTodos] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = [];
      snapshot.forEach((doc) => {
        todosData.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todosData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTodo = async (newTodo) => {
    try {
      await addDoc(collection(db, 'todos'), {
        name: newTodo.name,
        details: newTodo.details,
        date: newTodo.date,
        time: newTodo.time,
        status: 'undone',
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const todoRef = doc(db, 'todos', id);
      const todo = todos.find(t => t.id === id);
      await updateDoc(todoRef, {
        status: todo.status === 'done' ? 'undone' : 'done'
      });
    } catch (error) {
      console.error("Error toggling status: ", error);
    }
  };

  const handleEditTodo = async (updatedTodo) => {
    try {
      const todoRef = doc(db, 'todos', updatedTodo.id);
      await updateDoc(todoRef, {
        name: updatedTodo.name,
        details: updatedTodo.details,
        date: updatedTodo.date,
        time: updatedTodo.time
      });
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      try {
        const batch = writeBatch(db);
        todos.forEach((todo) => {
          const todoRef = doc(db, 'todos', todo.id);
          batch.delete(todoRef);
        });
        await batch.commit();
      } catch (error) {
        console.error("Error deleting all todos: ", error);
      }
    }
  };

  const handleMarkAllDone = async () => {
    try {
      const batch = writeBatch(db);
      todos.forEach((todo) => {
        const todoRef = doc(db, 'todos', todo.id);
        batch.update(todoRef, { status: 'done' });
      });
      await batch.commit();
    } catch (error) {
      console.error("Error marking all done: ", error);
    }
  };

  const getSortedTodos = () => {
    return [...todos].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status === 'done' ? 1 : -1;
        default:
          return 0;
      }
    });
  };

  const handleSelectedTodosChange = (newSelectedTodos) => {
    setSelectedTodos(newSelectedTodos);
  };

  return (
    <div className="container p-4">
      {isLoading ? (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
          <div className="spinner-border gradient-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-4 loading-text">Loading your tasks...</p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between mb-3">
            <select 
              className="form-select w-auto" 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>

          <div className="card shadow-lg">
            <div className="card-body">
              <h3 className="text-center mb-4" style={{ color: '#5E1B89', fontWeight: 'bold' }}>To-Do List</h3>
              <div className="d-flex justify-content-between mb-3 gap-2">
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      setTodoToEdit(null);
                      setShowModal(true);
                    }}
                  >
                    <FaPlus className="me-2" /> Add Task
                  </button>
                  <button 
                    className="btn btn-success"
                    onClick={handleMarkAllDone}
                  >
                    <FaCheck className="me-2" /> Mark All Done
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={handleDeleteAll}
                  >
                    <FaTrash className="me-2" /> Delete All
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      selectedTodos.forEach(id => handleToggleStatus(id));
                      setSelectedTodos([]);
                    }}
                    disabled={selectedTodos.length === 0}
                  >
                    <FaCheck className="me-2" /> Mark Selected Done
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete selected tasks?')) {
                        selectedTodos.forEach(id => handleDeleteTodo(id));
                        setSelectedTodos([]);
                      }
                    }}
                    disabled={selectedTodos.length === 0}
                  >
                    <FaTrash className="me-2" /> Delete Selected
                  </button>
                  
                </div>
              </div>
              <div style={{ height: '400px', overflowY: 'auto' }}>
                <TodoList
                  todos={getSortedTodos()}
                  onToggleStatus={handleToggleStatus}
                  onEdit={(todo) => {
                    setTodoToEdit(todo);
                    setShowModal(true);
                  }}
                  onDelete={handleDeleteTodo}
                  onSelectedTodosChange={handleSelectedTodosChange}
                />
              </div>
            </div>
          </div>

          <AddTask 
            show={showModal}
            onHide={() => setShowModal(false)}
            onSave={todoToEdit ? handleEditTodo : handleAddTodo}
            todoToEdit={todoToEdit}
          />
        </>
      )}
    </div>
  );
}

export default Body;
      