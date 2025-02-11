import { NavLink } from "react-router-dom";
import { AnchorButton } from "../Button";
import { Divider } from "../Divider";
import type { FC } from "react";

type NavItem = {
  route: string;
  name: string;
};

export type AppNavigationProps = {
  nav: NavItem[];
};

const AppNavigation: FC<AppNavigationProps> = ({ nav }) => {
  return (
    <div className="relative">
      <Divider className="absolute bottom-0 w-full"/>
      <div className="flex justify-evenly relative">
        {nav.map(({ route, name }) => (
          <NavLink key={route} to={route}>
            {({ isActive }) => (
              <AnchorButton text={name} intent="underline" active={isActive} />
            )}
        </NavLink>
        ))}
      </div>
    </div>
  );
};

export { AppNavigation };
