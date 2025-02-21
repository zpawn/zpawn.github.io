import { FC } from "react";
import { P } from "../Typography";

type Props = {
    text?: string,
};

const NoFound: FC<Props> = ({ text = "No found" } = {}) => (
    <P>{text}</P>
);

export { NoFound };
