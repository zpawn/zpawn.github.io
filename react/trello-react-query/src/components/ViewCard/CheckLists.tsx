import size from "lodash/size";
import { P, Title, Container, Span } from "../common";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { CardType, ChecklistItem } from "../../services/trello/types";

type Props =  {
  checklists: Maybe<CardType["checklists"]>,
  onChangeChecklistItem: (
    itemId: ChecklistItem["id"],
    state: ChecklistItem["state"],
  ) => void,
};

const CheckLists: FC<Props> = ({ checklists, onChangeChecklistItem }) => {
  return (
    <Container>
      {(Array.isArray(checklists) && Boolean(size(checklists))) && (
        <>
          <Title title="Checklist" />

          {checklists.map(({ id, name, checkItems }) => (
            <div key={id} className="flex flex-col mb-2" style={{ marginBottom: 10 }}>
              <P>{name}</P>
              {checkItems.map(({ id, name, state }) => (
                <div>
                  <input type="checkbox"
                    id={id}
                    key={id}
                    checked={state === "complete"}
                    onChange={() => {
                      onChangeChecklistItem(id, state === "complete" ? "incomplete" : "complete")
                    }}
                  />
                  <Span>{name}</Span>
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </Container>
  );
};

export { CheckLists };
