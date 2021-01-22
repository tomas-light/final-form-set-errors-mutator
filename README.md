# final-form-set-errors-mutator
 Mutator for setting form errors. 
 
 It allows you validate your form values outside of form (for example in redux-saga).

# Installation

```bush
npm install final-form-set-errors-mutator
```

# How to use

Add to form
```tsx
import { FormApi } from "final-form";
import React, { FunctionComponent } from "react";
import { Form, Field } from "react-final-form";
import { setErrors } from "final-form-set-errors-mutator";
import { ModelState } from "model-state-validation";

interface PasswordModel {
    password: string;
    confirmPassword: string;
}

interface IMyFormProps {
    submit: (model: PasswordModel, formApi: FormApi) => void;
}

const MyForm: FunctionComponent<IMyFormProps> = ({ submit }) => {
    return (
        <Form
            onSubmit={submit}
            mutators={{ setErrors }}
        >
            {({ handleSubmit }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <Field name="password">
                            {({ input, meta }) => (
                                <div>
                                    <label>Password</label>
                                    <input {...input} type="password"/>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="confirmPassword">
                            {({ input, meta }) => (
                                <div>
                                    <label>Confirm your password</label>
                                    <input {...input} type="password"/>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                    </form>
                );
            }}
        </Form>
    );
};


function* mySaga(action) {
    const { model, formApi } = action.payload;

    const modelState = validate(model);
    formApi.mutators.setErrors(modelState);
    if (modelState.isValid()) {
        // api request or something else
    }
}

function validate(model: PasswordModel): ModelState {
    const modelState = new ModelState();
    if (model.password !== model.confirmPassword) {
        modelState.addError(
            "confirmPassword",
            "Passwords are not equals."
        );
    }
    return modelState;
}
```
