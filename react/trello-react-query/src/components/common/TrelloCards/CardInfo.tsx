import { get, find } from "lodash";
import { getDate } from "../../../utils/date";
import { Title } from "../Title";
import { TwoProperties } from "../Property";
import { OverflowText } from "../OverflowText";
import { Members } from "../Member";
import { Property } from "../Property";
import { LinkIcon } from "../Link";
import { Span } from "../Typography";

import type { FC } from "react";
import type { CardType, Organization } from "../../../services/trello/types";

type Props = {
  card: CardType,
  onTitleClick?: () => void,
  organizations: Organization[],
};

const CardInfo: FC<Props> = ({ card, organizations, onTitleClick }) => {
  const workspace = find(organizations, {
    id: get(card, ["board", "idOrganization"]),
  });

  return (
    <article className="px-2 py-2.5 border rounded-md border-stone-200">
      <Title
        title={get(card, ["name"], "-")}
        onClick={onTitleClick}
        externalLink={get(card, ["shortUrl"], "#")}
      />
      <TwoProperties
        leftLabel="Workspace"
        leftText={(
          <OverflowText>
            <Span>{workspace?.name ?? "-"}</Span>
            {get(workspace, ["url"]) && (
              <LinkIcon href={get(workspace, ["url"], "#")}/>
            )}
          </OverflowText>
        )}
        rightLabel="Board"
        rightText={(
          <OverflowText>
            <Span>{get(card, ["board", "name"], "-")}</Span>
            {get(card, ["board", "url"]) && (
              <LinkIcon href={get(card, ["board", "url"], "#")}/>
            )}
          </OverflowText>
        )}
      />
      <TwoProperties
        leftLabel="List"
        leftText={(
          <OverflowText>
            <Span>{get(card, ["list", "name"], "-")}</Span>
          </OverflowText>
        )}
        rightLabel="Due Date"
        rightText={getDate(get(card, ["due"]))}
      />
      <Property
        label="Members"
        text={(
          <Members members={card.members} />
        )}
      />
    </article>
  );
}

export { CardInfo }
