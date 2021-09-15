import random
import math
import json


def main():
    data = []
    duratoin = 0
    random_rad = random.random() * 2 * math.pi

    # メートル単位のベクトル
    lat = 139.771914
    log = 35.633593
    base_vector2_m = [0, 0]
    elevation = 0

    base_elevation_v = 0.4

    for i in range(1000):

        data.append([
            lat,
            log,
            elevation,
            duratoin
        ])

        random_rad += random.random() * 2 - 1
        correction_of_elevation = math.sqrt(
            elevation / 10) if elevation < 10 else 1
        r = correction_of_elevation * (random.random() + 1)
        delta_vector2_m = [
            r * math.cos(random_rad),
            r * math.sin(random_rad)
        ]
        base_vector2_m = [
            base_vector2_m[0] * 0.5 + delta_vector2_m[0],
            base_vector2_m[1] * 0.5 + delta_vector2_m[1],
        ]
        # 緯度38度の1m：0.0000090138度(経度)
        lat += base_vector2_m[0] * 0.0000090138
        # 緯度38度の1m：0.0000109544度(緯度)
        log += base_vector2_m[1] * 0.0000109544

        base_elevation_v += random.random() * 0.11 - 0.05 - (i / 10000)
        elevation += base_elevation_v
        if elevation < 0:
            break

        duration_delta = random.randint(800, 1200)
        duratoin += duration_delta

    with open(f'.\src\data\dummy.json', 'w', encoding='utf-8') as f:
        f.write(json.dumps(data, indent=4))


if __name__ == "__main__":
    main()
