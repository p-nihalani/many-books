async function loadBooks() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyy-PpE5WXK2r5aIfPTRHMk93qMvkMc5_I5QH_GFb24FhQkgOdE8P1yt0-KiaupmMvk/exec');
    const data = await response.json();

    const readingList = document.getElementById('reading-list');
    const readList = document.getElementById('read-list');

    // Clear previous list items
    readingList.innerHTML = '';
    readList.innerHTML = '';

    // Loop through each book and create list items
    data.records.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} by ${book.author} (Rating: ${book.rating})`;

        // Append the book to the appropriate list based on its status
        if (book.status === 'reading') {
            readingList.appendChild(listItem);
        } else if (book.status === 'read') {
            readList.appendChild(listItem);
        }
    });
}

// Call the function to load books when the page loads
loadBooks();
