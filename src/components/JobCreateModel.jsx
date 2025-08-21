import React, { useState } from 'react';
import axios from 'axios';

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship"
];

export default function JobCreateModal({ close, refreshJobs }) {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    jobType: jobTypes[0],
    salaryRange: '',
    description: '',
    responsibilities: '',
    applicationDeadline: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let respArr = form.responsibilities.split(/\n+/).map(s => s.trim()).filter(Boolean);
    await axios.post('https://job-manage-backend.onrender.com/api/jobs', {
      ...form,
      responsibilities: respArr
    });
    refreshJobs();
  };

  return (
    // Transparent overlay showing dimmed JobList page behind
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      {/* Modal box with rectangular shape and rows of inputs */}
      <div className="bg-white rounded-xl shadow-xl min-w-[400px] max-w-2xl w-full px-8 py-8">
        <h2 className="text-center font-semibold text-xl mb-6">Create Job Opening</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* 1st row: Job Title and Company */}
          <div>
            <label className="block text-xs font-bold mb-1">Job Title</label>
            <input
              type="text"
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Job Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Company Name</label>
            <input
              type="text"
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Company Name"
              value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
            />
          </div>
          {/* 2nd row: Location + Job Type */}
          <div>
            <label className="block text-xs font-bold mb-1">Location</label>
            <input
              type="text"
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Location"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Job Type</label>
            <select
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={form.jobType}
              onChange={e => setForm({ ...form, jobType: e.target.value })}
            >
              {jobTypes.map(jt => <option key={jt}>{jt}</option>)}
            </select>
          </div>
          {/* 3rd row: Salary Range + Application Deadline */}
          <div>
            <label className="block text-xs font-bold mb-1">Salary Range</label>
            <input
              type="text"
              placeholder="e.g. 12LPA"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={form.salaryRange}
              onChange={e => setForm({ ...form, salaryRange: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Application Deadline</label>
            <input
              type="date"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={form.applicationDeadline}
              onChange={e => setForm({ ...form, applicationDeadline: e.target.value })}
            />
          </div>
          {/* 4th row full width: Description */}
          <div className="col-span-2">
            <label className="block text-xs font-bold mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Job Description"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>
          {/* 5th row full width: Responsibilities */}
          <div className="col-span-2">
            <label className="block text-xs font-bold mb-1">Responsibilities (one per line)</label>
            <textarea
              rows={3}
              placeholder="Responsibilities"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={form.responsibilities}
              onChange={e => setForm({ ...form, responsibilities: e.target.value })}
            />
          </div>
          {/* 6th row full width: Buttons */}
          <div className="col-span-2 flex justify-between mt-6">
            <button type="button"
              className="px-5 py-2 bg-gray-200 rounded"
              onClick={close}
            >Save Draft</button>
            <button type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded font-semibold"
            >Publish</button>
          </div>
        </form>
      </div>
    </div>
  );
}
