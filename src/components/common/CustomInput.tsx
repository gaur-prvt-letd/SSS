// src/components/common/Input.tsx
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, value, onChange }: Props) => {
  const theme = useTheme();

  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      sx={{
        "& label.Mui-focused": { color: theme.palette.primary.main },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
        },
      }}
      fullWidth
    />
  );
};
