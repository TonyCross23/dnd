import { FaRegTrashAlt } from "react-icons/fa";
import { Task } from "../type/types"
import { useState } from "react";

interface Props {
  task: Task;
}

const TaskCard = ({task}: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  return (
    <div className="bg-mainBackGroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl 
          hover:ring-2 hover:ring-inset hover:ring-red-500 cursor-grabs relative"
          onMouseEnter={ () => {
            setMouseIsOver(true)
          }}
          onMouseLeave={ () => {
            setMouseIsOver(false)
          }}>
      {task.content}
      {mouseIsOver && (<button className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackGroundColor 
              p-2 rounded opacity-60 hover:opacity-100">
        <FaRegTrashAlt />
      </button>)}
    </div>
  )
}

export default TaskCard
