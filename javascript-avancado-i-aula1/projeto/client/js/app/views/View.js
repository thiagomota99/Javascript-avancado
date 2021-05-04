class View{
	constructor(elemento){
		this._elemento = elemento;
	}

	template(model){
		throw new ("O método template precisa ser implementado!");
	}
	
	update(model){
		this._elemento.innerHTML = this._template(model);
	}
}