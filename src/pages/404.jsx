import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div>
            <h1>Ooopss!</h1>
            <p>Sorry, an unexpected error has occured</p>
            <p>
                {error.statusText || error.message}
            </p>
        </div>
    )
}