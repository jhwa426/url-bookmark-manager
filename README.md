## URL Bookmark Manager

<p>
The aim of the URL Bookmark Manager application is to save URLs to local storage without connecting to a database. The URLs persist when the page is reloaded, and users can edit and delete them. Additionally, users can delete all URLs with the clear button.
</p>

## [URL Bookmark Manager](https://url-bookmark-manager.netlify.app/) - JavaScript

## [URL Bookmark Manager](https://url-bookmark-manager-ts.netlify.app/) - TypeScript

### Features

#### Overview Page

<li>
      Form Submission: The top section of the Overview Page features a form that allows users to submit a link. This form is designed to validate the input, ensuring that the submitted link is a valid URL and exists.
</li>

<li>
    URL Bookmark List Display: Below the form, the page displays a list of submitted links. The list is paginated, showing 20 links per page.
</li>

<li>
Pagination Controls: The pagination includes numbered controls with “next” and “previous” links, allowing users to navigate through the pages (e.g., < 1 2 3 >).
</li>

<li>
Custom Form Validation: The form validation logic is custom-written by Regular Expression to ensure robust URL validation.
</li>

#### Results Page

<li>
Submission Acknowledgement: The Result Page contains a message thanking the user for their submission.
</li>

<li>
Display Submission: The user's submitted link is also displayed.
</li>

<li>
Navigation Link: The button is provided to navigate back to the Overview Page.
</li>

## Technical Skills 💻

<img align="left" alt="Technical Skills" height="50px" src="https://skillicons.dev/icons?i=html,css,js,ts,git,netlify"/>

<br />
<br />
<br />
<br />

### Installation TypeScript

<details>

To run this portfolio locally, follow these steps:

1. Clone the repository: `git clone https://https://github.com/jhwa426/url-bookmark-manager`
2. Navigate to the project directory: `cd bookmark-manager-ts`
3. Install the dependencies: `npm init -y`
4. Install the TypeScript `npm i --save-dev typescript`
5. Create the `tsconfig.json` with command `npx tsc --init`
6. Modify `tsconfig.json` file as searching "outDir" and uncommenting to "outDir": "./dist".
7. Modify `package.json` file that "start": "tsc --watch"
8. Start the development server: `npm start`

</details>
