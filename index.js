document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskFormSection = document.getElementById('task-form-section');
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('tasks');
    const taskDetailsSection = document.getElementById('task-details-section');
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');
    const detailDueDate = document.getElementById('detail-due-date');
    const editTaskBtn = document.getElementById('edit-task-btn');
    const deleteTaskBtn = document.getElementById('delete-task-btn');
    const backBtn = document.getElementById('back-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    
    let tasks = [];
    let currentTaskIndex = null;
    
    addTaskBtn.addEventListener('click', () => {
        taskFormSection.classList.remove('hidden');
    });
    
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskForm['title'].value;
        const description = taskForm['description'].value;
        const dueDate = taskForm['due-date'].value;
        
        if (currentTaskIndex === null) {
            tasks.push({ title, description, dueDate });
        } else {
            tasks[currentTaskIndex] = { title, description, dueDate };
            currentTaskIndex = null;
        }
        
        taskForm.reset();
        taskFormSection.classList.add('hidden');
        renderTasks();
    });
    
    cancelBtn.addEventListener('click', () => {
        taskForm.reset();
        taskFormSection.classList.add('hidden');
        currentTaskIndex = null;
    });
    
    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const index = e.target.dataset.index;
            showTaskDetails(index);
        }
    });
    
    editTaskBtn.addEventListener('click', () => {
        const task = tasks[currentTaskIndex];
        taskForm['title'].value = task.title;
        taskForm['description'].value = task.description;
        taskForm['due-date'].value = task.dueDate;
        taskDetailsSection.classList.add('hidden');
        taskFormSection.classList.remove('hidden');
    });
    
    deleteTaskBtn.addEventListener('click', () => {
        tasks.splice(currentTaskIndex, 1);
        taskDetailsSection.classList.add('hidden');
        renderTasks();
    });
    
    backBtn.addEventListener('click', () => {
        taskDetailsSection.classList.add('hidden');
    });
    
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = `${task.title} (Due: ${task.dueDate})`;
            li.dataset.index = index;
            taskList.appendChild(li);
        });
    }
    
    function showTaskDetails(index) {
        const task = tasks[index];
        currentTaskIndex = index;
        detailTitle.textContent = `Title: ${task.title}`;
        detailDescription.textContent = `Description: ${task.description}`;
        detailDueDate.textContent = `Due Date: ${task.dueDate}`;
        taskDetailsSection.classList.remove('hidden');
    }
});
