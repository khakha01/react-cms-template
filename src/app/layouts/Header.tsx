import { useTranslation } from "react-i18next";

export default function Header() {
  const { i18n } = useTranslation();

  return (
    <header className="flex justify-between p-2">
      <div></div>
      <select
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        defaultValue={i18n.language}
      >
        <option value="vi">VI</option>
        <option value="en">EN</option>
      </select>
    </header>
  );
}
