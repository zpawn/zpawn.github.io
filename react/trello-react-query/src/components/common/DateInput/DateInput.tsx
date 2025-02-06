import styled from "styled-components";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Flatpickr from "react-flatpickr";
import { Input, lightTheme } from "@deskpro/deskpro-ui";
import { DateInputStyles } from "./styles";
import type { FC } from "react";
import type { AnyIcon } from "@deskpro/deskpro-ui";
import type { DateTimePickerProps } from "react-flatpickr";

export type Props = DateTimePickerProps & {
  id: string;
  error: boolean,
  placeholder?: string,
  enableTime?: boolean,
  onChange?: (dates: Date[]) => void,
}

const StyledInput = styled(Input)`
  :read-only {
    cursor: pointer;
  }
`;

const DateInput: FC<Props> = ({
  id,
  error,
  value,
  onChange,
  enableTime,
  placeholder = "Select value",
}) => {
  return (
    <>
      <DateInputStyles/>
      <Flatpickr
        options={{
          position: "auto",
          dateFormat: "j M Y",
          ...(!enableTime ? {} : {
            dateFormat: "j M Y H:i",
            minuteIncrement: 5,
            enableTime: true,
            time_24hr: true,
          }),
        }}
        value={value}
        defaultValue=""
        onChange={(dates: Date[]) => {
          onChange && onChange(dates);
        }}
        render={({ defaultValue, ...props }, ref) => (
          <StyledInput
            {...props}
            id={id}
            ref={ref}
            variant="inline"
            inputsize="small"
            placeholder={placeholder}
            defaultValue={defaultValue || ''}
            error={error}
            style={{ paddingRight: 0 }}
            rightIcon={{
              icon: faCalendarDays as AnyIcon,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              style: {
                color: lightTheme.colors.grey40,
              }
            }}
          />
        )}
      />
    </>
  )
};

export { DateInput };
