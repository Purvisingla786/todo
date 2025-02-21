let taskList = document.getElementById('taskList');
let form = document.getElementById('form')
let taskLabel = document.getElementById('taskName')
let dateLabel = document.getElementById('dateLabel')
let actions 
let btn = document.getElementById('btn')
let priority = document.getElementById('priority')
let y,taskText
let i ,x
let taskArr = []
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentDate = new Date();
let storage =[]
let data,dates
let dateArr = []
let highlightMonth,highlightYear

function plus()
{
 form.style.display = 'block'
taskLabel.value=""
    dateLabel.value=""
     priority.value = "select"
    btn.innerText = 'Done'
}


function createTaskbar()
{
    taskDiv = document.createElement('div')
    taskList.appendChild(taskDiv)
    taskText = document.createElement('p')
    taskDiv.appendChild(taskText)
    taskDiv.classList.add('tasks')
    actions = document.createElement('div')
    taskDiv.appendChild(actions)
    actions.innerHTML='<i class="fa-sharp-duotone fa-solid fa-pen-to-square mx-1 my-3 " onclick="updateTask()" ></i><i class="fa-solid fa-trash mx-1 my-3" style="color: #ff0505;" onclick="deleteTask()"></i><input type="checkbox" name="taskArr[`${y}`]" id="check"></input>'
}


function displayTasks()
{
    taskList.innerHTML=""
     data =JSON.parse( localStorage.getItem('tasks'))
     renderCalendar();
            for(let i=0;i<data.length;i++){
                createTaskbar()
                storage.push(data[i])
                taskText.innerText = data[i].task
                taskDiv.classList.add(data[i].priority)
                dates = data[i].date
                taskArr.push(taskText)
                dateArr.push(dates)
                renderCalendar()   
            }    
        }


function createTask(){

    if(btn.innerText==='Done'){
      let newTask =  taskLabel.value;
      let newDate = dateLabel.value
      let newPriority = priority.value
      form.style.display = 'none'
        if(newTask != ""){
            createTaskbar()
            taskText.innerText = newTask
            taskDiv.classList.add(newPriority)
            storage.push({task:newTask, date:newDate, priority:newPriority })
            localStorage.setItem(`tasks`,JSON.stringify(storage));
            dateArr.push(newDate)
             renderCalendar()
            taskArr.push(taskText)
        }
    }
    else if(btn.innerText ==='Update'){
        let updatedTask = taskLabel.value
        let updatedDate = dateLabel.value
        let updatedPriority = priority.value
        taskArr[y].innerText = updatedTask ;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        dateArr[y] = updatedDate
        renderCalendar()
        let newupTask = {
            task: updatedTask,
            date: updatedDate,
            priority:updatedPriority
        }
        form.style.display = 'none'
        storage[y]=newupTask
        localStorage.setItem(`tasks`, JSON.stringify(storage));
        displayTasks()
    }

    else{
        form.style.display = 'none'
    }
    taskLabel.value=""
    dateLabel.value=""
     priority.value = "select"
}


taskList.addEventListener('click',function(item){
    
    x= item.target
    form.style.display = 'none' 
   
    //  document.getElementById('check').checked = false  
    
    
    taskArr.forEach(task=> 
    {
        if(task===x)
        y = taskArr.indexOf(task)  
    })  
})


function deleteTask(){
    storage.splice(y,1)
    localStorage.setItem(`tasks`,JSON.stringify(storage));

   taskArr=[]
   dateArr=[]
   storage=[]
    displayTasks();
}

function updateTask(){
   
    form.style.display = 'block'
    taskName.value = taskArr[y].innerText
    dateLabel.value = dateArr[y]
    btn.innerText = 'Update'
   //displayTasks();
}

    function renderCalendar() {
        
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        document.getElementById('month-year').textContent = `${monthNames[month]} ${year}`;
        const firstDay = new Date(year, month, 1).getDay(); 
        const totalDays = new Date(year, month + 1, 0).getDate(); 
        let daysHTML = '';
        
        function isDateHighlighted(day) {
            const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            return dateArr.includes(dateString); 
        }

        for (let i = 0; i < firstDay; i++) {
            daysHTML += `<div></div>`; 
        }
        for (let day = 1; day <= totalDays; day++) {
            const isToday = day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear();
            const isHighlighted = isDateHighlighted(day); 
            daysHTML += `<div class="${isToday ? 'current-day' : ""} ${isHighlighted ? 'highlight' : ""}" onmouseover="${isHighlighted ? `showTask(${day})` : ''}"  id="day${day}" onclick="selectDay(${day})">${day}</div>`;
        }

        highlightMonth = Number(`${month}`)
        highlightYear = `${year}`
         document.getElementById('days').innerHTML = daysHTML;

    
    }

    function selectDay(day){
        
        form.style.display = 'block'
        taskLabel.value=""
         btn.innerText = 'Done'
         dateLabel.value = `${highlightYear}-${(highlightMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
       
    }


    function changeMonth(offset) {
        currentDate.setMonth(currentDate.getMonth() + offset);
        renderCalendar();
    }


   
 function showTask(day){
        
     
        for(date in dateArr){
           if(dateArr[date] === (`${highlightYear}-${(highlightMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)) {
            form.style.display = 'block'
            taskLabel.value=taskArr[date].innerText
            dateLabel.value=dateArr[date]
            btn.innerText = 'Close'
            

           }
        }
    }

function darkMode(){
    document.body.classList.toggle('darkmode')
    document.getElementById('calendar').classList.toggle('calenderDark')
    document.getElementById('days-of-week').classList.toggle('daydark')
    document.querySelector('.heading').classList.toggle('headWhite')
    dateLabel.classList.toggle('colorBlack')
    taskLabel.classList.toggle('colorBlack')
    priority.classList.toggle('colorBlack')
    taskList.classList.toggle('colorBlack')
}

// document.getElementById('check').addEventListener('change',function(){
//     taskArr[y].classList.toggle('marked')
// })

 displayTasks()









    

    

   

   
