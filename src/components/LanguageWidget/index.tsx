import React from "react";
import { useTranslation } from "react-i18next";
import { Select, MenuItem, Box, SelectChangeEvent } from "@mui/material";
import { defaultTranslationModules } from "../../i18n";
const LanguageWidget = () => {
  const { t, i18n } = useTranslation();
  const allLanguages = defaultTranslationModules.map((lang) => lang.locale);
  const changeLanguageHandler = (event: SelectChangeEvent) => {
    const lang = event.target.value;
    i18n.changeLanguage(lang).then(() => {
      console.log("language changed to", lang);
    });
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
    >
      <Select
        labelId="select-language"
        value={i18n.language}
        label={t("language")}
        style={{ width: 100, color: "white", outline: "none" }}
        onChange={changeLanguageHandler}
        sx={{
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: 0,
            },
        }}
      >
        {" "}
        {allLanguages &&
          allLanguages.map((lang, index) => (
            <MenuItem
              key={`${lang}-${index}`}
              style={{ color: "black" }}
              value={lang}
            >
              {lang}
            </MenuItem>
          ))}
      </Select>
    </Box>
  );
};

export default LanguageWidget;
