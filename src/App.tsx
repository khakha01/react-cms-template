import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Router";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      {/* Toaster phải đặt ở root */}
      <Toaster richColors position="top-right" />

      {/* Router / Pages */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
