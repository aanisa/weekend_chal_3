var taskID = 0;


$(document).ready(function() {
    console.log("JQ in action");

    getTasks();
    addTaskButton();
    deleteTask();
    completeTask();


}); //end doc ready


function getTasks() {
    $.ajax({
        type: "GET",
        url: "/tasks",
        success: function(response) {
            $('#newTask').empty();
            for (var i = 0; i < response.length; i++) {
                var tasks = response[i];
                $('#newTask').append('<li class="item"></li>');
                var $el = $('#newTask').children().last();
                $el.append(tasks.task +
                    '<button class="delete" data-tasks="'+tasks.id+'">Delete</button>' +
                    '<button class="complete" data-tasks="'+tasks.id+'">Complete</button>');

                if (tasks.status === true) {
                      console.log('its true');
                      $('li').removeClass('item').addClass('colorChange');
                    } else {

                    }
            }
        }
    }); //end ajax request
} //end function

function addTaskButton() {
    $('.taskForm').on('submit', function(event) {
        event.preventDefault();
        var status = false;
        $.ajax({
            type: "POST",
            url: ('/tasks/add'),
            data: {
                task: $('#inputTask').val(),
                status: status
            },
            success: function(response) {
                getTasks();
            }
        }); //end ajax
        $('#inputTask').val('');
    }); //end taskForm jquery
} //end function


function completeTask() {
    $('#newTask').on('click', '.complete', function() {

        taskID = $(this).data('tasks'); //accessing id of tasks from stashed data
        var completedStatus = true;

        $.ajax({
            type: 'PUT',
            url: '/tasks/complete',
            data: {
                status: completedStatus,
                id: taskID
            },
            success: function(response) {
                console.log('Completed');
                getTasks();
            }
        }); //end ajax
    }); //end complete button click

}

function deleteTask() {
    $('#newTask').on('click', '.delete', function() {
        taskID = $(this).data('tasks');
        console.log(taskID);
        confirm("Are you sure you want to delete this task?");

        $.ajax({
            type: 'DELETE',
            url: '/tasks/delete' + taskID,
            success: function(response) {
                console.log(response);

                getTasks();
            }
        }); //end ajax
    }); //end complete button click
}
