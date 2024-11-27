import { useEffect, useCallback } from "react";
import { useStore } from "../store";
import { useGetListData } from "../api/getListData";
import { Spinner } from "./Spinner";
import { RevertIcon, RefreshIcon } from "./icons";
import { ListSection } from "./ListSection";
import {Button} from "./Button.tsx";

export const Entrypoint = () => {
  const { visibleCards, deletedCards, setVisibleCards, deleteCard, restoreCard } = useStore();
  const listQuery = useGetListData();

  const handleRefresh = () => {
    listQuery.refetch();
  };

  useEffect(() => {
    if (!listQuery.isLoading && listQuery.data) {
      setVisibleCards(
        listQuery.data
          .filter((item) => item.isVisible)
          .map((item) => ({
            ...item,
            id: String(item.id),
          }))
      );
    }
  }, [listQuery.data, listQuery.isLoading, setVisibleCards]);

  const handleCardDelete = useCallback(
    (id: string) => deleteCard(id),
    [deleteCard]
  );

  const handleRestoreCard = useCallback(
    () => restoreCard(deletedCards[0]?.id),
    [deletedCards, restoreCard]
  );

  if (listQuery.isLoading || listQuery.isFetching) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-8">
      <div>
      <Button
        variant="default"
        onClick={handleRefresh}
        icon={<RefreshIcon />}
        className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
      />
      </div>
      <div className="flex gap-8">
      <ListSection
        title="My Awesome List"
        cards={visibleCards}
        onCardAction={handleCardDelete}
        hideDescription={true}
      />

      <ListSection
        title="Deleted Cards"
        cards={deletedCards}
        buttonProps={{
          onClick: handleRestoreCard,
          disabled: !deletedCards.length,
          icon: <RevertIcon />,
        }}
        hideDescription={false}
      />
      </div>
    </div>
  );
};
