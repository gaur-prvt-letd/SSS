// src/components/common/CustomInput.tsx
import { TextField, type TextFieldProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type CustomInputProps = Omit<TextFieldProps, "variant">;

export const Input = (props: CustomInputProps) => {
  const theme = useTheme();

  return (
    <TextField
      {...props}
      variant="outlined"
      sx={{
        "& label.Mui-focused": { color: theme.palette.primary.main },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
        },
        ...props.sx,
      }}
      fullWidth
    />
  );
};
