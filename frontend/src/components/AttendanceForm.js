import React, { useState } from 'react';
import { recordAttendance } from '../services/api';

const AttendanceForm = ({ officials }) => {
    const [selectedOfficial, setSelectedOfficial] = useState('');
    const [action, setAction] = useState('time_in');
    const [status, setStatus] = useState('present');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedOfficial) {
            setMessage('Please select an official');
            return;
        }

        try {
            const data = { official_id: selectedOfficial };
            if (action === 'time_in') {
                data.time_in = true;
                data.status = status;
            }
            
            const result = await recordAttendance(data);
            if (result.success) {
                setMessage(`${action === 'time_in' ? 'Time in' : 'Time out'} recorded successfully!`);
            } else {
                setMessage(result.message || 'Error recording attendance');
            }
        } catch (error) {
            setMessage('Error connecting to server');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Record Attendance</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Official
                    </label>
                    <select
                        value={selectedOfficial}
                        onChange={(e) => setSelectedOfficial(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">-- Select Official --</option>
                        {officials.map(official => (
                            <option key={official.id} value={official.id}>
                                {official.first_name} {official.last_name} ({official.position})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Action
                        </label>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="action"
                                    value="time_in"
                                    checked={action === 'time_in'}
                                    onChange={() => setAction('time_in')}
                                />
                                <span className="ml-2">Time In</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="action"
                                    value="time_out"
                                    checked={action === 'time_out'}
                                    onChange={() => setAction('time_out')}
                                />
                                <span className="ml-2">Time Out</span>
                            </label>
                        </div>
                    </div>

                    {action === 'time_in' && (
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="present">Present</option>
                                <option value="late">Late</option>
                                <option value="on_leave">On Leave</option>
                            </select>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    {action === 'time_in' ? 'Record Time In' : 'Record Time Out'}
                </button>

                {message && (
                    <div className={`mt-2 p-2 rounded-md ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default AttendanceForm;
