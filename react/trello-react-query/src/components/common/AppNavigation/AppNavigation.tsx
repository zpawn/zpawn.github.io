import { NavLink } from "react-router-dom";
import { Stack, AnchorButton } from "@deskpro/deskpro-ui";
import { Container } from "../Layout";
import type { FC } from "react";

type Props = {
  //..
};

const AppNavigation: FC<Props> = () => {
  return (
    <Container as={Stack} gap={8}>
      <NavLink to="/home">
        {({ isActive }) => (
          <AnchorButton text="Home" intent={isActive ? "minimalUnderline" : "minimal"}/>
        )}
      </NavLink>
      <NavLink to="/link_card">
      {({ isActive }) => (
        <AnchorButton text="Link Card" intent={isActive ? "minimalUnderline" : "minimal"}/>
      )}
      </NavLink>
      {/* todo: Implement Route */}
      <NavLink to="/unlink">
        {({ isActive }) => (
          <AnchorButton text="Unlink Card" intent={isActive ? "minimalUnderline" : "minimal"}/>
        )}
      </NavLink>
      {/* todo: Implement Route */}
      <NavLink to="/logout">
        {({ isActive }) => (
          <AnchorButton text="Logout" intent={isActive ? "minimalUnderline" : "minimal"}/>
        )}
      </NavLink>
    </Container>
  );
};

export { AppNavigation };
