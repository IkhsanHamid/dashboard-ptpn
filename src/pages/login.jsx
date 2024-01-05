import { FormLogin } from "../components/Fragments/FormLogin"
import { AuthLayouts } from "../components/Layouts/AuthLayouts"

export const LoginPage = () => {
    return (
        <AuthLayouts title="Login" description="Welcome back, Please enter you details!" type="login">
            <FormLogin/>
        </AuthLayouts>
    )
}