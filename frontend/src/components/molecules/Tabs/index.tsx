import React from "react";
import { Tabs, Tab, Box, styled } from "@mui/material";
import theme from "../../../theme";
import { MuiTabsProps } from "../../../utils/interfaces";

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.primary[500],
  },
});

const MuiTabs: React.FC<MuiTabsProps> = ({
  variant = "standard",
  tabNames,
  sxProps,
  isTabDisabled = false,
  onSelectTab,
  selectedTab,
  tabWidth,
  activeTabColor
}) => {
  const selectedTabIndex = tabNames.indexOf(selectedTab);

  const handleChange = (newValue: number) => {
    onSelectTab(tabNames[newValue]);
  };

  return (
    <Box
      sx={{
        width: "100%",
        ...sxProps,
        "& .MuiTab-root": {
          ...theme.typography.body1,
          color: theme.palette.textColor.mediumEmphasis, 
        },
      }}
      data-testid="mui-tabs"
    >
      <CustomTabs
        value={selectedTabIndex}
        onChange={(_, newValue) => handleChange(newValue)}
        variant={variant}
      >
        {tabNames.map((name) => (
          <Tab
            key={name}
            label={name}
            disabled={isTabDisabled}
            sx={{
              width: tabWidth,
              textTransform: "none",
              "&.Mui-selected": {
                color: activeTabColor ?? theme.palette.primary[500],
              },
            }}
          />
        ))}
      </CustomTabs>
    </Box>
  );
};

export default MuiTabs;
