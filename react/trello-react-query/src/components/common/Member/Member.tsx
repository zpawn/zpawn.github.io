import { Avatar } from "../Avatar";
import { P } from "../Typography";
import type { FC } from "react";
import type { Member as MemberType } from "../../../services/trello/types";

const Members: FC<{ members: MemberType[] }> = ({ members }) => {
  if (members?.length === 0) {
    return (
      <P>-</P>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {members.map((member) => (
        <Member key={member.id} member={member}/>
      ))}
    </div>
  );
};

const Member: FC<{ member: MemberType }> = ({ member }) => (
  <div className="flex gap-1.5">
    <Avatar size={20}/>
    <P mb={false}>{member.fullName}</P>
  </div>
);

export { Member, Members };
