import { Form, Input, Icon, Button, Row, Col, Select, InputNumber } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;

let id = 0;

const Layout1_8 = {
    xs: { span: 12, offset: 0 },
    sm: { span: 8, offset: 0 },
    md: { span: 6, offset: 0 },
    lg: { span: 5, offset: 0 },
    xl: { span: 3, offset: 0 },
    xxl: { span: 2, offset: 0 },
};

const Layout2_8 = {
    xs: { span: 12, offset: 0 },
    sm: { span: 8, offset: 0 },
    md: { span: 7, offset: 0 },
    lg: { span: 7, offset: 0 },
    xl: { span: 6, offset: 0 },
    xxl: { span: 5, offset: 0 },
};

const Layout3_8 = {
    xs: { span: 22, offset: 0 },
    sm: { span: 16, offset: 0 },
    md: { span: 12, offset: 0 },
    lg: { span: 11, offset: 0 },
    xl: { span: 10, offset: 0 },
    xxl: { span: 7, offset: 0 },
};



class DynamicFieldSet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index:[]
        }
    }

    removeReferencia(k) {
        const { form } = this.props;
        this.gzdadosfamiliar = []
        let indexArray = this.state.index;

        this.gzdadosfamiliar.splice(k, 1);
        const keys = form.getFieldValue('index');
        form.setFieldsValue({
            index: keys.filter(key => key !== k),
        });
    };

    componentDidMount() {
        //this.ngStoragePessoa = JSON.parse(localStorage.getItem('ngStorage-pessoa'));
        const { gzdadosfamiliar, form } = this.props
        this.id = 0;
        this.props.onRef(this)
        this.setState({})
        //this.addReferenciaFamiliar()
        
        let emptyArray = []
        //let index = form.getFieldValue('index');
        form.getFieldDecorator('idgrauparentesco', { initialValue: [] });
        form.getFieldDecorator('nome', { initialValue: [] });
        form.getFieldDecorator('ddd', { initialValue: [] });
        form.getFieldDecorator('telefone', { initialValue: [] });
        const dados = gzdadosfamiliar.map((dados, index) => {
            console.log(index)
            form.setFieldsValue({
                index: [...form.getFieldValue('index'), index],
                idgrauparentesco: [...form.getFieldValue('idgrauparentesco'), dados.idgrauparentesco],
                nome: [...form.getFieldValue('nome'), dados.nome],
                ddd: [...form.getFieldValue('ddd'), dados.ddd],
                telefone: [...form.getFieldValue('telefone'), dados.telefone]
            })
            console.log(dados)
            //this.addReferenciaFamiliar()
        })
    }

    addReferenciaFamiliar = (dados) => {
        const { form } = this.props;
        const index = form.getFieldValue('index');
        const nextIndex = index.concat(this.id++);
        form.setFieldsValue({
            index: nextIndex
        });
        //this.setState({ index: indexArray });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { index, idgrauparentesco, nome, ddd, telefone  } = values;
            console.log('Received values of form: ', values);
            console.log('Merged values:', index.map(key => {
                                                        let dados = {
                                                            idgrauparentesco: idgrauparentesco[key],
                                                            nome: nome[key],
                                                            ddd: ddd[key],
                                                            telefone: telefone[key]
                                                        }
                                                        return dados
                                                        }));
          }
        });
      };

    getFormReference = () => {
        return this.props.form;
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { parentesco } = this.props.formData;
        const { gzdadosfamiliar } = this.props
        const formItemLayout1 = {
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

        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        const number = this.state.number;
        const tips =
            'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.';

        getFieldDecorator('index', { initialValue: [] });
        const keys = getFieldValue('index');
        console.log(gzdadosfamiliar.length)
        const formItemsn = keys.map((k, index) => (
            <Row gutter={24} key={k}>
                <Col {...Layout2_8}>
                    <Form.Item label="Parentesco:">
                        {getFieldDecorator(`idgrauparentesco[${k}]`, {
                            initialValue: gzdadosfamiliar[index]
                                ? gzdadosfamiliar[index].idgrauparentesco
                                : null,
                            rules: [
                                {
                                    required: true,
                                    message: 'Campo obrigatório!',
                                },
                            ],
                        })(
                            <Select placeholder="Selecione parentesco">
                                {parentesco.map(option => {
                                    return (
                                        <Select.Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Select.Option>
                                    );
                                })}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
                <Col {...Layout3_8}>
                    <Form.Item label="Nome:">
                        {getFieldDecorator(`nome[${k}]`, {
                            initialValue: gzdadosfamiliar[index] ? gzdadosfamiliar[index].nome : null,
                            rules: [
                                {
                                    required: true,
                                    message: 'Campo obrigatório!',
                                },
                            ],
                        })(<Input type="string" placeholder="Nome completo"></Input>)}
                    </Form.Item>
                </Col>
                <span>
                    <Col {...Layout2_8}>
                        <InputGroup>
                            <Form.Item label="Telefone:">
                                {getFieldDecorator(`ddd[${k}]`, {
                                    initialValue: gzdadosfamiliar[index]
                                        ? gzdadosfamiliar[index].ddd
                                        : null,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Campo obrigatório!',
                                        },
                                    ],
                                })(<InputNumber
                                    className={"hide"}
                                    type="string"
                                    placeholder="(99)"
                                    style={{ width: '60px' }}
                                    maxLength={'2'}
                                    parser={value => value.replace(/[^0-9\-]/g, '').replace(/(\.*)\./g, '$1').replace(/\D/g, "")}
                                />)}
                                {getFieldDecorator(`telefone[${k}]`, {
                                        initialValue: gzdadosfamiliar[index]
                                            ? gzdadosfamiliar[index].telefone
                                            : null,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Campo obrigatório!',
                                            },
                                        ],
                                    })(<InputNumber
                                        className={"hide"}
                                        type="string"
                                        placeholder="99999-9999"
                                        style={{ width: '170px' }}
                                        maxLength={'9'}
                                        parser={value => value.replace(/[^0-9\-]/g, '').replace(/(\.*)\./g, '$1').replace(/\D/g, "")}
                                    />)}
                            </Form.Item>
                        </InputGroup>
                    </Col>
                </span>
                <br />
                {gzdadosfamiliar.length != 0 ? (
                    <Button
                        type="danger"
                        shape="circle"
                        icon="delete"
                        size="large"
                        onClick={() => {
                            // this.removeReferencia(index);
                            this.props.removeReferencia(k);
                        }}
                    />
                ) : (
                        <Button
                            type="danger"
                            shape="circle"
                            icon="delete"
                            size="large"
                            // disabled
                            onClick={() => {
                                // this.removeReferencia(index);
                                this.props.removeReferencia(k);
                            }}
                        />
                    )}
            </Row>
        ));
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItemsn}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.addReferenciaFamiliar} disabled={keys.length<2 ? false : true} style={{ width: '60%' }}>
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