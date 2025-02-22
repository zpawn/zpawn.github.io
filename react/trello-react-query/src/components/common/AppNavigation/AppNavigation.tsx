import { NavLink, useLocation } from "react-router-dom";
import { routes, nav } from "../../../constants";
import { Divider } from "../Divider";
import type { FC } from "react";

export type AppNavigationProps = {
  nav: typeof nav;
};

const AppNavigation: FC<AppNavigationProps> = ({ nav }) => {
  const { pathname } = useLocation();

  if (pathname === routes.LOGIN) {
    return null;
  }

  return (
    <nav className="relative mb-2">
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
