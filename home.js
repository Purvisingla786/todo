let tasks =JSON.parse( localStorage.getItem('tasks'))?JSON.parse( localStorage.getItem('tasks')):[];
let currentDate = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function createTask(){
    let task = document.querySelector('#taskName').value
    let date = document.querySelector('#taskDate').value
    
    let newtask = {
        task: task,
        date: date,
        done:false
    } 
    tasks.push(newtask)
    localStorage.setItem(`tasks`,JSON.stringify(tasks));
    reset()
    getData();
}   

function getData(){
    taskList.innerHTML=''
tasks.forEach((element,i) => {
   let  task = element.task;
   let date = element.date;
   let taskLi = document.createElement('li')
  
   document.querySelector('#taskList').appendChild(taskLi)
    taskLi.innerHTML=`<div  class="listitems"><div><div><input type="checkbox" id="check${i}" onChange="checkDone(${i})">${task}</div><div class = "subheading">${date}</div></div><div><div><i class="fa-sharp-duotone fa-solid fa-pen-to-square iconm" onClick="updateHandle(${i})" ></i><i class="fa-solid fa-trash  iconm" style="color: #ff0505;" onclick="deleteTask(${i})"></i></div></div></div> </div>`
    if(element.done){
    taskLi.classList.toggle('marked')
    document.getElementById(`check${i}`).checked = true;
   } }); 
   
}

// Declare a function to handle the update event
function handleUpdateClick(i) {
    updateTask(i);
}

function updateHandle(i){
    debugger;
    document.querySelector('#taskName').value = tasks[i].task;
    document.querySelector('#taskDate').value = tasks[i].date;
    document.querySelector('#createBtn').innerText = 'Update';

    // Remove the existing event listener, if any
    if(document.querySelector('#createBtn').getAttribute("onclick")) {
        document.querySelector('#createBtn').removeAttribute('onclick');
    } else {
        document.querySelector('#createBtn').removeEventListener('click', createTask);
    }

    // Add the update listener
    document.querySelector('#createBtn').addEventListener('click', () => handleUpdateClick(i));
}

function updateTask(i) {
    debugger;
    tasks[i].task =  document.querySelector('#taskName').value;
    tasks[i].date =  document.querySelector('#taskDate').value;
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
    reset();

    document.querySelector('#createBtn').innerText = 'Submit';
    
    // Remove the update listener
    document.querySelector('#createBtn').removeEventListener('click', () => handleUpdateClick(i));
    
    // Add the create task listener back
    document.querySelector('#createBtn').addEventListener('click', createTask);

    getData(); 
}


function deleteTask(i){
    tasks.splice(i,1)
    localStorage.setItem(`tasks`,JSON.stringify(tasks));
    getData();
}

function reset(){
    document.querySelector('#taskName').value = ''
    document.querySelector('#taskDate').value = ''
}

function checkDone(i){
    if(tasks[i].done){
        tasks[i].done = false;
    
    }
    else{
        tasks[i].done = true 
        
    }
    localStorage.setItem(`tasks`,JSON.stringify(tasks));
    getData()
}

function darkMode(){
    document.body.classList.toggle('darkmode')
}
getData()

function rendercalendar() {
    document.getElementById('calendar').style.display='block' 
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    document.getElementById('month-year').textContent = `${monthNames[month]} ${year}`;
    const firstDay = new Date(year, month, 1).getDay(); 
    const totalDays = new Date(year, month + 1, 0).getDate(); 
    let daysHTML = '';
    
    for (let i = 0; i < firstDay; i++) {
        daysHTML += `<div></div>`; 
    }
    for (let day = 1; day <= totalDays; day++) {
        const isToday = day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear();
        daysHTML += `<div class="${isToday ? 'current-day' : ""}   id="day${day}" onclick="selectDay(${day})">${day}</div>`;
    }
     document.getElementById('days').innerHTML = daysHTML;


}




function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    renderCalendar();
}

