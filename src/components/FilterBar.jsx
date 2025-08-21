// FilterBar.jsx
import React from 'react';

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship"
];

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="flex gap-4 items-center py-6 bg-white px-8 rounded shadow-md mb-6">
      <input
        type="text"
        placeholder="Job Title"
        className="border px-3 py-2 rounded"
        value={filters.title}
        onChange={e => setFilters({ ...filters, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        className="border px-3 py-2 rounded"
        value={filters.location}
        onChange={e => setFilters({ ...filters, location: e.target.value })}
      />
      <select
        className="border px-3 py-2 rounded"
        value={filters.jobType}
        onChange={e => setFilters({ ...filters, jobType: e.target.value })}
      >
        <option value="">Type</option>
        {jobTypes.map(jt => <option key={jt} value={jt}>{jt}</option>)}
      </select>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Salary</label>
        <input
          type="range"
          min="0"
          max="500000"
          step="1000"
          value={filters.salary}
          onChange={e => setFilters({ ...filters, salary: e.target.value })}
        />
        <span className="text-sm ml-2">₹{filters.salary}</span>
      </div>
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded"
        onClick={() => setFilters({ title: '', location: '', jobType: '', salary: '0' })}
      >
        Reset
      </button>
    </div>
  );
}
