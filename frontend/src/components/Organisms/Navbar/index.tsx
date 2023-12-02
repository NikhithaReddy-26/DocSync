import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import theme from "../../../theme";
import { navBarSvgs, sidebarContent } from "../../../utils/constants";
import Icon from "../../atoms/Icons";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  width: "82px",
  background: theme.palette.grey[500],
  height: "100vh",
});

const sidebarContentList: {
  id: string;
  icon: string;
  content: string;
  glowicon?: string;
}[] = [
  {
    id: "home",
    icon: navBarSvgs.home,
    content: sidebarContent.home,
    glowicon: navBarSvgs.homeglow,
  },
  {
    id: "office",
    icon: navBarSvgs.office,
    content: sidebarContent.office,
    glowicon: navBarSvgs.office,
  },
  {
    id: "people",
    icon: navBarSvgs.people,
    content: sidebarContent.people,
    glowicon: navBarSvgs.people,
  },
  {
    id: "calendar",
    icon: navBarSvgs.calendar,
    content: sidebarContent.calendar,
    glowicon: navBarSvgs.calendar,
  },
  {
    id: "files",
    icon: navBarSvgs.files,
    content: sidebarContent.Files,
    glowicon: navBarSvgs.filesglow,
  },
  {
    id: "metrics",
    icon: navBarSvgs.metrics,
    content: sidebarContent.Metrics,
    glowicon: navBarSvgs.metrics,
  },
];
const BottomIcon = ({ icon }: { icon: string }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="76px"
    >
      <Icon src={icon} height="20px" width="20px" />
    </Box>
  );
};
interface SidebarProps{
  itemid?:string;
}
const Sidebar = ({itemid}:SidebarProps) => {
  const [selectedIcon,setSelectedIcon] = useState(itemid)
  const navigate = useNavigate(); 
  const onIconClick= (id: string)=> {
    setSelectedIcon(id);
    if(id=="home"){
      navigate("/home")
    }
    if(id=="files"){
      navigate("/viewpdf")
    }
  }
  return (
    <StyledBox>
      <Stack direction="column" alignItems="center">
        {sidebarContentList.map((item) => (
          <Stack
            key={item.id}
            id={item.id}
            direction="column"
            alignItems="center"
            width="82px"
            onClick={() => {
              onIconClick(item.id); 
            }}
            padding="15px 0"
            data-testid={`icon-${item.id}`}
            style={{
              cursor: item.id === 'home' || item.id === 'files' ? 'pointer' : 'default',
              backgroundColor:
                selectedIcon === item.id
                  ? theme.palette.grey[400]
                  : "transparent",
              color:
                selectedIcon === item.id
                  ? theme.palette.structural.background1
                  : theme.palette.grey[200],
            }}
          >
            <Icon
              src={selectedIcon === item.id ? item.glowicon : item.icon}
              height="20px"
              width="20px"
            />
            <Typography
              variant="body1"
              color={
                selectedIcon === item.id ? "white" : theme.palette.grey[200]
              }
            >
              {item.content}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <BottomIcon icon={navBarSvgs.settings} />
    </StyledBox>
  );
};

export default Sidebar;
