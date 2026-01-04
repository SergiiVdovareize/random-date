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
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isAndroid = /Android/i.test(ua);
        const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

        if (isAndroid) {
            // Use Android intent to prefer Google Photos app
            link.href = `intent://photos.google.com/search/${date}#Intent;package=com.google.android.apps.photos;scheme=https;end`;
        } else if (isIOS) {
            // Try Google Photos URL scheme on iOS (may vary by app version)
            link.href = `googlephotos://photos.google.com/search/${date}`;
        } else {
            // Web fallback
            link.href = `https://photos.google.com/search/${date}`;
        }
        link.textContent = 'знайти фото';
    } catch (error) {
        console.error('Error fetching date:', error);
        document.getElementById('dateDisplay').textContent = 'error 😱';
    }
}
    

// Fetch date when page loads
document.addEventListener('DOMContentLoaded', fetchDate);
