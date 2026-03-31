// Server.js
const express =  require('express');
const app = express();

app.use(express.json()); // middle to parse JSON

// --- In-Memory Storage ---
let tasks = [];
let id = 1;

// --- CRUD Routes ---

// GET all tasks
app.get('/tasks', (req, res) => {
    console.log("Returning all tasks:", tasks); // Debug
    res.json(tasks); // Return tasks array as JSON
});

// GET a single task by ID
app.get('/tasks/:id', (req, res) => {
    console.log("Returning tasks:", tasks); // this is also just for debbuging
    const taskId = parseInt(req.params.id);

    const task = tasks.find(t => t.id === taskId);

    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found'});
    }
});

// POST Create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required'});
    }

    const task = { id: id++, title, description };
    tasks.push(task);

    console.log("Created Task:", task); // Debug
    res.status(201).json(task);
});

// PUT update a task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === taskId);

    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks[index] = { id: taskId, title, description };
    console.log("Updateed task:", tasks[index]); // Debug
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const exists = tasks.some(t => t.id === taskId);

    if(!exists) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks = tasks.filter(t => t.id !== taskId);
    console.log('Deleted task ID ${taskId}'); // Debug
});


// --- Starting the Server
const PORT = 3000;
app.listen(PORT, () =>  {
    console.log(`Server running on http://localhost:${PORT}`);
});