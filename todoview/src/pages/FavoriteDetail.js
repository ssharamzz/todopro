import React from 'react';
import { Descriptions, Button, Modal, Form, Input, Select } from 'antd'
import { DeleteOutlined, ScissorOutlined } from '@ant-design/icons';
import API from 'pages/Api';
import { getToken } from 'account/Util';

export default function FavoriteDetail({history, match}) {

    const [favorite, setFavorite] = React.useState([])
    const [favgroup, setFavGroup] = React.useState([])

    const [form] = Form.useForm()
    
    const {params:{id}} = match;

    const [state, setState] = React.useState(false)

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const showModal = () => {
        setState(true)
        form.setFieldsValue({ name: favorite.name });
        form.setFieldsValue({ url: favorite.url });
        form.setFieldsValue({ memo: favorite.memo });
        form.setFieldsValue({ group: favorite.group });
    };

    const validateMessages = {
        required: '${label} 을/를 입력해주세요',
    };

    const onFinish = (values) => {
        setState(false)

        API.put("todopro/favorites/"+id+"/", values)
        .then(response=>{
            form.resetFields()
            return API.get("todopro/favorites/"+id+"/", {
                headers: {
                    Authorization: "JWT " + getToken()
                }
            });
        })
        .catch(error=>{
            console.error(error)
        }).then(res=>{
            setFavorite(res.data);

        });
    };
    const cancle = () => {
        setState(false)
    }

    const clickDel = () => {       
        API.delete("todopro/favorites/"+id+"/")
        .then(response=>{
            history.push("/favorites")
        })
        .catch(error=>{
            console.error(error)
        })
    }

    React.useEffect(()=> {
        API.get("todopro/favorites/"+id+"/", {
            headers: {
                Authorization: "JWT " + getToken()
            }
        })
        .then(response=>{
            const {data} = response
            setFavorite(data)
        })
        .catch(error=>{
            console.error(error)
        })
    },[])

    React.useEffect(()=> {
        API.get("todopro/fav_group/", {
            headers: {
                Authorization: "JWT " + getToken()
            }
        })
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
            <div id="detail_btn">
                <Button id="change" icon={<ScissorOutlined />} onClick={showModal}>수정</Button>
                <Button id="delete" icon={<DeleteOutlined />} onClick={clickDel}>삭제</Button>
            </div>
            <Descriptions title="즐겨찾기 상세" bordered>
                <Descriptions.Item label="SEQ">{favorite.seq}</Descriptions.Item>
                <Descriptions.Item label="NAME">{favorite.name}</Descriptions.Item>
                <Descriptions.Item label="GROUP">{favorite.group}</Descriptions.Item>
                <Descriptions.Item label="REG_DATE">{favorite.reg_date}</Descriptions.Item>
                <Descriptions.Item label="URL" span={2}>{favorite.url}</Descriptions.Item>
                <Descriptions.Item label="MEMO">{favorite.memo}</Descriptions.Item>
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
                        <Button type="primary" id="submit" htmlType="submit">수정</Button>
                        <Button id="cancle" onClick={cancle}>취소</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}