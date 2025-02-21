import React from 'react';
import { X, CalendarClock, AlertCircle } from 'lucide-react';
import type { Game } from '@/types';

interface GameEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game | null;
}

const GameEventsModal: React.FC<GameEventsModalProps> = ({ isOpen, onClose, game }) => {
  if (!isOpen || !game) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">{game.name} Events</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 hover:text-red-500" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {game.events.length > 0 ? (
            game.events.map((event) => (
              <div key={event.eventId} className="p-3 border rounded-lg flex items-start gap-3">
                <CalendarClock className="w-5 h-5 text-indigo-500 mt-1" />
                <div>
                  <h4 className="font-medium">{event.eventType}</h4>
                  <p className="text-sm text-gray-500">Event ID: {event.eventId}</p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(event.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2 text-gray-500">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">No events available for this game.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameEventsModal;
