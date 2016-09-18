////////////////////JS sourced & Global Variables//////////////////////////////
console.log( 'JS is sourced' );

var tasks = [];


////////////////////document ready functions////////////////////////////////////
$( document ).ready( function(){
  console.log( 'JQ is sourced');

  getTasks();

}); // end doc ready

////////////////////Function: get all tasks already in DB///////////////////////
var getTasks = function(){
  $.ajax({
    type: 'GET',
    url: '/getTasks',
    success: function(data){
      console.log('got this back from server:', data);
      tasks = data;
      displayTasks();
    }
  });
};

////////////////////Function: display everything//////////////////////////////
var displayTasks = function (){
  var allTasks = '';
  var completed = '';
  console.log(tasks);
  for (var i = 0; i < tasks.length; i++) {
    if(tasks[i].task_completed === false) {
      completed = 'Incomplete';
    } else {
      completed = 'FINISHED!!';
    }
    allTasks += '<h4>Task: ' + tasks[i].task_name + '</h4><p>Task Description: ' + tasks[i].task_description + '</p><p>Start Date: ' + tasks[i].date.substring(0,10) + ' at ' + tasks[i].task_start + '</p><p>Task Status: ' + completed + '</p> <button id="toggleStatus" onclick="completeTask()" data=' + i + '>Complete Task</button> <button id="deleteTask">Delete Task</button> <hr>';
    console.log(i);
  }
  $('#displayTasks').append(allTasks);

};

////////////////////Function: add a new task///////////////////////////////////
var addTask = function () {
  console.log('in addTask');

  //get user input & create object for employee
  var newTask= {
    taskName : $('#newTaskName').val(),
    taskDescription : $('#newTaskDescription').val()
  }; // end object

  $('#newTaskName').val('');
  $('#newTaskDescription').val('');

  //ajax call new employee
  $.ajax({
    url: '/newTaskFromClient',
    type: 'POST',
    data: newTask,
    success: function (data) {
      console.log('ajax gets back:', data);
      getTasks();
      }//end success
    });//end ajax
};//end addEmployee

////////////////////Function: Complete Task////////////////////////////////////
var completeTask = function(){
  console.log('in completeTask');

  var newStatus = {
    status: $('#toggleStatus').val()
  };//end object
  console.log(newStatus);

  //ajax call update completion status
  // $.ajax({
  //   url: '/changeStatus',
  //   type: 'POST',
  //   data: newStatus,
  //   success: function (data) {
  //     console.log('ajax gets back:', data);
  //     getTasks();
  //     }//end success
  //   });//end ajax
};//end completeTask
