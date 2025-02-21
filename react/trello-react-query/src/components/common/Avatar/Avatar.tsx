import { Icon } from "../Icon";
import type { FC } from "react";
import type { IconSize, PropsWithStylish } from "../../../types";

export type AvatarProps = PropsWithStylish<{
  imageUrl?: string|null;
  size?: IconSize;
}>;

const Avatar: FC<AvatarProps> = ({ imageUrl, size = 18 }) => {
  return imageUrl
    ? (
      <img
        style={{ width: `${size}px`, height: `${size}px` }}
        className="inline-block object-cover object-center w-11 h-11 rounded-full"
        alt="avatar"
        src={imageUrl}
      />
    )
    : (
      <Icon icon="user-circle" size={size} className="text-secondary" />
    );
};

export { Avatar };
