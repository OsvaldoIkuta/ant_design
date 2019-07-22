import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button } from 'antd'
import WrappedDynamicFieldSet from "../components/Form/DynamicForm"
import { moneyFormatter, percentFormatter} from "../utils/inputFormat"

class DynamicForm extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			fields: {
				money: {
					value: moneyFormatter(100.90)
				},
				date: {
					value: "1996-10-22"
				},
				percent: {
					value: percentFormatter(10.90)
				},
				myA: {
					value: ""
				},
				myB: {
					value: ""
				},
			}
		}
	}

	handleFormChange = changedFields => {
		//console.log(changedFields)
	  };

	render() {
		const { fields } = this.state;
		const array = [
			{
				names: "Osvaldo Ikuta",
				cities: "Mariluz"
			},
			{
				names: "Tiago Faxina",
				cities: "Tapejara"
			},
			{
				names: "Edson Macoto",
				cities: "Umuarama"
			},
			{
				names: "Estevan Luis",
				cities: "Douradina"
			},
		]
		return (
			<PageHeaderWrapper>
				<WrappedDynamicFieldSet array={array} onChange={this.handleFormChange} ></WrappedDynamicFieldSet>
				<pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre>
			</PageHeaderWrapper>
		)
	}
}


export default DynamicForm
