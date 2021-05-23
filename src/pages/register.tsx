import React from 'react'
import { Field, Form, Formik } from 'formik';
import { Button, Box } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

interface RegisterProps {

}

const Register: React.FC<RegisterProps> = ({ }) => {
    const [, register] = useRegisterMutation();

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register(values);
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors));
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field name="username" validate={null}>
                            {({ field, form }) => (
                                <InputField name='username' placeholder='username' label='Username' />
                            )}
                        </Field>
                        <Box mt={4}>
                            <Field name="password">
                                {({ field, form }) => (
                                    <InputField name='password' placeholder='password' label='Password' type="password" />
                                )}
                            </Field>
                        </Box>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Register
            </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register;