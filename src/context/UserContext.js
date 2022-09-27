import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <UserContext.Provider value={{ isModalOpen, handleModal }}>
      {children}
    </UserContext.Provider>
  );
};
