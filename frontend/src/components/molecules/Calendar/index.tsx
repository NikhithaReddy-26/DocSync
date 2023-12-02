import React, { useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Close, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Popover } from "@mui/material";
import theme from "../../../theme";
import TypographyComponent from "../../atoms/Typography";
import { DAY, DAYS_OF_WEEK } from "../../../utils/constants";
import { CalendarProps } from "../../../utils/interfaces";
const dateCalendarStyles = {
  ".MuiPickersCalendarHeader-root": {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    borderBottom: `0.5px solid #454545`,
    paddingBottom: "12px",
  },
  ".MuiPickersCalendarHeader-root:first-child": {
    border: 0,
    paddingRight: "20px",
    paddingLeft: "20px",
  },
  ".MuiPickersArrowSwitcher-root": {
    display: "flex",
    marginLeft: "-12px",
  },
  ".MuiPickersCalendarHeader-label": {
    textAlign: "center",
    color: theme.palette.textColor.white,
  },
  ".MuiPickersArrowSwitcher-spacer": {
    width: "250px",
  },
  ".css-31ca4x-MuiPickersFadeTransitionGroup-root": {
    display: "flex",
    position: "absolute",
    paddingLeft: "100px",
  },
  ".MuiPickersFadeTransitionGroup-root-MuiDateCalendar-viewTransitionContainer":
    {
      borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
  ".MuiPickersArrowSwitcher-button": {
    paddingRight: "7px",
    color: theme.palette.grey[100],
  },
  ".MuiDayCalendar-weekDayLabel": {
    color: theme.palette.textColor.white,
  },
  ".MuiPickersDay-root": {
    color: theme.palette.textColor.white,
  },
  ".MuiPickersDay-today": {
    background: theme.palette.grey[300],
    borderRadius: "2px",
    color: theme.palette.textColor.white,
  },
  ".MuiButtonBase-root.MuiPickersDay-root:not(.Mui-selected)": {
    border: 0,
  },
  ".MuiPickersDay-root.Mui-disabled:not(.Mui-selected)": {
    color: theme.palette.textColor.lowEmphasis,
  },
  ".MuiPickersDay-dayOutsideMonth": {
    color: theme.palette.textColor.lowEmphasis,
  },
  '.css-7se398-MuiPickersCalendarHeader-labelContainer': {
    marginLeft: '2rem'
},
'.css-1bx5ylf': {
  display: 'block',
  position: 'absolute',
  margin: '30%'
},
  background: theme.palette.grey[400],
  marginTop: "12px",
  border: `1px solid ${theme.palette.grey[100]}`,
};

const DateSelector = (props: CalendarProps) => {
  const { label, date, setDate } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const wrapperStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    height:"18px",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "4px",
    border:
      date === ""
        ? `1px solid ${theme.palette.grey[100]}`
        : `1px solid ${theme.palette.primary[100]}`,
    background:
      date === "" ? theme.palette.textColor.white : theme.palette.primary[100],
  };
  const togglePopover = () => {
    setAnchorEl((prevAnchorEl) => (prevAnchorEl ? null : divRef.current));
  };

  const closeClickHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDate("");
    setAnchorEl(null);
  };

  const dayOfWeekFormatter = (dayOfWeek: string) =>
    DAYS_OF_WEEK.get(dayOfWeek) ?? "";

  const handleDateCalendarChange = (value: string | null) => {
    if (value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const monthName = new Intl.DateTimeFormat("en", { month: "long" }).format(
        date
      );
      const day = date.getDate();
      const dayOfWeek = date.toLocaleDateString("en", { weekday: "short" });

      setDate(`${dayOfWeekFormatter(dayOfWeek)} ${day} ${monthName} ${year}`);
      setAnchorEl(null);
    }
  };

  const getIcon = () => {
    if (date === "") {
      return anchorEl !== null ? (
        <ExpandLess data-testid="expand-less-icon" />
      ) : (
        <ExpandMore onClick={togglePopover} data-testid="expand-more-icon" />
      );
    } else {
      return <Close onClick={closeClickHandler} data-testid="icon" />;
    }
  };

  return (
    <>
      <div
        ref={divRef}
        style={wrapperStyle}
        onClick={togglePopover}
        data-testid="date-selector-wrapper"
      >
        <TypographyComponent
          variant="body1"
          color={date === "" ? "initial" : theme.palette.textColor.black}
        >
          {date === "" ? label : date}
        </TypographyComponent>
        {getIcon()}
      </div>
      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        anchorEl={divRef.current}
        PaperProps={{
          sx: {
            boxShadow: "none",
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            onChange={handleDateCalendarChange}
            sx={dateCalendarStyles}
            views={[DAY]}
            disableFuture
            showDaysOutsideCurrentMonth
            dayOfWeekFormatter={dayOfWeekFormatter}
          />
        </LocalizationProvider>
      </Popover>
    </>
  );
};

export default DateSelector;
