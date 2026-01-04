async function fetchDate() {
    try {
        const response = await fetch('https://api.vdovareize.me/date');
        const json = await response.json();
        
        if (!json.success || !json.date) {
            throw new Error('Invalid response: missing date field');
        }
        
        document.getElementById('dateDisplay').textContent = json.date;
        document.getElementById('dateLink').href = `https://photos.google.com/search/${json.date}`;
        document.getElementById('dateLink').textContent = 'переглянути фото';
    } catch (error) {
        console.error('Error fetching date:', error);
        document.getElementById('dateDisplay').textContent = 'error 😱';
    }
}
    

// Fetch date when page loads
document.addEventListener('DOMContentLoaded', fetchDate);
