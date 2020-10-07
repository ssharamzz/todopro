import React from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Modal, Form, Input, Select } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import API from 'pages/Api';
import { getToken } from 'account/Util';

export default function Favorites() {

    const [favorites, setFavorites] = React.useState([])
    const [favgroup, setFavGroup] = React.useState([])

    const [state, setState] = React.useState(false)

    const [form] = Form.useForm()

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

        API.post("todopro/favorites/", values)
        .then(response=>{
            form.resetFields()
            return API.get("todopro/favorites/", {
                headers: {
                    Authorization: "JWT " + getToken()
                }
            });
        })
        .catch(error=>{
            console.error(error)
        }).then(res=>{
            setFavorites(res.data);

        });
    };
    const cancle = () => {
        setState(false)
        console.log('취소')
    }

    const clickDel = (e) => {        

        const {value, name:type} = e.target;

        if (type==="FAV_DELETE") {

            console.log('클릭클릭', value);
        
            API.delete("todopro/favorites/"+value+"/")
            .then(response=>{
                return API.get("todopro/favorites/", {
                    headers: {
                        Authorization: "JWT " + getToken()
                    }
                });
            })
            .catch(error=>{
                console.error(error)
            }).then(res=>{
                console.log(res.data);

                setFavorites(res.data);

            });
        }
    }

    React.useEffect(()=> {
        API.get("todopro/favorites/", {
            headers: {
                Authorization: "JWT " + getToken()
            }
        })
        .then(response=>{
            const {data} = response
            setFavorites(data)
        })
        .catch(error=>{
            console.error(error)
        })
    },[])

    React.useEffect(()=> {
        API.get("todopro/fav_group/")
        .then(response=>{
            const {data} = response
            setFavGroup(data)
        })
        .catch(error=>{
            console.error(error)
        })
    },[])

    return (
        <>
            <div id="add_btn">
                <Button id="fav_add" onClick={showModal}>+ 추가</Button>
            </div>
            <div>
            <List
                    // itemLayout="horizontal"
                    dataSource={favorites}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={<Link to={"/favorites/"+item.seq}>{item.name}</Link>}
                        description= {<> {item.seq} / {item.memo} / {item.url }</>}
                        // <DeleteOutlined />
                        />
                        <Button id="del_btn" icon={<DeleteOutlined />} onClick={clickDel} value={item.seq} name="FAV_DELETE"/>
                    </List.Item>
                    )}
                />
            </div>

            <Modal
                title="등록"
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
                        name={'url'}
                        label="url" 
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        name={'memo'}
                        label="memo" 
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item 
                        name={'group'}
                        label="그룹" 
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                        >
                        <Select>
                            {favgroup.map((v) =>
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