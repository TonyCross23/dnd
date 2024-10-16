import React, { useMemo, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Column, Id, Task } from "../type/types";
import ColumnContainer from "./columnContainer";
import {DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {arrayMove, SortableContext} from '@dnd-kit/sortable';
import { createPortal } from "react-dom";

const Board: React.FC = () => {

  const [columns, setColumn ] = useState<Column[]>([])
  const columnId = useMemo(() =>columns.map((column) => column.id),[columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  

  const createNewColumn = () => {
      const columnToAdd: Column = {
        id: generateId(),
        title: `Column ${columns.length + 1}`,
      };

      setColumn([...columns, columnToAdd ])
  }

  const generateId = () => {
    return Math.floor(Math.random() * 10001)
  }

  const delectColumn = (id: Id) => {
    const filterColumns = columns.filter((column) => column.id !== id)
    setColumn(filterColumns)
  }

  const sensor = useSensors(
    useSensor(PointerSensor,{
      activationConstraint: {
        distance: 3,
      }
    })
  )

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  const onDrageEnd = (event: DragEndEvent) => {
      const {active, over} = event;
      if (!over) return;

      const activeColumnId = active.id;
      const overColumnId = over.id;

      if(activeColumnId === overColumnId) return;

      setColumn((columns) => {
        const activeColumnIndex = columns.findIndex(
          (column) => column.id === activeColumnId
        );

        const overColumnIndex = columns.findIndex(
          (column) => column.id === overColumnId
        );

        return arrayMove(columns, activeColumnIndex, overColumnIndex)
      })
  }

  const updateColumn = (id: Id, title: string) => {
    const newCloumn = columns.map((column) => {
      if (column.id !== id) return column;
      return {...column,title};
    })
    setColumn(newCloumn)
  }

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length +1 }`,
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id: Id) => {
    const newTask = tasks.filter((task) => task.id !== id)
    setTasks(newTask)
  }

  const updateTask = (id: Id, content: string) => {
    const newTask = tasks.map((task) => {
      if (task.id !== id) return task
      return {...task, content}
    })
    setTasks(newTask)
  }

  return (
    <div className="mx-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
   <DndContext sensors={sensor} onDragStart={onDragStart} onDragEnd={onDrageEnd}>
      <div className="m-auto flex gap-4">
            <div className="flex flex-wrap gap-4 my-10">
              <SortableContext items={columnId}>
              {columns.map((column) =>(
                <ColumnContainer key={column.id} column={column} 
                  deleteColumn={delectColumn} 
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks= {tasks.filter((task) => task.columnId === column.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
              </SortableContext>
            </div>
            <button onClick={createNewColumn} className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackGroundColor broder-2
              border-columnBackGroundColor p-4 ring-red-500 hover:ring-2 flex gap-2 m-auto">
               <CiCirclePlus className="text-xl"/> Add Column
            </button>
            {createPortal(<DragOverlay>
              {
                activeColumn && (
                  <ColumnContainer
                    column={activeColumn}
                    deleteColumn={delectColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    tasks= {tasks.filter((task) => task.columnId === activeColumn.id)}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                  />
                )
              }
            </DragOverlay>,
            document.body)}
      </div>
   </DndContext>
    </div>
  )
}

export default Board
