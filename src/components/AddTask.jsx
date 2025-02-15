import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

function AddTaskModal({ show, onHide, onSave, todoToEdit = null }) {
  const [task, setTask] = useState({
    name: '',
    details: '',
    date: '',
    time: '',
    status: 'undone'
  });

  useEffect(() => {
    if (todoToEdit) {
      setTask(todoToEdit);
    } else {
      setTask({
        name: '',
        details: '',
        date: '',
        time: '',
        status: 'undone'
      });
    }
  }, [todoToEdit, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const taskDate = new Date(`${task.date} ${task.time}`);
    const now = new Date();
    const diffInDays = Math.floor((now - taskDate) / (1000 * 60 * 60 * 24));
    
    if (diffInDays > 30) {
      alert("Whoa there, time traveler! Tasks from more than a month ago? Let's focus on the present and future!");
      return;
    }
    
    if (diffInDays > 21) {
      alert("Three weeks late? Better late than never, but maybe we should prioritize more recent tasks!");
      return;
    }
    
    if (diffInDays > 14) {
      alert("Two weeks have passed! Time flies when you're procrastinating, doesn't it?");
      return;
    }
    
    if (diffInDays > 7) {
      alert("A week late? No worries, we all have those weeks. Let's get it done now!");
      return;
    }
    
    if (diffInDays > 0) {
      alert(`${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} late... but today is a great day to catch up!`);
      return;
    }
    
    const taskToSave = {
      ...task,
      id: todoToEdit ? todoToEdit.id : Date.now()
    };
    onSave(taskToSave);
    onHide();
  };

  return (
    <>
      {show && (
        <Helmet>
          <title>{todoToEdit ? 'Edit Task' : 'Add New Task'} | Todo App</title>
        </Helmet>
      )}
      <Modal 
        show={show} 
        onHide={onHide}
        contentClassName="custom-modal"
        aria-labelledby="task-modal-title"
      >
        <Modal.Header closeButton className="border-0 custom-modal-header">
          <Modal.Title>{todoToEdit ? 'Edit Task' : 'Add New Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={task.name}
                onChange={(e) => setTask({ ...task, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                value={task.details}
                onChange={(e) => setTask({ ...task, details: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={task.date}
                onChange={(e) => setTask({ ...task, date: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={task.time}
                onChange={(e) => setTask({ ...task, time: e.target.value })}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {todoToEdit ? 'Update' : 'Add'} Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTaskModal;