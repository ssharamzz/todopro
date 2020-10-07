import React from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Modal, Form, Input, DatePicker, Select } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import API from 'pages/Api';
import { getToken } from 'account/Util';


export default function Todos() {

    const [todogroup, setTodoGroup] = React.useState([])
    const [todos, setTodos] = React.useState({
        pending: [],
        inprogress: [],
        end: []
    });

    const [state, setState] = React.useState(false)

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const showModal = () => {
        setState(true)
    };

    const validateMessages = {
        required: '${label} 을/를 입력해주세요',
    };

    const onFinish = (values) => {
        setState(false)
        values.end_date = values.end_date.toISOString().slice(0,10)

        API.post("todopro/todos/", values)
        .then(response=>{
            return API.get("todopro/todo", {
                headers: {
                    Authorization: "JWT " + getToken()
                }
            });
        })
        .catch(error=>{
            console.error(error)
        })
        .then(res=>{
            setTodos({
                pending:res.data.pending,
                inprogress:res.data.inprogress,
                end:res.data.end
            });

        });
    };
    const cancle = () => {
        setState(false)
    }


    const clickDel = (e) => {       
        const {value, name:type} = e.target;

        if (type==="TODO_DELETE") {

            API.delete("todopro/todos/"+value+"/")
            .then(response=>{
                return API.get("todopro/todo", {
                    headers: {
                        Authorization: "JWT " + getToken()
                    }
                });
            })
            .catch(error=>{
                console.error(error)
            }).then(res=>{
                setTodos({
                    pending:res.data.pending,
                    inprogress:res.data.inprogress,
                    end:res.data.end
                });

            });
        }
    }

    React.useEffect(()=> {
        API.get("todopro/todo", {
            headers: {
                Authorization: "JWT " + getToken()
            }
        })
        .then(response=>{
            setTodos(prev => ({
                ...prev,
                pending:response.data.pending,
                inprogress:response.data.inprogress,
                end:response.data.end
            }));
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
            <div id="add_btn">
                <Button id="todo_add" onClick={showModal}>+ 추가</Button>
            </div>
            <div id="pending">
                <List
                    header = {<div>할일</div>}
                    dataSource={todos.pending}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={<Link to={"/todos/"+item.seq}>{item.name}</Link>}
                        description= {<> {item.group_name} / {item.reg_date} </>}
                        // <DeleteOutlined />
                        />
                        <Button id="del_btn" icon={<DeleteOutlined />} onClick={clickDel} value={item.seq} name="TODO_DELETE"/>
                    </List.Item>
                    )}
                />
            </div>
            <div id="inprogress">
                <List
                    header = {<div>진행중</div>}
                    dataSource={todos.inprogress}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={<Link to={"/todos/"+item.seq}>{item.name}</Link>}
                        description= {<> {item.group_name} / {item.reg_date} </>}
                        // <DeleteOutlined />
                        />
                        <Button id="del_btn" icon={<DeleteOutlined />} onClick={clickDel} value={item.seq} name="TODO_DELETE"/>
                    </List.Item>
                    )}
                />
            </div>
            <div id="end">
                <List
                    header = {<div>종료</div>}
                    dataSource={todos.end}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={<Link to={"/todos/"+item.seq}>{item.name}</Link>}
                        description= {<> {item.group_name} / {item.reg_date} </>}
                        // <DeleteOutlined />
                        />
                        <Button id="del_btn" icon={<DeleteOutlined />} onClick={clickDel} value={item.seq} name="TODO_DELETE"/>
                    </List.Item>
                    )}
                />
            </div>


            <Modal
                title="등록"
                visible={state}
                footer={null}
            >
                <Form {...layout} onFinish={onFinish} validateMessages={validateMessages}>
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