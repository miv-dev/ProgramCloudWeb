
import { object, string, TypeOf, ZodObject, ZodString, ZodTypeAny} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import { useLoginUserMutation } from '../redux/api/authApi';
import {Box, Container, Typography, Link as MuiLink, Card, CardContent} from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '../components/FormInput';
import {LoadingButton} from "@mui/lab";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const loginSchema = object({
    email: string()
        .min(1, 'Email address is required')
        .email('Email Address is invalid'),
    password: string()
        .min(1, 'Password is required')
        .min(4, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;


const LoginPage = () => {
    const methods = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    })
//
//    // 👇 API Login Mutation
    const [loginUser, { isLoading, isError, error, isSuccess }] =
        useLoginUserMutation();

    const navigate = useNavigate();
    const location = useLocation();

    const from = ((location.state as any)?.from.pathname as string) || '/';

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        if (isSuccess) {

            navigate(from);
        }
        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) =>
                    console.log(el.message)
                );
            } else {

            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
        // 👇 Executing the loginUser Mutation
        loginUser(values);
    };
//
    return (
        <Container
            maxWidth={false}
            sx={{display: 'grid', placeItems: 'center', height: '100vh'}}
            >
            <Box
                sx={{
                display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
            }}  >
                <FormProvider {...methods}>
                    <Card>
                        <CardContent>
                            <Box
                                component='form'
                                onSubmit={handleSubmit(onSubmitHandler)}
                                noValidate
                                width='100%'
                                maxWidth='300px'
                                 >
                                <FormInput name='email' label='Email Address' type='email' />
                                <FormInput name='password' label='Password' type='password' />
                                <LoadingButton loading={isLoading} type='submit' variant="contained">Login</LoadingButton>
                            </Box>
                        </CardContent>
                    </Card>
                </FormProvider>
            </Box>
        </Container>
    )
};

export default LoginPage;

