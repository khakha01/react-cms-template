export type UserMock = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
};

const now = new Date().toISOString();
export const usersMock: UserMock[] = [
  { id: 1, name: "Nguyễn Văn A", email: "admin@gmail.com", password: "123456", created_at: now, updated_at: now },
  { id: 2, name: "Trần Thị B", email: "user@gmail.com", password: "123456", created_at: now, updated_at: now },
  { id: 3, name: "Lê Văn C", email: "manager@gmail.com", password: "123456", created_at: now, updated_at: now },
  { id: 4, name: "Phạm Văn D", email: "pham.d@gmail.com", password: "123456", created_at: now, updated_at: now },

  { id: 6, name: "Vũ Văn F", email: "vu.f@gmail.com", password: "123456", created_at: now, updated_at: now },
  { id: 7, name: "Đặng Thị G", email: "dang.g@gmail.com", password: "123456", created_at: now, updated_at: now },
  { id: 8, name: "Bùi Văn H", email: "bui.h@gmail.com", password: "123456", created_at: now, updated_at: now },
  { id: 9, name: "Đỗ Thị I", email: "do.i@gmail.com", password: "123456", created_at: now, updated_at: now },
  { id: 10, name: "Ngô Văn K", email: "ngo.k@gmail.com", password: "123456", created_at: now, updated_at: now },

  { id: 12, name: "Lý Văn M", email: "ly.m@gmail.com", password: "123456", created_at: now, updated_at: now },
  { id: 13, name: "Mai Thị N", email: "mai.n@gmail.com", password: "123456", created_at: now, updated_at: now },
  { id: 14, name: "Phan Văn O", email: "phan.o@gmail.com", password: "123456", created_at: now, updated_at: now },
  { id: 15, name: "Tạ Thị P", email: "ta.p@gmail.com", password: "123456", created_at: now, updated_at: now },
  { id: 16, name: "Hồ Văn Q", email: "ho.q@gmail.com", password: "123456", created_at: now, updated_at: now },
  { id: 17, name: "Châu Thị R", email: "chau.r@gmail.com", password: "123456", created_at: now, updated_at: now },
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
  //console.log("MOCK CREATE USER:", payload);
  return new Promise<{ success: true; data: UserMock }>((resolve) => {
    setTimeout(() => {
      const newUser: UserMock = {
        id: Date.now(),
        name: payload.name,
        email: payload.email,
        password: payload.password,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
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
  //console.log("MOCK UPDATE USER:", payload);

  return new Promise<{ success: true; data: UserMock }>((resolve, reject) => {
    setTimeout(() => {
      const userIndex = usersMock.findIndex((user) => user.id === payload.id);

      // Không tìm thấy user
      if (userIndex === -1) {
        reject(new Error("User not found"));
        return;
      }

      const currentUser = usersMock[userIndex];

      const updatedUser: UserMock = {
        ...currentUser,
        ...payload, 
        updated_at: new Date().toISOString(),
      };

      usersMock[userIndex] = updatedUser;

      resolve({
        success: true,
        data: updatedUser,
      });
    }, 500);
  });
};

/**
 * MOCK DELETE USER
 */

export type DeleteUserPayload = {
  id: number;
};

export const deleteUser = async (payload: DeleteUserPayload) => {
  return new Promise<{ success: true; message: string }>((resolve, reject) => {
    setTimeout(() => {
      const userIndex = usersMock.findIndex((user) => user.id === payload.id);

      // Không tìm thấy user
      if (userIndex === -1) {
        reject(new Error("User not found"));
        return;
      }

      // xóa user
      usersMock.splice(userIndex, 1);

      resolve({
        success: true,
        message: "User deleted successfully",
      });
    }, 3000);
  });
};
