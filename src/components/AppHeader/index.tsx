import { Grow, Box, Theme, Toolbar, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../api/services/User/store";
import AvatarMenu from "../AvatarMenu";
import Countdown from "../Countdown";
import LanguageWidget from "../LanguageWidget";

interface AppBarProps extends MuiAppBarProps {
  theme?: Theme;
}

interface AppHeaderProps {
  user: User;
  pageTitle: string;
}

const typoStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  lineHeight: 1,
};

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  height: theme.tokens.header.height,
}));

const AppHeader = React.forwardRef(
  (props: AppHeaderProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { user, pageTitle } = props;
    const { t } = useTranslation("app");
    const theme = useTheme();

    return (
      <AppBar ref={ref} position="fixed" sx={{ width: "100vw" }}>
        <Toolbar sx={{ background: "#08140C 0% 0% no-repeat padding-box" }}>
          <Box
            sx={{
                ...typoStyle,
              width: "100%",
              flexDirection: "row",
                alignItems: "center",
            }}
          >
            <Countdown />
            <Box
              sx={{
                  ...typoStyle,
                flexGrow: 1,
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  ...typoStyle,
                  color: theme.palette.primary.main,
                  mb: theme.spacing(0.5),
                }}
                variant="h6"
                component="div"
              >
                {t("appTitle").toLocaleUpperCase()}
              </Typography>
              <Typography
                sx={{ ...typoStyle }}
                variant="overline"
                component="div"
                noWrap
              >
                {pageTitle.toLocaleUpperCase()}
              </Typography>
            </Box>
            <LanguageWidget />
            <Box
              sx={{
                  ...typoStyle,
                  justifyContent: "flex-end",
              }}
            >
              {user && user.eMail && (
                <Grow in={Boolean(user && user.eMail)}>
                  <AvatarMenu user={user} />
                </Grow>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
);

export default AppHeader;
