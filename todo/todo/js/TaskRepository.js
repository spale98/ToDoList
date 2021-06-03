/**
 * Responsible for working with external task data.
 */
class TaskRepository
{
    constructor()
    {
        this.apiURL = 'http://localhost:5000/api/tasks';
    }

    /**
     * @param {string} id Task id.
     * @returns {boolean} Returns true if task is successfully deleted.
     */
    async deleteTaskAsync(id)
    {
        if (typeof id !== 'string' ) 
            throw new ParameterTypeError('<id> must be of type <string>.')

        try
        {
            const rawResponse = await fetch(this.apiURL + '?id=' + id, {
                method: "DELETE"
            });

            if(rawResponse.status === 200) return true;
        }
        catch(err)
        {
            console.log(err);
        }
        
        return false;
    }

    /**
     * @param {Task} task 
     */
    async addTaskAsync(task)
    {
        if (!(task instanceof Task)) 
            throw new ParameterTypeError('<task> must be of type <Task>.')

        try
        {
            const rawResponse = await fetch(this.apiURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            });

            if(rawResponse.status === 200) return true;
        }
        catch(err)
        {
            console.log(err);
        }

        return false;
    }

    async getTasksAsync() 
    {
        const result = [];
        
        try
        {
            const rawResponse = await fetch(this.apiURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const jsonResponse = await rawResponse.json();
            
            for(let jsonTask of jsonResponse)
            {
                let task = new Task(jsonTask['name'], jsonTask['description'], new Date(jsonTask['date']));
                task.id = jsonTask['id'];

                result.push(task);
            }
            
            // backup tasks.
            localStorage.setItem("tasks", JSON.stringify(result));
        }
        catch
        {
            // if error is occured while fetching the data from the server try to load tasks from a local storage.    
            const backup = JSON.parse(localStorage.getItem('tasks'));
            
            for(let task of backup)
            {
                result.push(new Task(task.name, task.description, new Date(task.date)));
            }
        }

        return result;
    }
}