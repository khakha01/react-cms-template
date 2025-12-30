import { v4 as uuidv4 } from "uuid";

export type MemberMock = {
  id: string;                    // UUID string
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
};

const now = new Date().toISOString();

export const membersMock: MemberMock[] = [
  {
    id: uuidv4(),
    name: "Nguyễn Văn An",
    email: "an.nguyen@gmail.com",
    phone: "0901234567",
    status: "active",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Trần Thị Bình",
    email: "binh.tran@gmail.com",
    phone: "0912345678",
    status: "inactive",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Lê Quốc Cường",
    email: "cuong.le@gmail.com",
    phone: "0923456789",
    status: "active",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Phạm Minh Đức",
    email: "duc.pham@gmail.com",
    phone: "0934567890",
    status: "active",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Hoàng Thị Em",
    email: "em.hoang@gmail.com",
    phone: "0945678901",
    status: "inactive",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Vũ Thanh Phong",
    email: "phong.vu@gmail.com",
    phone: "0956789012",
    status: "active",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Đặng Hải Yến",
    email: "yen.dang@gmail.com",
    phone: "0967890123",
    status: "active",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Bùi Văn Hòa",
    email: "hoa.bui@gmail.com",
    phone: "0978901234",
    status: "inactive",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Phan Thị Lan",
    email: "lan.phan@gmail.com",
    phone: "0989012345",
    status: "active",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Đỗ Quang Minh",
    email: "minh.do@gmail.com",
    phone: "0990123456",
    status: "inactive",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Nguyễn Thị Nga",
    email: "nga.nguyen@gmail.com",
    phone: "0902345678",
    status: "active",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Trịnh Văn Nam",
    email: "nam.trinh@gmail.com",
    phone: "0913456789",
    status: "inactive",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Lâm Hoài Phúc",
    email: "phuc.lam@gmail.com",
    phone: "0924567890",
    status: "active",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Phạm Thị Quỳnh",
    email: "quynh.pham@gmail.com",
    phone: "0935678901",
    status: "active",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuidv4(),
    name: "Ngô Văn Tài",
    email: "tai.ngo@gmail.com",
    phone: "0946789012",
    status: "inactive",
    created_at: now,
    updated_at: now,
  },
];

/**
 * MOCK CREATE Member
 */
export type CreateMemberPayload = {
  name: string;
  email: string;
  phone: string;
  status?: "active" | "inactive";
};

export const createMember = async (payload: CreateMemberPayload) => {
  return new Promise<{ success: true; data: MemberMock }>((resolve) => {
    setTimeout(() => {
      const timestamp = new Date().toISOString();

      const newMember: MemberMock = {
        id: uuidv4(),                    // UUID mới
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        status: payload.status ?? "active",
        created_at: timestamp,
        updated_at: timestamp,
      };

      membersMock.push(newMember);

      resolve({
        success: true,
        data: newMember,
      });
    }, 500);
  });
};

/**
 * MOCK DETAIL Member
 */
export const detailMember = async (id: string) => {
  return new Promise<MemberMock>((resolve, reject) => {
    setTimeout(() => {
      const member = membersMock.find((m) => m.id === id);

      if (!member) {
        reject(new Error("Member not found"));
        return;
      }

      resolve(member);
    }, 300);
  });
};

/**
 * MOCK UPDATE Member
 */
export type UpdateMemberPayload = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  status?: "active" | "inactive";
};

export const updateMember = async (payload: UpdateMemberPayload) => {
  return new Promise<{ success: true; data: MemberMock }>((resolve, reject) => {
    setTimeout(() => {
      const memberIndex = membersMock.findIndex((member) => member.id === payload.id);

      if (memberIndex === -1) {
        reject(new Error("Member not found"));
        return;
      }

      const updatedMember: MemberMock = {
        ...membersMock[memberIndex],
        ...payload,
        updated_at: new Date().toISOString(),
      };

      membersMock[memberIndex] = updatedMember;

      resolve({
        success: true,
        data: updatedMember,
      });
    }, 500);
  });
};

/**
 * MOCK DELETE Member
 */
export type DeleteMemberPayload = {
  id: string;  // đổi thành string
};

export const deleteMember = async (payload: DeleteMemberPayload) => {
  return new Promise<{ success: true; message: string }>((resolve, reject) => {
    setTimeout(() => {
      const memberIndex = membersMock.findIndex((member) => member.id === payload.id);

      if (memberIndex === -1) {
        reject(new Error("Member not found"));
        return;
      }

      membersMock.splice(memberIndex, 1);

      resolve({
        success: true,
        message: "Member deleted successfully",
      });
    }, 3000);
  });
};