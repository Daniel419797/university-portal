import { useThemeStore } from "@/store/theme-store";
import { useEffect } from "react";

export function useTheme() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Apply theme on mount
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      document.documentElement.classList.toggle("dark", systemTheme === "dark");
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}
