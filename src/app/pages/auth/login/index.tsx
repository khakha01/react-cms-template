import { useForm } from "react-hook-form";
import { loginSchema } from "./schema";
import type { LoginFormData } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginMock } from "../../../../mock";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, Lock, Copy, UserCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [openDemoDialog, setOpenDemoDialog] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMock(data);
      toast.success("Đăng nhập thành công");
      navigate("/admin");
    } catch (error) {
      toast.error((error as Error).message || "Đăng nhập thất bại");
    }
  };

  const handleCopy = (text: string, type: "email" | "password") => {
    navigator.clipboard.writeText(text);

    // Chuyển icon thành Check và reset sau 2 giây
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPassword(true);
      setTimeout(() => setCopiedPassword(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-blue-600 p-4 shadow-lg">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">LOGIN ADMIN!</CardTitle>
            <CardDescription className="text-base">
              Đăng nhập để tiếp tục quản trị CMS
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  {...register("email")}
                  className="h-12 text-base"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base">
                  <Lock className="inline h-4 w-4 mr-1" />
                  Mật khẩu
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="h-12 text-base"
                />
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Nhớ mật khẩu
                  </Label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Quên mật khẩu?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Đang đăng nhập...
                  </>
                ) : (
                  "Đăng Nhập"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            {/* Popup tài khoản test */}
            <Dialog open={openDemoDialog} onOpenChange={setOpenDemoDialog}>
              <DialogTrigger asChild>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Chưa có tài khoản?{" "}
                  <span className="font-medium text-blue-600 hover:underline">
                    Thử tài khoản demo
                  </span>
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <UserCheck className="h-6 w-6 text-green-600" />
                    Tài khoản thử nghiệm (Demo)
                  </DialogTitle>
                  <DialogDescription className="pt-2">
                    Bạn có thể dùng tài khoản dưới đây để trải nghiệm CMS ngay
                    lập tức!
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  {/* Email */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Email:</p>
                      <p className="text-lg font-mono">admin@gmail.com</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy("admin@gmail.com", "email")}
                      className="text-green-600 hover:text-green-700"
                    >
                      {copiedEmail ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Password */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Mật khẩu:</p>
                      <p className="text-lg font-mono">123456</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy("123456", "password")}
                      className="text-green-600 hover:text-green-700"
                    >
                      {copiedPassword ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Đăng nhập ngay và khám phá tất cả tính năng!</p>
                </div>
              </DialogContent>
            </Dialog>

            <p className="text-center text-xs text-gray-500 mt-6">
              © 2025 Admin CMS • Tự xây dựng bởi Huỳnh Khả
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
