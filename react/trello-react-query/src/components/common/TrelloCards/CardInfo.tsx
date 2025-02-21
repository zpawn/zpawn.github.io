import { get, find } from "lodash";
import { Title } from "../Title";
import { getDate } from "../../../utils/date";
import { TwoProperties } from "../Property";
import { OverflowText } from "../OverflowText";
import { Members } from "../Member";
import { Property } from "../Property";
import { LinkIcon } from "../Link";
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
    <>
      <Title
        title={get(card, ["name"], "-")}
        onClick={onTitleClick}
        externalLink={get(card, ["shortUrl"], "#")}
      />
      <TwoProperties
        leftLabel="Workspace"
        leftText={(
          <>
            <OverflowText>{get(workspace, ["displayName"], "-")}</OverflowText>
            {get(workspace, ["url"]) && (
              <LinkIcon href={get(workspace, ["url"], "#")}/>
            )}
          </>
        )}
        rightLabel="Board"
        rightText={(
          <>
            <OverflowText>{get(card, ["board", "name"], "-")}</OverflowText>
            {get(card, ["board", "url"]) && (
              <LinkIcon href={get(card, ["board", "url"], "#")}/>
            )}
          </>
        )}
      />
      <TwoProperties
        leftLabel="List"
        leftText={<OverflowText>{get(card, ["list", "name"], "-")}</OverflowText>}
        rightLabel="Due Date"
        rightText={getDate(get(card, ["due"]))}
      />
      <Property
        label="Members"
        text={(
          <Members members={card.members} />
        )}
      />
    </>
  );
}

export { CardInfo }
