import React, { useEffect, useRef } from 'react';

const fishIcons = [
  '/api/placeholder/100/100',
  '/api/placeholder/100/100',
  '/api/placeholder/100/100',
  '/api/placeholder/100/100',
  '/api/placeholder/100/100',
  '/api/placeholder/100/100',
  '/api/placeholder/100/100',
  '/api/placeholder/100/100',
  '/api/placeholder/100/100',
];

const SeasonalFishModal = ({ isOpen, onClose, currentDate }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-600">旬の魚</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">{currentDate}</p>
        <div className="grid grid-cols-3 gap-4">
          {fishIcons.map((icon, index) => (
            <div key={index} className="aspect-square">
              <img src={icon} alt={`Fish ${index + 1}`} className="w-full h-full object-cover rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonalFishModal;