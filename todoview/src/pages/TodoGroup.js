import React from 'react';
import { List, Button, Modal, Form, Input } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import API from 'pages/Api';
import { getToken } from 'account/Util';


export default function Favorites() {

    const [todogroup, setTodoGroup] = React.useState([])

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
        console.log(values);
        setState(false)

        API.post("todopro/todo_group/", values)
        .then(response=>{
            return API.get("todopro/todo_group/");
        })
        .catch(error=>{
            console.error(error)
        }).then(res=>{
            console.log(res.data);

            setTodoGroup(res.data);

        });
    };
    const cancle = () => {
        setState(false)
        console.log('취소')
    }

    const clickDel = (e) => {        

        const {value, name:type} = e.target;

        if (type==="TODO_DELETE") {

            console.log('클릭클릭', value);
        
            API.delete("todopro/todo_group/"+value+"/")
            .then(response=>{
                return API.get("todopro/todo_group/");
            })
            .catch(error=>{
                console.error(error)
            }).then(res=>{
                console.log(res.data);

                setTodoGroup(res.data);

            });
        }
    }

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
            <div>
            <List
                    // itemLayout="horizontal"
                    dataSource={todogroup}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={item.name}
                        description= {<> {item.seq} / {item.reg_date}</>}
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
                        label="그룹명"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
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