import { FC } from "react";
import styled from "styled-components";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { RoundedLabelTag, lightTheme, Icon, Stack, AnyIcon } from "@deskpro/deskpro-ui";

type Props = {
  href: string;
  icon?: AnyIcon;
};

const Container = styled(Stack)`
  align-items: center;
  padding: 2px;
`;

const Link = styled.a`
  display: inline-block;
  border-radius: 10px;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.colors.brandShade60};
`;

const BrandIcon = styled(Icon)`
  display: inline-block !important;
  padding: 0 6px 0 0;
  cursor: pointer;

  > svg {
    width: 12px;
    height: 12px;
    margin-top: -2px;
  }
`;

const CustomRoundedLabelTag = styled(RoundedLabelTag)`
  border-color: ${({ theme }) => theme.colors.brandShade20};
  &:hover {
    border-color: ${({ theme }) => theme.colors.brandShade60};
  }
`;

const ExternalIconLink: FC<Props> = ({ href, icon }) => {
  const theme = lightTheme;

  return (
    <Link target="_blank" href={href}>
      <CustomRoundedLabelTag
        size="small"
        withClose={false}
        backgroundColor={theme.colors.brandShade20}
        textColor={theme.colors.grey100}
        closeIcon={faArrowUpRightFromSquare}
        label={
          <Container gap={5}>
            {icon && <BrandIcon icon={icon} />}
            <Stack>
              <Icon icon={faArrowUpRightFromSquare} />
            </Stack>
          </Container>
        }
      />
    </Link>
  );
};

export { ExternalIconLink };
