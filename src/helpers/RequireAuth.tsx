import {Navigate, Outlet, useLocation } from "react-router-dom"
import {useAppSelector} from "../redux/store";

const RequireAuth = () => {
    const token = useAppSelector((state) => state.userState.token)
    const location = useLocation()

    return (
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
            )
}
export default RequireAuth