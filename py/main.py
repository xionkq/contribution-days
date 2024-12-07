from PIL import Image
from flask import Flask, request, jsonify
from io import BytesIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许所有来源的跨域请求

global image
global pixels


def is_contribution_pixel(r, g, b):
    # 检测非灰色白色像素
    return not (r > 200 and g > 200 and b > 200)


def is_white(r, g, b):
    return r == 255 and g == 255 and b == 255


def find_grid_size_and_gap(start_x):
    global pixels
    global image

    size = 0
    gap = 0
    width, height = image.size

    for y in range(height):
        r, g, b = pixels[start_x, y]  # 获取RGB值
        if is_white(r, g, b) and size == 0 and gap == 0:
            continue
        elif is_white(r, g, b) and not (size == 0):
            gap += 1
        elif gap == 0:
            size += 1
        else:
            break

    return size, gap


def find_margin_top(start_x):
    global pixels
    global image

    top = 0
    width, height = image.size

    for y in range(height):
        r, g, b = pixels[start_x, y]  # 获取RGB值
        if r == 255 and g == 255 and b == 255:
            top += 1
        else:
            break

    return top


def count_contribution_days(image_file):
    global image
    global pixels
    # 加载图像
    image = Image.open(image_file)

    # 确保图像是RGB模式，如果是RGBA模式转为RGB
    if image.mode == 'RGBA':
        image = image.convert('RGB')

    pixels = image.load()
    width, height = image.size

    grid_size, gap_width = find_grid_size_and_gap((width // 53) * 3 // 2)
    margin_top = find_margin_top((width // 53) * 3 // 2)

    is_grid = 0

    # 遍历网格
    contribution_days = 0
    for day in range(7):
        for week in range(width):
            y = margin_top + (day * grid_size) + (day * gap_width) + (grid_size // 2)
            r, g, b = pixels[week, y]  # 获取RGB值
            if is_white(r, g, b):
                is_grid = 0
                continue
            elif is_grid == 0:
                is_grid = 1
                r, g, b = pixels[week + (grid_size // 2), y]
                if is_contribution_pixel(r, g, b):
                    contribution_days += 1
    return contribution_days


@app.route('/api/upload', methods=['POST'])
def upload():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        days = count_contribution_days(file.stream)
        return jsonify({"message": "File received successfully", "days": days, "code": 200})
    except Exception:
        return jsonify({"message": "File parsing failure", "days": "parsing failure", "code": 500})


if __name__ == '__main__':
    import os

    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
