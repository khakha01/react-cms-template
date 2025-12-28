export type UserMock = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export const usersMock: UserMock[] = [
  { id: 1, name: "Nguyễn Văn A", email: "admin@gmail.com", password: "123456" },
  { id: 2, name: "Trần Thị B", email: "user@gmail.com", password: "123456" },
  { id: 3, name: "Lê Văn C", email: "manager@gmail.com", password: "123456" },
  { id: 4, name: "Phạm Văn D", email: "pham.d@gmail.com", password: "123456" },
  {
    id: 5,
    name: "Hoàng Thị E",
    email: "hoang.e@gmail.com",
    password: "123456",
  },
  { id: 6, name: "Vũ Văn F", email: "vu.f@gmail.com", password: "123456" },
  { id: 7, name: "Đặng Thị G", email: "dang.g@gmail.com", password: "123456" },
  { id: 8, name: "Bùi Văn H", email: "bui.h@gmail.com", password: "123456" },
  { id: 9, name: "Đỗ Thị I", email: "do.i@gmail.com", password: "123456" },
  { id: 10, name: "Ngô Văn K", email: "ngo.k@gmail.com", password: "123456" },
  {
    id: 11,
    name: "Dương Thị L",
    email: "duong.l@gmail.com",
    password: "123456",
  },
  { id: 12, name: "Lý Văn M", email: "ly.m@gmail.com", password: "123456" },
  { id: 13, name: "Mai Thị N", email: "mai.n@gmail.com", password: "123456" },
  { id: 14, name: "Phan Văn O", email: "phan.o@gmail.com", password: "123456" },
  { id: 15, name: "Tạ Thị P", email: "ta.p@gmail.com", password: "123456" },
  { id: 16, name: "Hồ Văn Q", email: "ho.q@gmail.com", password: "123456" },
  { id: 17, name: "Châu Thị R", email: "chau.r@gmail.com", password: "123456" },
  {
    id: 18,
    name: "Quách Văn S",
    email: "quach.s@gmail.com",
    password: "123456",
  },
  { id: 19, name: "Tăng Thị T", email: "tang.t@gmail.com", password: "123456" },
  { id: 20, name: "La Văn U", email: "la.u@gmail.com", password: "123456" },
  {
    id: 21,
    name: "Triệu Thị V",
    email: "trieu.v@gmail.com",
    password: "123456",
  },
  { id: 22, name: "Thái Văn X", email: "thai.x@gmail.com", password: "123456" },
];

/**
 * MOCK CREATE USER
 */

export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
};

export const createUser = async (payload: CreateUserPayload) => {
  console.log("MOCK CREATE USER:", payload);
  return new Promise<{ success: true; data: UserMock }>((resolve) => {
    setTimeout(() => {
      const newUser: UserMock = {
        id: Date.now(),
        name: payload.name,
        email: payload.email,
        password: payload.password,
      };

      usersMock.push(newUser);

      // resolve = hàm báo “Promise đã thành công”
      resolve({
        success: true,
        data: newUser,
      });
    }, 500);
  });
};


/**
 * MOCK DETAIL ID USER
 */
export const detailUser = async (id: number) => {
  return new Promise<UserMock>((resolve, reject) => {
    setTimeout(() => {
      const user = usersMock.find((u) => u.id === id);
      if (!user) {
        reject(new Error("User not found"));
        return;
      }
      resolve(user);
    }, 300);
  });
};


/**
 * MOCK UPDATE USER
 */
export type UpdateUserPayload = {
  id: number;
  name?: string;
  email?: string;
  password?: string;
};

export const updateUser = async (payload: UpdateUserPayload) => {
  console.log("MOCK UPDATE USER:", payload);

  return new Promise<{ success: true; data: UserMock }>((resolve, reject) => {
    setTimeout(() => {
      const userIndex = usersMock.findIndex(
        (user) => user.id === payload.id
      );

      // Không tìm thấy user
      if (userIndex === -1) {
        reject(new Error("User not found"));
        return;
      }

      const currentUser = usersMock[userIndex];

      const updatedUser: UserMock = {
        ...currentUser,
        ...payload, // ghi đè field được update
      };

      usersMock[userIndex] = updatedUser;

      resolve({
        success: true,
        data: updatedUser,
      });
    }, 500);
  });
};
