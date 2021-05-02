class StringValidator {

	constructor (){
		throw new Error("Está classe não pode ser instanciada, pois ela é estática!");
	}


	static validar(stringParaValidar){
		if(!/[A-Z0-9\u00C0-\u00FF ]+/.test(stringParaValidar)){
			throw new Error("A string precisa está no formato nome/tamanho/tipo todas em letras maiúculas!"); 
		}
		else {
			return stringParaValidar.split("/");
		}
	}

	static formatarString(stringParaFormatar){
		return `Nome Do arquivo: ${stringParaFormatar.nome}
                Tamanho Do Arquivo ${stringParaFormatar.tamanho}
                Tipo Do Arquivo ${stringParaFormatar.tipo}`
	}
}