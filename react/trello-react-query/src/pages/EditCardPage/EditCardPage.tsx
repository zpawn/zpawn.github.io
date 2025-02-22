import { FC, useState, useEffect } from "react";
// import { get, has, isEmpty } from "lodash";
import * as yup from "yup";
import { useFormik } from "formik";
// import {
//     faUser,
//     faPlus,
//     faCheck,
//     faExternalLinkAlt,
// } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
// import {
//     P5,
//     Pill,
//     Stack,
//     TSpan,
//     Avatar,
//     Dropdown,
//     lightTheme,
//     InputWithDisplay,
//     Label as LabelUI,
//     DropdownValueType,
//     Button as ButtonUI,
//     DropdownTargetProps,
//     DivAsInputWithDisplay,
// } from "@deskpro/deskpro-ui";
import { routes } from "../../constants";
import {
    // getCardService,
    updateCardService,
    // getCurrentMemberService,
    // getLabelsOnBoardService,
    // getMembersOfOrganizationService,
} from "../../services/trello";
// import { getLabelColor } from "../../utils";
import { useAsyncError } from "../../hooks";
import {
    Label,
    Button,
    PageLoading,
    // Property,
    // TextArea,
    // DateInput,
    ErrorBlock,
    // SingleSelect,
} from "../../components/common";
import type { /*Board,*/ CardType, Member } from "../../services/trello/types";

// export type Option = <string>;

// export type Options = Option[];

// type MemberOption = Option & {
//     metadata: { id: string, fullName: string },
// };

const validationSchema = yup.object().shape({
    title: yup.string().required(),
    board: yup.object({
        key: yup.string().required(),
        label: yup.string().required(),
        value: yup.string().required(),
        type: yup.string().oneOf(["value"]).required(),
    }),
    list: yup.object({
        key: yup.string().required(),
        label: yup.string().required(),
        value: yup.string().required(),
        type: yup.string().oneOf(["value"]).required(),
    }),
    description: yup.string(),
    labels: yup.array(yup.string()),
    members: yup.array(yup.string()),
    dueDate: yup.date(),
});

// const resetValue = { key: "", label: "", value: "", type: "value" };

const initValues = {
    title: "",
    board: { key: "", label: "", value: "", type: "value" },
    list: { key: "", label: "", value: "", type: "value" },
    description: "",
    labels: [],
    dueDate: "",
    members: [],
};

const EditCardPage: FC = () => {
    const navigate = useNavigate();
    const { cardId } = useParams();
    const { asyncErrorHandler } = useAsyncError();

    const [error] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [card, /*setCard*/] = useState<CardType>();

    const [member, /*setMember*/] = useState<Member|null>(null);
    // const [boards, setBoards] = useState<[]>([]);
    // const [lists, setLists] = useState<[]>([]);
    // const [labels, setLabels] = useState<[]>([]);
    // const [members, setMembers] = useState<[]>([]);

    const {
        values,
        // errors,
        // touched,
        handleSubmit,
        isSubmitting,
        // getFieldProps,
        // setFieldValue,
    } = useFormik({
        validationSchema,
        initialValues: initValues,
        onSubmit: async (values) => {
            if (!card?.id) {
                return
            }

            const newCard = {
                name: values.title,
                desc: values.description,
                idList: values.list.value,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                due: !values.dueDate ? "" : values.dueDate.toISOString(),
                idLabels: values.labels,
                idMembers: values.members,
            };

            await updateCardService(card.id, newCard)
                .then(() => navigate(`${routes.CARD}/${card.id}`))
                .catch(asyncErrorHandler);
        },
    });

    // useDeskproElements(({ clearElements, registerElement }) => {
    //     clearElements();
    //     registerElement("trelloRefreshButton", { type: "refresh_button" });
    //     registerElement("trelloHomeButton", {
    //         type: "home_button",
    //         payload: { type: "changePage", path: "/home" }
    //     });
    // });

    /* Set title */
    // useEffect(() => {
    //     if (!client || !card?.shortLink) {
    //         return;
    //     }

    //     client.setTitle(`Edit Card`);
    // }, [client, card?.shortLink]);

    /* get member */
    useEffect(() => {
        setLoading(true);

        // getCurrentMemberService()
        //     .then((member) => {
        //         has(member, ["error"])
        //             ? asyncErrorHandler(get(member, ["error"]))
        //             : setMember(member);
        //     })
        //     .finally(() => setLoading(false));
    }, []);

    /* get dependent data */
    useEffect(() => {
        if (!cardId) {
            return;
        }

        setLoading(true);

        Promise.resolve()
        // getCurrentMemberService()
        //     .then((member) => has(member, ["error"])
        //         ? asyncErrorHandler(get(member, ["error"]))
        //         : setMember(member)
        //     )
        //     .then(() => getCardService(cardId))
        //     .then((card) => {
        //         setCard(card);
        //         setFieldValue("title", card.name);
        //         setFieldValue("description", card.desc);
        //         setFieldValue("board", {
        //             type: "value",
        //             key: card.board.id,
        //             value: card.board.id,
        //             label: card.board.name,
        //         });
        //         setFieldValue("list", {
        //             key: card.list.id,
        //             label: card.list.name,
        //             value: card.list.id,
        //             type: "value",
        //         });
        //         card.due && setFieldValue("dueDate", new Date(card.due));
        //         setFieldValue("labels", card.idLabels);
        //         setFieldValue("members", card.idMembers);

        //         return Promise.all([
        //             getMembersOfOrganizationService(card.board.idOrganization)
        //                 .then((members) => {
        //                     setMembers(members.map(({ id, fullName }) => ({
        //                         key: id,
        //                         value: id,
        //                         type: "value",
        //                         metadata: { id, fullName },
        //                         selected: card.idMembers.includes(id),
        //                         label: (
        //                             <Stack key={id} gap={6}>
        //                                 <Avatar size={18} name={fullName} backupIcon={faUser} />
        //                                 <P5>{fullName}</P5>
        //                             </Stack>
        //                         ),
        //                     })));

        //                     return Promise.resolve();
        //                 }),
        //             getLabelsOnBoardService(card.idBoard)
        //                 .then((labels) => {
        //                     if (!isEmpty(labels)) {
        //                         setLabels(labels.map(({ id, name, color }): Option => ({
        //                             key: id,
        //                             value: id,
        //                             type: "value",
        //                             selected: card.idLabels.includes(id),
        //                             label: (
        //                                 <Pill
        //                                     key={id}
        //                                     label={name ? name : "-"}
        //                                     {...getLabelColor(lightTheme, color)}
        //                                 />
        //                             ),
        //                         })));
        //                     }
        //                     return Promise.resolve();
        //                 }),
        //         ])
        //     })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [cardId]);

    /* Set boards */
    useEffect(() => {
        // if (!isEmpty(member?.boards) && card?.board?.idOrganization) {
        //     setBoards(
        //         (member?.boards as Board[])
        //             .filter(({ idOrganization }) => idOrganization === card.board.idOrganization)
        //             .map(({ id, name }) => ({
        //                 key: id,
        //                 value: id,
        //                 type: "value",
        //                 label: name,
        //             }))
        //     );
        // }
    }, [member?.boards, card?.board?.idOrganization]);

    /* set lists & labels if change board */
    useEffect(() => {
        if (!values.board.value) {
            return;
        }

        // const board = member?.boards?.find(({ id }) => id === values.board.value) as Board;

        // if (!isEmpty(board)) {
        //     setLists(
        //         board.lists?.map(({ id, name }): Option => ({
        //             key: id,
        //             value: id,
        //             label: name,
        //             type: "value",
        //             selected: false,
        //         })) as Options
        //     );

        //     getLabelsOnBoardService(values.board.value)
        //         .then((labels) => {
        //             if (!isEmpty(labels)) {
        //                 setLabels(labels.map(({ id, name, color }): Option => ({
        //                     key: id,
        //                     value: id,
        //                     type: "value",
        //                     selected: values.labels.includes(id as never),
        //                     label: (
        //                         <Pill
        //                             key={id}
        //                             label={name ? name : "-"}
        //                             {...getLabelColor(lightTheme, color)}
        //                         />
        //                     ),
        //                 })));
        //             }
        //         })
        //         .catch(() => {});

        //     setFieldValue("list", resetValue);
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.board.value]);

    /* mark selected labels */
    useEffect(() => {
        // setLabels(labels.map((label) => ({
        //     ...label,
        //     selected: values.labels.includes(label.value as never),
        // })));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.labels]);

    /* mark Selected members */
    useEffect(() => {
        // setMembers(members.map((member) => ({
        //     ...member,
        //     selected: values.members.includes(member.value as never)
        // })));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.members])

    if (loading) {
        return <PageLoading/>
    }

    if (error) {
        return <ErrorBlock errors={["An error occurred"]} />
    }

    return (
          <form onSubmit={handleSubmit}>
              <Label htmlFor="title" label="Title" required>
                  {/* <InputWithDisplay
                      type="text"
                      id="title"
                      {...getFieldProps("title")}
                      error={!!(touched.title && errors.title)}
                      placeholder="Enter title"
                      inputsize="small"
                  /> */}
              </Label>

              <Label label="Board" htmlFor="border" required>
                {/* <SingleSelect
                  required
                  label="Board"
                  options={boards}
                  value={values.board}
                  searchPlaceholder="Select value"
                  error={!!(touched.board && errors.board)}
                  onChange={(value: Option) => setFieldValue("board", value)}
                /> */}
              </Label>

              <Label label="Board" htmlFor="border" required>
                {/* <SingleSelect
                    required
                    label="List"
                    options={lists}
                    value={values.list}
                    searchPlaceholder="Select value"
                    error={!!(touched.list && errors.list)}
                    onChange={(value: Option) => setFieldValue("list", value)}
                /> */}
              </Label>

              <Label htmlFor="description" label="Description">
                  {/* <TextArea
                      placeholder="Enter description"
                      {...getFieldProps("description")}
                  /> */}
              </Label>

              <Label htmlFor="dueDate" label="Due Date">
                  {/* <DateInput
                      id="dueDate"
                      label="Due date"
                      error={!!(touched.dueDate && errors.dueDate)}
                      {...getFieldProps("dueDate")}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      onChange={(date: [Date]) => setFieldValue("dueDate", date[0])}
                  /> */}
              </Label>

              {values.board.value && (
                <Label htmlFor="labels" label="Labels">
                  {/* <Dropdown
                      fetchMoreText={"Fetch more"}
                      autoscrollText={"Autoscroll"}
                      selectedIcon={faCheck}
                      externalLinkIcon={faExternalLinkAlt}
                      placement="bottom-start"
                      options={labels}
                      onSelectOption={(option) => {
                          if (option.value) {
                              const newValue = values.labels.includes(option.value as never)
                                  ? values.labels.filter((labelId) => labelId !== option.value)
                                  : [...values.labels, option.value]

                              setFieldValue("labels", newValue);
                          }
                      }}
                      closeOnSelect={false}
                  >
                      {({ active, targetProps, targetRef }) => (
                          <Stack gap={6} wrap="wrap" align="baseline" style={{ marginBottom: 10 }}>
                              <ButtonUI
                                  id="labels"
                                  ref={targetRef}
                                  {...targetProps}
                                  active={active}
                                  text="Add"
                                  icon={faPlus}
                                  minimal
                              />
                              {labels.filter(({ selected }) => selected).map(({ label }) => label)}
                          </Stack>
                      )}
                  </Dropdown> */}
                </Label>
              )}

              <Label label="Members">
                {/* <Dropdown
                    fetchMoreText="Fetch more"
                    autoscrollText="Autoscroll"
                    selectedIcon={faCheck}
                    externalLinkIcon={faExternalLinkAlt}
                    placement="bottom-start"
                    searchPlaceholder="Select value"
                    options={members}
                    onSelectOption={(option) => {
                        if (option.value) {
                            const newValue = values.members.includes(option.value as never)
                                ? values.members.filter((labelId) => labelId !== option.value)
                                : [...values.members, option.value]

                            setFieldValue("members", newValue);
                        }
                    }}
                    closeOnSelect={false}
                >
                    {({ targetProps, targetRef }: DropdownTargetProps<HTMLDivElement>) => (
                        <Property
                            label="Members"
                            text={(
                                <DivAsInputWithDisplay
                                    ref={targetRef}
                                    {...targetProps}
                                    value={!values.members.length
                                        ? (
                                            <TSpan
                                                overflow={"ellipsis"}
                                                type={"p1"}
                                                style={{ color: lightTheme.colors.grey40 }}
                                            >
                                                Select value
                                            </TSpan>
                                        )
                                        : (
                                            <Stack gap={6} wrap="wrap">
                                                {members
                                                    .filter(({ selected }) => selected)
                                                    .map(({ label }) => label)
                                                }
                                            </Stack>
                                        )}
                                    placeholder="Select value"
                                    variant="inline"
                                />
                            )}
                        />
                    )}
                </Dropdown> */}
              </Label>

              <div className="flex justify-between">
                  <Button
                      type="submit"
                      text="Save"
                      disabled={isSubmitting}
                      loading={isSubmitting}
                  />
                  <Button
                      text="Cancel"
                      intent="secondary"
                      onClick={() => navigate(`${routes.CARD}/${card?.id}`)}
                  />
              </div>
          </form>
    );
};

export { EditCardPage };
