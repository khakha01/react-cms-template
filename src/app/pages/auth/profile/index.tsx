// src/pages/EditProfile.tsx hoặc src/app/profile/EditProfile.tsx
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Camera, Mail, Phone, User, Edit3 } from "lucide-react";

export default function EditProfile() {
  // Giả lập dữ liệu user hiện tại (sau này lấy từ auth context hoặc API)
  const [user, setUser] = useState({
    name: "Musharof Chowdhury",
    email: "musharof@example.com",
    phone: "+84 123 456 789",
    bio: "Full-stack developer passionate about building beautiful and functional web applications.",
    avatar: "", // để trống → dùng fallback
  });

  // Hàm xử lý upload avatar (mock)
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // TODO: Gọi API update profile
    alert("Profile updated successfully!");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 ">
      <div className="max-w-3xl mx-left">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Edit Profile
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal details and profile picture.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
              <div className="relative group">
                <Avatar className="h-32 w-32 ring-4 ring-white dark:ring-gray-900 shadow-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="h-8 w-8 text-white" />
                </label>

                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-muted-foreground mt-1">Click on the avatar to change your photo</p>
                <div className="mt-3">
                  <Badge variant="secondary">Pro Member</Badge>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  placeholder="+84 ..."
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio" className="flex items-center gap-2">
                  <Edit3 className="h-4 w-4" />
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  placeholder="Tell us a little about yourself..."
                  rows={4}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  {user.bio.length}/200 characters
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3 border-t pt-6">
            <Button variant="outline" onClick={() => history.back()}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}