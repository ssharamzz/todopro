import React from 'react';
import { Form, Input, Button, message } from 'antd';
import API from 'pages/Api'
import LoginContext from './Util'

export default function Login({history}) {

    const login = React.useContext(LoginContext)

    const [form] = Form.useForm()
    
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
      };

      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };

      const onFinish = values => {
        API.post("account/api-jwt-auth", values)
        .then(res=>{
            window.localStorage.setItem("token", res.data.token)
            login.setIsLogin(true)
            history.push("/fav_group")
        }).catch(error=>{
            message.info('아이디, 패스워드를 확인해주세요');
            console.error(error)
        })
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };

    return (
        <>
           <Form
            {...layout}
            name="basic"
            // initialValues={{ remember: true }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        로그인
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}