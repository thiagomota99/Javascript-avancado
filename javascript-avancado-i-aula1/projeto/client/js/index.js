var btnIncluir = document.querySelector("#btnIncluir");
btnIncluir.addEventListener("click",function(event){
	event.preventDefault();
	var form = document.querySelector("form");
	var negociacao = criaObjetoNegociacao(form);
	var linhaCriada = createTr(negociacao);
	anexarNaTabelea(linhaCriada);
	form.reset();
	form.data.focus();
});

function criaObjetoNegociacao(form){
	var negociacao = {
		data: form.data.value,
		quantidade: parseInt(form.quantidade.value),
		valor:	parseInt(form.valor.value),
		volume: 0
	};
	return negociacao;
}

function calculaVolume(n1,n2){
	var total = n1 * n2;
	return total;
}

function anexarNaTabelea(linha){
	document.querySelector("tbody").appendChild(linha);
}

function createTr(negociacao){
	var tr = document.createElement("tr");
	tr.appendChild(createTd(negociacao.data));
	tr.appendChild(createTd(negociacao.quantidade));
	tr.appendChild(createTd(negociacao.valor));
	tr.appendChild(createTd(calculaVolume(negociacao.quantidade,negociacao.valor)));
	return tr;
}

function createTd(conteudo){
	var td = document.createElement("td");
	td.textContent = conteudo;
	return td; 
}