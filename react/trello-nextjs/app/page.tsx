import LikeButton from './like-button';
import type { FC } from "react";

const Header: FC<{ title?: string }> = ({ title = "Default title" }) => (
  <h1>{title}</h1>
);

const HomePage = () => {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <LikeButton />
    </div>
  );
};

export default HomePage;
