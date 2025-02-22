import size from "lodash/size";
import { Title, Comment } from "../common";
import type { FC } from "react";
import type { Comment as CommentType } from "../../services/trello/types";
import type { Maybe } from "../../types";

const Comments: FC<{
    comments: Maybe<CommentType[]>,
    onClickTitleAction: () => void,
}> = ({ comments, onClickTitleAction }) => {
    return (
        <>
            <Title
                title={`Comments  (${size(comments)})`}
                onClick={onClickTitleAction}
            />
            {(Array.isArray(comments) && Boolean(size(comments))) && comments.map(({ id, date, data, memberCreator }) => (
                <Comment
                    key={id}
                    name={memberCreator.fullName}
                    text={data.text}
                    date={new Date(date)}
                />
            ))}
        </>
    );
}

export { Comments };
