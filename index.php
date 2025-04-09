<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barangay Attendance System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-8">Barangay Attendance System</h1>
        <div id="app" class="bg-white rounded-lg shadow-md p-6">
            <!-- React app will be mounted here -->
            <div class="text-center py-8">
                <p class="text-lg">Loading attendance system...</p>
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mt-4"></div>
            </div>
        </div>
    </div>

    <!-- Load React app -->
    <script src="frontend/dist/bundle.js"></script>
</body>
</html>
