import get from "lodash/get";
import find from "lodash/find";
import { getDate } from "../../utils/date";
import {
  P,
  Icon,
  Span,
  Title,
  Property,
  LinkIcon,
  Markdown,
} from "../common";
import { Members } from "../common/Member";
import type { FC } from "react";
import type { CardType, Organization } from "../../services/trello/types";

type Props = {
  card: CardType,
  organizations: Organization[],
};

const Info: FC<Props> = ({ card, organizations }) => {
    const labels = get(card, ["labels"]);
    const due = get(card, ["due"]);
    const workspace = find(organizations, {
      id: get(card, ["board", "idOrganization"]),
    });

    return (
      <>
        <Title
          title={get(card, ["name"], "-")}
          externalLink={get(card, ["shortUrl"], "#")}
        />
        <Property
          label="Board"
          text={(
            <P style={{ marginRight: 4 }}>
              {get(workspace, ["displayName"], "-")}
              {get(workspace, ["url"]) && (
                  <LinkIcon href={get(workspace, ["url"], "#")}/>
              )}
            </P>
          )}
        />
        <Property
          label="Board"
          text={(
            <P style={{ marginRight: 4 }}>
              {get(card, ["board", "name"], "-")}
              <LinkIcon href={get(card, ["board", "url"], "-")}/>
            </P>
          )}
        />
        <Property
          label="List"
          text={get(card, ["list", "name"], "-")}
        />
        <Property
          label="Description"
          text={(
            <Markdown text={get(card, ["desc"], "-")} />
          )}
        />
        <Property
          label="Labels"
          text={(!labels)
            ? "-"
            : (
              <div className="flex flex-wrap gap-1">
                {labels.map(({ id, name/*, color*/ }) => (
                  <Span key={id}>{name}</Span>
                ))}
              </div>
            )
          }
        />
        <Property
          label="Due date"
          text={(
            <P>
              <Icon icon="calendar"/>&nbsp;
              {!due ? "-" : getDate(due)}
            </P>
          )}
        />
      <Members members={get(card, ["members"])} />
    </>
  );
};

export { Info };
