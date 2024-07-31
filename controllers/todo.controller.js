const Todo = require("../modules/Todo");

const createTodo = async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;
  const userId = req.locals?.user_id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  try {
    const todoObj = new Todo({
      title,
      description,
      status,
      priority,
      deadline,
      userId,
    });
    await todoObj.save();
    return res.status(201).json({
      status: 201,
      message: "Todo saved Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error while saving the data",
    });
  }
};

const getTodos = async (req, res) => {
  const userId = req.locals?.user_id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
  try {
    const todoData = await Todo.find({ userId });

    return res.status(200).json({
      status: 200,
      message: "Todos fetched Successfully",
      data: todoData,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error while fetching the data",
    });
  }
};

const editTodo = async (req, res) => {
  const userId = req.locals?.user_id;
  const { id } = req.params;
  const { status } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  try {
    const todoData = await Todo.findById(id);
    if (!todoData) {
      return res.status(404).json({
        status: 404,
        message: "Todo doesn't exist",
      });
    }

    await Todo.findByIdAndUpdate(
      id,
      {
        status,
        updatedDate: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: 200,
      message: "Todo updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error while updating todo",
    });
  }
};

const deleteTodo = async (req, res) => {
  const { todo_id } = req.params.id;

  try {
    const todoData = await Todo.findById(todo_id);

    if (!todoData) {
      return res.status(404).json({
        status: 404,
        message: "Todo doesn't exist",
      });
    }

    await Todo.findByIdAndDelete(todo_id);

    return res.status(200).json({
      status: 200,
      message: "Todo updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error while updating todo",
    });
  }
};

module.exports = { createTodo, deleteTodo, editTodo, getTodos };
