import { FC } from "react";

type ToggleButtonProps = {
  isOn: boolean;
  onToggle: () => void;
  labelOn: string;
  labelOff: string;
  className?: string;
};

export const ToggleButton: FC<ToggleButtonProps> = ({ isOn, onToggle, labelOn, labelOff, className }) => {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded transition-colors ${
        isOn ? "bg-green-500 text-white" : "bg-gray-300 text-black"
      } ${className}`}
    >
      {isOn ? labelOn : labelOff}
    </button>
  );
};
