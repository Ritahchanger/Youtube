# YouTube Downloader

This project is a **YouTube Downloader** application built using **Flask** for the backend and **React Vite** with **Tailwind CSS** for the frontend. The goal of this project is to provide a safe, efficient way for users to download YouTube videos without intrusive ads that are often encountered on other downloaders.

## Features

- **Download Videos**: Download videos from YouTube in various resolutions (e.g., 1080p, 720p).
- **User-friendly Interface**: Built with React Vite and styled using Tailwind CSS for a clean and responsive UI.
- **Flask Backend**: The backend handles the video processing and downloading requests.
- **Fast and Reliable**: Avoids unwanted ads and provides a straightforward download process.
- 
## Project Structure

The project is divided into the following main parts:

### Frontend (`client/`)
- **React**: The client-side of the app is built using React for dynamic interaction.
- **Tailwind CSS**: A utility-first CSS framework for responsive design.

### Backend (`backend/app.py`)
- **Flask**: Flask is used to handle HTTP requests from the frontend and manage video downloads.

### Python Environment (`env`)
- The Python environment contains dependencies for the Flask application, such as `Flask`, `yt-dlp`, and others.

## Installation

### Prerequisites

- Python 3.6+
- Node.js 14+
- npm (Node Package Manager)

## Step 1: Clone the repository

```bash
git clone https://github.com/Ritahchanger/Youtube.git
cd Youtube/youtube_downloader
```

## Step 2: Set up the backend

```bash
python -m venv env
```

### Step 1: Activate the virtual environment

On windows
```bash
.\env\Scripts\activate
```
On Linux/macOs
```bash
source env/bin/activate
```

### Step 2: Install the required python packages

```bash
pip install -r requirements.txt
```


### Step 3: Run the flask server
```bash
python app.py or flask run
```
## Step 3: Set up the Frontend

```bash
cd client

npm install

npm run dev
```

