const { assert } = require("chai");

const ToDoList = artifacts.require("./ToDoList.sol");

contract("ToDoList", (accounts) => {
  before(async () => {
    this.ToDoList = await ToDoList.deployed();
  });

  it("Is the contract deployed successfully?", async () => {
    const address = await this.ToDoList.address;

    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, undefined);
    assert.notEqual(address, null);
  });

  it("Is the task listed?", async () => {
    const taskCount = await this.ToDoList.taskCount();
    const task = await this.ToDoList.tasks(taskCount - 1);

    assert.equal(task.id.toNumber(), taskCount - 1);
    assert.equal(task.content, "Test task");
    assert.equal(task.done, false);
    assert.equal(taskCount.toNumber(), 1);
  });

  it("Is the task created?", async () => {
    const result = await this.ToDoList.createTask("New Task");
    const taskCount = await this.ToDoList.taskCount();
    assert.equal(taskCount, 2);

    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.done, false);
    assert.equal(event.content, "New Task");
  });

  it("Is task completion toggled?", async () => {
    const result = await this.ToDoList.toggleDone(1);
    const task = await this.ToDoList.tasks(1);
    assert.equal(task.done, true);
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.done, true);
  });
});
