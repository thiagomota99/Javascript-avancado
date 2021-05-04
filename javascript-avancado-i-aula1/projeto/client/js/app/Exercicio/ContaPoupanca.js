class ContaPoupanca extends Conta{

	constructor(saldo){
		super(saldo);
	}

	atualiza(taxa){
		this._saldo = this._saldo + (taxa * 2);
	}
}