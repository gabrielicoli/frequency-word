import { Component } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Word Frequency';
}


"user strict"; // serve para evitar erros em navegadores, como por exemplo a não declaração de uma variável
const getUserInput = () => (<HTMLInputElement>document.getElementById("inputString")).value; // HTMLInputElement é uma interface que manipula o layout e apresentação do que está entrando
const cleanInput = str =>
  str
    .replace(/[?.!,"\(\)]/g, "") // replace fica reponsável por alterar um conjunto de caracteres por outro conjunto
    .replace(/[ ]{2,}/g, "")
    .trim() // o trim além de manipular todos os tipos de sequência de dados, ele remove os singletons, um padrão que garante que só exista uma instância de uma classe.
    .toLowerCase(); // caso haja letas maiúsculas ele converterá todas para minúscula
const wordFreq = string =>
  string
    .split(/\s/) // a função split divide uma string em um array de strings quando um espaço em branco ou uma expressão regurar são encontrados e são removidos.
    .reduce( //o método reduce vai iterar por cada elemento da lista  está sendo passado a varável acumuladora, o valor atual do elemento que está sendo iterado e o índice do elemento atual, poderia ser passado também o array original, mas não é obrigatório
      (output, word) =>
        Object.assign(output, { [word]: output[word] ? output[word] + 1 : 1 }),
      {}
    );
const sortByValue = obj =>
  Object.entries(obj) //Object.entries() vai retornar um array contendo [chave e valor] de um objeto
    .map(currentValue => [currentValue[1], currentValue[0]]) //.map vai iterar sobre o vetor
    .sort((a, b) => parseInt("1") - parseInt("2")) // ele vai ordenar os elementos do array
    .map((currentValue, index) => [
      index + 1,
      currentValue[0],
      currentValue[1]
    ]);

const divFreq = "div-table";
const headersFreq = ["", "Repetition", "Word"];

const addTable = (divId, headers, data) => {
  const myTableDiv = document.getElementById(divId);
  const table = document.createElement("table");


  const tr = document.createElement("tr");
  table.appendChild(tr);
  headers.forEach(currentValue => {
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(currentValue));
    tr.appendChild(th);
  });


  data.forEach(currentValue => {
    const tr = document.createElement("tr");
    currentValue.forEach(currentValue => {
      const td = document.createElement("td");
      td.appendChild(document.createTextNode(currentValue));
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  myTableDiv.appendChild(table);
};

const processData = () => {

  if ((<HTMLInputElement>document.getElementById("inputString")).value == "") {
    alert("The field cannot be empty");
  }
  else {
    const sortedFreq = sortByValue(wordFreq(cleanInput(getUserInput())));
    document.getElementById("div-table").innerHTML = "";
    addTable(divFreq, headersFreq, sortedFreq);
  }
};

$(document).ready(function () {
  $("#ButtonTranslation").on("click", processData);
});