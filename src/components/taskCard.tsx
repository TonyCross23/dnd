import { FaRegTrashAlt } from "react-icons/fa";
import { Id, Task } from "../type/types"
import { useState } from "react";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const TaskCard = ({task,deleteTask,updateTask}: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false);

  const toogleEditMode = () => {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
  }

  if(editMode) {
    return (
      <div className="bg-mainBackGroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl 
            hover:ring-2 hover:ring-inset hover:ring-red-500 cursor-grabs relative"
      >
      <textarea className="h-[90%] w-full resize-none rounded bg-transparent text-white focus:outline-none"
        value={task.content}
        autoFocus
        placeholder="Enter content here"
        onBlur={toogleEditMode}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) toogleEditMode()
        }}
        onChange={ e => updateTask(task.id, e.target.value)}>

      </textarea>
      </div>
    )
  }

  return (
    <div className="bg-mainBackGroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl 
          hover:ring-2 hover:ring-inset hover:ring-red-500 cursor-grabs relative task"
          onMouseEnter={ () => {
            setMouseIsOver(true)
          }}
          onMouseLeave={ () => {
            setMouseIsOver(false)
          }}
          onClick={toogleEditMode}>
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-warp"
        >
          {task.content}
      </p>
      {mouseIsOver && (<button className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackGroundColor 
              p-2 rounded opacity-60 hover:opacity-100"
              onClick={ () => {
                deleteTask(task.id)
              }}>
        <FaRegTrashAlt />
      </button>)}
    </div>
  )
}

export default TaskCard
