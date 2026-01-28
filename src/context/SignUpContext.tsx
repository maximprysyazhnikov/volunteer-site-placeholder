import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { RegisterRequest } from '../api/types/auth';

type SignUpContextType = {
  data: RegisterRequest;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setPassword: (value: string) => void;
  setRole: (value: 'distressed' | 'volunteer') => void;
  reset: () => void;
};

const initialData: RegisterRequest = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password: '',
  role: 'distressed',
};

const SignUpContext = createContext<SignUpContextType | null>(null);

export const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<RegisterRequest>(initialData);

  const setFirstName = (value: string) => {
    setData((prev) => ({ ...prev, first_name: value }));
  };

  const setLastName = (value: string) => {
    setData((prev) => ({ ...prev, last_name: value }));
  };

  const setEmail = (value: string) => {
    setData((prev) => ({ ...prev, email: value }));
  };

  const setPhone = (value: string) => {
    setData((prev) => ({ ...prev, phone_number: value }));
  };

  const setPassword = (value: string) => {
    setData((prev) => ({ ...prev, password: value }));
  };

  const setRole = (value: 'distressed' | 'volunteer') => {
    setData((prev) => ({ ...prev, role: value }));
  };

  const reset = () => {
    setData(initialData);
  };

  return (
    <SignUpContext.Provider
      value={{
        data,
        setFirstName,
        setLastName,
        setEmail,
        setPhone,
        setPassword,
        setRole,
        reset,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUp = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error('useSignUp must be used within SignUpProvider');
  }
  return context;
};
