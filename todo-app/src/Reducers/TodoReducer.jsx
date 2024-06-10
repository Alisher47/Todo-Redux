const initialData = {
  list: [],
};

const todoReducer = (state = initialData, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const { id, data, date, dueDate } = action.payload;

      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            data: data,
            date: date,
            dueDate: dueDate

          },
        ],
      };

    case "DELETE_TODO":
      const newList = state.list.filter((elem) => elem.id !== action.id);

      return {
        ...state,
        list: newList,
      };

    case "EDIT_TODO":
      const updateList = state.list.map((elem) =>
        elem.id === action.payload.id
          ? { ...elem, data: action.payload.data }
          : elem
      );

      return {
        ...state,
        list: updateList,
      };

    default:
      return state;
  }
};

export default todoReducer;
