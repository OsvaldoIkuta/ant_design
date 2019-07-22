import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button } from 'antd'
import BasicForm from '../components/Form/BasicForm'
import { moneyFormatter, percentFormatter} from "../utils/inputFormat"

class Welcome extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			fields: {
				money: {
					value: moneyFormatter(100)
				},
				number: {
					value: moneyFormatter(100)
				},
				date: {
					value: "1996-10-22"
				},
				percent: {
					value: percentFormatter(10)
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
		console.log(changedFields)
		this.setState(({ fields }) => ({
		  fields: { ...fields, ...changedFields },
		}));
	  };

	render() {
		const { fields } = this.state;
		return (
			<PageHeaderWrapper>
				<BasicForm {...fields} onChange={this.handleFormChange} ></BasicForm>
				<pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre>
			</PageHeaderWrapper>
		)
	}
}


export default Welcome
