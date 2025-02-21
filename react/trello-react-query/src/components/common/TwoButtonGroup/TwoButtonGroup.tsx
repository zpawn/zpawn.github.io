import { NavLink } from "react-router-dom";
import { Icon } from "../Icon";
import type { FC } from "react";

type Props = {
  oneTitle: string;
  twoTitle: string;
  onePath: string;
  twoPath: string;
};

const TwoButtonGroup: FC<Props> = ({
  onePath,
  twoPath,
  oneTitle,
  twoTitle,
}) => (
  <nav className="two-button-group">
    <NavLink to={onePath} className="btn btn-secondary">
      <Icon icon="magnifying-glass"/>
      {oneTitle}
    </NavLink>
    <NavLink to={twoPath} className="btn btn-secondary">
      <Icon icon="plus"/>
      {twoTitle}
    </NavLink>
  </nav>
);

export { TwoButtonGroup };
