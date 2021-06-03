class Task
{
    /**
     * 
     * @param {string} name Task name.
     * @param {string} description Task description
     * @param {Date} date Task date.
     */
    constructor(name, description, date) 
    {   
        if(typeof name !== 'string') 
            throw new ParameterTypeError('<name> must be of type <string>.');
        
        if(typeof description !== 'string') 
            throw new ParameterTypeError('<description> must be of type <string>.');

        if(!(date instanceof Date)) 
            throw new ParameterTypeError('<date> must be of type <Date>.');

        this.name = name;
        this.description = description;
        this.date = date;
        this.id;
    }
}

