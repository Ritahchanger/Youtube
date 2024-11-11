from flask import Flask, request, jsonify
import yt_dlp
import os

app = Flask(__name__)


DOWNLOAD_FOLDER = os.path.expanduser("~/Desktop/PythonPlayground/downloads")



@app.route('/', methods=['GET'])

def test_server():
    
    return jsonify({'success': True, 'status': 200, 'message': 'The server was successfully connected'})




@app.route('/download', methods=['POST'])
def download_video():

    data = request.json
    url = data.get('url')
    resolution = data.get('resolution')

    if not url:

        return jsonify({"error": "URL is required"}), 400
   
    ydl_opts = {
        'format': f'bestvideo[height<={resolution}]+bestaudio/best' if resolution else 'bestvideo+bestaudio/best',
        'outtmpl': os.path.join(DOWNLOAD_FOLDER, '%(title)s.%(ext)s'),
        'noplaylist': True
    }

    try:


        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)  
            file_path = ydl.prepare_filename(info)

            return jsonify({'filePath': file_path})
        


    except Exception as e:
        print(f'Error: {e}')
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    if not os.path.exists(DOWNLOAD_FOLDER):
        os.makedirs(DOWNLOAD_FOLDER)
    app.run(port=5000, debug=True)
