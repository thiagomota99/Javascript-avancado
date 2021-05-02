class NegociacaoController{

	constructor() {
		let $ = document.querySelector.bind(document);
		let camposFormNegociacao = $("form");
		this._inputData = camposFormNegociacao.data;
		this._inputQuantidade = camposFormNegociacao.quantidade;
		this._inputValor = camposFormNegociacao.valor;
		this._listaNegociacoes = new ListaNegociacoes();
	}

	incluir(event){
		event.preventDefault();
		
		this._listaNegociacoes.adiciona(_criaNegociacao());
		_limparCamposDoForm();

		console.log(negociacao);		
		console.log(DateHelper.dataParaTexto(negociacao.data));
	}

	_criaNegociacao(){
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQuantidade,
			this._inputValor
	}

	_limparCamposDoForm(){
		camposFormNegociacao.reset();
		this._inputData.focus();		
	}
}