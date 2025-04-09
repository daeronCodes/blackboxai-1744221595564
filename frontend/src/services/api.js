const API_BASE = '/backend/api';

export const getOfficials = async () => {
    const response = await fetch(`${API_BASE}/officials.php`);
    return await response.json();
};

export const getAttendance = async () => {
    const response = await fetch(`${API_BASE}/attendance.php`);
    return await response.json();
};

export const recordAttendance = async (data) => {
    const response = await fetch(`${API_BASE}/attendance.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};

export const addOfficial = async (officialData) => {
    const response = await fetch(`${API_BASE}/officials.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(officialData)
    });
    return await response.json();
};
