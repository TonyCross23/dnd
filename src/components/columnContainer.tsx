import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "../type/types";
import { FaRegTrashCan } from "react-icons/fa6";
import {CSS} from '@dnd-kit/utilities';
import { useMemo, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import TaskCard from "./taskCard";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  tasks: Task[];
  deleteTask:(id:Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const ColumnContainer = (props: Props) => {
  const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask,updateTask } = props;
  const [editMode, setEditMode] = useState(false)

  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const taskId = useMemo( () => {
    return tasks.map((task) => task.id)
  },[tasks])

  if(isDragging) {
    return (
      <div ref={setNodeRef} style={style} className="bg-columnBackGroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col opacity-40 border-2 border-red-500">

      </div>
    );
  }

  return (
    <div  ref={setNodeRef} style={style} className="bg-columnBackGroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div onClick={() => { setEditMode(true) }} {...attributes} {...listeners} className="bg-mainBackGroundColor text-md h-[60px] cursor-grap rounded-md rounded-b-none p-3 font-bold border-columnBackGroundColor 
            border-4 flex items-center justify-between">  
        <div className="flex gap-2">
          {!editMode && column.title}
          {editMode && (
            <input 
            autoFocus
            className="bg-black focus:border-red-500 border rounded outline-none"
            value={column.title}
            onChange={(e) => updateColumn(column.id, e.target.value)}
            onBlur={ () => {
              setEditMode(false)
            }}
            onKeyDown={ (e) => {
              if (e.key !== "Enter") return;
              setEditMode(false)
            }}/>
          )}
        </div>
        <button onClick={() => deleteColumn(column.id)}><FaRegTrashCan className="text-gray-500 hover:text-white  text-xl"/></button>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-hidden overflow-y-auto">
        {tasks.map((task) => (
          <SortableContext key={task.id} items={taskId}>
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask}/>
          </SortableContext>
        ))}
      </div>
      <button className="flex gap-2 items-center border-columnBackGroundColor border-2 rounded-md p-4
            border-x-columnBackGroundColor hover:bg-mainBackGroundColor hover:text-red-500 active:bg-black"
            onClick={ () => {
              createTask(column.id)
            }}  
            >
              <CiCirclePlus /> Add Task
      </button>
    </div>
  );
};

export default ColumnContainer;
