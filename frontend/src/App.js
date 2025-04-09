import React, { useState, useEffect } from 'react';
import AttendanceForm from './components/AttendanceForm';
import RecordsTable from './components/RecordsTable';
import { getOfficials, getAttendance } from './services/api';

function App() {
  const [officials, setOfficials] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [officialsRes, attendanceRes] = await Promise.all([
          getOfficials(),
          getAttendance()
        ]);
        setOfficials(officialsRes.data);
        setAttendance(attendanceRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-lg">Loading data...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mt-4"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Barangay Attendance System</h2>
      <AttendanceForm officials={officials} />
      <RecordsTable attendance={attendance} />
    </div>
  );
}

export default App;
