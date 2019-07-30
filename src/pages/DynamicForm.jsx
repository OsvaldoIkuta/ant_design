import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button } from 'antd'
import WrappedDynamicFieldSet from "../components/Form/DynamicForm"
import { moneyFormatter, percentFormatter} from "../utils/inputFormat"


const parentesco = [
    { label: 'Avô(ó)', value: '6' },
    { label: 'Cônjuge', value: '2' },
    { label: 'Cunhado(a)', value: '11' },
    { label: 'Filho(a)', value: '3' },
    { label: 'Irmão(ã)', value: '10' },
    { label: 'Neto(a)', value: '7' },
    { label: 'Primo(a)', value: '1' },
    { label: 'Sobrinho(a)', value: '8' },
    { label: 'Tio(a)', value: '5' }
];


const formData = {
    parentesco: parentesco,
}

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
			},
			gzdadosfamiliar:null
		}

	}

	handleFamiliarFormChange = changedFields => {
        let gzdadosfamiliar = []
        let fieldsValue = this.familiarFormRef.getFormReference().getFieldsValue();
		console.log(fieldsValue)
		let dados = fieldsValue.index.map(key => {
			let dados = {
				idgrauparentesco: fieldsValue.idgrauparentesco ? fieldsValue.idgrauparentesco[key] : null,
				nome: fieldsValue.nome ? fieldsValue.nome[key] : null,
				ddd: fieldsValue.ddd ? fieldsValue.ddd[key] : null,
				telefone: fieldsValue.telefone ? fieldsValue.telefone[key] : null
			}
			return dados
			})
		this.setState({gzdadosfamiliar: dados})
		console.log(dados)
        let count = gzdadosfamiliar.length;
        let gzdadosfamiliarAux = {};
        console.log(gzdadosfamiliar)
	}
	
	handleRemoveReferencia = (k) => {
        this.familiarFormRef.removeReferencia(k)
    }

	componentWillMount() {
		let gzdadosfamiliar = [{
			ddd: 44,
			idcnpj_cpf: "100010805551964",
			iddadosfamiliar: 0,
			idgrauparentesco: "11",
			nome: "sdsdcsdcdsc",
			telefone: "464532561"
		},{
			ddd: 55,
			idcnpj_cpf: "100010805551964",
			iddadosfamiliar: 0,
			idgrauparentesco: "11",
			nome: "Osvaldo",
			telefone: "464532561"
		}
	];
		this.setState({gzdadosfamiliar: gzdadosfamiliar})
	}

	handleFormChange = changedFields => {
		//console.log(changedFields)
	  };

	render() {
		const { fields, gzdadosfamiliar } = this.state;
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
				<WrappedDynamicFieldSet onRef={ref => (this.familiarFormRef = ref)}
                    onChange={this.handleFamiliarFormChange}
                    removeReferencia={this.removeReferencia}
					formData={formData}
					gzdadosfamiliar = {gzdadosfamiliar}
                    removeReferencia = {this.handleRemoveReferencia} ></WrappedDynamicFieldSet>
				<pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre>
			</PageHeaderWrapper>
		)
	}
}


export default DynamicForm
