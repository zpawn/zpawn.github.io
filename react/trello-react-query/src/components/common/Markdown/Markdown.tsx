import showdown from "showdown";
import { P } from "../Typography";
import type { FC } from "react";

type Props = {
    text: string,
};

const converter = new showdown.Converter({
    tables: true,
    tasklists: true,
    strikethrough: true,
    simplifiedAutoLink: true,
    openLinksInNewWindow: true,
});

const Markdown: FC<Props> = ({ text }) => (
    <P dangerouslySetInnerHTML={{ __html: converter.makeHtml(text) }} />
);

export { Markdown };
