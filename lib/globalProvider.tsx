import { createContext, ReactNode, useContext } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

interface User {
  $id: string;
  name: string;
  email: string
  avatar: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null | undefined;
  loading: boolean;
  // refetch: (newParams?: Record<string, string | number>) => Promise<void>
  refetch: () => Promise<void>;
}


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = (
  { children }: { children: ReactNode }
) => {
  const {
    data: user,
    loading: isLoadingUser,
    refetch: refetchUser
  } = useAppwrite({
    fn: getCurrentUser
  });

  const isLoggedIn = !!user;

  const normalizedUser: User | null = user
    ? {
      $id: user.$id,
      name: user.name,
      email: user.email,
      avatar: user.prefs?.avatar || ""
    }
    : null;


  // console.log(JSON.stringify(user, null, 2), 'user json');

  return (
    <GlobalContext.Provider value={{
      isLoggedIn,
      user: normalizedUser,
      loading: isLoadingUser,
      refetch: refetchUser
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobal Context must be used within a Global Provider');
  }

  return context;
}

export default GlobalProvider;