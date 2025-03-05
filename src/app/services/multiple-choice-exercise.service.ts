import { Injectable } from '@angular/core';
import { MultipleChoiceQuestion } from '../types/exercise';

@Injectable({
  providedIn: 'root',
})
export class MultipleChoiceExerciseService {
  currentQuestion: number = 0;
  score: number = 0;

  questions: MultipleChoiceQuestion[] = [
    {
      question: 'O que é um algoritmo?',
      answers: [
        'A. Um espaço na memória do computador',
        'B. Uma linguagem de programação',
        'C. Uma tag HTML5',
        'D. uma sequência lógica e predefinida para a realização de ações',
      ],
      answer: 3,
      explain:
        'A resposta correta é a letra D. O primeiro passo para se aprender programação não envolve computador, envolve educar a sua mente a explicar em detalhes os passos necessários para executar uma determinada tarefa. Você deve aprender a modelar um roteiro que explica quando tomar decisões e quando realizar determinadas tarefas, esse roteiro é chamado de “algoritmo”. O Algoritmo é a parte fundamental para qualquer programação. Ele é uma seqüência lógica e predefinida para a realização de ações.',
    },
    {
      question: 'O que é uma variável?',
      answers: [
        'A. Um espaço na memória do computador',
        'B. Uma linguagem de programação',
        'C. Uma tag HTML5',
        'D. uma sequência lógica e predefinida para a realização de ações',
      ],
      answer: 0,
      explain:
        "A resposta correta é a letra A. O recurso que nós utilizamos em nossos programas para escrever e ler dados da memória do computador é conhecido como variável, que é simplesmente um espaço na memória o qual reservamos e damos um nome. Por exemplo, podemos criar uma variável chamada 'idade' para armazenar a idade de uma pessoa. Você pode imaginar uma variável como uma gaveta 'etiquetada' em um armário.",
    },
    {
      question: "Um script é um 'roteiro' seguido por sistemas computacionais e trazem informações que são processadas e transformadas em ações efetuadas por um programa principal.",
      answers: ['Afirmação verdadeira', 'Afirmação falsa'],
      answer: 0,
      explain: 'Conforme vimos em aula, essa é uma afirmação verdadeira.',
    },
    {
      question: 'Qual tag é utilizada para inserir código JavaScript em uma página web?',
      answers: [
        'A. &lt;body&gt;',
        'B. &lt;javascript&gt;',
        'C. &lt;script&gt;',
        'D. &lt;strong&gt;',
      ],
      answer: 2,
      explain:
        'A resposta correta é a letra C. Para criarmos um script utilizando a linguagem de programação JavaScript e inserir este código em uma página, é necessário utilizar a tag &lt;script&gt;.',
    },
    {
      question:
        'Qual das opções a seguir declara uma variável e exibe corretamente seu valor?',
      answers: [
        'a. variável nome = "Juliano";&lt;br&gt;alert(nome);',
        'B. var nome = "Juliano";&lt;br&gt;alerta("nome");',
        'C. var nome = "Juliano";&lt;br&gt;alert("nome");',
        'D. var nome = "Juliano";&lt;br&gt;alert(nome);',
      ],
      answer: 3,
      explain: 'A resposta correta é a letra D.',
    },
    {
      question: 'Como podemos receber dados do usuário em JavaScript?',
      answers: [
        'A. Utilizando a função prompt()',
        'B. Utilizando a função alert()',
        'C. Utilizando a função dados()',
        'D. Utilizando a função entrada()',
      ],
      answer: 0,
      explain:
        'A resposta correta é a letra A. Podemos receber dados do usuário no JavaScript de algumas maneiras. Uma delas é utilizando a função prompt(). Assim é possível receber, por exemplo, o nome do usuário e armazená-lo em uma variável.',
    },
    {
      question: 'Como receber o nome do usuário e exibi-lo na tela?',
      answers: [
        'A. var nome = prompt("Informe seu nome: ");&lt;br&gt;alert("nome");',
        'b. var nomeUsuario = prompt("Informe seu nome: ");&lt;br&gt;alert("Seu nome é: " + nomeUsuario);',
        'C. var nome = alert("Informe seu nome: ");&lt;br&gt;prompt(nome);',
      ],
      answer: 1,
      explain: 'A resposta correta é a letra B.',
    },
    {
      question: 'Quais são os operadores aritméticos em JavaScript?',
      answers: [
        'A. + para soma, - para subtração, * para multiplicação e % para divisão.',
        'B. + para soma, - para subtração, / para multiplicação e % para divisão.',
        'C. + para soma, - para subtração, * para multiplicação, % para resto  e / para divisão.',
        'D. $ para soma, - para subtração, * para multiplicação, % para resto  e / para divisão.',
      ],
      answer: 2,
      explain: 'A resposta correta é a letra C.',
    },
    {
      question: 'São operadores relacionais em JavaScript, EXCETO:',
      answers: ['A. ==, !=', 'B. ==, !=, &gt;=', 'C. ==, !=, &lt;=', 'D. =&gt;, !=, &lt;='],
      answer: 3,
      explain: 'A resposta correta é a letra D.',
    },
    {
      question: 'São operadores lógicos em JavaScript, EXCETO:',
      answers: ['A. &lt;&gt;', 'B. &&', 'C. ||', 'D. !'],
      answer: 0,
      explain: 'A resposta correta é a letra A.',
    },

    {
      question:
        'Qual mensagem será exibida com o código a seguir:&lt;br&gt;var n1 = 5;&lt;br&gt;var n2 = 7;&lt;br&gt;var resultado = n1 + n2;&lt;br&gt;if(resultado &gt; 10) {&lt;br&gt;&nbsp;alert("Maior");&lt;br&gt;} else {&lt;br&gt;&nbsp;alert("Menor");&lt;br&gt;}',
      answers: ['A. Menor', 'B. Maior', 'C. Nenhuma mensagem será exibida'],
      answer: 1,
      explain: 'A resposta correta é a letra B.',
    },

    {
      question:
        'Qual será a mensagem exibida pelo código a seguir?&lt;br&gt;var opcao = 5;&lt;br&gt;switch(opcao) {&lt;br&gt;&nbsp;case 1:&lt;br&gt;&nbsp;&nbsp;alert("Opção 1");&lt;br&gt;&nbsp;break;&lt;br&gt;&nbsp;case 2:&lt;br&gt;&nbsp;&nbsp;alert("Opção 2");&lt;br&gt;&nbsp;break;&lt;br&gt;&nbsp;default:&lt;br&gt;&nbsp;&nbsp;alert("Opção inválida...");&lt;br&gt;&nbsp;break;&lt;br&gt;}',
      answers: [
        'A. Opção 1',
        'B. Opção 2',
        'C. Opção 3',
        'D. Opção inválida...',
      ],
      answer: 3,
      explain: 'A resposta correta é a letra D.',
    },
    {
      question: 'Qual a afirmação correta sobre comentários em JavaScript?',
      answers: [
        'A. O sinal // comenta uma linha e o sinal * comenta um bloco com várias linhas.',
        'B. O sinal / comenta uma linha e o sinal $ comenta várias linhas.',
        'C. O sinal // comenta uma linha e o sinal /* inicia o comentário com várias linhas e o sinal */ finaliza o bloco de comentário.',
        'D. O sinal /* comenta uma linha e o sinal // inicia um bloco de comentário e o sinal // finaliza o bloco de comentário com várias linhas.',
      ],
      answer: 2,
      explain:
        'A resposta correta é a letra C. Como abordamos em aula, Em JavaScript, existem dois tipos de comentários: comentários de uma linha e comentários de várias linhas. Comentários de uma linha são iniciados com duas barras (//) e são ignorados pelo interpretador JavaScript. Eles são úteis para fornecer uma breve explicação de uma linha de código ou para desabilitar temporariamente uma parte do código. Comentários de várias linhas são iniciados com /* e finalizados com */. Eles são úteis para fornecer comentários mais longos ou para explicar blocos de código.',
    },
    {
      question: 'Qual estrutura a seguir não é um tipo de loop em JavaScript?',
      answers: ['A. while', 'B. loop', 'C. do-while', 'D. for'],
      answer: 1,
      explain: 'A resposta correta é a letra B.',
    },
    {
      question: 'Qual dos loops a seguir é um loop pré-testado?',
      answers: ['A. While', 'B. Do-while', 'C. Loop', 'D. For-do'],
      answer: 0,
      explain:
        'A resposta correta é a letra A. O loop while é chamado de  estrutura de repetição de loop pré-testado, pois a expressão booleana é verificada antes da primeira execução. Se inicialmente ela já resultar em FALSO, as instruções que estão dentro do bloco não são executadas nenhuma vez.',
    },
    {
      question:
        "Qual o resultado da variável 'soma'  após a execução  do código a seguir?&lt;br&gt;var ok = true;&lt;br&gt;var soma = 0;&lt;br&gt;while(ok == true) {&lt;br&gt;&nbsp;soma = soma + 1;&lt;br&gt;&nbsp;if(soma == 30) {&lt;br&gt;&nbsp;&nbsp;ok = false;&lt;br&gt;&nbsp;&nbsp;soma = soma + soma;&lt;br&gt;&nbsp;}&lt;br&gt;}&lt;br&gt;alert(soma);",
      answers: ['A. 30', 'B. 40', 'C. 50', 'D. 60'],
      answer: 3,
      explain: 'A resposta correta é a letra D.',
    },
    {
      question:
        "Qual o resultado da variável 'total'  após a execução  do código a seguir?&lt;br&gt;var total=0;&lt;br&gt;do {&lt;br&gt;&nbsp;total += 1;&lt;br&gt;}&lt;br&gt;while(total &lt;= 1);&lt;br&gt;alert(total);",
      answers: ['A. 0', 'B. 1', 'C. 2', 'D. 3'],
      answer: 2,
      explain: 'A resposta correta é a letra C.',
    },
    {
      question:
        "Qual o resultado da variável 'numero'  após a execução  do código a seguir?&lt;br&gt;var numero = 0;&lt;br&gt;var contador;&lt;br&gt;for(contador = 0; contador &lt;= 5; contador++) {&lt;br&gt;&nbsp;numero = numero + contador;&lt;br&gt;}&lt;br&gt;alert(numero);",
      answers: ['A. 15', 'B. 10', 'C. 5', 'D. 1'],
      answer: 0,
      explain: 'A resposta correta é a letra A.',
    },
    {
      question:
        'Qual cor será exibida ao utilizar o código a seguir?&lt;br&gt;var cores = ["Azul", "Vermelho", "Amarelo"];&lt;br&gt;alert(cores[1]);',
      answers: [
        'A. Azul',
        'B. Vermelho',
        'C. Amarelo',
        'D. Nenhuma das opções anteriores.',
      ],
      answer: 1,
      explain: 'A resposta correta é a letra B.',
    },

    {
      question:
        'Qual seria uma maneira melhor e mais adequada de depurar o código ao invés de utilizar a função alert?',
      answers: [
        'A. Colocar as mensagens para serem exibidas no console do navegador utilizando console.log()',
        'B. Utilizar a função prompt()',
        'C. Utilizar o sistema operacional',
        'D. Inserir dados via comando loop.',
      ],
      answer: 0,
      explain: 'A resposta correta é a letra A.',
    },
    {
      question:
        'Funções são blocos de código que executam uma tarefa ou calculam um valor. Elas podem ser usadas para simplificar o código, reutilizar código e tornar o código mais legível.',
      answers: ['Afirmação verdadeira', 'Afirmação falsa'],
      answer: 0,
      explain: 'Como foi explicado em aula, a afirmação é verdadeira.',
    },
    {
      question: 'O que são os argumentos de uma função?',
      answers: [
        'A. São variáveis que são declaradas na definição de uma função.',
        'B. São dados do corpo de uma função',
        'C. são valores que São passados para uma função quando ela é chamada',
        'D. São os dados retornados por uma função',
      ],
      answer: 2,
      explain:
        'A resposta correta é a letra C. Os argumentos são valores que são passados para uma função quando ela é chamada. Eles podem ser usados pela função para realizar sua tarefa.',
    },
    {
      question:
        'Qual dos códigos a seguir cria corretamente uma função que recebe dois números e retorna sua soma?',
      answers: [
        'A. var somar = 1 + 2;',
        'B. var function = 2 + 3;',
        'C. function somar(numero) {&lt;br&gt;&nbsp;numero = numero + 1;&lt;br&gt;&nbsp;return numero;&lt;br&gt;}',
        'D. function somar(n1, n2) {&lt;br&gt;&nbsp;return n1 + n2;&lt;br&gt;}'
      ],
      answer: 3,
      explain: 'A resposta correta é a letra D.',
    },
    {
      question:
        "Dado que uma função 'somar' foi criada e deve receber dois argumentos numéricos inteiros e retornar o resultado, como ela pode ser chamada no código?",
      answers: [
        'A. var total = somar(5, 10);',
        'B. var soma = somar;',
        'C. var soma = somar[5, 3];',
        'D. var total = somar(5);'
      ],
      answer: 0,
      explain: 'A resposta correta é a letra A.',
    }

  ];

  constructor() { }

  setScore(userAnswer: boolean): void {
    this.score = userAnswer ? this.score + 1 : this.score;
  }
}
