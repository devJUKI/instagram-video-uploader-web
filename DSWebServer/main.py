from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from instagram_uploader import InstagramUploader
from tiktok_watermark_remover import TikTokWatermarkRemover

app = Flask(__name__)
CORS(app)

instagram_account_id = 'XXXXXXX'
caption = "XXXXXXX"
share_to_feed = "true"
thumb_offset = 0


@app.route('/get-tiktok-without-watermark')
def get_tiktok_without_watermark():
    tiktok_url = request.args.get('tiktok_url')

    if tiktok_url is None:
        return jsonify({'message:': 'Provide TikTok URL'})

    tiktok_watermark_remover = TikTokWatermarkRemover()
    video_url = tiktok_watermark_remover.get_video_url(tiktok_url)

    return jsonify({'message': video_url})


@app.route('/upload-tiktok', methods=['GET'])
def upload_tiktok():
    tiktok_url_no_watermark = request.args.get('tiktok_url')
    facebook_access_token = request.args.get('access_token')

    if tiktok_url_no_watermark == None or facebook_access_token == None:
        return jsonify({'message': 'Not all parameters provided.'})

    ig_uploader = InstagramUploader(
        instagram_account_id, facebook_access_token)
    ig_uploader.upload_reel(caption, share_to_feed,
                            thumb_offset, tiktok_url_no_watermark)

    return jsonify({'message': 'success'})


if __name__ == '__main__':
    app.run(debug=True, port=8000)
