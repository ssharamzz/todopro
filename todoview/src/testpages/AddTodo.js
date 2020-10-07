import React from 'react';
import { Modal, Button, Form, Input, DatePicker, Select } from 'antd'

export default function AddTodo() {
    const [state, setState] = React.useState(true)

    const handleOk = e => {
        console.log('확인');
        setState(false);
    };

    const handleCancel = e => {
        console.log('취소');
        setState(false);
    }

    const validateMessages = {
        required: '${label}을 입력해주세요',
    };

    const onFinish = (values) => {
        console.log(values);
    };
    return (
        <>
        <Modal
          title="등록"
          visible={state}
          onOk={handleOk}
          onCancel={handleCancel}
        >
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
            </Form>
        </Modal>
      </>
    )
}