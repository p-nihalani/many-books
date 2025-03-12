async function loadBooks() {
    try {
        const response = await fetch('https://spreadsheets.google.com/feeds/list/2PACX-1vQUHR8Jl73Q4R1xsm9jZCsZyoaTUodqBqwT7UHc4ob6s37moiFRF_uGR0w1THLblGVsbY2Iuje8iz7R/od6/public/values?alt=json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const books = await response.json();

        const readingList = document.getElementById('reading-list');
        const readList = document.getElementById('read-list');

        // Clear previous list items
        readingList.innerHTML = '';
        readList.innerHTML = '';

        books.feed.entry.forEach(book => {
            const listItem = document.createElement('li');
            listItem.textContent = `${book.gsx$title.$t} by ${book.gsx$author.$t} (Rating: ${book.gsx$rating.$t})`;

            if (book.gsx$status.$t === 'reading') {
                readingList.appendChild(listItem); // Add to 'Reading' list
            } else if (book.gsx$status.$t === 'read') {
                readList.appendChild(listItem); // Add to 'Read' list
            }
        });
    } catch (error) {
        console.error('Failed to load books:', error);
    }
}

loadBooks();
