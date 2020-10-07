import React from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd'

export default function AddTodo() {
    // const layout = {
    //     labelCol: {
    //       span: 8,
    //     },
    //     wrapperCol: {
    //       span: 16,
    //     },
    //   };

    const validateMessages = {
        required: '${label}을 입력해주세요',
      };

      const onFinish = (values) => {
        console.log(values);
      };
    return (
        <>
            <div id="add_title">등록</div>
            <Form onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name={'name'}
                    label="명칭"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item 
                    name={'status'}
                    label="상태" 
                    rules={[
                    {
                        required: true,
                    },
                    ]}>
                    <Select>
                        <Select.Option value="pending">할일</Select.Option>
                        <Select.Option value="inprogress">진행중</Select.Option>
                        <Select.Option value="end">완료</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item 
                    name={'end_date'}
                    label="종료일" 
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item 
                    name={'group'}
                    label="그룹" 
                    rules={[
                    {
                        required: true,
                    },
                    ]}>
                    <Select>
                        <Select.Option value="1">그룹1</Select.Option>
                        <Select.Option value="2">그룹2</Select.Option>
                        <Select.Option value="3">그룹3</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" id="submit" htmlType="submit">등록</Button>
                    <Button id="cancle">취소</Button>
                </Form.Item>

            </Form>
        </>
    )
}