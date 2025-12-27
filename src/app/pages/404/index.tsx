
export default function NotFoundPage(){
    return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl mt-4">Trang không tồn tại</p>
        <a href="/admin" className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded">
          Về trang chủ
        </a>
      </div>
    </div>
  );
}