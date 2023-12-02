import React, { useEffect } from "react";
import CustomDropdown from "../../molecules/Dropdown";
import { Stack, styled, Box } from "@mui/material";
import Icon from "../../atoms/Icons";
import SwapIcon from "../../../../public/assets/icons/swap.svg";
import MuiTypography from "../../atoms/Typography";
import theme from "../../../theme";
import GridImage from "../../../../public/assets/icons/grid.svg";
import DownArrow from "../../../../public/assets/icons/down-arrow.svg";
import ListImage from "../../../../public/assets/icons/list.svg";
import DateSelector from "../../molecules/Calendar";
import { dropdownsConfig } from "../../../utils/constants";
import { useFilter } from "./hook";

const FilterWrapper = styled(Stack)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

const StyledStack = styled(Stack)({
  padding: "0px 1px",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  borderRadius: "4px",
  border: `1px solid ${theme.palette.grey[100]}`,
  backgroundColor: theme.palette.structural.background1,
});
const GridIcon = styled(Box)({
  display: "flex",
  padding: "5px 10px",
  borderRadius: "4px",
  gap: "10px",
  background: `${theme.palette.primary[100]}`,
});
const ListIcon = styled(Box)({
  display: "flex",
  padding: "6px 10px",
});
const SecondaryFilter = styled("div")({
  display: "flex",
  padding: "3px 8px",
  backgroundColor: theme.palette.structural.background1,
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  borderRadius: "4px",
  border: `1px solid ${theme.palette.grey[100]}`,
});
export type OnFilterChangeType = (newValues: {
  fileType: string;
  startDate: Date | null |string ;
  endDate: Date | null |string ;
  publishSetting: string;
}) => void;

interface FunctionalBarProps {
  onFilterChange?: OnFilterChangeType;
}
const FunctionalBar: React.FC<FunctionalBarProps> = ({ onFilterChange }) => {
  const {
    startDate,
    endDate,
    fileType,
    publishSetting,
    setFileType,
    setPublishSetting,
    handleStartDateSelect,
    handleEndDateSelect,
    handleDropdownChange,
  } = useFilter();

  useEffect(() => {
    onFilterChange?.({
      fileType,
      startDate,
      endDate,
      publishSetting,
    });
  }, [fileType, startDate, endDate, publishSetting]);

  return (
    <FilterWrapper direction="row">
      <Stack direction="row">
        <Stack direction="row" spacing="12px">
          <CustomDropdown
            placeholder={dropdownsConfig[0].placeholder}
            label={dropdownsConfig[0].label}
            menuItems={dropdownsConfig[0].menuItems}
            onChange={(value) => handleDropdownChange(value, setFileType)}
            value={fileType}
          />
          <Stack minWidth="10%">
            <DateSelector
              date={startDate}
              label="Start Date"
              setDate={handleStartDateSelect}
              data-testid="startDate"
            />
          </Stack>
          <Stack minWidth="10%">
            <DateSelector
              date={endDate}
              label="End Date"
              setDate={handleEndDateSelect}
              data-testid="endDate"
            />
          </Stack>

          <CustomDropdown
            placeholder={dropdownsConfig[1].placeholder}
            label={dropdownsConfig[1].label}
            menuItems={dropdownsConfig[1].menuItems}
            onChange={(value) => handleDropdownChange(value, setPublishSetting)}
            value={publishSetting}
          />
        </Stack>
      </Stack>
      <Stack direction="row" spacing="12px">
        <SecondaryFilter>
          <Stack
            direction="row"
            spacing="8px"
            alignItems="center"
            justifyContent="center"
          >
            <Icon src={SwapIcon} height="24px" width="24px" />
            <MuiTypography
              variant="body1"
              color={theme.palette.textColor.black}
              children="Most Relevant"
            />
            <Icon src={DownArrow} />
          </Stack>
        </SecondaryFilter>

        <StyledStack direction="row" alignItems={"flex-end"}>
          <GridIcon>
            <Icon src={GridImage} />
          </GridIcon>
          <ListIcon>
            <Icon src={ListImage} />
          </ListIcon>
        </StyledStack>
      </Stack>
    </FilterWrapper>
  );
};

export default FunctionalBar;
