# 🎵 Spotify Backend

A RESTful backend API for a Spotify-style music streaming application built with **Node.js, Express.js, MongoDB, and Mongoose**.

The project provides user authentication, artist authorization, music uploads, album creation, and cloud-based media storage using ImageKit.

---

## 🚀 Features

- 🔐 User registration and login
- 🔑 JWT-based authentication
- 🍪 Cookie-based authentication
- 🔒 Password hashing using bcrypt
- 👤 Role-based authorization for users and artists
- 🎵 Upload and manage music
- 🖼️ Upload music thumbnails
- ☁️ Cloud media storage using ImageKit
- 💿 Create albums with selected music
- 🗄️ MongoDB database with Mongoose
- 🔗 Relationships between users, music, and albums
- 📦 RESTful API architecture
- 🛡️ Protected artist routes

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security

- JSON Web Token (JWT)
- bcryptjs
- HTTP Cookies

### File Upload & Storage

- Multer
- ImageKit

### Development

- Nodemon
- dotenv

---

## 📁 Project Structure

```text
SPOTIFY-PROJECT/
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
└── .gitignore
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/SMOON123-AI/Spotify-Backend.git
```

Example:

```bash
git clone https://github.com/your-username/spotify-project.git
```

### 2. Navigate to the Backend directory

```bash
cd spotify-project/Backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create the `.env` file

Create a `.env` file inside the `Backend` directory.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### 5. Start the server

For development:

```bash
npm run dev
```

Or:

```bash
node server.js
```

---

## 🔐 Environment Variables

The application requires the following environment variables:

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key used for media uploads |

> **Important:** Never commit your `.env` file to GitHub.

---

## 🔑 Authentication

The application uses **JWT-based authentication**.

### Registration Flow

```text
Client
   ↓
Register
   ↓
Password hashed using bcrypt
   ↓
User stored in MongoDB
   ↓
JWT generated
   ↓
JWT stored in cookie
```

Passwords are hashed before being stored in the database.

### Login Flow

```text
Client
   ↓
Login
   ↓
Find user
   ↓
Compare password using bcrypt
   ↓
Generate JWT
   ↓
Store JWT in cookie
```

Protected routes verify the JWT before allowing access.

---

## 👤 User Roles

The application supports two roles:

- `user`
- `artist`

Artists have additional permissions such as:

- Upload music
- Create albums
- Manage their uploaded music

Protected routes verify both authentication and authorization.

---

## 🎵 Music Management

Artists can upload music along with a thumbnail.

The application uses:

- **Multer** for handling file uploads
- **ImageKit** for cloud storage
- **MongoDB** for storing music information

### Upload Flow

```text
Artist
   ↓
JWT Authentication
   ↓
Artist Authorization
   ↓
Multer
   ↓
ImageKit
   ↓
MongoDB
```

The music file and thumbnail are uploaded to ImageKit, while their URLs and metadata are stored in MongoDB.

---

## 💿 Album Management

Artists can create albums by selecting specific music from their uploaded songs.

### Example Request

```json
{
  "title": "My First Album",
  "musics": [
    "MUSIC_ID_1",
    "MUSIC_ID_2",
    "MUSIC_ID_3"
  ]
}
```

Before creating the album, the backend verifies that:

- The music IDs exist.
- The music belongs to the authenticated artist.
- At least one music is provided.
- Duplicate music IDs are removed.

This prevents an artist from adding another artist's music to their album.

### Album Creation Flow

```text
Artist
   ↓
Send album title + music IDs
   ↓
Validate request
   ↓
Remove duplicate music IDs
   ↓
Check music exists
   ↓
Check music belongs to artist
   ↓
Create album
```

---

## 🗄️ Database Models

The project uses **MongoDB with Mongoose**.

### User Model

Stores:

- Username
- Email
- Password
- Role

Possible roles:

- `user`
- `artist`

### Music Model

Stores information related to:

- Music title
- Music URL
- Thumbnail
- Artist
- Music metadata

Each music document is associated with an artist using a MongoDB `ObjectId` reference.

### Album Model

Stores:

- Album title
- Artist
- Music references

Albums contain references to music documents using Mongoose `ObjectId`.

---

## 🔗 Database Relationships

The project uses Mongoose references to connect documents.

```text
User
 │
 │ artist
 ↓
Music
 │
 │ referenced by
 ↓
Album
```

An artist can have multiple music documents.

An album can contain multiple music documents.

---

## 🛡️ Security

The project implements several security practices:

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Role-based authorization
- Cookie-based authentication
- Environment variables for sensitive credentials
- Artist ownership verification
- Music ownership validation before album creation
- Duplicate music ID handling during album creation

Sensitive credentials such as:

```text
.env
MONGO_URI
JWT_SECRET
IMAGEKIT_PRIVATE_KEY
```

are not included in the repository.

---

## 📦 Dependencies

Main dependencies include:

- Express
- Mongoose
- JSON Web Token
- bcryptjs
- Multer
- ImageKit
- dotenv
- cookie-parser

Development dependency:

- Nodemon

Install all dependencies with:

```bash
npm install
```

---

## 🧪 Development

Make sure you have the following installed:

- Node.js
- npm
- MongoDB
- ImageKit account

Then run:

```bash
cd Backend
npm install
```

Create your `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Start the development server:

```bash
npm run dev
```

---

## 🚫 Files Not Committed to GitHub

The following should never be committed:

```text
.env
node_modules/
```

The root `.gitignore` contains:

```gitignore
node_modules/
.env
```

---

## 🔮 Future Improvements

Possible future improvements include:

- Music streaming
- Playlists
- Like/favorite functionality
- Music search
- Artist profiles
- Listening history
- Recently played music
- Follow artists
- Request validation
- Centralized error handling
- Automated testing
- Swagger API documentation
- Backend deployment
- Frontend integration

---

## 🎯 Project Goals

This project was built to practice and demonstrate backend development concepts including:

- REST API development
- Authentication
- Authorization
- MongoDB database design
- Mongoose relationships
- File uploads
- Cloud storage
- Middleware
- MVC-style architecture
- API security
- Backend project structuring

---
