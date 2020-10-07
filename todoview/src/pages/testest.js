const {  Modal, Button, Form, Input, InputNumber, DatePicker, Select  } = antd;

class App extends React.Component {

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <>
        <Button onClick={showModal}>
          추가
        </Button>
        <Modal
          title="등록"
          visible={this.state.visible}
        >
          <Form>
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
    );
  }
}

ReactDOM.render(<App />, mountNode);