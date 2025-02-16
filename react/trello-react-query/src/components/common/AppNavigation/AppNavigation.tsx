import { NavLink } from "react-router-dom";
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
    <nav className="relative">
      <Divider className="absolute bottom-0 w-full"/>
      <ul className="flex justify-evenly relative">
        {nav.map(({ route, name }) => (
          <li key={route}>
            <NavLink to={route} className="btn btn-underline">{name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { AppNavigation };
