import React, { useEffect, useState } from "react";

const Home = () => {
  const [inputText, setInputText] = useState({ label: "", done: false });
  const [list, setList] = useState([]);
  const [showDelete, setShowDelete] = useState(-1);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/ayaalakwaa"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodos = async (newList) => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/ayaalakwaa",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newList),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update todos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (index) => {
    try {
      const newList = list.filter((_, i) => i !== index);
      setList(newList);
      await updateTodos(newList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="text-center">
      <h1>todos</h1>
      <div className="inputTasks">
        <input
          type="text"
          onKeyDown={(event) => {
            if (event.key === "Enter" && inputText.label.trim() !== "") {
              const newList = [...list, inputText];
              setList(newList);
              setInputText({ label: "", done: false });
              updateTodos(newList);
            }
          }}
          value={inputText.label}
          onChange={(e) => setInputText({ label: e.target.value, done: false })}
          placeholder={
            list.length === 0
              ? "what needs to be done?"
              : "what needs to be done?"
          }
        />
      </div>
      {list.length > 0 &&
        list.map((task, index) => (
          <div
            className="rowTask effect"
            key={index}
            onMouseEnter={() => setShowDelete(index)}
            onMouseLeave={() => setShowDelete(-1)}
          >
            <div>
              <ul>
                <li>{task.label}</li>
              </ul>
            </div>
            <div
              onClick={() => deleteTask(index)}
              className={`${
                index === showDelete ? "d-block" : "d-none"
              } iconDelete`}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "red";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
              }}
            >
              <i
                className="fas fa-trash-alt"
                title="Delete"
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
        ))}
      <div className="countTask">
        {list.length} {list.length > 1 ? "Tasks" : "Task"}
      </div>
    </div>
  );
};

export default Home;
