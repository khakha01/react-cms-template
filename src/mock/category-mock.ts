import { v4 as uuidv4 } from "uuid";

export type CategoryMock = {
  id: string;       //uuid            
  parent_id: string | null; // uuid | null (category cha)
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

const now = new Date().toISOString();

// Tạo một số UUID cố định để dễ liên kết parent_id (bạn có thể để uuidv4() ngẫu nhiên cũng được)
const uuidSachVanHoc = uuidv4();
const uuidSachKinhTe = uuidv4();
const uuidSachThieuNhi = uuidv4();
const uuidSachTamLyKyNang = uuidv4();
const uuidSachGiaoKhoa = uuidv4();

export const categoriesList: CategoryMock[] = [
  // === Cấp 1: Các danh mục chính ===
  {
    id: uuidSachVanHoc,
    parent_id: null,
    name: "Văn học",
    slug: "van-hoc",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidSachKinhTe,
    parent_id: null,
    name: "Kinh tế - Quản trị",
    slug: "kinh-te-quan-tri",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidSachThieuNhi,
    parent_id: null,
    name: "Sách thiếu nhi",
    slug: "sach-thieu-nhi",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidSachTamLyKyNang,
    parent_id: null,
    name: "Tâm lý - Kỹ năng sống",
    slug: "tam-ly-ky-nang-song",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidSachGiaoKhoa,
    parent_id: null,
    name: "Sách giáo khoa - Tham khảo",
    slug: "sach-giao-khoa-tham-khao",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: null,
    name: "Truyện tranh - Manga - Comic",
    slug: "truyen-tranh-manga-comic",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: null,
    name: "Sách ngoại ngữ",
    slug: "sach-ngoai-ngu",
    created_at: now,
    updated_at: now,
  },

  // === Cấp 2: Con của Văn học ===
  {
    id: uuidv4(),
    parent_id: uuidSachVanHoc,
    name: "Tiểu thuyết",
    slug: "tieu-thuyet",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachVanHoc,
    name: "Truyện ngắn - Tản văn",
    slug: "truyen-ngan-tan-van",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachVanHoc,
    name: "Thơ ca",
    slug: "tho-ca",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachVanHoc,
    name: "Văn học Việt Nam",
    slug: "van-hoc-viet-nam",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachVanHoc,
    name: "Văn học nước ngoài",
    slug: "van-hoc-nuoc-ngoai",
    created_at: now,
    updated_at: now,
  },

  // === Cấp 2: Con của Kinh tế - Quản trị ===
  {
    id: uuidv4(),
    parent_id: uuidSachKinhTe,
    name: "Kinh doanh - Khởi nghiệp",
    slug: "kinh-doanh-khoi-nghiep",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachKinhTe,
    name: "Marketing - Bán hàng",
    slug: "marketing-ban-hang",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachKinhTe,
    name: "Quản trị - Lãnh đạo",
    slug: "quan-tri-lanh-dao",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachKinhTe,
    name: "Tài chính - Đầu tư",
    slug: "tai-chinh-dau-tu",
    created_at: now,
    updated_at: now,
  },

  // === Cấp 2: Con của Sách thiếu nhi ===
  {
    id: uuidv4(),
    parent_id: uuidSachThieuNhi,
    name: "Truyện tranh thiếu nhi",
    slug: "truyen-tranh-thieu-nhi",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachThieuNhi,
    name: "Sách thiếu nhi Việt Nam",
    slug: "sach-thieu-nhi-viet-nam",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachThieuNhi,
    name: "Sách thiếu nhi nước ngoài",
    slug: "sach-thieu-nhi-nuoc-ngoai",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachThieuNhi,
    name: "Sách kỹ năng cho trẻ",
    slug: "sach-ky-nang-cho-tre",
    created_at: now,
    updated_at: now,
  },

  // === Cấp 2: Con của Tâm lý - Kỹ năng sống ===
  {
    id: uuidv4(),
    parent_id: uuidSachTamLyKyNang,
    name: "Tâm lý học",
    slug: "tam-ly-hoc",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachTamLyKyNang,
    name: "Kỹ năng sống",
    slug: "ky-nang-song",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachTamLyKyNang,
    name: "Sách phát triển bản thân",
    slug: "phat-trien-ban-than",
    created_at: now,
    updated_at: now,
  },

  // === Cấp 2: Con của Sách giáo khoa ===
  {
    id: uuidv4(),
    parent_id: uuidSachGiaoKhoa,
    name: "Sách giáo khoa các cấp",
    slug: "sach-giao-khoa-cac-cap",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachGiaoKhoa,
    name: "Sách tham khảo",
    slug: "sach-tham-khao",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    parent_id: uuidSachGiaoKhoa,
    name: "Sách luyện thi",
    slug: "sach-luyen-thi",
    created_at: now,
    updated_at: now,
  },
];

/**
 * MOCK CREATE Category
 */
export type CreateCategoryPayload = {
  name: string;
  slug: string;
  parent_id?: string | null; // optional, null hoặc không gửi = category gốc
};

export const createCategory = async (payload: CreateCategoryPayload) => {
  return new Promise<{ success: true; data: CategoryMock }>((resolve) => {
    setTimeout(() => {
      const timestamp = new Date().toISOString();

      const newCategory: CategoryMock = {
        id: uuidv4(),
        parent_id: payload.parent_id ?? null,
        name: payload.name,
        slug: payload.slug,
        created_at: timestamp,
        updated_at: timestamp,
      };

      categoriesList.push(newCategory);

      resolve({
        success: true,
        data: newCategory,
      });
    }, 500);
  });
};

/**
 * MOCK DETAIL Category
 */
export const detailCategory = async (id: string) => {
  return new Promise<CategoryMock>((resolve, reject) => {
    setTimeout(() => {
      const category = categoriesList.find((c) => c.id === id);

      if (!category) {
        reject(new Error("Category not found"));
        return;
      }

      resolve(category);
    }, 300);
  });
};

/**
 * MOCK UPDATE Category
 */
export type UpdateCategoryPayload = {
  id: string;
  name?: string;
  slug?: string;
  parent_id?: string | null;
};

export const updateCategory = async (payload: UpdateCategoryPayload) => {
  return new Promise<{ success: true; data: CategoryMock }>((resolve, reject) => {
    setTimeout(() => {
      const categoryIndex = categoriesList.findIndex((category) => category.id === payload.id);

      if (categoryIndex === -1) {
        reject(new Error("Category not found"));
        return;
      }

      const updatedCategory: CategoryMock = {
        ...categoriesList[categoryIndex],
        ...payload,
        updated_at: new Date().toISOString(),
      };

      categoriesList[categoryIndex] = updatedCategory;

      resolve({
        success: true,
        data: updatedCategory,
      });
    }, 500);
  });
};

/**
 * MOCK DELETE Category
 */
export type DeleteCategoryPayload = {
  id: string;
};

export const deleteCategory = async (payload: DeleteCategoryPayload) => {
  return new Promise<{ success: true; message: string }>((resolve, reject) => {
    setTimeout(() => {
      const categoryIndex = categoriesList.findIndex((category) => category.id === payload.id);

      if (categoryIndex === -1) {
        reject(new Error("Category not found"));
        return;
      }

      // Optional: Kiểm tra có category con không trước khi xóa (nếu cần)
      const hasChildren = categoriesList.some((c) => c.parent_id === payload.id);
      if (hasChildren) {
        reject(new Error("Cannot delete category with sub-categories"));
        return;
      }

      categoriesList.splice(categoryIndex, 1);

      resolve({
        success: true,
        message: "Category deleted successfully",
      });
    }, 3000);
  });
};