import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterFaluesType} from './App';

export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
type propsType = {
    id:string
    title: string
    tasks: Array<tasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterFaluesType, todolistID:string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    filter: FilterFaluesType
}
export const Todolist = (props: propsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active',  props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>add +</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeHandler}
                            />
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>)
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'activeFilter' : ''} onClick={onAllClickHandler}>all
                </button>
                <button className={props.filter === 'active' ? 'activeFilter' : ''}
                        onClick={onActiveClickHandler}>active
                </button>
                <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                        onClick={onCompletedClickHandler}>completed
                </button>
            </div>
        </div>
    )
}