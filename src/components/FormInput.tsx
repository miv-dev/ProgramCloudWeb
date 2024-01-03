import {
    FormHelperText,
    Typography,
    FormControl,
    Input as _Input,
    InputProps, TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
`;

type IFormInputProps = {
    name: string;
    label: string;
} & InputProps;

const FormInput: FC<IFormInputProps> = ({ name, label, ...otherProps }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    return(
        <Controller
            control={control}
            name={name}
            render={ ({field}) => (
                <TextField
                    {...field}
                    fullWidth
                    error={!!errors[name]}
                    helperText={errors[name] ? (errors[name]?.message as unknown as string) : ""}
                    label={label}
                    name={name}
                />
                )}
        />
        
    )
};

export default FormInput;