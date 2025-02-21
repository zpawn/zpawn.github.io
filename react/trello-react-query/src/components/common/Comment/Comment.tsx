import ReactTimeAgo from "react-time-ago";
import { Markdown } from "../Markdown";
import { Avatar } from "../Avatar";
import { Span } from "../Typography";
import type { FC, PropsWithChildren } from "react";

const Author: FC<PropsWithChildren> = (props) => (
  <div className="w-[35px] flex flex-col column items-center" {...props}/>
);

const Body: FC<PropsWithChildren> = (props) => (
  <div className="w-[calc(100% - 35px)] grow" {...props}/>
);

type Props = {
  date: Date,
  text: string,
  avatarUrl?: string,
};

const Comment: FC<Props> = ({ avatarUrl, text, date }) => (
  <div className="flex flex-nowrap gap-2 mb-2">
    <Author>
      <Avatar
        size={32}
        imageUrl={avatarUrl}
      />
      <Span intent="secondary">
        <ReactTimeAgo date={date} timeStyle="mini" />
      </Span>
    </Author>
    <Body>
      <Markdown text={text} />
    </Body>
  </div>
);

export { Comment };
