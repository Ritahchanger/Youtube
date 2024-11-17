from flask import Flask, request, jsonify
import yt_dlp
import os

from flask_cors import CORS



import platform;


app = Flask(__name__)


CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})



def get_download_folder():

    if os.name == "nt":

        return os.path.join(os.getenv("USERPROFILE"), "Downloads")
    elif platform.system() == "Darwin":

        return os.path.expanduser("~/Downloads")
    else:
        return os.path.expanduser("~/Downloads")


# DOWNLOAD_FOLDER = os.path.expanduser("~/Downloads")

DOWNLOAD_FOLDER = get_download_folder()

app.config["DOWNLOAD_FOLDER"] = DOWNLOAD_FOLDER


@app.route("/", methods=["GET"])
def test_server():

    return jsonify(
        {
            "success": True,
            "status": 200,
            "message": "The server was successfully connected",
        }
    )


@app.route("/download", methods=["POST"])
def download_video():
    data = request.json
    url = data.get("url")
    resolution = data.get("resolution")
    format_option = data.get("format")  # New field to specify 'video' or 'audio'

    if not url:
        return jsonify({"error": "URL is required"}), 400

    # Validate format_option, default to 'video' if not provided
    if format_option not in ["video", "audio"]:
        return (
            jsonify({"error": "Invalid format option. Choose 'video' or 'audio'."}),
            400,
        )

    # Set up the options for yt-dlp
    if format_option == "audio":
        ydl_opts = {
            "format": "bestaudio/best",  # Choose best audio format
            "outtmpl": os.path.join(DOWNLOAD_FOLDER, "%(title)s.%(ext)s"),
            "noplaylist": True,
            "prefer_free_formats": True,
            "postprocessors": [
                {
                    "key": "FFmpegAudio",
                    "preferredcodec": "mp3",  # Convert to mp3 format
                    "preferredquality": "192",  # Optional: Set audio quality (192 kbps)
                }
            ],
        }
    else:  # Default to video
        ydl_opts = {
            "format": (
                f"bestvideo[height<={resolution}]+bestaudio/best"
                if resolution
                else "bestvideo+bestaudio/best"
            ),
            "outtmpl": os.path.join(DOWNLOAD_FOLDER, "%(title)s.%(ext)s"),
            "noplaylist": True,
            "prefer_free_formats": True,
        }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Extract the video info and download it
            info = ydl.extract_info(url, download=True)
            file_path = ydl.prepare_filename(info)

            # If it's audio, convert the file to MP3 (optional)
            if format_option == "audio" and file_path.endswith(".webm"):
                # Convert WebM to MP3 using ffmpeg (or any other method you prefer)
                mp3_path = file_path.replace(".webm", ".mp3")
                os.system(f"ffmpeg -i {file_path} {mp3_path}")
                os.remove(file_path)  # Remove the original audio file
                file_path = mp3_path  # Update file path to MP3

            # Return the path to the downloaded file
            return jsonify({"filePath": file_path})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/thumbnail", methods=["POST"])
def get_thumbnail():

    data = request.json

    url = data.get("url")

    if not url:

        return jsonify({"error": "URL is required"}), 400

    try:

        with yt_dlp.YoutubeDL() as ydl:

            info = ydl.extract_info(url, download=False)

            thumbnail_url = info.get("thumbnail")

            if not thumbnail_url:

                return jsonify({"error": "Thumbnail not found"}), 404

            return jsonify({"thumbnail": thumbnail_url})

    except Exception as e:

        print(f"Error: {e}")

        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    if not os.path.exists(DOWNLOAD_FOLDER):
        os.makedirs(DOWNLOAD_FOLDER)
    app.run(port=5000, debug=True)
