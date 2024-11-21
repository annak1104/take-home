import React, { FC, useState } from "react";
import { Button } from "./Button.tsx";
import { ListItem } from "../api/getListData";
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "./icons";

type CardProps = {
  card: ListItem;
  onDelete?: () => void;
  hideDescription?: boolean;
};

export const Card: FC<CardProps> = React.memo(({ card, onDelete, hideDescription }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`transition-all duration-300 border p-4 rounded ${
        expanded ? "h-auto bg-gray-200" : "h-28 overflow-hidden bg-white"
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">{card.title}</h2>
        {onDelete && (
          <Button
            variant="delete"
            onClick={onDelete}
            icon={<XMarkIcon />}
          />
        )}
      </div>
      {hideDescription && (
        <Button
          variant="expand"
          onClick={() => setExpanded(!expanded)}
          className="mt-2"
          icon={expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        />
      )}
      {hideDescription && (
        <p className={`mt-2 transition-opacity ${expanded ? "opacity-100" : "opacity-0"}`}>
          {card.description}
        </p>
      )}
    </div>
  );
});
