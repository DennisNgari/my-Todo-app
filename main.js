// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);


// Functions
function addTodo(event){
    //Prevent form from submiting.
    event.preventDefault();

    // Create the Todo DIV and a its class
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item")
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    // Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.classList.add("completed-btn");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    // Trash Button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    // Append to list on our html
    todoList.appendChild(todoDiv);

    // Clear todoInput Value after input
    todoInput.value = "";
}

function deleteCheck(e){
    //Get the target 
    const item = e.target;

    //Delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    } 

    // Check Mark
    if(item.classList[0] === "completed-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
    
}