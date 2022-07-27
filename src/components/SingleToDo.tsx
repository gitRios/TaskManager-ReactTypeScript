import React, { useEffect, useRef, useState } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { ToDo } from '../model'
import './styles.css'

type Props = {
  toDo: ToDo
  toDos: ToDo[]
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>
}

const SingleToDo: React.FC<Props> = ({ toDo, toDos, setToDos }) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editToDo, setEditToDo] = useState<string>(toDo.toDo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setToDos(
      toDos.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    )
  };

  const handleDelete = (id: number) => {
    setToDos(
      toDos.filter((task) => task.id !== id)
    )
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setToDos(
      toDos.map((task) => 
        task.id === id ? {...task, toDo: editToDo} : task
      )
    );
    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  return (
    <form className='todos__single' onSubmit={(e) => handleEdit(e, toDo.id)}>
      {
        edit ? (
          <input
            ref={inputRef}
            value={editToDo} 
            onChange={(e) => setEditToDo(e.target.value)}
            className='todos__single--text'/>
        ) : toDo.isDone ? (
          <s className="todos__single--text">{toDo.toDo}</s>
        ) : (
          <span className="todos__single--text">{toDo.toDo}</span>
        )
      }
      <div>
        <span className="icon" onClick={() => {
          if (!edit && !toDo.isDone) {
            setEdit(!edit);
          }
        }}>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(toDo.id)}><AiFillDelete /></span>
        <span className="icon" onClick={() => handleDone(toDo.id)}><MdDone /></span>
      </div>
    </form >
  )
}

export default SingleToDo