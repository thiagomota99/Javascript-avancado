class Conta{
	constructor(saldo){
		this._saldo = saldo;
	}

	get saldo(){
		return this._saldo;
	}

	atuliza(taxa){
		throw new ("O método atualiza() precissa ser implementado!");
	}
}