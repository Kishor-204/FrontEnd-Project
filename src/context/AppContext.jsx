import { createContext, useContext, useEffect, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext(null);

const DEFAULT_PROFILE = {
  name: "Guest Diner",
  email: "",
  phone: "",
  favourite: "Hyderabadi Dum Biryani",
  vegOnly: false,
};

export function AppProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("sr-theme", "light");
  const [profile, setProfile] = useLocalStorage("sr-profile", DEFAULT_PROFILE);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
      profile,
      updateProfile: (changes) => setProfile((p) => ({ ...p, ...changes })),
    }),
    [theme, profile, setTheme, setProfile]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to consume the context
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
