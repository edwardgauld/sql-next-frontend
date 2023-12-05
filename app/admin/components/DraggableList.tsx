'use client';
import { Draggable, Droppable, DragDropContext } from '@hello-pangea/dnd';

type Item = {
  id: string;
  name?: string;
};

interface DraggableListProps {
  items: Item[];
  onDragEnd: (newOrder: any[]) => void;
  onRemove: (id: string) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({
  items,
  onDragEnd,
  onRemove
}) => {
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const itemsCopy = Array.from(items);
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    onDragEnd(itemsCopy);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppableId">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {items.map(({ id, name }, index) => (
              <Draggable
                key={id.toString()}
                draggableId={id.toString()}
                index={index}
              >
                {(provided) => (
                  <li
                    className='cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded text-black dark:text-gray-300'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {name}
                    <button onClick={() => onRemove(id.toString())}>
                      Remove
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
