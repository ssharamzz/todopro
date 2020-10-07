import React from 'react';
import { Descriptions, Badge, Button, Modal, Form, Input, Select, DatePicker } from 'antd'
import { DeleteOutlined, ScissorOutlined } from '@ant-design/icons';
import API from 'pages/Api';
import { getToken } from 'account/Util';

export default function TodoDetail({history, match}) {
    const [todo, setTodo] = React.useState([])
    const [todogroup, setTodoGroup] = React.useState([])
    const [badge, setBadge] = React.useState('')
    const [state, setState] = React.useState(false)

    const {params:{id}} = match;
    const [form] = Form.useForm()

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const showModal = () => {
        setState(true)
        form.setFieldsValue({ name: todo.name });
        form.setFieldsValue({ status: todo.status });
        // form.setFieldsValue({ end_date: todo.end_date });
        form.setFieldsValue({ group: todo.group });
    };

    const validateMessages = {
        required: '${label} 을/를 입력해주세요',
    };

    const onFinish = (values) => {
        setState(false)
        values.end_date = values.end_date.toISOString().slice(0,10)
        API.put("todopro/todos/"+id+"/", values)
        .then(response=>{
            form.resetFields()
            return API.get("todopro/todos/"+id+"/", {
                headers: {
                    Authorization: "JWT " + getToken()
                }
            });
        })
        .catch(error=>{
            console.error(error)
        }).then(res=>{
            setTodo(res.data);
            if(res.data.status === "pending"){
                setBadge('green')
            }else if(res.data.status === "inprogress"){
                setBadge('processing')
            }else if(res.data.status === "end"){
                setBadge('default')
            }
        });
    };
    const cancle = () => {
        setState(false)
    }

    const clickDel = () => {       
        API.delete("todopro/todos/"+id+"/")
        .then(response=>{
            history.push("/todos")
        })
        .catch(error=>{
            console.error(error)
        })
    }

    React.useEffect(()=> {
        API.get("todopro/todos/"+id+"/", {
            headers: {
                Authorization: "JWT " + getToken()
            }
        })
        .then(response=>{
            const {data} = response
            setTodo(data)
            if(data.status === "pending"){
                setBadge('green')
            }else if(data.status === "inprogress"){
                setBadge('processing')
            }else if(data.status === "end"){
                setBadge('default')
            }
        })
        .catch(error=>{
            console.error(error)
        })
    },[])

    React.useEffect(()=> {
        API.get("todopro/todo_group/", {
            headers: {
                Authorization: "JWT " + getToken()
            }
        })
        .then(response=>{
            const {data} = response
            setTodoGroup(data)
        })
        .catch(error=>{
            console.error(error)
        })
    },[])

    return (
        <>
            <div id="detail_btn">
                <Button id="change" icon={<ScissorOutlined />} onClick={showModal}>수정</Button>
                <Button id="delete" icon={<DeleteOutlined />} onClick={clickDel}>삭제</Button>
            </div>

            <Descriptions title="할일 상세" bordered>
            <Descriptions.Item label="SEQ">{todo.seq}</Descriptions.Item>
                <Descriptions.Item label="GROUP"span={2}>{todo.group_name}</Descriptions.Item>
                
                <Descriptions.Item label="NAME">{todo.name}</Descriptions.Item>
                    <Descriptions.Item label="Status" span={2}>
                        <Badge status={badge} text={todo.status} />
                    </Descriptions.Item>
                <Descriptions.Item label="REG_DATE">{todo.reg_date}</Descriptions.Item>
                <Descriptions.Item label="END_DATE" span={2}>{todo.end_date}</Descriptions.Item>
            </Descriptions>

            <Modal
                title="수정"
                visible={state}
                footer={null}
            >
                <Form {...layout} form={form} onFinish={onFinish} validateMessages={validateMessages}>
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
                            {todogroup.map((v) =>
                                <Select.Option value={v.seq}>{v.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" id="submit" htmlType="submit">등록</Button>
                        <Button id="cancle" onClick={cancle}>취소</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}