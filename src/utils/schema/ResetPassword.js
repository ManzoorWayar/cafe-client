import * as yup from "yup"
import Translate from "../../hooks/Translate";

const ResetPassword = yup.object().shape({
    newPassword: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='new-password' />)
        .min(8, <Translate validations='validations:min-character' name='new-password' value={8} />),

    confirmPassword: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='confirm-password' />)
        .oneOf([yup.ref("newPassword")], <Translate validations='validations:confirm-password' />),
});

export default ResetPassword