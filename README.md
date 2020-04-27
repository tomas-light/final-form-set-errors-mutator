# final-form-set-errors-mutator
 Mutator for setting errors outside of form (for example in redux-saga)

# How to use

Add to form
```tsx
import { FormApi, FormSubscription } from "final-form";
import React, { FunctionComponent, useState, ChangeEvent } from "react";
import { Form, Field } from "react-final-form";
import { setErrors } from "final-form-set-errors-mutator";
import { TextField } from "mui-fields";
import { ModelState } from "model-state-validation";

export interface IMyFormProps {
    submit: (form: any) => void;
}

type Props = IMyFormProps;

const MyForm: FunctionComponent<Props> = (props) => {
    const [formApi, setFormApi] = useState<FormApi>(null);

    const formSubscription: FormSubscription = {
        submitting: true,
    };
    
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const modelState = new ModelState();
        if (event.target.value !== confirmPassword) {
            modelState.addError(
                "confirm-password",
                "Passwords are not equals."
            );
        }
        setPassword(event.target.value);

        formApi.mutators.setErrors(modelState);
    };

    const handleChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
        const modelState = new ModelState();
        if (password !== event.target.value) {
            modelState.addError(
                "confirmPassword",
                "Passwords are not equals."
            );
        }
        setConfirmPassword(event.target.value);

        formApi.mutators.setErrors(modelState);
    };

    return (
        <Form
            onSubmit={props.submit}
            subscription={formSubscription}
            mutators={[
                setErrors,
            ]}
        >
            {({ handleSubmit, form }) => {
                setFormApi(form);

                return (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name={"password"}
                            component={TextField}
                            type="password"
                            onChange={handleChangePassword}
                        />
                        <Field
                            name={"confirm-password"}
                            component={TextField}
                            type="password"
                            onChange={handleChangeConfirmPassword}
                        />
                    </form>
                );
            }}
        </Form>
    );
};

export { MyForm };

```
