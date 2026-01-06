import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole } from "@/lib/types";
import { authService, LoginRequest, RegisterRequest } from "@/lib/services/authService";
import { toast } from "sonner";

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
  role?: string;
  studentId?: string;
  department?: string;
  staffId?: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string, role: string) => {
        set({ isLoading: true });
        
        try {
          const credentials: LoginRequest = { email, password };
          const response = await authService.login(credentials);
          
          // Set user and authenticated state
          set({ 
            user: response.user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          toast.success("Login successful!");
        } catch (error: unknown) {
          set({ isLoading: false });
          const errorMessage = error && typeof error === 'object' && 'error' in error 
            ? (error as { error: { message: string } }).error.message 
            : "Login failed. Please check your credentials.";
          toast.error(errorMessage);
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        
        try {
          const registerData: RegisterRequest = {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role || "student",
            department: data.department,
            level: data.role === 'student' ? undefined : undefined, // Only students have levels
            matricNumber: data.role === 'student' ? data.studentId : undefined,
          };
          
          const response = await authService.register(registerData);
          
          set({ 
            user: response.user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          toast.success("Registration successful!");
        } catch (error: unknown) {
          set({ isLoading: false });
          const errorMessage = error && typeof error === 'object' && 'error' in error 
            ? (error as { error: { message: string } }).error.message 
            : "Registration failed. Please try again.";
          toast.error(errorMessage);
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        set({ user: null, isAuthenticated: false });
        toast.info("Logged out successfully");
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
