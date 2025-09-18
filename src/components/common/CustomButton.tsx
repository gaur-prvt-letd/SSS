// src/components/common/Button.tsx
import { Button as MuiButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: Props) => {
  const theme = useTheme();

  return (
    <MuiButton
      onClick={onClick}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "&:hover": { backgroundColor: theme.palette.primary.dark },
      }}
    >
      {children}
    </MuiButton>
  );
};
