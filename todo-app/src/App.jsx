import { useState } from "react";
import "./App.css";
import "./Todo.css";
import { Input, Button, Space, DatePicker } from "antd";
import { addTodo, deleteTodo, editTodo } from "./assets/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "antd/lib/modal/Modal";

function App() {
  const [inputData, setInputData] = useState("");
  const [date, setDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editData, setEditData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.todoReducer.list);
  console.log("list", list);
  const onChange = (date, dateString) => {
    setDate(dateString);
    console.log("date", date);
  };

  const showModal = (id, data) => {
    setEditId(id);
    setEditData(data);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDone = () => {
    dispatch(editTodo(editId, editData));
    setIsModalVisible(false);
  };

  const handleSameTodo = () => {
    if (list.some((todo) => todo.data === inputData)) {
      alert("This Todo Already exist");
    } else {
      dispatch(addTodo(inputData, date, dueDate));
      setInputData("");
      setDate("");
      setDueDate();
    }
  handleDueDate();
  handleEmptyField();
  };

  const handleDueDate = () => {
    
    if (list.filter((todo) => todo.date <= new Date())) {
      const clr = document.getElementById("list-item");
      clr.style.color = "red";
    }
  }

  const handleEmptyField = () => {
    if(list.some((todo) => todo.data === "")){
      alert("You must have write something")
    }

  }


  return (
    <div className="container">
      <div className="child-container">
        <figure>
          <figcaption>
            <h2 className="text">Todo-List</h2>
          </figcaption>
        </figure>
        <Space>
          <Input
            defaultValue=""
            placeholder="type here"
            value={inputData}
            onChange={(event) => setInputData(event.target.value)}
            className="input"
          />
          <DatePicker onChange={onChange} id="date" />
          <Button type="primary" className="btn" onClick={handleSameTodo}>
            Add Task
          </Button>
        </Space>

        <div className="show-items">
          {list.map((elem) => {
            return (
              <div className="each-item" key={elem.id} id="list-item">
                <h4>{elem.data}</h4>
                <h4>{elem.date}</h4>

                <div className="todo-btn">
                  <Button
                    type="primary"
                    className="btn1"
                    onClick={() => dispatch(deleteTodo(elem.id))}
                  >
                    Delete
                  </Button>
                  <Button
                    type="primary"
                    className="btn2"
                    onClick={() => showModal(elem.id, elem.data)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        title="Edit Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Input
          value={editData}
          onChange={(e) => setEditData(e.target.value)}
          placeholder="Edit your task"
        />
        <div className="modal-footer">
          <Button type="primary" onClick={handleDone}>
            Done
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
