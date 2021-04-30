class NegociacaoController{

	constructor() {
		let $ = document.querySelector.bind(document);
		let camposFormNegociacao = $("form");
		this._inputData = camposFormNegociacao.data;
		this._inputQuantidade = camposFormNegociacao.quantidade;
		this._inputValor = camposFormNegociacao.valor;
	}

	incluir(event){
		event.preventDefault();
		
		let negociacao = new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQuantidade,
			this._inputValor
		);

		console.log(negociacao);		
		console.log(DateHelper.dataParaTexto(negociacao.data));
	}
}