import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';
import { BsPersonWorkspace } from 'react-icons/bs';
import JobCreateModal from './JobCreateModel';
import JobCard from './JobCard';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salary: '0'
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(res => setJobs(res.data));
  }, []);

  const filteredJobs = jobs.filter(job =>
    (filters.title === '' || job.title.toLowerCase().includes(filters.title.toLowerCase())) &&
    (filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
    (filters.jobType === '' || job.jobType === filters.jobType) &&
    (filters.salary === '0' || Number(job.salaryRange.replace(/[^\d]/g, '')) >= Number(filters.salary))
  );

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {/* Floating Navigation Container */}
      <div className="flex justify-center items-center pt-10">
        <div className="bg-white rounded-2xl shadow-lg flex flex-row items-center px-10 py-4 w-[90%] max-w-5xl">
          {/* Logo - blue, left side */}
          <div className="text-2xl font-bold text-blue-700 mr-8">logo</div>
          {/* Headings row, normal weight, black */}
          <div className="flex gap-8 items-center flex-grow">
            <span className="text-base text-black cursor-pointer">Home</span>
            <span className="text-base text-black cursor-pointer">Find Jobs</span>
            <span className="text-base text-black cursor-pointer">Find Talent</span>
            <span className="text-base text-black cursor-pointer">About us</span>
            <span className="text-base text-black cursor-pointer">Testimonials</span>
          </div>
          {/* Create Button at far right */}
          <button className="bg-purple-600 text-white px-5 py-2 rounded font-semibold ml-8" onClick={() => setShowModal(true)}>Create</button>
        </div>
      </div>
      {/* Filters bar: full width, outside floating container */}
      <div className="flex flex-row justify-between items-center gap-2 px-8 pb-2 mt-4 w-full">
        {/* Job Title Filter */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded flex-1">
          <FiSearch className="text-xl text-gray-500" />
          <input
            type="text"
            placeholder="Job Title"
            className="bg-gray-100 outline-none w-full text-black placeholder:text-gray-400"
            value={filters.title}
            onChange={e => setFilters({ ...filters, title: e.target.value })}
          />
        </div>
        {/* Location Filter */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded flex-1">
          <MdLocationOn className="text-xl text-gray-500" />
          <input
            type="text"
            placeholder="Location"
            className="bg-gray-100 outline-none w-full text-black placeholder:text-gray-400"
            value={filters.location}
            onChange={e => setFilters({ ...filters, location: e.target.value })}
          />
        </div>
        {/* Job Type Filter */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded flex-1">
          <BsPersonWorkspace className="text-xl text-gray-500" />
          <select
            className="bg-gray-100 outline-none w-full text-black"
            value={filters.jobType}
            onChange={e => setFilters({ ...filters, jobType: e.target.value })}
          >
            <option value="">Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        {/* Salary Slider */}
        <div className="flex flex-col flex-1 justify-center px-2">
          <label className="text-xs text-gray-400 font-semibold pb-1">Salary Range</label>
          <input
            type="range"
            min="0"
            max="500000"
            step="1000"
            value={filters.salary}
            onChange={e => setFilters({ ...filters, salary: e.target.value })}
            className="w-full accent-purple-600"
          />
          <span className="text-sm text-purple-600 mt-1 font-bold">₹{filters.salary}</span>
        </div>
      </div>
      {/* Job Cards: grid full width, narrow gap */}
      <div className="mt-4 px-8 grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
        {filteredJobs.map(job => (
           <JobCard key={job._id} job={job} />
        ))}
      </div>
      {showModal && (
        <JobCreateModal close={() => setShowModal(false)} refreshJobs={() => {
          axios.get('http://localhost:5000/api/jobs').then(res => setJobs(res.data));
          setShowModal(false);
        }} />
      )}
    </div>
  );
}
