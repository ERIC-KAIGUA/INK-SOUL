// hooks/usePersistedUser.ts
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'tattoo-client-profile';

export type UserProfile = {
  name: string;
  email: string;
  phone?: string;
  preferredStyles: string[];    // e.g. ["Blackwork", "Neo-Traditional", "Realism"]
  allergies?: string;
  createdAt: string;
  dob?:string;
  medicalNotes?:string;
};

const DEFAULT_USER: UserProfile = {
  name: "John",
  email: "john@example.com",
  phone: "+2547xxxxxxxx",
  preferredStyles: ["Blackwork", "Japanese"],
  allergies: "",
  createdAt: new Date().toISOString(),
};

export function usePersistedUser() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return { profile, updateProfile };
}