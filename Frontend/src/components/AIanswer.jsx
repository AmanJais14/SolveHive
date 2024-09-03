import React from 'react';

function AIanswer({ answer }) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Expert Solution</h2>
      <pre className="text-gray-800 whitespace-pre-wrap leading-relaxed">
        {answer}
      </pre>
    </div>
  );
}

export default AIanswer;
