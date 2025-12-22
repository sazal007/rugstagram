"use client";

import { Check } from "lucide-react";
import { RoomType } from "./types";

interface RoomSelectorProps {
  rooms: RoomType[];
  selectedRoom: RoomType;
  onRoomSelect: (room: RoomType) => void;
}

export const RoomSelector: React.FC<RoomSelectorProps> = ({ rooms, selectedRoom, onRoomSelect }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold shadow-md">4</span>
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Select Setting</h3>
      </div>
      <div className="space-y-3">
        {rooms.map(room => (
          <button 
            key={room.id}
            onClick={() => onRoomSelect(room)}
            className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
              selectedRoom.id === room.id 
                ? 'border-accent bg-sand/10 shadow-md' 
                : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className={`p-2 rounded-full ${
              selectedRoom.id === room.id 
                ? 'bg-white text-accent' 
                : 'bg-gray-100 text-muted'
            }`}>
              {room.icon}
            </div>
            <span className="font-medium text-sm">{room.name}</span>
            {selectedRoom.id === room.id && <Check className="w-4 h-4 text-accent ml-auto" />}
          </button>
        ))}
      </div>
    </div>
  );
};

