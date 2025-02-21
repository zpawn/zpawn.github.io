import styled from "styled-components";
import { CardInfo } from "./CardInfo";
import { Divider } from "../Divider";
import type { FC } from "react";
import type { CardType, Organization } from "../../../services/trello/types";

type Props = {
  card: CardType,
  onChange: () => void,
  checked: boolean,
  organizations: Organization[],
};

const CardUI = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`;

const CardMedia = styled.div``;

const CardBody = styled.div`
  width: calc(100% - 12px - 8px);
`;

const TrelloCard: FC<Props> = ({ checked, onChange, card, organizations }) => (
  <>
    <CardUI>
      <CardMedia>
        <input
          type="checkbox"
          size={12}
          checked={checked}
          onChange={onChange}
        />
      </CardMedia>
      <CardBody>
        <CardInfo
          card={card}
          organizations={organizations}
          onTitleClick={onChange}
        />
      </CardBody>
    </CardUI>
    <Divider style={{ marginBottom: 9 }} />
  </>
);

export { TrelloCard };
