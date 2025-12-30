import { v4 as uuidv4 } from "uuid";

export type BookMock = {
  id: string;                     // UUID
  title: string;
  isbn: string;
  published_year: number;
  status: "available" | "loaned";
  created_at: string;
  updated_at: string;
  created_by?: {
    email: string;
  };
  updated_by?: {
    email: string;
  };
};


const now = new Date().toISOString();

export const booksMock: BookMock[] = [
  {
    id: uuidv4(),
    title: "Clean Code",
    isbn: "9780132350884",
    published_year: 2008,
    status: "available",
    created_at: now,
    updated_at: now,
    created_by: {
      email: "admin@gmail.com",
    },
  },
  {
    id: uuidv4(),
    title: "Refactoring",
    isbn: "9780201485677",
    published_year: 1999,
    status: "loaned",
    created_at: now,
    updated_at: now,
    created_by: {
      email: "admin@gmail.com",
    },
  },
];

/**
 * MOCK CREATE Member
 */
export type CreateBookPayload = {
  title: string;
  isbn: string;
  published_year: number;
  status?: "available" | "loaned";
};

export const createBook = async (payload: CreateBookPayload) => {
  return new Promise<{ success: true; data: BookMock }>((resolve) => {
    setTimeout(() => {
      const timestamp = new Date().toISOString();

      const newBook: BookMock = {
        id: uuidv4(),
        title: payload.title,
        isbn: payload.isbn,
        published_year: payload.published_year,
        status: payload.status ?? "available",
        created_at: timestamp,
        updated_at: timestamp,
        created_by: {
          email: "admin@gmail.com",
        },
      };

      booksMock.push(newBook);

      resolve({
        success: true,
        data: newBook,
      });
    }, 500);
  });
};


/**
 * MOCK DETAIL Member
 */
export const detailBook = async (id: string) => {
  return new Promise<BookMock>((resolve, reject) => {
    setTimeout(() => {
      const book = booksMock.find((b) => b.id === id);

      if (!book) {
        reject(new Error("Book not found"));
        return;
      }

      resolve(book);
    }, 300);
  });
};


/**
 * MOCK UPDATE Member
 */
export type UpdateBookPayload = {
  id: string;
  title?: string;
  isbn?: string;
  published_year?: number;
  status?: "available" | "loaned";
};

export const updateBook = async (payload: UpdateBookPayload) => {
  return new Promise<{ success: true; data: BookMock }>((resolve, reject) => {
    setTimeout(() => {
      const bookIndex = booksMock.findIndex((book) => book.id === payload.id);

      if (bookIndex === -1) {
        reject(new Error("Book not found"));
        return;
      }

      const updatedBook: BookMock = {
        ...booksMock[bookIndex],
        ...payload,
        updated_at: new Date().toISOString(),
        updated_by: {
          email: "admin@gmail.com",
        },
      };

      booksMock[bookIndex] = updatedBook;

      resolve({
        success: true,
        data: updatedBook,
      });
    }, 500);
  });
};


/**
 * MOCK DELETE Member
 */
export type DeleteBookPayload = {
  id: string;
};

export const deleteBook = async (payload: DeleteBookPayload) => {
  return new Promise<{ success: true; message: string }>((resolve, reject) => {
    setTimeout(() => {
      const bookIndex = booksMock.findIndex((book) => book.id === payload.id);

      if (bookIndex === -1) {
        reject(new Error("Book not found"));
        return;
      }

      booksMock.splice(bookIndex, 1);

      resolve({
        success: true,
        message: "Book deleted successfully",
      });
    }, 300);
  });
};
