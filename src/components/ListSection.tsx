import React, { FC, useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button.tsx";
import { ListItem } from "../store.ts";
import { ToggleButton } from "./ToggleButton.tsx";

type ListSectionProps = {
  title: string;
  cards: ListItem[];
  onCardAction?: (id: string) => void;
  buttonProps?: {
    onClick: () => void;
    disabled: boolean;
    icon?: React.ReactNode;
  };
  hideDescription: boolean;
};

export const ListSection: FC<ListSectionProps> = React.memo(
  ({ title, cards, onCardAction, buttonProps, hideDescription }) => {
    const [isVisible, setIsVisible] = useState(true);

    return (
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            {title} ({cards.length})
          </h1>
          <ToggleButton
            isOn={isVisible}
            onToggle={() => setIsVisible(!isVisible)}
            labelOn="Hide Cards"
            labelOff="Show Cards"
            className="mb-3 w-36"
          />
          {buttonProps && (
            <Button
              variant="revert"
              onClick={buttonProps.onClick}
              disabled={buttonProps.disabled}
              icon={buttonProps.icon}
              className="text-white text-sm transition-colors hover:bg-blue-400 disabled:bg-black/75 bg-black rounded px-3 py-1 ml-2"
            />
          )}
        </div>

        {isVisible ? (
          <div className="flex flex-col gap-y-3">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                onDelete={onCardAction ? () => onCardAction(card.id) : undefined}
                hideDescription={hideDescription}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">Cards are hidden</p>
          )}
      </div>
    );
  }
);
