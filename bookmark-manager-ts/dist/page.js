"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const overviewPage = document.getElementById("overview-page");
    const bookmarkForm = document.getElementById("bookmark-form");
    const bookmarkReset = document.getElementById("reset-btn");
    const bookmarkUrl = document.getElementById("bookmark-url");
    const errorMessage = document.getElementById("error-message");
    const bookmarkList = document.getElementById("bookmark-list");
    const pagination = document.getElementById("pagination");
    const resultsPage = document.getElementById("results-page");
    const submittedUrl = document.getElementById("submitted-url");
    const backToOverview = document.getElementById("back-to-overview");
    let urlBookmarks = [];
    let currentPage = 1;
    const itemsPerPage = 20;
    // Load bookmarks from localStorage on page load
    const loadBookmarks = () => {
        const storedBookmarks = localStorage.getItem("urlBookmarks");
        if (storedBookmarks) {
            urlBookmarks = JSON.parse(storedBookmarks);
        }
        renderUrlBookmarks();
    };
    // Save bookmarks to localStorage - redundancy function
    const saveBookmarks = () => {
        localStorage.setItem("urlBookmarks", JSON.stringify(urlBookmarks));
    };
    // URL Validation by Regex
    const validateURL = (url) => {
        const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,63}\.)+([a-zA-Z]{2,6})(:[0-9]{1,5})?(\/[^\s]*)?$/;
        return regex.test(url);
    };
    // Error Message Handler
    const errorMessageHandler = () => {
        errorMessage.style.display = 'none';
        errorMessage.classList.add('hidden');
    };
    // Render the results page
    const showResultsPage = (url) => {
        overviewPage.classList.add("hidden");
        resultsPage.classList.remove("hidden");
        submittedUrl.textContent = `Submitted URL: ${url}`;
    };
    // Render the list of urlBookmarks with pagination
    const renderUrlBookmarks = () => {
        bookmarkList.innerHTML = ""; //default 
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedBookmarks = urlBookmarks.slice(start, end);
        // Use map to create an array of list items
        const bookmarkItems = paginatedBookmarks.map((url, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <a href="${url}" target="_blank">${url}</a>
                <button class="edit-btn" data-index="${start + index}"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-btn" data-index="${start + index}"><i class="fa-solid fa-delete-left"></i></button>
            `;
            return listItem;
        });
        // append bookmark Items
        bookmarkList.append(...bookmarkItems);
        // Render to overview page after adding
        renderPagination();
    };
    // Render Pagination when click the page
    const renderPagination = () => {
        pagination.innerHTML = "";
        const totalPages = Math.ceil(urlBookmarks.length / itemsPerPage);
        if (totalPages > 1) {
            if (currentPage > 1) {
                pagination.innerHTML += `<button data-page="${currentPage - 1}"><</button>`;
            }
            for (let i = 1; i <= totalPages; i++) {
                pagination.innerHTML += `<button data-page="${i}">${i}</button>`;
            }
            if (currentPage < totalPages) {
                pagination.innerHTML += `<button data-page="${currentPage + 1}">></button>`;
            }
        }
    };
    // change the page number
    const changePage = (pageNumber) => {
        currentPage = pageNumber;
        renderUrlBookmarks();
    };
    // Handle Edit URL
    const editUrlBookmark = (urlIndex) => {
        // Search the current url by indexing
        const newUrl = prompt("Enter new URL: ", urlBookmarks[urlIndex]);
        if (newUrl === null)
            return;
        // Check if newUrl is in the list and validate URL
        if (validateURL(newUrl)) {
            urlBookmarks[urlIndex] = newUrl; // Update new url that edited
            saveBookmarks();
            renderUrlBookmarks();
        }
        else {
            alert('Please enter a valid URL.');
        }
    };
    // Handle Delete URL
    const deleteUrlBookmark = (urlIndex) => {
        urlBookmarks = urlBookmarks.filter((value, index) => index !== urlIndex);
        saveBookmarks(); // Save the updated list to localStorage
        renderUrlBookmarks();
    };
    // addEventListener area
    // Handle URL submission
    bookmarkForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page
        const submittedUrl = bookmarkUrl.value; // Submitted URL
        if (validateURL(submittedUrl)) {
            urlBookmarks.push(submittedUrl);
            saveBookmarks(); // Save the urlBookmarks list to localStorage
            bookmarkUrl.value = ""; // reset the url input to blank
            renderUrlBookmarks();
            errorMessageHandler(); // Hide error message if the URL is valid
            showResultsPage(submittedUrl); // Render the results page
        }
        else {
            errorMessage.textContent = 'Please enter a valid URL.';
            errorMessage.style.display = 'block';
            errorMessage.classList.remove('hidden');
        }
    });
    // Handle resetting the all bookmarks
    bookmarkReset.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset the list?")) {
            urlBookmarks = [];
            saveBookmarks(); // Save the updated urlBookmarks to localStorage
            renderUrlBookmarks(); // Rerender the list to show it has been reset
        }
    });
    // Back to Overview page
    backToOverview.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page
        resultsPage.classList.add("hidden"); // hidden Results Page
        overviewPage.classList.remove("hidden"); // render Overview Page
        renderUrlBookmarks();
    });
    pagination.addEventListener("click", (event) => {
        const pageButton = event.target;
        if (pageButton.tagName === "BUTTON" && pageButton.dataset.page) {
            changePage(Number(pageButton.dataset.page)); // dataset.page that I can access data-page of button
        }
    });
    // Add EventListener to use editUrlBookmark and deleteUrlBookmark
    bookmarkList.addEventListener("click", (event) => {
        const targetElement = event.target;
        // Check if the clicked target is an HTMLElement and use closest method
        const editButton = targetElement.closest(".edit-btn");
        const deleteButton = targetElement.closest(".delete-btn");
        // Edit URL handler
        if (editButton && editButton.dataset.index !== undefined) {
            editUrlBookmark(Number(editButton.dataset.index));
        }
        // Delete URL handler
        else if (deleteButton && deleteButton.dataset.index !== undefined) {
            deleteUrlBookmark(Number(deleteButton.dataset.index));
        }
    });
    // Load bookmarks from localStorage when the page loads
    loadBookmarks();
});
