# GitHub Repository Search App

This project is a web application that allows users to search for GitHub repositories using the GitHub REST API. The application displays search results in a sortable and paginated table. By selecting a row in the table, users can view detailed information about the chosen repository.

## Features

- **Search**: Users can search for repositories by entering a query.
- **Table View**: The search results are displayed in a table with the following columns:
  - Repository Name
  - Language
  - Forks Count
  - Stars Count
  - Last Updated Date
- **Details View**: Clicking on a table row displays the details of the selected repository, including:
  - Repository Name
  - Description
  - License Information
- **Sorting**: Users can sort the table by the number of stars, forks count, or last updated date in both ascending and descending order.
- **Pagination**: The table supports pagination to navigate through search results.

## Technologies Used

- **React**: UI development.
- **TypeScript**: Type-safe JavaScript.
- **Redux Toolkit**: State management and API data fetching.
- **MUI (Material-UI)**: UI component library.
- **Sass**: For styling with CSS Modules.

## Getting Started

### Prerequisites

- Node.js and pnpm installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LiRiK000/Invitation_Solutions
   cd Invitation_Solutions
   ```
2. **Install dependencies**:

```
  pnpm install
```

3.  **Run the application**:

```
  pnpm dev
```

4.  **Open the application**:

_Open http://localhost:5173 view it in the browser._

**API Integration**:

_The application uses the GitHub REST API to fetch repository data based on the user's search query. The API calls are managed through Redux Toolkit's createAsyncThunk to handle loading states and data fetching._

**Feel free to fork and contribute to this project. Any feedback is welcome!**
