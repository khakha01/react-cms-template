import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Github, Facebook, MessageCircle, Mail, Code2 } from "lucide-react";

export default function PageSupport() {
  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Hero Section - Giới thiệu ấn tượng */}
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-1 text-lg">
            <Code2 className="mr-2 h-5 w-5" />
            CMS Built With By a Vietnamese Developer
          </Badge>

       
        </div>

        {/* Avatar + Intro Developer */}
        <div className="flex flex-col items-center">
          <Avatar className="h-40 w-40 ring-8 ring-white dark:ring-gray-900 shadow-2xl">
            <AvatarImage src="/your-avatar.jpg" alt="Tên bạn" /> {/* Thay bằng ảnh thật của bạn */}
            <AvatarFallback className="text-5xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              TN {/* Thay bằng initials tên bạn */}
            </AvatarFallback>
          </Avatar>

          <h2 className="mt-6 text-3xl font-bold">Huynh Kha - Phun sờ tắt Developer</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Chuyên React, Next.js, Node.js & xây dựng CMS tùy chỉnh
          </p>

          <div className="mt-4 flex gap-3">
            <Badge variant="outline">Freelance Available</Badge>
            <Badge variant="outline">Open for Collaboration</Badge>
          </div>
        </div>

        {/* Contact Cards - Nổi bật, dễ click */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* GitHub */}
          <Card className="hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gray-200 dark:border-gray-800">
            <CardHeader className="text-center">
              <Github className="h-12 w-12 mx-auto mb-4 text-gray-800 dark:text-gray-200" />
              <CardTitle className="text-2xl">Xem Source Code</CardTitle>
              <CardDescription>Xem GitHub của tôi để theo dõi dự án</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white">
                <a href="https://github.com/khakha01" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  github.com/khakha01
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Facebook */}
          <Card className="hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-blue-200 dark:border-blue-900">
            <CardHeader className="text-center">
              <Facebook className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <CardTitle className="text-2xl">Kết Bạn Facebook</CardTitle>
              <CardDescription>Chat nhanh, trao đổi ý tưởng</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <a href="https://facebook.com/huynhkha010" target="_blank" rel="noopener noreferrer">
                  <Facebook className="mr-2 h-5 w-5" />
                  fb.com/huynhkha010
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Zalo */}
          <Card className="hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-green-200 dark:border-green-900">
            <CardHeader className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <CardTitle className="text-2xl">Liên Hệ Zalo</CardTitle>
              <CardDescription>Gọi điện / nhắn tin hỗ trợ nhanh nhất</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <a href="https://zalo.me/0353123771" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  zalo.me/0353123771
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Extra - Email or More */}
        <div className="text-center space-y-6">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <Mail className="h-10 w-10 mx-auto mb-4 text-purple-600" />
              <CardTitle>Gửi Email</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" variant="outline">
                <a href="mailto:your.email@gmail.com">
                  <Mail className="mr-2 h-5 w-5" />
                  khakha5087@gmail.com
                </a>
              </Button>
            </CardContent>
          </Card>

          <p className="text-lg text-gray-600 dark:text-gray-400">
            Cảm ơn bạn đã ghé thăm! Nếu bạn thích CMS này, hãy star repo trên GitHub hoặc chia sẻ nhé 🌟
          </p>
        </div>
      </div>
    </div>
  );
}