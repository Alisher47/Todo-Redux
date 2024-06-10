export const addTodo = (data, date, dueDate) => {
  return {
    type: "ADD_TODO",
    payload: {
      id: new Date().getTime().toString(),
      data: data,
      date: date,
      dueDate: dueDate
    }
  }
};

export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    id
  };
};

export const editTodo = (id, data) => {
  return {
    type: "EDIT_TODO",
    payload: {
      id,
      data
    }
  };
};
