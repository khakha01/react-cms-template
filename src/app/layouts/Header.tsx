import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, LogOut, User, HelpCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { logoutMock } from "@/mock";
import { t } from "i18next";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string; // avatar là optional
};

type AuthData = {
  token: string;
  user: User;
};

export default function Header() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [langOpen, setLangOpen] = useState(false);
  const initialAuthData: AuthData | null = useMemo(() => {
    try {
      const stored = localStorage.getItem("authToken");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error("Invalid authToken in localStorage", err);
    }
    return null;
  }, []);

  const [authData, setAuthData] = useState<AuthData | null>(initialAuthData);
  const [loading] = useState(false); // Không cần loading nữa vì đọc đồng bộ

  const user = authData?.user ?? null;
  const languages = [
    { code: "vi", label: "Việt Nam" },
    { code: "en", label: "English" },
  ];

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const handleChangeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  const handleSignOut = async () => {
    await logoutMock();
    setAuthData(null); // optional: clear state ngay lập tức
    navigate("/login");
  };

  // Nếu đang loading → có thể hiển thị skeleton (tùy chọn)
  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-16 items-center justify-between px-6 lg:px-10">
          <div />
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-16 items-center justify-between px-6 lg:px-10">
        {/* Left: Logo (tùy chọn) */}
        <div className="flex items-center">
          {/* <img src="/logo.png" alt="Logo" className="h-8" /> */}
        </div>

        {/* Right: Language + User */}
        <div className="flex items-center gap-6">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {currentLang.label}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleChangeLanguage(lang.code)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Dropdown - Chỉ hiển thị khi đã login */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-gray-900">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                      {user.name
                        .split(" ")
                        .map((n) => n[0]?.toUpperCase())
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-64 mr-4" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Link
                    to={"/admin/edit-profile"}
                    className="flex items-center cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>{t("common.editProfile")}</span>
                  </Link>
                </DropdownMenuItem>

                {/* 
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account settings</span>
                </DropdownMenuItem> 
                */}

                <DropdownMenuItem>
                  <Link
                    to={"/admin/support"}
                    className="flex items-center cursor-pointer"
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>{t("common.support")}</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Nếu chưa login → có thể hiển thị nút Login
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
