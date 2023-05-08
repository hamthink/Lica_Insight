import cv2
import numpy as np

img = cv2.imread("terrace.jpg")
size = img.shape

# 2차원 영상좌표
points_2D = np.array([
    (624, 152),  # 입구
    (344, 220),  # 벽 1
    (261, 238),  # 벽 2
    (719, 211),
    (236, 332),  # 콘센트 1
    (737, 278),  # 정수기 옆
    (442, 437),  # 콘센트 2
    (855, 316),  # 정수기
], dtype="double")

# 3차원 좌표
points_3D = np.array([
    (0.0, 0.0, 0.0),
    (6689.0, 0.0, 0.0),  # 벽 1
    (6784.0, 0.0, 0.0),  # 벽 2
    (1800.0, 1935.0, 0.0),
    (5770.0, 1800.0, 0.0),  # 콘센트 1
    (3935.0, 3320.0, 0.0),  # 정수기 옆
    (5770.0, 3800.0, 0.0),  # 콘센트 2
    (3935.0, 4360.0, 0.0)  # 정수기
], dtype="double")

fx = 1039.432117
fy = 1039.432117
cx = 512.000000
cy = 384.000000
k1 = -0.578797
k2 = 0.438316
p1 = -0.010365
p2 = -0.002841

# camera 내부 파라미터
cameraMatrix = np.array([[fx, 0, cx], [0, fy, cy], [0, 0, 1]])

# 카메라 왜곡
dist_coeffs = np.array([[k1], [k2], [p1], [p2]]);

# solvePnp 함수적용
retval, rvec, tvec = cv2.solvePnP(points_3D, points_2D, cameraMatrix, dist_coeffs, rvec=None, tvec=None,
                                  useExtrinsicGuess=None, flags=None)

R = cv2.Rodrigues(rvec)

print("R: ", R[0])
print("tvec: ", tvec)

Rt = R[0].T  # transposed rotation matrix 3x3
print("Rt: ", Rt)

t = tvec  # translation 3x1 matrix
print("t: ", t)


def get_normalized_pixel_coordinates(x, y):
    global fx, fy, cx, cy
    u = (x - cx) / fx
    v = (y - cy) / fy
    return u, v

coordinates = []

for points2d in points_2D:

    print(f"x: {points2d[0]}, y: {points2d[1]}")

    u, v = get_normalized_pixel_coordinates(points2d[0], points2d[1])  # 월드 좌표상 (0,0,0)에 해당하는 pixel 좌표
    pc = np.array([[u], [v], [1.0]])  # 픽셀 (624, 152)에 해당하는 카메라 정규 좌표계 (u, v, 1)^t 3x1 matrix
    #print("pc: ", pc)

    pw = Rt @ (pc - t)
    #print("pw: ", pw)

    Cw = Rt @ (-t)
    #print("Cw: ", Cw)

    # P = Cw + k(pw - Cw)
    # Cwz + k(pwz - Cwz) = -1000
    # k = Cwz / (Cwz - pwz)

    Cwz = Cw[2][0]  # Cw의 z
    #print("Cw z = ", Cwz)
    pwz = pw[2][0]  # pw의 z
    #print("pw z = ", pwz)
    k = Cwz / (Cwz - pwz)
    #print("k = ", k)

    P = Cw + k * (pw - Cw) # 상수배
    print(P)
    coordinates.append((P[0][0], P[1][0]))
    print('\n')

import matplotlib.pyplot as plt

# 2차원 좌표를 담고 있는 리스트 예시


# x, y 좌표 분리
x_coords = [coord[0] for coord in coordinates]
y_coords = [coord[1] for coord in coordinates]

# 그래프 그리기
plt.scatter(x_coords, y_coords)  # 점으로 표시
plt.plot(x_coords, y_coords)  # 선으로 연결하려면 이 줄을 추가

# 축 레이블 추가 (옵션)
plt.xlabel('X-axis')
plt.ylabel('Y-axis')

# 그래프 타이틀 추가 (옵션)
plt.title('2D Coordinates Graph')

# 그래프 표시
plt.show()
