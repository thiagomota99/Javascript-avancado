class ListaNegociacoes {

	constructor(){
		this._negociacoes = [];
	}

	adiciona(negociacao){
		this._negociacoes.push(negociacao);
	}

	get negociacoes(){
		let copiaNegociacao = [].concat(this._negociacoes);
		return copiaNegociacao;
	}
}