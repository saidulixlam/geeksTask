import React from 'react';

const WarningModal = ({ showModal, message, onConfirm, onCancel, confirmLabel, cancelLabel }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-md shadow-lg p-6 w-80">
        <h3 className="text-lg font-semibold mb-4">{message}</h3>
        <div className="flex justify-end space-x-4">
          {onCancel && (
            <button 
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              {cancelLabel || 'Cancel'}
            </button>
          )}
          {onConfirm && (
            <button 
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
            >
              {confirmLabel || 'Confirm'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarningModal;



