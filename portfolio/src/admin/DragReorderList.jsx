import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

// SortableItem wrapper
function SortableItem({ id, item, index, renderItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`relative ${isDragging ? 'shadow-xl scale-[1.02] opacity-90' : ''}`}
    >
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="p-1.5 text-zinc-500 hover:text-zinc-300 cursor-grab active:cursor-grabbing rounded"
        >
          <GripVertical size={18} />
        </button>
      </div>
      <div className="pl-12">
        {renderItem(item, index)}
      </div>
    </div>
  );
}

export default function DragReorderList({ items, onReorder, renderItem }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      
      const newArray = arrayMove(items, oldIndex, newIndex);
      onReorder(newArray);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map(item => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {items.map((item, index) => (
            <SortableItem 
              key={item.id} 
              id={item.id} 
              item={item} 
              index={index} 
              renderItem={renderItem} 
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
