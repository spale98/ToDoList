/**
 * Provides all services for tasks.
 */
class TodoService
{   
    constructor() 
    {
        this.repository = new TaskRepository();
    }

    async renderHTMLAsync()
    {
        const tasks = await this.repository.getTasksAsync();

        if(tasks.length === 0)
            return '<h1 class="text-center">You have not yet created any tasks.</h1>';

        let output = '<div class="row">';

        for(let task of tasks)
        {
            output += `<div class="col-xl-3">
                            <div class="card task">
                                <div class="card-body">
                                    <h4 class="card-title text-center">${task.name}</h4>
                                    <h6 class="card-subtitle mb-2 text-muted text-center">
                                        ${task.date.getDay()}.${task.date.getDate()}.${task.date.getFullYear()}.
                                    </h6>
                                    <p class="card-title">${task.description}</p>
                                    <button class="btn btn-danger btn-sm" data-id="${task.id}">Delete</button>
                                </div>
                            </div>
                        </div>`;
        }
        
        output += '</div>';
        return output;
    }

    /**
     * Validates and adds a new task to the list.
     * @param {string} name Task name.
     * @param {string} description Task description.
     * @param {Date} date Task date.
     */
    async addAsync(name, description, date) 
    {
        // Remove leading and trailing white space.
        name = name.trim();
        description = description.trim();

        // Validation
        if(name === '') 
            throw new ValidationError('Name can not be empty.');
        if(name.length > 50) 
            throw new ValidationError('Name must be less than 50 characters.');
        if(date == 'Invalid Date') 
            throw new ValidationError('Date is required.')
        if(date < Date.now()) 
            throw new ValidationError('Date can not be earlier than now.');
        if(description === '') 
            description = 'no description';
        if(description.length > 200) 
            throw new ValidationError('Description must be less than 100 characters.');
        
        await this.repository.addTaskAsync(new Task(name, description, date));
    }

    /**
     * 
     * @param {string} id Task id.
     */
    async removeAsync(id)
    {
        return await this.repository.deleteTaskAsync(id);
    }
}