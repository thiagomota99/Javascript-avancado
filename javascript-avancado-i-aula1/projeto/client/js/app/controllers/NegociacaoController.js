class NegociacaoController{

	constructor() {
		let $ = document.querySelector.bind(document);
		let camposDoFormulario = $("form");
		this._inputData = camposDoFormulario.data;
		this._inputQuantidade = camposDoFormulario.quantidade;
		this._inputValor = camposDoFormulario.valor;
		this._listaNegociacoes = new ListaNegociacoes();

		this._negociacoesView = new NegociacoesView($("#tabelaDeNegociacoes")); //Passando como parâmetro para o construtor da classe o elemento alvo onde será exibido a view
		this._negociacoesView.update(this._listaNegociacoes); //Chama o método update da NegociacoesView

		this._mensagem = new Mensagem();
		this._mensagemView = new MensagemView($("#mensagemView")); //Criando um objeto de Mensagem
		this._mensagemView.update(this._mensagem);
	}

	incluir(event){

		event.preventDefault();
		this._listaNegociacoes.adiciona(this._criaNegociacao());
		this._negociacoesView.update(this._listaNegociacoes); //Chama o método update da NegociacoesView para refletir as mudanças no modelo
		this._mensagem.texto = "Negociação adicionada com sucesso!";
		this._mensagemView.update(this._mensagem);
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