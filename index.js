const express = require("express");
const app = express();

app.use(express.json());

// No SQL – temporary storage
let todos = [];

// CREATE
app.post("/todo", (req, res) => {
  const { id, title, status } = req.body;
  todos.push({ id, title, status });
  res.send("Todo added");
});

// READ
app.get("/todo", (req, res) => {
  res.json(todos);
});

// UPDATE
app.put("/todo/:id", (req, res) => {
  const todoId = parseInt(req.params.id); // string → number
  const { title, status } = req.body;

  let found = false;

  todos = todos.map(todo => {
    if (todo.id === todoId) {
      found = true;
      return { ...todo, title, status };
    } else {
      return todo;
    }
  });

  if (found) {
    res.send("Todo updated");
  } else {
    res.status(404).send("Todo not found");
  }
});
// DELETE
app.delete("/todo/:id", (req, res) => {
  const todoId = req.params.id;
  todos = todos.filter(todo => todo.id != todoId);
  res.send("Todo deleted");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});