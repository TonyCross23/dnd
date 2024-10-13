import React, { useMemo, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Column, Id } from "../type/types";
import ColumnContainer from "./columnContainer";
import {DndContext} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';

const Board: React.FC = () => {

  const [columns, setColumn ] = useState<Column[]>([])
  const columnId = useMemo(() =>columns.map((column) => column.id),[columns]);
  

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
  return (
    <div className="mx-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
   <DndContext>
      <div className="m-auto flex gap-4">
            <div className="flex flex-wrap gap-4 my-10">
              <SortableContext items={columnId}>
              {columns.map((column) =>(
                <ColumnContainer key={column.id} column={column} deleteColumn={delectColumn}/>
              ))}
              </SortableContext>
            </div>
            <button onClick={createNewColumn} className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackGroundColor broder-2
              border-columnBackGroundColor p-4 ring-red-500 hover:ring-2 flex gap-2 m-auto">
               <CiCirclePlus className="text-xl"/> Add Column
            </button>
      </div>
   </DndContext>
    </div>
  )
}

export default Board
