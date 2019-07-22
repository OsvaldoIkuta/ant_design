import { Button, Select, Spin, Form, Input, Icon, Checkbox, DatePicker, Row, Col,InputNumber } from 'antd'
import latinize from 'latinize';
import { moneyInput, percentInput } from "../../../utils/inputFormat"
import moment from "moment"
const Group = Input.Group;

const { Option } = Select;

const BasicForm = Form.create({
	name: 'global_state',
	onFieldsChange(props, changedFields) {
		props.onChange(changedFields);
	},
	mapPropsToFields(props) {
		return {
			money: Form.createFormField({
				...props.money,
				value: moneyInput(props.money.value),
			}),
			number: Form.createFormField({
				...props.number,
				value: props.number.value,
			}),
			date: Form.createFormField({
				...props.date,
				value: moment(props.date.value, "YYYY-MM-DD"),
			}),
			percent: Form.createFormField({
				...props.percent,
				value: percentInput(props.percent.value),
			}),
			myA: Form.createFormField({
				...props.myA,
				value: props.myA.value,
			}),
			myB: Form.createFormField({
				...props.myB,
				value: props.myB.value,
			}),
		};
	},
	onValuesChange(_, values) {
		console.log(values);
	}
})(class BasicForm extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		data: [
			{
				id: 1,
				text: "Osvaldo Ikuta"
			},
			{
				id: 2,
				text: "Tiago Faxina "
			}, ,
			{
				id: 3,
				text: "Edson Macoto"
			},
		],
		value: [],
		fetching: false,
		myValidateHelp: "",
		myValidateStatus: ""
	};

	handleChange = value => {
		this.setState({ value: value })
	};

	onSearch = (value) => {
		this.setState({ value: value.toUpperCase() })
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					myValidateHelp: "",
					myValidateStatus: ""
				});

				console.log("Received values of form: ", values);
			} else {
				console.log(err);
				if (err.myA || err.myB) {
					this.setState({
						myValidateHelp: "Please enter A and B",
						myValidateStatus: "error"
					});
				}
			}
		});
	};

	numberValidator = form => (rule, value, callback) => {
		const { getFieldValue } = form; // this line changed
		console.log(value);
		let b = getFieldValue("myB");
		if (value.length > 0 && b.length > 0 && value != undefined) {
			this.setState({
				myValidateHelp: "",
				myValidateStatus: ""
			});
		} else {
			this.setState({
				myValidateHelp: "Please enter A and B",
				myValidateStatus: "error"
			});
		}
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { money, percent, number } = this.props
		const { myValidateHelp, myValidateStatus, fetching, data, value } = this.state;
		const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
		return (
			<div>
				<Button>Top</Button>

				<Select
					showSearch
					value={value}
					notFoundContent={fetching ? <Spin size="small" /> : null}
					onChange={this.handleChange}
					style={{ width: '100%' }}
					optionFilterProp="children"
					filterOption={(input, option) => {
						let lat = latinize(input)
						return option.props.children.toLowerCase().indexOf(lat.toLowerCase()) >= 0
					}}
					formatter={(value) => value.toUpperCase()}
					placeholder="Select users"
				>
					{data.map(d => (
						<Option key={d.id}>{d.text}</Option>
					))}
				</Select>

				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						{getFieldDecorator("money", {
							rules: [{ required: true, message: "Please input your money!" }]
						})(
							<Input
								maxLength={17}
								prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
								placeholder="Money"
							/>
						)}
					</Form.Item>
					<Form.Item >
						{getFieldDecorator("number", {
							rules: [{ required: true, message: "Please input your number!" }]
						})(
							<InputNumber maxLength={17} formatter={(value) => moneyInput(value)} className={"hide"} style={{width:"200px"}}></InputNumber>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("date", {
							rules: [{ required: true, message: "Data obrigatoria" }]
						})(
							<DatePicker format={dateFormatList}
								disabledDate={(current) => {
									return moment().add(-10, 'years') < current
									//return moment().add(0, 'days')  < current 
								}}
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("percent", {
							rules: [{ required: true, message: "Please input your percent!" }]
						})(
							<Input
								maxLength={17}
								prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
								placeholder="Percent"
							/>
						)}
					</Form.Item>
					<Form.Item
						label="my ID"
						help={myValidateHelp}
						validateStatus={myValidateStatus}
					>
						<Group compact>
							<Row gutter={8}>
								<Col span={10}>
									{getFieldDecorator("myA", {
										rules: [
											{
												required: true,
												message: "Please input A!"
											},
											{ validator: this.props.myB.validating === true ? this.numberValidator(this.props.form) : null }
										]
									})(<Input />)}
								</Col>
								<Col span={10}>
									{getFieldDecorator("myB", {
										rules: [
											{
												required: true,
												message: "Please input B!"
											},
											{ validator: this.numberValidator(this.props.form) }
										]
									})(<Input />)}
								</Col>


							</Row>

						</Group>
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("remember", {
							valuePropName: "checked",
							initialValue: true
						})(<Checkbox>Remember me</Checkbox>)}
						<a className="login-form-forgot" href="">
							Forgot password
          				</a>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
						>
							Log in
         				 </Button>
						Or <a href="">register now!</a>
					</Form.Item>
				</Form>
			</div>
		)
	}
}
);

export default BasicForm