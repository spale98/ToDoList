const tasks = document.getElementById('tasks');
const todoService = new TodoService();

// Load tasks on start.
todoService.renderHTMLAsync().then(html => tasks.innerHTML = html);

// Add task.
document.getElementById('btnAdd').addEventListener('click', function() 
{
    try
    {   
        todoService.addAsync(
            document.getElementById('taskNameInput').value,
            document.getElementById('taskDescriptionInput').value,
            new Date(document.getElementById('taskDateInput').value)
        ).then(() => {
            todoService.renderHTMLAsync().then(html => tasks.innerHTML = html);
        });
    }
    catch(error) 
    {
        if(error instanceof ValidationError)
        {
            alert(error.message)
        }
        else
        {
            console.log('Error:' + error.message);
        }
    }
});

// Delete task.
tasks.addEventListener('click', function(e) {   
    
    let id = e.target.dataset['id'];

    if(id)
    {
        if(confirm("Are you sure that you want to delete this task?"))
        {
            todoService.removeAsync(id).then(res => {
                if(res)
                {
                    alert('Task successfully deleted!');
                    todoService.renderHTMLAsync().then(html => tasks.innerHTML = html);   
                }
                else
                {
                    alert('Oops, something went wrong. Task failed to delete.');
                }
            });
        }
    }
});