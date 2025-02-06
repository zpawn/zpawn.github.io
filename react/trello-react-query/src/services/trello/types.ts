import type { DateTime } from "../../types";

export type Member = {
    id: string,
    activityBlocked: boolean,
    avatarHash: string,
    avatarUrl: string,
    fullName: string,
    idMemberReferrer?: Member["id"],
    initials: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nonPublic: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nonPublicAvailable: any,
    username: string,
    organizations?: Organization[],
    boards?: Board[],
};

export type ChecklistItemState = "complete" | "incomplete";

export type ChecklistItem = {
    idChecklist: Checklist["id"],
    state: ChecklistItemState,
    id: string,
    name: string,
    nameData:{
        emoji: object
    },
    pos: number,
    due?: DateTime,
    idMember?: Member["id"],
};

export type Checklist = {
    id: string,
    name: string,
    idBoard: string,
    idCard: string,
    pos: number,
    checkItems: ChecklistItem[],
};

export type Organization = {
    id: string,
    desc: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descData: any,
    displayName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    domainName: any,
    idBoards: Array<Board["id"]>,
    idMemberCreator: Member["id"],
    logoHash: string,
    logoUrl: string,
    name: string,
    url: string,
    website: string|null,
};

export type Board = {
    id: string,
    name: string,
    desc: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descData: any,
    closed: boolean,
    idOrganization: Organization["id"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    idEnterprise: any,
    pinned: boolean,
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prefs: any,
    lists?: List[],
};

export type LabelColor =
    | "red"
    | "yellow"
    | "orange"
    | "green"
    | "sky"
    | "purple"
    | "blue"
    | "lime"
    | "pink"
    | "black"
    | null;

export type Label = {
    id: string,
    idBoard: Board["id"],
    name?: string,
    color: LabelColor,
};

export type Labels = Label[];

export type List = {
    id: string,
    name: string,
    closed: boolean,
    idBoard: Board["id"],
    pos: number,
    subscribed: boolean,
};

export type CardType = {
    id: string,
    checklists: Checklist[],
    dueComplete: boolean,
    dateLastActivity: DateTime,
    desc: string,
    descData: {
        emoji: object
    },
    due: DateTime,
    dueReminder: number,
    email?: string,
    idBoard: string,
    idChecklists: Array<Checklist["id"]>,
    idLabels: Array<Label["id"]>,
    idList: List["id"],
    idMembers: Array<Member["id"]>,
    idMembersVoted: Array<Member["id"]>,
    idAttachmentCover: null,
    labels:Label[],
    locationName?: string,
    manualCoverAttachment: boolean,
    name: string,
    pos: number,
    shortLink: string,
    shortUrl: string,
    subscribed: boolean,
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cover: any,
    isTemplate: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cardRole: any,
    members: Member[],
    board: Board,
    list: List,
};

export type Comment = {
    id: string,
    idMemberCreator: Member["id"],
    date: DateTime,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    limits: any,
    type: "commentCard",
    memberCreator: Member,
    data: {
        text: string,
        board: Board,
        card: CardType,
        list: List,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        textData: any,
    },
};
