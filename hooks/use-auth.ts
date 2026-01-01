import { useAuthStore } from "@/store/auth-store";

export function useAuth() {
  const { user, isAuthenticated, isLoading, login, logout, register, setUser } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    setUser,
  };
}
