import { Form, Input, Icon, Button, Row, Col } from 'antd';
const Group = Input.Group;

let id = 0;

class DynamicFieldSet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.array.map(obj => {
                const objKeys = Object.keys(obj);
                return objKeys.map(itemKey => {
                    return {
                        itemKey,
                        itemValue: obj[itemKey]
                    };
                });
            })
        }
        console.log(this.state.data)
    }

    remove = index => {
        const { form } = this.props;
        console.log(index)
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        let keyRemoved = keys.splice(index, 1);
        form.setFieldsValue({
            keys: keys,
        });
    };

    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { keys, names, cities } = values;
                console.log('Received values of form: ', values);
                console.log('Merged values:', keys.map((key) => {
                    let object = {
                        name: names[key],
                        city: cities[key]
                    }
                    return object
                }));
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 10 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 45 },
                sm: { span: 40 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 15, offset: 0 },
                sm: { span: 10, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Group key={k}>
                <Row gutter={8}>
                    <Col span={10}>
                        <Form.Item
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? 'Passengers' : ''}
                            required={false}
                            
                        >
                            {getFieldDecorator(`names[${k}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input passenger's name or delete this field.",
                                    },
                                ],
                            })(<Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />)}
                        </Form.Item>

                    </Col>
                    <Col span={10}>
                        <Form.Item
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? 'Cities' : ''}
                            required={false}
                            key={k}
                        >
                            {getFieldDecorator(`cities[${k}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input cities.",
                                    },
                                ],
                            })(<Input placeholder="city name" style={{ width: '60%', marginRight: 8 }} />)}
                            {keys.length > 1 ? (
                                <Icon
                                    className="dynamic-delete-button"
                                    type="minus-circle-o"
                                    onClick={() => {
                                        console.log(index)
                                        this.remove(index)
                                    }}
                                />
                            ) : null}
                        </Form.Item>

                    </Col>
                </Row>
            </Group>


        ));
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> Add field
          </Button>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit">
                        Submit
          </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedDynamicFieldSet = Form.create({
    name: 'dynamic_form_item',
    onFieldsChange(props, changedFields) {
        let values = props.form.getFieldsValue()
        console.log(values)
        props.onChange(changedFields);
    },
})(DynamicFieldSet);
export default WrappedDynamicFieldSet