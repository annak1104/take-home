import React, { FC } from "react";
import { Card } from "./Card";
import { Button } from "./Button.tsx";
import {ListItem} from "../store.ts";

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

export const ListSection: FC<ListSectionProps> = React.memo( ({
                                                    title,
                                                    cards,
                                                    onCardAction,
                                                    buttonProps,
                                                    hideDescription,
                                                  }) => {
  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center justify-between">
        <h1 className="mb-1 font-medium text-lg">
          {title} ({cards.length})
        </h1>
        {buttonProps && (
          <Button
            variant="revert"
            onClick={buttonProps.onClick}
            disabled={buttonProps.disabled}
            icon={buttonProps.icon}
            className="text-white text-sm transition-colors hover:bg-blue-400 disabled:bg-black/75 bg-black rounded px-3 py-1"
          />
        )}
      </div>
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
    </div>
  );
});
