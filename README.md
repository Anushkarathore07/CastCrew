# Movie Database App

## 🚀 Project Overview
This is a **React-based Movie Database App** that fetches movie details and cast/crew information from the **TMDB API**. Users can:
- View a list of movies with sorting and filtering options.
- Click on a movie to see detailed information.
- View cast and crew details in a structured format.

## 📌 Features
- **Movie Listing Page**: Displays all movies with sorting by rating and release year.
- **Filtering by Genre**: Users can filter movies based on genres.
- **Movie Details Page**: Displays movie plot, director, and cast/crew list.
- **Cast & Crew Page**: Shows actors and crew members in a clean three-column layout.
- **Navigation**: Home icon for easy navigation back to the home page.
- **Responsive Design**: Built using Material UI for a modern and mobile-friendly UI.

## 🛠️ Tech Stack
- **Frontend**: React, React Router, Material UI
- **State Management**: Context API
- **API**: The Movie Database (TMDB) API
- **Deployment**: (To be updated)

## 📂 Folder Structure
```
📦 movie-database-app
├── 📂 src
│   ├── 📂 components
│   │   ├── MovieList.js
│   │   ├── MovieDetails.js
│   │   ├── CastCrew.js
│   ├── 📂 context
│   │   ├── MovieContext.js
│   ├── 📂 pages
│   │   ├── Home.js
│   │   ├── MovieDetails.js
│   │   ├── CastCrew.js
│   ├── App.js
│   ├── index.js
├── 📜 README.md
```

## 🏗️ Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/movie-database-app.git
   cd movie-database-app
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up TMDB API Key**
   - Create a `.env` file in the root directory.
   - Add your TMDB API key:
     ```env
     REACT_APP_TMDB_API_KEY=your_api_key_here
     ```
4. **Start the development server**
   ```sh
   npm start
   ```

## 📸 Screenshots / GIFs
(Include images showcasing the application here)

## 📌 Commit Guidelines
- Use meaningful commit messages.
- Example:
  - `feat: add movie details page`
  - `fix: correct genre filter issue`
  - `style: improve cast and crew layout`

## 🚀 Deployment
(TBD: Add deployment link once hosted)

---

### 🔗 Contact
For any issues or contributions, feel free to open a pull request or contact me at [your email].

