async function loadBooks() 
{
    // Fetch data from G-Sheets API (via my G-Apps Script URL)
    const response = await fetch('https://script.google.com/macros/s/AKfycbyqxQcN8aZP-t1RDfjRvMYgriR6tT2yaH-3izl894LGFYYKAsxb559FN63VCZOyz6fA/exec'); // Updated URL
    const data = await response.json();

    // Find list elements
    const readingList = document.getElementById('reading-list');
    const readList = document.getElementById('read-list');

    // Clear previous lists
    readingList.innerHTML = '';
    readList.innerHTML = '';

    // Loop through the data and display books based on my assigned status
    data.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.Title} by ${book.Author} (Rating: ${book.Rating})`;

        // Display based on status
        if (book.Status === 'Reading') {
            readingList.appendChild(listItem); // Add to 'Reading' list
        } else if (book.Status === 'Read') {
            readList.appendChild(listItem); // Add to 'Read' list
        }
    });
}

// Call the function to load my books
loadBooks();
