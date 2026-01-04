async function fetchDate() {
    try {
        const response = await fetch('https://api.vdovareize.me/date');
        const json = await response.json();
        
        if (!json.success || !json.date) {
            throw new Error('Invalid response: missing date field');
        }
        
        const date = json.date;
        document.getElementById('dateDisplay').textContent = date;
        const link = document.getElementById('dateLink');
        // If running on Android, use intent:// to prefer opening the Google Photos app
        if (/Android/i.test(navigator.userAgent)) {
            link.href = `intent://photos.google.com/search/${date}#Intent;package=com.google.android.apps.photos;scheme=https;end`;
        } else {
            link.href = `https://photos.google.com/search/${date}`;
        }
        link.textContent = 'переглянути фото - 2';
    } catch (error) {
        console.error('Error fetching date:', error);
        document.getElementById('dateDisplay').textContent = 'error 😱';
    }
}
    

// Fetch date when page loads
document.addEventListener('DOMContentLoaded', fetchDate);
