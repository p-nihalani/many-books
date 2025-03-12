async function loadBooks() {
    const response = await fetch('https://spreadsheets.google.com/feeds/list/1pu5ZR3EyPnnqlDn8nq6sKfjAsnRUHQDMryDZryqb8cc/od6/public/values?alt=json');
    const data = await response.json();

    const readingList = document.getElementById('reading-list');
    const readList = document.getElementById('read-list');

    // Clear previous list items
    readingList.innerHTML = '';
    readList.innerHTML = '';

    data.feed.entry.forEach(entry => {
        const title = entry.gsx$title.$t;
        const author = entry.gsx$author.$t;
        const status = entry.gsx$status.$t;
        const rating = entry.gsx$rating.$t;

        const listItem = document.createElement('li');
        listItem.textContent = `${title} by ${author} (Rating: ${rating})`;

        if (status.toLowerCase() === 'reading') {
            readingList.appendChild(listItem); // Add to 'Reading' list
        } else if (status.toLowerCase() === 'read') {
            readList.appendChild(listItem); // Add to 'Read' list
        }
    });
}

loadBooks();
