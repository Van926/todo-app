import { useState } from "react";
import './Styles.css';

const ToDoList = () => {
    
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTasks] = useState("");
    const [editIndex, setEditIndex] = useState(null); 
    const [editText, setEditText] = useState(""); 

    const handleInput = (event) => {
        setNewTasks(event.target.value);  
    };

    const addTask = () => {
        if(newTask.trim() !== ""){
            setTasks(t => [...t, { text: newTask, completed: false }]);
            setNewTasks("");
        }
    };

    const removeTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    
    const editTask = (index) => {
        setEditIndex(index); 
        setEditText(tasks[index].text); 
    };

   
    const saveTask = (index) => {
        const updatedTasks = tasks.map((task, i) => {
            if(i === index) {
                return { ...task, text: editText }; 
            }
            return task;
        });
        setTasks(updatedTasks);
        setEditIndex(null); 
    };

    const completedTask = (index) => {
        const updatedTasks = tasks.map((task, i) => {
            if(i === index) {
                return { ...task, completed: true };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <div className="Container">
            <div className="ToDoListForm">
                <h1>TO DO LIST</h1>
                <div>
                    <input
                        className="Entertask"
                        type="text"
                        placeholder="Enter Task"
                        value={newTask}
                        onChange={handleInput}
                    />
                    <button
                        className="Add-button"
                        onClick={addTask}
                    >Add
                    </button>
                </div>
                <ul className="task-box">
                    {tasks.length === 0 && "No Todos available. Add a todo to get started!"}
                    {tasks.map((task, index) => 
                        <li 
                            className={`task-wrapper ${task.completed ? 'completed' : ''}`} 
                            key={index}
                        >
                            {editIndex === index ? (
                        
                                <input
                                    type="text"
                                    className="edit-input"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                            ) : (
                                <span className={`text ${task.completed ? 'strike' : ''}`}>
                                    {task.text}
                                </span>
                            )}

                          
                            {editIndex === index ? (
                                <button
                                    className="Save-button"
                                    onClick={() => saveTask(index)}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="Edit-button"
                                    onClick={() => editTask(index)}
                                    disabled={task.completed}
                                >
                                    Edit
                                </button>
                            )}
                            
                            
                            <button
                                className="Completed-button"
                                onClick={() => completedTask(index)}
                                disabled={task.completed || editIndex === index}
                            >
                                Completed
                            </button>
                            <button
                                className="Delete-button"
                                onClick={() => removeTask(index)}
                                disabled={task.completed || editIndex === index}
                            >
                                Remove
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ToDoList;
