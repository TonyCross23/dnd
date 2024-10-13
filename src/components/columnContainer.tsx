import { useSortable } from "@dnd-kit/sortable";
import { Column, Id } from "../type/types";
import { FaRegTrashCan } from "react-icons/fa6";
import {CSS} from '@dnd-kit/utilities';

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props;

  const {setNodeRef, attributes, listeners, transform, transition} = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div ref={setNodeRef} style={style} className="bg-columnBackGroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div {...attributes} {...listeners} className="bg-mainBackGroundColor text-md h-[60px] cursor-grap rounded-md rounded-b-none p-3 font-bold border-columnBackGroundColor 
            border-4 flex items-center justify-between">  
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-columnBackGroundColor text-sm px-2 rounded-full ">
            <span className="mt-1">0</span>
          </div>
          {column.title}
        </div>
        <button onClick={() => deleteColumn(column.id)} className="hover:bg-columnBackGroundColor rounded px-1 py-2"><FaRegTrashCan className="text-gray-500 hover:text-white  text-xl"/></button>
      </div>
      <div className="flex flex-grow">content</div>
      <div>footer</div>
    </div>
  );
};

export default ColumnContainer;
