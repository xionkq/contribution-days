from PIL import Image

green_1 = '155,233,168'
green_2 = '64,196,99'
green_3 = '48,161,78'
green_4 = '33,110,57'

set1 = set()


def is_contribution_pixel(r, g, b):
    if r > 200 and g > 200 and b > 200:
        set1.add(str(r) + ',' + str(g) + ',' + str(b))
    # 检测非灰色白色像素
    return not(r > 200 and g > 200 and b > 200)


def count_contribution_days(image_path):
    # 加载图像
    image = Image.open(image_path)

    # 确保图像是RGB模式，如果是RGBA模式转为RGB
    if image.mode == 'RGBA':
        image = image.convert('RGB')

    pixels = image.load()
    width, height = image.size

    # 网格大小计算（假设标准53x7网格）
    grid_width = width // 53
    grid_height = height // 7

    # 遍历网格
    contribution_days = 0
    for week in range(53):
        for day in range(7):
            # 计算每个网格的中心点
            x = week * grid_width + grid_width // 2
            y = day * grid_height + grid_height // 2
            r, g, b = pixels[x, y]  # 获取RGB值
            print(str(r) + ',' + str(g) + ',' + str(b), week, day)
            if is_contribution_pixel(r, g, b):
                contribution_days += 1

    return contribution_days


# 测试
image_path = "./contributions.png"
days = count_contribution_days(image_path)
print(f"总共有 {days} 天有贡献", set1)
