// DOMContentLoaded event fires when the HTML document has been completely parsed, and all deferred scripts (<script defer src="…"> and <script type="module">) have downloaded and executed.
// Setting the elements that have their own ID property will be directed to a specific ID property.

document.addEventListener('DOMContentLoaded', () => {
    const overviewPage = document.getElementById('overview-page'); // Overview page
    const bookmarkForm = document.getElementById('bookmark-form'); // Bookmark form
    const bookmarkReset = document.getElementById('reset-btn'); // Reset button
    const bookmarkUrl = document.getElementById('bookmark-url'); // Bookmark URL
    const errorMessage = document.getElementById('error-message'); // Error message
    const bookmarkList = document.getElementById('bookmark-list'); // Bookmark list
    const pagination = document.getElementById('pagination'); // Pagination
    const resultsPage = document.getElementById('results-page'); // Results page
    const submittedUrl = document.getElementById('submitted-url'); // Submitted URL
    const backToOverview = document.getElementById('back-to-overview'); // Back to overview

    let urlBookmarks = []; // An array of URL bookmarks
    let currentPage = 1; // Start page
    const itemsPerPage = 20; // Maximum bookmarks per page

    // Load bookmarks from localStorage on page load
    const loadBookmarks = () => {
        const storedBookmarks = localStorage.getItem('urlBookmarks'); // "urlBookmarks" as a unique identifier (key) in the browser's localStorage
        if (storedBookmarks) {
            urlBookmarks = JSON.parse(storedBookmarks);
        }
        renderUrlBookmarks();
    };

    // Save bookmarks to localStorage
    const saveBookmarks = () => {
        localStorage.setItem('urlBookmarks', JSON.stringify(urlBookmarks));
    };

    // URL validation by regex
    const validateURL = (url) => {
        const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,63}\.)+([a-zA-Z]{2,6})(:[0-9]{1,5})?(\/[^\s]*)?$/;
        return regex.test(url);
    };

    // Error message handler
    const errorMessageHandler = () => {
        errorMessage.style.display = 'none';
        errorMessage.classList.add('hidden');
    };

    // Render the results page
    const showResultsPage = (url) => {
        overviewPage.classList.add('hidden');
        resultsPage.classList.remove('hidden');
        submittedUrl.textContent = `Submitted URL: ${url}`;
    };

    // Render the list of URL bookmarks with pagination
    const renderUrlBookmarks = () => {
        bookmarkList.innerHTML = ''; // Default

        // Calculate Pagination index
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedBookmarks = urlBookmarks.slice(start, end); // Bring the first 20 bookmarks per pagination

        // Use map to create an array of list items
        const bookmarkItems = paginatedBookmarks.map((url, index) => {
            const listItem = document.createElement('li'); // Create the list of an unordered list
            listItem.innerHTML = `
                <a href="${url}" target="_blank">${url}</a>
                <button class="edit-btn" data-index="${start + index}"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-btn" data-index="${start + index}"><i class="fa-solid fa-delete-left"></i></button>
            `; // data-index - stores the index of each bookmark relative to the entire list of bookmarks. It ensures the index reflects the correct position of the bookmark in the full list, even when paginated. (an individual item within a list or array)

            return listItem;
        });

        bookmarkList.append(...bookmarkItems); // Append bookmark items

        renderPagination(); // Render to overview page after adding
    };

    // Render pagination when clicking the page
    const renderPagination = () => {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(urlBookmarks.length / itemsPerPage); // Rounds up to the nearest whole number, ensuring 20 bookmarks per page

        if (totalPages > 1) {
            if (currentPage > 1) { // Render previous page button if not on the first page
                pagination.innerHTML += `<button data-page="${currentPage - 1}">&lt</button>`;
            } // data-page - stores the page number for pagination

            for (let i = 1; i <= totalPages; i++) { // Render buttons for all pages
                pagination.innerHTML += `<button data-page="${i}">${i}</button>`;
            }

            if (currentPage < totalPages) { // Render next page button if not on the last page
                pagination.innerHTML += `<button data-page="${currentPage + 1}">&gt</button>`;
            }
        }
    };

    // Change the page number
    const changePage = (pageNumber) => {
        currentPage = pageNumber;
        renderUrlBookmarks();
    };

    // Handle edit URL
    const editUrlBookmark = (urlIndex) => {
        // Search the current URL by indexing
        const newUrl = prompt('Enter new URL: ', urlBookmarks[urlIndex]);

        // Check if newUrl is in the list and validate URL
        if (newUrl && validateURL(newUrl)) {
            urlBookmarks[urlIndex] = newUrl; // Update new URL that edited
            saveBookmarks();
            renderUrlBookmarks();
        } else if (!validateURL(newUrl)) {
            alert('Please enter a valid URL.');
        }
    };

    // Handle delete URL
    const deleteUrlBookmark = (urlIndex) => {
        urlBookmarks = urlBookmarks.filter((value, index) => index !== urlIndex);
        saveBookmarks(); // Save the updated list to localStorage
        renderUrlBookmarks();
    };



    // addEventListener area

    // Handle URL submission
    bookmarkForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page
        const submittedUrl = bookmarkUrl.value.trim(); // Submitted URL

        if (validateURL(submittedUrl)) {
            if (!urlBookmarks.includes(submittedUrl)) {
                urlBookmarks.push(submittedUrl);
                saveBookmarks(); // Save the urlBookmarks list to localStorage
                bookmarkUrl.value = ''; // Reset the URL input to blank
                renderUrlBookmarks(); // Render all bookmarks in the bookmark list
                errorMessageHandler(); // Hide error message if the URL is valid
                showResultsPage(submittedUrl); // Render the Submitted URL to the results page
            }
            else {
                // Show error message for duplicate URL
                errorMessage.textContent = 'This URL has already been submitted.';
                errorMessage.style.display = 'block';
                errorMessage.classList.remove('hidden');
            }

        } else {
            // if is invalidate URL, occur error message
            errorMessage.textContent = 'Please enter a valid URL.';
            errorMessage.style.display = 'block';
            errorMessage.classList.remove('hidden');
        }
    });

    // Handle resetting all bookmarks
    bookmarkReset.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset the list?')) {
            urlBookmarks = []; // localStorage.removeItem("urlBookmarks");
            saveBookmarks(); // Save the updated urlBookmarks to localStorage
            renderUrlBookmarks(); // Rerender the list to show it has been reset
        }
    });

    // Back to overview page
    backToOverview.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page
        resultsPage.classList.add('hidden'); // Hide results page
        overviewPage.classList.remove('hidden'); // Render overview page
        renderUrlBookmarks();
    });

    pagination.addEventListener('click', (event) => {
        const pageButton = event.target;
        if (pageButton.tagName === 'BUTTON' && pageButton.dataset.page) {
            changePage(Number(pageButton.dataset.page)); // dataset.page that I can access data-page of button
        }
    });

    // Add event listener to use editUrlBookmark and deleteUrlBookmark
    bookmarkList.addEventListener('click', (event) => {
        const editButton = event.target.closest('.edit-btn'); // Ensures that detecting the correct button even if an inner element (like an icon) is clicked.
        const deleteButton = event.target.closest('.delete-btn');

        if (editButton) { // Edit URL handler
            editUrlBookmark(Number(editButton.dataset.index));
        } else if (deleteButton) { // Delete URL handler
            deleteUrlBookmark(Number(deleteButton.dataset.index));
        }
    });

    // Load bookmarks from localStorage when the page loads
    loadBookmarks();
});
