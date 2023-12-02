import { Stack, styled } from "@mui/material";
import "../../organisms/SearchKeyword/style.css"
export interface HomeTemplateProps {
  header: React.ReactNode;
  sideBar: React.ReactNode;
  bodyContent: React.ReactNode;
}

const headerHeight = "60px";
const sideBarWidth = "82px";
const bodyContentWidth = `calc(100% - 82px)`;
const bodyHeight = `calc(100vh - 60px)`;

const HomeTemplate: React.FC<HomeTemplateProps> = (props) => {
  const { header, sideBar, bodyContent } = props;

  const HeaderWrapper = styled(Stack)({
    height: headerHeight,
    width: "100%",
  });

  const SideBarWrapper = styled(Stack)({
    width: sideBarWidth,
  });

  const BodyContentWrapper = styled(Stack)({
    width: bodyContentWidth,
    overflow:"auto"
  });

  return (
    <>
      <HeaderWrapper children={header} />
      <Stack direction={"row"} height={bodyHeight}>
        <SideBarWrapper children={sideBar} />
        <BodyContentWrapper children={bodyContent}  className="custom-scrollbar"/>
      </Stack>
    </>
  );
};

export default HomeTemplate;
