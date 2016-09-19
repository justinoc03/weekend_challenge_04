////////////////////JS sourced & Global Variables//////////////////////////////
console.log( 'JS is sourced' );

var tasks = [];


////////////////////document ready functions////////////////////////////////////
$( document ).ready( function(){
  console.log( 'JQ is sourced');

  statusUpdate();
  deleteTasks();
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
      completed = 'Complete!!';
    }
    allTasks += '<h4>Task: ' + tasks[i].task_name + '</h4><p>Task Description: ' + tasks[i].task_description + '</p><p>Start Date: ' + tasks[i].date.substring(0,10) + ' at ' + tasks[i].task_start + '</p><p>Current Status: ' + completed + '</p> </select><select id="toggleStatus"> <option disabled selected>Change Status</option> <option value="true">Complete</option> <option value="false">Incomplete</option></select>  <button id="submitStatus" data=' + tasks[i].task_id + '>Submit</button> <br> <button id="deleteThisTask" data=' + tasks[i].task_id + '>Delete Task</button><hr>';

  }
  $('#displayTasks').html(allTasks);

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

////////////////////Function: Change Task status////////////////////////////////
  var statusUpdate = function(){
    $('body').on('click', '#submitStatus', function(){
      console.log('in completeTask');
      if($('#toggleStatus').val() === null) {
        alert('Please select a status before continuing')
      } else{

      var newStatus = {
        task_id: $(this).attr('data'),
        task_status: $('#toggleStatus').val()
      };//end object
      console.log(newStatus);

      $.ajax({
        url: '/changeStatus',
        type: 'POST',
        data: newStatus,
        success: function (data) {
          console.log('ajax gets back:', data);
          var updatedTasks = data;
          console.log('updatedTasks:', updatedTasks);
          getTasks();
          }//end success
        });//end ajax
      }
    });//end completeTask
  };

////////////////Function: Delete Tasks/////////////////////////////////////////
  var deleteTasks = function(){
    $('body').on('click', '#deleteThisTask', function(){
      console.log('in deleteTask');
      var test = confirm("Are you ABSOLUTELY CERTAIN you want to delete this task? It'll be gone forever, yo!");
        if (test === false){
          alert("Then it stays");
        } else {
          alert("Tis gone!");
      var deletedObject = {
        deleteMe: $(this).attr('data'),
      };//end object
      console.log(deletedObject);

      $.ajax({
        url: '/delete',
        type: 'POST',
        data: deletedObject,
        success: function (data) {
          console.log('ajax gets back:', data);
          getTasks();
          }//end success
        });//end ajax
      }
    });//end completeTask
  };
