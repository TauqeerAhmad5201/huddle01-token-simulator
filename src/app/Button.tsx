"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="w-full h-12 bg-blue-500 text-white rounded-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
