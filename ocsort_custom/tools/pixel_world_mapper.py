import cv2
import numpy as np

points_2d_list = np.array([
    (610, 74),  # 입구
    (314, 167),  # 벽 1
    (240, 192),  # 벽 2
    (156, 220),  # 벽 3
    (227, 281),  # 콘센트 1
    (429, 356),  # 콘센트 2
    (801, 195),  # 정수기
    (687, 174),  # 정수기 옆
    (663, 113)  # 잎구 앞
], dtype="double")


class Intrinsic:

    def __init__(self):
        self.__fx = 1039.432117
        self.__fy = 1039.432117
        self.__cx = 512.000000
        self.__cy = 384.000000
        self.__k1 = -0.578797
        self.__k2 = 0.438316
        self.__p1 = -0.010365
        self.__p2 = -0.002841

    def get_normalized_pixel_coordinate(self, x, y):
        u = (x - self.__cx) / self.__fx
        v = (y - self.__cy) / self.__fy
        return u, v

    def get_intrinsic_matrix(self):
        return np.array([[self.__fx, 0, self.__cx],
                         [0, self.__fy, self.__cy],
                         [0, 0, 1]])

    def get_distortion_coefs(self):
        return np.array([[self.__k1],
                         [self.__k2],
                         [self.__p1],
                         [self.__p2]])


class Extrinsic:

    def __init__(self, base_points_3d: np.array, base_points_2d: np.array, intrinsic_params: Intrinsic):
        self.__retval, self.__rvec, self.__tvec = cv2.solvePnP(base_points_3d,
                                                               base_points_2d,
                                                               intrinsic_params.get_intrinsic_matrix(),
                                                               intrinsic_params.get_distortion_coefs(),
                                                               rvec=None,
                                                               tvec=None,
                                                               useExtrinsicGuess=None,
                                                               flags=None)

        self.R = cv2.Rodrigues(self.__rvec)
        self.Rt = self.R[0].T
        self.t = self.__tvec
        print(self.t)


class PixelWorldCoordinateMapper:
    def __init__(self):
        self.__base_points_2d = np.array([
            (610, 74),  # 입구
            (314, 167),  # 벽 1
            (240, 192),  # 벽 2
            (156, 220),  # 벽 3
            (227, 281),  # 콘센트 1
            (429, 356),  # 콘센트 2
            (801, 195),  # 정수기
            (687, 174),  # 정수기 옆
            (663, 113)  # 잎구 앞
        ], dtype="double")
        self.__base_points_3d = np.array([
            (0.0, 0.0, 0.0),
            (5520.0, 0.0, 0.0),  # 벽 1
            (6480.0, 0.0, 0.0),  # 벽 2
            (7430.0, 0.0, 0.0),  # 벽 3
            (7885.0, 1805.0, 0.0),  # 콘센트 1
            (7885.0, 3805.0, 0.0),  # 콘센트 2
            (3935, 4435.0, 0.0),  # 정수기
            (3935.0, 3315.0, 0.0),  # 정수기 시작
            (1800.0, 1855.0, 0.0)  # 입구 앞
        ], dtype="double")
        self.__intrinsic = Intrinsic()
        self.__extrinsic = Extrinsic(self.__base_points_3d, self.__base_points_2d, self.__intrinsic)
        self.__base_world_coord_x = 0.0
        self.__base_world_coord_y = 0.0

    def set_base_world_coordinate(self):
        x = self.__base_points_2d[0][0]
        y = self.__base_points_2d[0][1]

        u, v = self.__intrinsic.get_normalized_pixel_coordinate(x, y)
        pc = np.array(([u], [v], [1.0]))
        pw = self.__extrinsic.Rt @ (pc - self.__extrinsic.t)
        # print("pw: ", pw)

        Cw = self.__extrinsic.Rt @ (-self.__extrinsic.t)
        # print("Cw: ", Cw)

        Cwz = Cw[2][0]  # Cw의 z
        # print("Cw z = ", Cwz)
        pwz = pw[2][0]  # pw의 z
        # print("pw z = ", pwz)
        k = Cwz / (Cwz - pwz)
        # print("k = ", k)

        P = Cw + k * (pw - Cw)
        self.__base_world_coord_x = P[0][0]
        self.__base_world_coord_y = P[1][0]

    def pixel_to_world(self, x, y):
        u, v = self.__intrinsic.get_normalized_pixel_coordinate(x, y)
        pc = np.array([[u], [v], [1.0]])
        pw = self.__extrinsic.Rt @ (pc - self.__extrinsic.t)
        # print("pw: ", pw)

        Cw = self.__extrinsic.Rt @ (-self.__extrinsic.t)
        # print("Cw: ", Cw)

        Cwz = Cw[2][0]  # Cw의 z
        # print("Cw z = ", Cwz)
        pwz = pw[2][0]  # pw의 z
        # print("pw z = ", pwz)
        k = Cwz / (Cwz - pwz)
        # print("k = ", k)

        P = Cw + k * (pw - Cw)
        # Pwz = Cwz + k * (pwz - Cwz) = 0
        #

        wx = P[0][0] - self.__base_world_coord_x
        wy = P[1][0] - self.__base_world_coord_y

        return wx, wy
