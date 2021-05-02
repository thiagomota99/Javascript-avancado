class NegociacaoController{

	constructor() {
		let $ = document.querySelector.bind(document);
		let camposDoFormulario = $("form");
		this._inputData = camposDoFormulario.data;
		this._inputQuantidade = camposDoFormulario.quantidade;
		this._inputValor = camposDoFormulario.valor;
		this._listaNegociacoes = new ListaNegociacoes();
	}

	incluir(event){

		event.preventDefault();
		this._listaNegociacoes.adiciona(this._criaNegociacao());
		this._limparCamposDoForm();			
	}

	_criaNegociacao(){
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value
		);
	}

	_limparCamposDoForm(){
		this._inputQuantidade.value = '';
		this._inputValor.value = '';
		this._inputData.value = '';
		this._inputData.focus();		
	}
}