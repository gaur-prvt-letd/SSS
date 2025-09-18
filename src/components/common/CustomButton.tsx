// src/components/common/CustomButton.tsx
import { Button as MuiButton, type ButtonProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type CustomButtonProps = ButtonProps;

export const Button = (props: CustomButtonProps) => {
  const theme = useTheme();
  const { sx, ...rest } = props;

  return (
    <MuiButton
      {...rest}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "&:hover": { backgroundColor: theme.palette.primary.dark },
        ...sx,
      }}
    />
  );
};
