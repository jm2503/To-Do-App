pragma solidity ^0.5.0;

contract ToDoList{
    
    uint public taskCount = 0;

    constructor() public{
        createTask("Test task");
    }
    
    struct Task{
        uint id;
        bool done;
        string content;
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        bool done,
        string content
    );

    event TaskDone(
        uint id,
        bool done
    );

    function toggleDone(uint _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
        emit TaskDone(_id, _task.done);
    }

    function createTask(string memory _content) public {
        tasks[taskCount] = Task(taskCount, false, _content);
        emit TaskCreated(taskCount, false, _content);
        taskCount++;
    }
}
