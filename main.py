from PIL import Image

green_1 = '155,233,168'
green_2 = '64,196,99'
green_3 = '48,161,78'
green_4 = '33,110,57'

set1 = set()

global image
global pixels


def is_contribution_pixel(r, g, b):
    if r > 200 and g > 200 and b > 200:
        set1.add(str(r) + ',' + str(g) + ',' + str(b))
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


def find_margin_left(start_y):
    global pixels
    global image

    left = 0
    width, height = image.size

    for x in range(width):
        r, g, b = pixels[x, start_y]  # 获取RGB值
        if r == 255 and g == 255 and b == 255:
            left += 1
        else:
            break

    return left


def count_contribution_days(image_path):
    global image
    global pixels
    # 加载图像
    image = Image.open(image_path)

    # 确保图像是RGB模式，如果是RGBA模式转为RGB
    if image.mode == 'RGBA':
        image = image.convert('RGB')

    pixels = image.load()
    width, height = image.size

    grid_size, gap_width = find_grid_size_and_gap((width // 53) * 3 // 2)
    margin_top = find_margin_top((width // 53) * 3 // 2)
    margin_left = find_margin_left((height // 7) * 3 // 2)

    print(grid_size, gap_width, margin_top, margin_left)

    # 遍历网格
    contribution_days = 0
    for week in range(53):
        for day in range(7):
            # 计算每个网格的中心点
            x = margin_left + (week * grid_size) + (week * gap_width) + (grid_size // 2)
            y = margin_top + (day * grid_size) + (day * gap_width) + (grid_size // 2)
            print(x, y, week, day)
            r, g, b = pixels[x, y]  # 获取RGB值
            # print(str(r) + ',' + str(g) + ',' + str(b), week, day)
            if is_contribution_pixel(r, g, b):
                contribution_days += 1

    return contribution_days


# 测试
image_path = "./contributions.png"
days = count_contribution_days(image_path)
print(f"总共有 {days} 天有贡献", set1)
