import React, {useState} from 'react';
import './App.css';
import {tasksType, Todolist} from './Todolist';
import {v1} from 'uuid';


export type FilterFaluesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterFaluesType
}
const App = () => {
    let [tasks, setTasks] = useState<Array<tasksType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])
    let removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    let addTask = (title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    let changeFilter = (value: FilterFaluesType, todolistID:string) => {
        let todolist = todolists.find(tl => tl.id === todolistID);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }

    }
    let changeStatus = (taskID: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn?', filter: 'active'},
        {id: v1(), title: 'What to BUY?!', filter: 'completed'}
    ])

    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasks;
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasks.filter(t => t.isDone === true)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasks.filter(t => t.isDone === false)
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
