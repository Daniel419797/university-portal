import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole } from "@/lib/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  studentId?: string;
  department?: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string, role: string) => {
        set({ isLoading: true });
        
        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock user based on role
        const mockUser: User = {
          id: "1",
          email,
          firstName: "John",
          lastName: "Doe",
          role: role as UserRole,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          studentId: role === "student" ? "STU/2023/001" : undefined,
          department: "Computer Science",
          level: role === "student" ? "400" : undefined,
        };

        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockUser: User = {
          id: "1",
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: "student",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
          studentId: data.studentId,
          department: data.department,
        };

        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
