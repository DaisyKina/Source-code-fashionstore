import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '../../services';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { saveToLocalStorage } from '../../utils';
import { login as loginAction } from '../../redux/actions/user'
import {AiFillFacebook, AiOutlineGooglePlus} from 'react-icons/ai'
import '../Login/login.css'

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onFinish = async (values) => {
        try {
            const username = form.getFieldValue("username")
            const password = form.getFieldValue("password")

            const result = await login(username, password)

            toast.success("Đăng nhập thành công")
            dispatch(loginAction(result.data?.user))
            saveToLocalStorage("user", JSON.stringify(result.data.user))
            saveToLocalStorage("token", JSON.stringify(result.data?.token))
            navigate("/dashboard")

        } catch (error) {
            console.log(error)
            toast.error("Đăng nhập thất bại")
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className='total'>
            <div>
                <h1 className='sign-in'>Log in</h1>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        
                        <div className='icons'>
                            <Checkbox className='checkbox'>Remember me</Checkbox>
                            <AiFillFacebook className='icon'/>
                            <AiOutlineGooglePlus className='icon'/>
                            
                        </div>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <div className='box-sign-in'>
                        <Button type="primary" htmlType="submit" className='sign-in-box'>
                            Sign in
                        </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
export default Login;