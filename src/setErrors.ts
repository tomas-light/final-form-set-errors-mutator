import { ModelState } from "model-state-validation";
import { MutableState, Mutator } from "final-form";

const setErrors: Mutator = (args: any[], state: MutableState<any>) => {
    const modelState: ModelState = args[0];
    state.formState.errors = modelState.getErrors();
    state.formState.lastSubmittedValues = state.formState.values;
};

export { setErrors };
