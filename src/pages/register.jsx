import { FormRegister } from "../components/Fragments/FormRegister"
import { AuthLayouts } from "../components/Layouts/AuthLayouts"

export const RegisterPage = () => {
    return (
        <AuthLayouts title="Register" description="Welcome, Please enter you details!" type="sign-up">
            <FormRegister/>
        </AuthLayouts>
    )
}