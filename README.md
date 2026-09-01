
# Beach Resort

Beach Resort is a full-stack hotel rooms platform based in the United Kingdom. This application allows guests to browse and search available rooms, view detailed specifications, and filter options based on their preferences. Additionally, site administrators can manage the resort's inventory with full CRUD (Create, Read, Update, Delete) capabilities to add, edit, and remove rooms. The application is built with a React frontend, a Node.js/Express REST API backend, and a PostgreSQL database.

[View the live website here](https://hotel-btji.onrender.com)

## Table of Contents
- [User Experience (UX)](#user-experience-ux)
- [Dataset](#dataset)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Testing](#testing)
- [Credits and Acknowledgements](#credits-and-acknowledgements)

## User Experience (UX)

### User Stories

1. As a user or site administrator, I want to navigate the website easily to find the content or management tools I am looking for.
2. As a user, I want to browse all available hotel rooms and view key features (e.g., price, size, capacity, pets allowed, breakfast included).
3. As a user, I want to sort rooms by name and price.
4. As a user, I want to filter rooms by type, price range, room size, guest capacity, and special amenities.
5. As a user, I want to click on an individual room to view a detailed page featuring multiple room images and full descriptions.
6. As a site administrator, I want to add new rooms to the system with image uploads, capacity limits, and pricing details.
7. As a site administrator, I want to edit existing room details and update images.
8. As a site administrator, I want to delete rooms from the resort's inventory.

### Design

#### Colour Scheme

- The primary palette features warm coastal tones: soft off-white, deep navy blue, warm sand/gold accents, and charcoal text.
- High contrast ensures readability and gives the resort a clean, luxurious aesthetic.

#### Typography

- **Primary Font:** Verdana (supported by Geneva and Tahoma fallback options).
- **Fallback:** Sans-serif is used as the generic fallback in the event that primary fonts fail to render.
- This font stack was chosen for its clean, highly legible design across all device displays and screen sizes.

#### Imagery

- Room images showcase high-resolution photos uploaded and transformed via **Cloudinary**.
- Hero banners and icons complement the coastal resort atmosphere.

## Dataset

### Structure

The initial dataset is stored in `server/data.json` and automatically seeded into the PostgreSQL `hotels` table during application startup. 

### Fields

The dataset includes the following fields for each room: `id`, `name`, `slug`, `type`, `price`, `size`, `capacity`, `pets`, `breakfast`, `featured`, `description`, `extras`, `main_image`, `details_image_1`, `details_image_2`, and `details_image_3`.

### Data Integrity

- **Numeric Validation:** Prices are enforced between **£100 and £1000**, room sizes between **200 and 1000 sq ft**, and capacity limits between **1 and 10 guests** directly via database check rules (`CHECK`).
- **Array Type Handling:** The `extras` field utilizes native PostgreSQL array types (`VARCHAR[]`), allowing dynamic list operations without needing an additional table.
- **Auto-Increment Alignment:** When seeding with explicit `id` parameters from `server/data.json`, the startup script executes `setval('hotels_id_seq', MAX(id))` to ensure key sequence integrity for subsequent creation requests.

### Entity Relationship Diagram

The [Entity Relationship Diagram](client/public/images/ER_Diagram.png) shows further details of each field contained in the hotels table in the database. 

## Features

### Existing Features

1. Brand Logo

    - This familiarises users with the resort's brand identity and functions as a navigation link accessible from any page to return to the home page.

2. Navigation Links

    - These enable users to navigate between key pages of the website, including Home, Rooms, and Contact, so they can easily find desired content.

3. Home Page Hero Banner

    - This provides users with a visual introduction to the resort alongside a clear call-to-action button prompting them to explore available rooms.

4. Featured Rooms

    - This displays cards on the home page highlighting selected featured rooms. Each card shows the room's name, price, size, and main image, which links directly to that room's detail page.

5. Home Page Services Section

    - This highlights the key guest amenities offered by the resort (such as complimentary cocktails, endless hiking trails, free shuttle transport, and premium refreshments).
    - Each service card features a visual icon, clear titles, and a descriptive summary to familiarise guests with the resort experience upon landing on the home page.

6. Room Filter, and Sorting System

    - This allows users to filter room listings dynamically based on criteria such as room type, maximum capacity, price range, room size, and specific amenities (pets allowed or breakfast included).
    - It also provides sorting functionality, allowing users to reorder displayed rooms by price (low-to-high or high-to-low) or alphabetically by room name.

7. Rooms List & Interactive Cards

    - This presents users with a dynamic grid of room cards, each displaying the room's main photo and price.
    - Hovering over a room card smoothly displays an interactive features link, allowing users to navigate directly to that specific room's detail page.


8. Room Details Page

    - This provides comprehensive information about a selected room, including its price, size, guest capacity, full text description, a list of additional amenities, and an image gallery showcasing multiple room photos.

9. Add Room Form

    - This enables administrators to add new rooms to the resort inventory by completing a form that includes text inputs, numerical validation, amenity selection, and multipart image file uploads handled via Multer and Cloudinary.

10. Edit Room Form

    - This enables administrators to modify existing room details. The form pre-populates current room data from the database, allowing admins to update specifications, pricing, amenities, or upload replacement images.

11. Delete Room Functionality

    - This allows administrators to permanently remove a room from the system via a delete action, which updates the database records accordingly.

12. Automated Database Initialization & Seeding

    - The backend script automatically checks and builds the database schema on startup, populates initial room records from `server/data.json` if empty, and synchronizes the primary key sequence (`setval`) to ensure reliable creation of new room IDs.

13. Cloudinary Image Upload Integration

    - Room image uploads are processed via Multer storage and securely uploaded to Cloudinary, storing accessible image file paths in the PostgreSQL database.

14. Responsive Design

    - CSS grid, flexbox layout structures, and media queries ensure the application's interface adapts smoothly across mobile devices, tablets, and desktop displays.

### Features Left to Implement

1. Online Booking and Reservation System

    - Add functionality allowing users to select check-in and check-out dates to book and pay for available rooms directly through the application.

2. User Authentication and Guest Profiles

    - Implement account registration and login for guests so they can view past bookings and manage saved preferences.

3. Customer Reviews and Ratings

    - Allow verified guests to leave star ratings and written reviews on individual room detail pages.

4. Automated Email Confirmations

    - Integrate an email service (such as Nodemailer) to send automatic booking confirmation emails to guests upon successful reservation.

## Technologies Used

### Languages Used

1. [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
    - HTML5 was used for the structure of the web pages.
2. [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
   - CSS3 was used for the styling of the web pages.
3. [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
   - JavaScript was used for the backend API and interactive features on the web pages.

### Frameworks, Libraries & Tools Used

1. [React](https://react.dev)
    - React was used as the core frontend JavaScript library for building the component-based user interface and managing application state.
2. [Vite](https://vitejs.dev)
    - Vite was used as the frontend build tool and development server for fast module bundling and local environment setup.
3. [React Router DOM](https://reactrouter.com)
    - React Router DOM was used to handle client-side routing, navigation between pages (Home, Rooms, Single Room, Add Room, Update Room), and managing dynamic URL parameters.
4. [Axios](https://axios-http.com)
    - Axios was used as the HTTP client to send asynchronous requests between the React frontend and the Express REST API backend.
5. [Styled Components](https://styled-components.com)
    - Styled Components was used to write CSS-in-JS for component-level styling, dynamic themes, and isolated CSS scoping across the application.
6. [Node.js](https://nodejs.org)
    - Node.js was used as the JavaScript runtime environment for the backend server.
7. [Express](https://expressjs.com)
    - Express was used as the backend web application framework to build the REST API endpoints, handle HTTP requests, and execute database queries.
8. [node-postgres (pg)](https://node-postgres.com)
    - `pg` was used as the PostgreSQL client for Node.js to manage database connections, connection pooling, and parameterised SQL queries.
9. [Aiven](https://aiven.io)
    - A cloud-hosted PostgreSQL database provided by Aiven was used for storing all application relational data, including room specifications, constraints, and array types.
10. [Cloudinary](https://cloudinary.com)
    - Cloudinary was used to store and serve optimized image assets uploaded through the admin room management interface.
11. [Multer](https://github.com/expressjs/multer) and [multer-storage-cloudinary](https://github.com/dsvick/multer-storage-cloudinary)
    - Multer was used as middleware for handling multipart/form-data file uploads and streaming room images directly to Cloudinary.
12. [Jasmine](https://jasmine.github.io) and [Supertest](https://github.com/ladjs/supertest)
    - Jasmine and Supertest were used to write and execute automated integration and unit tests for the backend API endpoints.
13. [Font Awesome](https://fontawesome.com)
    - Font Awesome icons were used throughout the interface to improve visual cues and user experience.
14. [Render](https://render.com)
    - Render was used to host and deploy the web application and API service.
15. [Git](https://git-scm.com)
    - Git was used for version control throughout development.
16. [GitHub](https://github.com)
    - GitHub was used to host the source code repository and manage automated CI workflows.
17. [dbdiagram.io](https://dbdiagram.io)
    - dbdiagram.io was used to generate DBML schema specifications and Entity Relationship Diagrams for the database architecture.

## Testing

### W3C Validation

The W3C Markup Validator and W3C CSS Validator services were used to validate the code in all HTML and CSS files to ensure that they were in compliance with the HTML5 and CSS3 standards and that there were no syntax errors.

### PEP8 and JSHint Validation

The JSHint validator services were used to validate the code in all JavaScript files to ensure that they were in compliance with the relevant standards and that there were no syntax errors. No errors were identified. 

### Lighthouse Accessibility Testing

The Google Lighthouse accessibility test was used to ensure that every page of the website complies with accessibility standards. No errors were identified.

### Testing User Stories from User Experience (UX) Section

1. As a user or site administrator, I want to navigate the website easily to find the content or management tools I am looking for.

    - The navigation bar is accessible at the top of every page across all screen sizes using React Router DOM for seamless, client-side page transitions.
    - It features the Beach Resort logo, which functions as a direct link to return users to the home page from anywhere on the site.
    - Navigation links clearly guide users to key sections including Home, Rooms, and Contact.
    - The footer provides supplementary links allowing quick access to room collections and resort contact information.
    - The application structure is organized logically, featuring a Hero section, Services summary, and Featured Rooms on the home page, while dedicated routes handle detailed room views, search, and management tasks.

2. As a user, I want to browse all available hotel rooms and view key features (e.g., price, size, capacity, pets allowed, breakfast included).

    - Navigating to the Rooms page displays a responsive grid featuring all active hotel rooms sourced from the PostgreSQL database.
    - Each room card prominently displays key attributes including the room title, nightly price(£), floor size (sqft), max guest capacity, and badges indicating pet and breakfast policies.
    - Room cards feature a direct link overlay allowing users to seamlessly transition into viewing full details for any specific room.

3. As a user, I want to sort rooms by name and price.

    - A dedicated sort control dropdown is integrated directly into the room filtering control bar on the Rooms page.
    - Users can sort the displayed rooms by price (ascending low-to-high or descending high-to-low).
    - Users can also sort rooms alphabetically by name (A-Z or Z-A) to quickly find specific room categories.
    - The room grid updates instantly in the React state without requiring a full browser refresh.

4. As a user, I want to filter rooms by type, price range, room size, guest capacity, and special amenities.

    - The Rooms page includes a comprehensive filter control panel powered by React state inputs.
    - Users can select room types (e.g., single, double, family, presidential) from a dropdown selector.
    - Interactive numeric and range inputs allow users to filter rooms dynamically within specific price bounds, floor sizes, and guest count limits.
    - Checkboxes enable precise filtering for special amenities, such as pet-friendly rooms or complimentary breakfast inclusions.

5. As a user, I want to click on an individual room to view a detailed page featuring multiple room images and full descriptions.

    - Clicking on any room card routes the user to a dedicated Single Room page via dynamic React Router parameters (`/rooms/:slug`).
    - The page renders a comprehensive narrative description alongside detailed specs including exact price, size, capacity, and amenity policies.
    - A bulleted list displays all extra amenities parsed directly from the PostgreSQL `extras` array column.
    - The hero image and details image gallery renders multiple photos loaded directly from Cloudinary media storage.

6. As a site administrator, I want to add new rooms to the system with image uploads, capacity limits, and pricing details.

    - An **"Add Room"** button/link is conveniently available on the main Rooms page for site administrators.
    - Clicking the link opens the Add Room form containing validated fields for room title, type, price, size, guest capacity, description, and dynamic amenity tags.
    - Built-in numeric checks ensure pricing, size, and capacity adhere to database constraints (£100–£1000 price, 200–1000 sq ft, 1–10 guests).
    - Integrated Multer and Cloudinary file input fields allow admins to upload primary and detail thumbnail images directly to cloud storage upon submission.

7. As a site administrator, I want to edit existing room details and update images.

    - An **"Edit Room"** action link is located directly on the Single Room Details page (`/rooms/:slug`).
    - Clicking the link opens an Edit Form pre-populated with current database values fetched via API.
    - Admins can modify pricing, capacity rules, text descriptions, or feature flags.
    - Admins can optionally upload a replacement main image to Cloudinary, automatically updating the database upon form submission.

8. As a site administrator, I want to delete rooms from the resort's inventory.

    - A **"Delete Room"** action button is positioned directly on the Single Room Details page (`/rooms/:slug`).
    - Clicking the Delete action issues a `DELETE` request to the Express API endpoint, which removes the room record from the PostgreSQL database.
    - Upon successful removal, the application redirects the user back to the rooms page, where the deleted room is no longer displayed in the list.

### Further Testing

- The Website was tested on a variety of different web browsers including Google Chrome, Microsoft Edge, Safari and Firefox.
- The Website was also viewed on a number of different devices with a range of screen widths including an iMac, MacBook, iPad and iPhone.
- Family and friends were asked to review the site and documentation and identify any bugs or other issues that were affecting the user experience.

### Fixed Bugs

1. Room image form was able to be submitted with empty data

    - Fixed an issue where submitting the room without updating the room data state when any of the input fields were updated.

2. Font Awesome icons were failing to render across specific components

    - Fixed broken, incorrect icon syntax in services data which was causing the images to fail to render.

3. Room images were not processing correctly during add/update actions

    - Resolved a bug where uploaded file payloads were not being processed correctly in the backend API.


4. Rooms list did not update immediately following the deletion of a room

    - Fixed a state synchronization issue where deleting a room from its details page required a full browser refresh to reflect changes. Updated the context so that after a successful API `DELETE` request both rooms and filtered rooms are updated immediately.

5. Room filtering and sorting controls were not updating the displayed results correctly

    - Resolved an issue with the sort and filter logic in the context to ensure that the sorting and filters were being applied correctly to ensure smooth real-time list filtering and sorting.

## Deployment

### Forking the GitHub Repository

The GitHub repository can be forked to make a copy without affecting the original project:

1. Log in to GitHub and navigate to the project repository.
2. Located at the top-right of the page, click the Fork button.
3. Select an owner account and specify a repository name.
4. Click Create fork to create the copy under your GitHub account.

More information about forking a GitHub repository is available [here](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

### Making a Local Clone

A local clone of the project repository can be created using the following steps:

1. Log in to GitHub and navigate to the project repository.
2. Above the file list, click the Code dropdown button.
3. Select your preferred method (HTTPS or SSH) and click the copy icon to copy the repository URL.
4. Open your terminal interface.
5. Change the current working directory to the directory where you want the cloned repository saved.
6. Type git clone followed by the URL you copied in Step 3:
    ```bash
    git clone https://github.com/jonathan-odonnell/beach-resort.git
    ```
7. Press Enter to create your local clone.

More information about cloning a repository is available [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

### Running Locally

To run the application on your local machine, follow these steps:

1. Ensure Node.js and npm are installed on your machine.
2. Open your terminal and navigate to the project root directory.
3. Install all project dependencies by running:
    ```bash
    npm install
    ```
4. Create a .env file in the root directory and configure your local environment variables (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET).
5. Replace the ca.pem file with your database security certificate in ```server/db```
6. Start the server by running:
    ```bash
    node server/app.js
    ```
7. Open your web browser and navigate to http://localhost:3000 (or your configured PORT) to view the application.

### Deploying to Render

The application is deployed on Render using the following steps:

1. Log in to your Render account and navigate to the Dashboard.
2. Click the **New +** button and select **Web Service**.
3. Connect your GitHub account and select the repository for this project.
4. Enter a unique name for your application service.
5. Set the runtime environment to **Node**.
6. Specify the build command:
   ```bash
   npm install && npm run build
    ```
7. Specify the start command:
    ```bash
    node server/app.js
    ```
8. Scroll down to the Environment Variables section and add the required configuration keys (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET).
9. Click Create Web Service to start the build and deployment process.

More information about deploying web applications to Render is available [here](https://render.com/docs/deploy-node-express-app).

## Credits and Acknowledgements

- **Original Project Inspiration:** This project was built upon the foundation of the Beach Resort React project featured on [freeCodeCamp](https://www.freecodecamp.org/) (created by John Smilga / Coding Addict).
- **Architecture & Technical Extensions:** While inspired by the original frontend design, this application was substantially extended into a full-stack system featuring:
  - Custom RESTful API services built with Node.js and Express.
  - Relational database schema design and cloud integration using PostgreSQL (Aiven).
  - Dynamic media processing pipelines using Multer middleware and Cloudinary storage.
  - Integration and unit testing suite implemented with Jasmine and Supertest.
  - End-to-end room inventory management (Create, Read, Update, Delete) integrated directly into the React user interface.