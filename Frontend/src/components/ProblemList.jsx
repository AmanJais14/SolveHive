import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/problems');
        setProblems(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleSolutionSubmit = async (e, problemId) => {
    e.preventDefault();
    const solutionText = e.target.solution.value;
    const author = "Anonymous"; // Replace with actual user data if authenticated
    e.target.solution.value = "";
    try {
      await axios.post(`http://localhost:5000/api/problems/${problemId}/solutions`, { content: solutionText, author });
      alert('Solution submitted successfully');
      // Refetch problems to update the list of solutions
      const updatedProblems = await axios.get('http://localhost:5000/api/problems');
      setProblems(updatedProblems.data);
    } catch (error) {
      console.error('Error submitting solution:', error);
      alert('Failed to submit solution');
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading problems...</p>;
  if (error) return <p className="text-center text-red-600">Error fetching problems: {error.message}</p>;

  return (
    <div className="p-4 space-y-4">
      {Array.isArray(problems) && problems.length > 0 ? (
        problems.map((problem) => (
          <div key={problem._id} className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
            <p className="text-gray-700 mb-4">{problem.description}</p>
            <p className="text-gray-500 mb-4">Category: {problem.category}</p>
            <div className="mb-4">
              {problem.solutions && problem.solutions.length > 0 ? (
                <div>
                  <h4 className="text-lg font-medium mb-2">Solutions:</h4>
                  <ul className="space-y-2">
                    {problem.solutions.map((solution) => (
                      <li key={solution._id} className="border rounded-lg p-3 bg-gray-50">
                        <p className="text-gray-800 mb-1">{solution.content}</p>
                        <p className="text-gray-600 text-sm"><small>Submitted by: {solution.author}</small></p>
                        <p className="text-gray-500 text-xs"><small>Submitted on: {new Date(solution.createdAt).toLocaleString()}</small></p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500">No solutions yet. Be the first to submit!</p>
              )}
            </div>

            <form onSubmit={(e) => handleSolutionSubmit(e, problem._id)} className="space-y-2">
              <textarea
                name="solution"
                placeholder="Your solution here"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit Solution
              </button>
            </form>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No problems found.</p>
      )}
    </div>
  );
};

export default ProblemList;
