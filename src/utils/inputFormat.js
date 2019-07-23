export const moneyInput = (value) => {
    var v = value.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    var val = v.toString()
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    return "R$ " + v;
}

export const moneyFormatter = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

//export const moneyFormatter = (value) => Number(value).toFixed(2)

export const percentInput = (value) => {
    var v = value.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    //v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    return v + '%';


}

export const percentFormatter = (value) => new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 2, }).format(value);

//export const percentFormatter = (value) => Number(value).toFixed(2)
