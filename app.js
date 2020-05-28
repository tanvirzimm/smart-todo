const todoContainer = document.querySelector('.todoContainer');
const todoList = document.querySelector('.todoList');
const todoInput = document.querySelector('.todoInput');
const addTodo = document.querySelector('.addTodo');
const filterOption = document.querySelector('.todo-filter')



const createNewitem = (event) => {
    event.preventDefault();
     

    if(todoInput.value !== ""){
        saveToLocal();  
        const newTodo = `<div class='todo'>
                    <li class='todo-item'>${todoInput.value}</li>
                    <button class="complete">
                    <i class='fas fa-check'></i>
                    </button>
                    <button class="trash">
                    <i class='fas fa-trash'></i>
                    </button>
                </div>`;

    todoList.innerHTML += newTodo;
    }
    else{
        alert('Your field is empty');
    }

// const todoDiv = document.createElement('div');
// todoDiv.classList.add('todo');

// const li = document.createElement('li');
// li.innerText = todoInput.value;
// li.classList.add('todo-item');
// todoDiv.appendChild(li);

// const completeButton = document.createElement('button');
// completeButton.innerHTML = "<i class='fas fa-check'></i>";
// completeButton.classList.add('complete');
// todoDiv.appendChild(completeButton);

// const trashButton = document.createElement('button');
// trashButton.innerHTML = "<i class='fas fa-trash'></i>";
// trashButton.classList.add('trash')
// todoDiv.appendChild(trashButton);

// todoList.appendChild(todoDiv)


todoInput.value = "";
}


const deleteCheck = (e) =>{
    

    const item = e.target;
    const todo = item.parentElement;
    if(item.classList[0] === 'trash'){
        
        todo.classList.add('deleteAnimation')
        todo.addEventListener('transitionend',()=>{
            todo.remove();
        })

        deleteFromLocal(todo);
    }


    if(item.classList[0] === 'complete'){
       
        todo.classList.toggle('completed');
    }
    
}



const filter = (e) =>{
    const todos = todoList.children;
    var todosArray = Array.prototype.slice.call( todos );

    
    
    todosArray.forEach((todo)=>{
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex'
            break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }
                else{
                    todo.style.display = 'none';
                }
            break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
            break;
        }
    })

}



const saveToLocal = () =>{
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];  
    }
    else{
       todos =  JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todoInput.value);
    localStorage.setItem('todos',JSON.stringify(todos));

}


const updateFromLocal = ()=>{
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];  
    }
    else{
       todos =  JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach((todo)=>{

        const newTodo = `<div class='todo'>
                    <li class='todo-item'>${todo}</li>
                    <button class="complete">
                    <i class='fas fa-check'></i>
                    </button>
                    <button class="trash">
                    <i class='fas fa-trash'></i>
                    </button>
                </div>`;

        
        todoList.innerHTML += newTodo;
    })

}


const deleteFromLocal = (todo) => {
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];  
    }
    else{
       todos =  JSON.parse(localStorage.getItem('todos'));
    }

    const todoText = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoText),1);

    
    localStorage.setItem('todos',JSON.stringify(todos));


}




addTodo.addEventListener('click', createNewitem);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filter);
document.addEventListener('DOMContentLoaded',updateFromLocal);






