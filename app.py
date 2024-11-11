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
        'noplaylist': True,
        'prefer_free_formats': True, 
        'postprocessors': [{
            'key': 'FFmpegVideoConvertor',
            'preferedformat': 'mp4', 
        }],
    }

    try:
      
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            file_path = ydl.prepare_filename(info)

            return jsonify({'filePath': file_path})

    except Exception as e:
        print(f'Error: {e}')
        return jsonify({"error": str(e)}), 500


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



@app.route('/thumbnail',methods=['POST'])

def get_thumbnail():

    data = request.json

    url = data.get('url')

    if not url:

        return jsonify({"error":"URL is required"}),400
    
    try:

        with yt_dlp.YoutubeDL() as ydl:

            info =ydl.extract_info(url,download=False)

            thumbnail_url = info.get('thumbnail')

            if not thumbnail_url:

                return jsonify({"error":"Thumbnail not found"}),404
            
            return jsonify({"thumbnail":thumbnail_url})

    except Exception as e:

        print(f'Error: {e}')

        return jsonify({"error":str(e)}),500


if __name__ == '__main__':
    if not os.path.exists(DOWNLOAD_FOLDER):
        os.makedirs(DOWNLOAD_FOLDER)
    app.run(port=5000, debug=True)
