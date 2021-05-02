class ArquivoController {

    constructor() {
        this._inputDados = document.querySelector('.dados-arquivo');
    }

    envia() {

        //cria um Arquivo com as suas propriedades;
        let arquivo = this._criarArquivo();
        this._limpaFormulario();
        console.log(StringValidator.formatarString(arquivo))
    }

    _criarArquivo(){

        return new Arquivo(...StringValidator.validar(this._inputDados.value));
    }

    _limpaFormulario() {
        
        this._inputDados.value = '';
        this._inputDados.focus();
    }
}