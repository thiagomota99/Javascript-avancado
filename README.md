# Javascript-avancado
 Esse repositório é destinado ao estudo da Linguagem Javascript em paradigma mais avançado.

## Repositório é composto de:
1. Diretórios client e server (abordarei apenas a parte client, o server ficará para uma próxima parte do curso)
2. Diretório com os scripts javascript organizados no padrão MVC (Model, View e Controller) **projeto\client\js\app**
3. Diretório com a folha de estilo da página html (bootstrap) **\projeto\client\css**
4. Arquivo interno de anotações relacionadas ao curso **\projeto\client\anotacoes.md**
***
</hr>

# Anotações

1. Criando uma classe em javascript:</br>
```js
class Negociacao {
	constructor(){
		this._data = new Date();
		this._quantidade = 1;
		this._valor = 0;
	}

	get volume(){
		return this._quantidade * this._valor;
	}	
}
```
O prefixo _ é utilizado (por convenção) para informar ao desenvolvedor o modificador de acesso private.</br>
Já que atualmente o javascript não possui modificadores de acesso de forma nativa. Entretanto, é um</br>
fator que poderá mudar em pouco tempo com a nova versão da linguagem.

2. Para criar métodos apenas de leitura utilizamos a palavra reservada "get". Desta forma eliminamos o uso</br>
dos parenteses para indicar a chamada do método e ainda damos um pouco mais de segurança a propriedades das classes</br>
que não podem ser acessadas diretamente.
```js
class Negociacao {
	constructor(data,quantidade,valor){
		this.data = new Date();
		this.quantidade = quantidade;
		this.valor = 0;
	}

	get volume(){
		return this._quantidade * this._valor;
	}	
}
var negociacao = new Negociacao(new Date(), 1, 2);
console.log(negociacao.volume);
```

3. Congelando um objeto. Isso é um artifício para tornar a instância de uma classe (objeto) imutável.</br>
Desta forma após atribuir valores aos atributos da classe para aquela instância. Não será mais possível altera-los.
```js
class Negociacao {
	constructor(data,quantidade,valor){
		this.data = new Date();
		this.quantidade = quantidade;
		this.valor = 0;
		Object.freeze(this); //Congelando a instância da classe
	}

	get volume(){
		return this._quantidade * this._valor;
	}	
}
var negociacao = new Negociacao(new Date(), 1, 2);
negociacao._quantidade = 100000;
console.log(negociacao.quantidade);
```

4. Uma outra estratégia que devemos utilizar para tornar um objeto imutável é utilizar a programação defensiva</br>
   Ela é aplicada da seguinte forma, veja os exemplos:
```js
class Negociacao {
	constructor(data,quantidade,valor){
		this.data = data;
		this.quantidade = quantidade;
		this.valor = 0;
		Object.freeze(this); //Congelando a instância da classe
	}

	get volume(){
		return this._quantidade * this._valor;
	}

	get data(){
		return this._data;
	}	
}
var negociacao = new Negociacao(new Date(), 1, 2);
console.log(negociacao.data);
negociacao.data.setDate(11);
console.log(negociacao.data);
```
No exemplo acima o resultado é que as datas serão distintas, pois a propriedade "data" é um objeto do tipo Date.</br>
Ou seja, possui todos os métodos de objetos do tipo Date (setDate,getTime(),...) desta forma quando retornamos através</br>
o método `get data()` (que retorna o atributo data) estamos dando brecha para que o usuário utilize desses métodos para alterar o valor da propriedade.</br>
Para evitar que isso aconteça devolveremos um novo objeto Date (uma cópia). Com isso, caso alguém tente alterar o valor inicial da</br>
propriedade já definido, não irá conseguir. Estará alterando o valor apenas da cópia.</br>
Veja o exemplo:
```js
class Negociacao {
	constructor(data,quantidade,valor){
		this.data = data;
		this.quantidade = quantidade;
		this.valor = 0;
		Object.freeze(this); //Congelando a instância da classe
	}

	get volume(){
		return this._quantidade * this._valor;
	}

	get data(){
		return new Date(this._data.getTime()); //O método getTime() retorna um número que representa a data. Serve como referência para construirmos uma cópia (novo objeto) da data.
	}	
}
var negociacao = new Negociacao(new Date(), 1, 2);
console.log(negociacao.data);
negociacao.data.setDate(11); //Alterando o valor da cópia ==> return new Date(this._data.getTime());
console.log(negociacao.data);
```
Devemos também atulizar a data no construtor pois o caso pode se repetir da seguinte forma:
```js
class Negociacao {
	constructor(data,quantidade,valor){
		this.data = data;
		this.quantidade = quantidade;
		this.valor = 0;
		Object.freeze(this); //Congelando a instância da classe
	}

	get volume(){
		return this._quantidade * this._valor;
	}

	get data(){
		return new Date(this._data.getTime()); //O método getTime() retorna um número que representa a data. Serve como referência para construirmos uma cópia (novo objeto) da data.
	}	
}
var hoje = new Date();
var negociacao = new Negociacao(hoje, 1, 2);
console.log(negociacao.data);
hoje.setDate(11);
console.log(negociacao.data);
```
Nesse caso em específico estamos passando para o construtor da classe uma referência do objeto "hoje".</br>
Ou seja, ao fazer a atribuição da `this.data = data;` estamos fazendo o atributo da classe `this.data` apontar</br>
para o mesmo endereço de memória do objeto "data" recebido por parâmetro. O sinal de "=" para tipos dados não primitivos (Date,vetores,listas...)</br>
Na verdade significa apenas que estão apontando para o mesmo lugar. Para que isso não aconteça devemos fazer da seguinte forma:
```js
class Negociacao {
	constructor(data,quantidade,valor){
		this.data = new Date(data.getTime()); //Cria-se um novo objeto do tipo Date utilizando como base a data passada por parâmetro.
											  //Detalhe importante: tipos primitivos normalmente são imutáveis (int,string,boolean,float,double)
											  //O método getTime() retorna um tipo primitivo long. Ou seja, não será alterado caso sofra alguma alteração externa.
		this.quantidade = quantidade;
		this.valor = 0;
		Object.freeze(this); //Congelando a instância da classe
	}

	get volume(){
		return this._quantidade * this._valor;
	}

	get data(){
		return new Date(this._data.getTime()); //O método getTime() retorna um número que representa a data. Serve como referência para construirmos uma cópia (novo objeto) da data.
	}	
}
var hoje = new Date();
var negociacao = new Negociacao(hoje, 1, 2);
console.log(negociacao.data);
hoje.setDate(11);
hoje.getTime();
console.log(negociacao.data);
```
Desta forma quando passarmos o objeto "data" para o construtor da classe "Negociacao". Não estaremos mais apontando para o mesmo endereço de memória</br>
Pois estamos criando um novo objeto (novo espaço em memória) utilizando como base a data passada por parâmetro. Desse modo, não será alterada, caso</br>
o objeto ou um de seus atributos for utilizado como base for alterado externamente.

5. É importante saber que em javascript que váriaveis declaradas da seguinte forma `var teste = "teste";` não possuem escopo de bloco. Ou seja, elas podem ser</br>
acessadas de fora do escopo de um bloco. Para evitartamos o "vazamento" dessas variáveis utilizamos a palavra reservada `let` que</br>
infere que a variável só pode ser acessada dentro do seu escopo.</br>
Ex:
```js
if(true){
	var teste = "teste";
	let teste2 = "teste2";
}
console.log(teste);
console.log(teste2); //Vai dar erro: is not defined. Pois a variável teste2 só existe dentro do escopo do bloco "if"
```
6. Criando um Controller para capturar as ações realizadas do usuário na View para interagir com o Model.</br>
	- Primeiro criaremos um novo arquivo js no diretório **js/app/controllers** chamadao **NegociacaoController**
	- Após criar o arquivo, o mesmo será a classe **NegociacaoController** da seguinte forma
```js
class NegociacaoController{

	incluir(event){
		alert("Eba, o controller funcionou");
	}
}
```
Com isso já podemores criar um instância de NegociacaoController na View (`index.html`) e através de atributos html (onsubmit) invocar o método</br>
`incluir()` da classe.

```html
<form class="form" onsubmit="negociacaoController.incluir(event)"></form>
<script src="js/app/models/Negociacao.js"></script>
<script src="js/app/controllers/NegociacaoController.js"></script>
<script>
	let negociacaoController = new NegociacaoController();
<script>
```

8. Podemos atribuir métodos de objetos nativos do javascript a novas variáveis. Para caso queira simplificar, melhorar a sintaxe, e até mesmo mudar o contexto</br>
de um método. Utilizamos a seguinte abordagem:
```js
$ = document.querySelector.bind(document);
//Agora a chamada da função pode ser feita através do símbolo de $;
$("form"); //Forma atual
document.querySelector("form");//Forma antiga

//Outra vantagem
function caracteristicaDaComida(){
	console.log(this.comida); //Nesse momento o contexto (this) da minha função não está definido. Irá dar um erro = undefined
}

let comidaFria = {
	comida: "sorvete"
}

let comidaQuente = {
	comida: "sopa"
}

let exibeComidaFria = caracteristicaDaComida.bind(comidaFria); //Nesta linha o método bind é responsável por receber o parâmetro que irá definir
															   //o contexto (this) da minha função caracteristicaDaComida();
exibirComidaFria();

let exibeComidaQuente = caracteristicaDaComida.bind(comidaQuente); //Aqui estou trocando o contexto da função novamente
exibeComidaQuente();
```

9. Devemos sempre nos atentar quanto à busca de elementos dentro do nosso DOM. O mesmo representado pelo objeto "document" toda vez que solicitado a busca</br>
de um elemento com a utilização do método `querySelector()` por exemplo, ele percorrerá toda a nossa árvore de elementos dispostos no documento até encontrar</br>
o elemento que solicitamos. Dessa forma, se eu precisar percorrer 20x o DOM para buscar um elemento, poderá e vai afetar a perfomance, mesmo que seja de forma</br>
trivial é sempre uma boa prática pensar em deixar o código o mais perfomático possível. Uma forma de se implementar isso é da seguinte forma.
```js
for(let i = 0; i < 10; i++){
	let h1 = document.querySelector("h1"); //Aqui estamos percorrendo o DOM a procurada do elemento h1 a cada repetição do laço "for"
	console.log(h1.textContet = i);
}

//Utilizando uma abordagem mais performática
let h1Fast = document.querySelector("h1");//Aqui estamos percorrendo o DOM apenas uma vez e guardando o elemento na variável h1Fast;
for(let i = 0; i < 10; i++){
	console.log(h1Fast.textContet = i);
}
```

10. A função `split()` de uma variável do tipo String tem o objetivo de transformar a String em um array a partir de um caracter separador</br>
Ex:
```js
let vogais = "A-E-I-O-U";
let vogaisEmArray = vogais.split("-") //O split vai utilizar o hífen para separar as vogais e coloca-las uma em cada posição do array.

console.log(vogaisEmArray);
console.log(vogais);
```

11. O método `join()` é utilizado sobre variáveis do tipo Array, onde o mesmo tem o objetivo de juntar suas posições usando um delimitador</br>
Ex:
```js
let vogais = "A-E-I-O-U";
let vogaisEmArray = vogais.split("-") //O split vai utilizar o hífen para separar as vogais e coloca-las uma em cada posição do array.
let unindoVogais = vogaisEmArray.join("-") //O join irá unir novamente o array é uma só string e separando as posições pela vírgula.

console.log("Variável vogaisEmArray: " + vogaisEmArray);
console.log("Variável vogais: " + vogais);
console.log("Variável unindoVogais" + unindoVogais);
```

12. O método `replace()` é utilizado sobre variáveis do tipo String, onde o mesmo tem o objetivo de substituir um caracter da string por outro</br>
```js
let vogais = "A-E-I-O-U";
let vogaisSeparadasPorVirgula = vogais.replace("/-/g",","); //O primeiro parâmetro é o caracter que queremos substituir, o segundo é o que será colocado no lugar do mesmo.
														    //O primeiro pode ser uma expressão regular, no caso remover o hífen de todas as posições da string.
```

13. Existe um novo operador adicionado ao ES6 que é chamado de "spread operator". Onde podemos utilizar um array passado para uma função, método ou construtor que espera dois parâmetros</br>
Ex:
```js
let numeros = [1,2];

function somaNumeros(numero1, numero2){
	return numero1 + numero2;
}

somaNumeros(...numeros); //Utilizando o spread operator representado pelos três pontos (...) o mesmo irá pegar as posições do array passado como parâmetro e colocar
						 //a primeira posição como primeiro parâmetro, e segunda posição como o segundo parâmetro.

somaNumeros(numeros[0],numeros[1]); //Maneira antiga.
```

14. A função `map()` é utilizada em Arrays em javascript. Ela tem o objetivo de criar um novo array a partir de um Array passado por parâmetro</br>
Ex:
```js
let numeros = [1,2];
let numerosDobrados = numeros.map(function(item){ //A função anônima do método map recebe como parâmetro os itens do array.
	return item * 2; //Aqui estamos pegando cada item do novo array numerosDobrados e efetuando a multiplicação de seus valores.
});
console.log(numerosDobrados);
console.log(numeros);
```
Obs: Um segundo parâmetro que a função `map()` pode receber é o índice (posição) daquele elemento no array.
```js
let numeros = [1,2];
let numerosDobrados = numeros.map(function(item,indice){ //A função anônima do método map recebe como parâmetro os itens do array.
	return indice == 1 ? item * 2 : item;
});
console.log(numerosDobrados);
console.log(numeros);
```

15. Arrow Functions é uma forma nova de declarar funções. A mesma acaba tornando o código menos verboso, facilitando a legibilidade do código
Ex:
```js
let numeros = [1,2];
let numerosDobrados = numeros.map((item,indice) => indice == 1 ? item * 2 : item);  //function é subtituído por "=>"
																					//quando a função possuir apenas um comando, no caso return. Podemos omiti-lo juntamente
																					//com as chaves {}
console.log(numerosDobrados);
console.log(numeros);
