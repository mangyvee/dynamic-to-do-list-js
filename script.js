// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = do not save again
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a new task
    function addTask(taskText, save = true) {
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create li element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task when clicked
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks(); // Update Local Storage
        };

        // Append button to li and li to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';

        // Save to Local Storage
        if (save) {
            saveTasks();
        }
    }

    // Add task on button click
    addButton.addEventListener('click', function() {
        addTask();
    });

    // Add task on Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks initially
    loadTasks();
});
