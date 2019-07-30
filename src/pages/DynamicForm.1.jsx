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

	componentDidMount() {
		let keys = [
			
				[0], [1], [3], [4]
			
		]

		let obj = {}
		obj.opcaoReceber = [null, null, null]
		obj.ramal = ["", "", [], ""]
		obj.telefone =  ["55 212111", "44 323232", [], "5454 562323"]
		obj.tipoTelefones =  ["Padrão", "Celular", "Entrega"]
		console.log(keys)
		console.log(obj)
		console.log('Merged values:', keys.map((key) => {
			let object = {
				opcao: obj.opcaoReceber[key],
				city: obj.ramal[key],
				telefone: obj.telefone[key],
				tipoTelefones: obj.tipoTelefones[key]
			}
			return object
		}));
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
