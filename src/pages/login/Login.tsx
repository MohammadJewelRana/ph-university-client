import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
 
 
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppDispatch } from '../../redux/features/hooks';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { verifyToken } from '../../utils/verifyToken';
import { setUser, TUser } from '../../redux/features/auth/authSlice';
import PhForm from '../../components/form/PhForm';
import PHInput from '../../components/form/PHInput';
 

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     userId: 'A-0002',
  //     password: 'admin123',
  //   },
  // });

  const defaultValues = {}
 

  // const defaultValues = {
  //   userId: 'A-0002',
  //   password: 'admin123',
  // };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading('Logging in');

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success('Logged in', { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <PhForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="userId" label="ID:" />
        <PHInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </PhForm>
    </Row>
  );
};

export default Login;