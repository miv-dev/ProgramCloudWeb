

import { useLoginUserMutation } from '../redux/api/authApi';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




const LoginPage = () => {

    const [loginUser, { isLoading, isError, error, isSuccess }] =
        useLoginUserMutation();

    const navigate = useNavigate();
    const location = useLocation();



//
    return (
        <div>

        </div>
    )
};

export default LoginPage;

