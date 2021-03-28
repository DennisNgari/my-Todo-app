// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

// Event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

document.addEventListener("DOMContentLoaded", getTodos);


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

    //Add todo to local storage
    saveLocalTodos(todoInput.value);

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
        removeLocalTodos(todo);
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

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = 'none';
                }
                break
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none';
                }
                break
        }
    });
}

function saveLocalTodos(todo){
    //Check--- Do i already have it there?
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
     
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //Check--- Do i already have it there?
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        // Create the Todo DIV and a its class
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        // Create li
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item")
        newTodo.innerText = todo;
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
    })
}

function removeLocalTodos(todo){
    //Check--- Do i already have it there?
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //Remove the Item from the local storage
    /*
    Example:
    const names = ["john", "Mary", "Mark","Mike"];
    const johnIndex = names.indexOf("john");
    names.splice(johnIndex,1)
    console.log(names) //John is gone from our list
    */
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoInput), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
