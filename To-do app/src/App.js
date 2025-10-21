import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'; // Optional custom styles

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    const newTask = { id: Date.now(), text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="p-4 shadow rounded bg-light">
            <h1 className="text-center mb-4 text-primary">📝 To-Do List</h1>

            {/* Add Task */}
            <Form onSubmit={addTask}>
              <Row className="g-2">
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Add a new task..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </Col>
                <Col xs={3}>
                  <Button variant="primary" type="submit" className="w-100">
                    Add
                  </Button>
                </Col>
              </Row>
            </Form>

            {/* Task List */}
            <ListGroup className="mt-4">
              {tasks.length === 0 && (
                <ListGroup.Item className="text-center text-muted">
                  No tasks yet — add one above!
                </ListGroup.Item>
              )}

              {tasks.map((task) => (
                <ListGroup.Item
                  key={task.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <Form.Check
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      inline
                    />
                    <span
                      className={
                        task.completed
                          ? "text-decoration-line-through text-muted"
                          : ""
                      }
                    >
                      {task.text}
                    </span>
                  </div>

                  <div>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        const newText = prompt("Edit task:", task.text);
                        if (newText) editTask(task.id, newText);
                      }}
                    >
                      ✏️
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                    >
                      🗑️
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
