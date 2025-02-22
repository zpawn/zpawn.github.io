import size from "lodash/size";
import { P, Title, CheckedItem } from "../common";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { CardType, ChecklistItem } from "../../services/trello/types";

type Props = {
  checklists: Maybe<CardType["checklists"]>;
  onChangeChecklistItem: (
    itemId: ChecklistItem["id"],
    state: ChecklistItem["state"],
  ) => Promise<void>;
};

const CheckLists: FC<Props> = ({ checklists, onChangeChecklistItem }) => {
  return (
    <>
      {(Array.isArray(checklists) && Boolean(size(checklists))) && (
        <>
          <Title title="Checklist" />

          {checklists.map(({ id, name, checkItems }) => (
            <div key={id} className="flex flex-col mb-2" style={{ marginBottom: 10 }}>
              <P>{name}</P>
              {checkItems.map(({ id, name, state }) => (
                <CheckedItem
                  id={id}
                  key={id}
                  label={name}
                  checked={state === "complete"}
                  onChange={
                    () => onChangeChecklistItem(id, state === "complete" ? "incomplete" : "complete")
                  }
                />
              ))}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export { CheckLists };
