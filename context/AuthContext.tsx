import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session, User } from "@supabase/supabase-js";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const SESSION_KEY = "supabase_session";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Restore session from AsyncStorage
  useEffect(() => {
    const restoreSession = async () => {
      const savedSession = await AsyncStorage.getItem(SESSION_KEY);

      if (savedSession) {
        const parsedSession: Session = JSON.parse(savedSession);
        const { data, error } = await supabase.auth.setSession({
          access_token: parsedSession.access_token,
          refresh_token: parsedSession.refresh_token,
        });

        if (data?.session) {
          setSession(data.session);
          setUser(data.session.user);
        }
      }

      setLoading(false);
    };

    restoreSession();

    // 🔹 Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
        } else {
          await AsyncStorage.removeItem(SESSION_KEY);
        }
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
