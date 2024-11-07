import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import { ButtonProps } from "../interfaces/form-control";

export default function BasicButtons(props: ButtonProps) {
  return (
    <Stack spacing={2} direction="row">
      <LoadingButton
        onClick={props.onClick}
        variant="contained"
        loading={props.isLoading}
      >
        {props.text}
      </LoadingButton>
    </Stack>
  );
}
