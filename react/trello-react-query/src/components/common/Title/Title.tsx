import styled   from "styled-components";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AnyIcon, H1, Button, Stack } from "@deskpro/deskpro-ui";
import { ExternalIconLink } from "../ExternalIconLink";
import type { FC, ComponentType, ReactNode } from "react";

type Props = {
    title: string | ReactNode,
    onClick?: () => void,
    as?: ComponentType<unknown>|string,
    marginBottom?: number,

    link?: string,
    icon?: AnyIcon,
};

const Heading = styled(H1)`
    width: calc(100% - 50px);
`;

const Title: FC<Props> = ({
    title,
    onClick,
    as,
    marginBottom = 14,
    link,
    icon,
}) => (
    <Stack align="center" justify="space-between" gap={6} style={{ marginBottom }}>
        <Heading {...(as ? { as } : {})}>
            {title}&nbsp;
            {onClick && (
                <Button icon={faPlus} minimal noMinimalUnderline onClick={onClick} />
            )}
        </Heading>
        {link && <ExternalIconLink href={link} icon={icon}/>}
    </Stack>
);

export { Title };
