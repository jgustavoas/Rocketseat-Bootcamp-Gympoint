import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';

export const today = format(
  zonedTimeToUtc(new Date(), 'Europe/London'),
  'yyyy-MM-dd',
  {
    locale: pt,
  }
);

/* FUNÇÃO 'selectSuggestion' (ALTERNATIVA PRÓPRIA):
   A função 'selectSuggestion' é uma solução personalizada que criei em alternativa ao módulo 'React Select' que foi indicado.
   Funciona a partir do evento 'onKeyDown' no campo de texto do nome dos alunos (input type='text').

   Ao digitar qualquer tecla alfabética no input de texto do nome do aluno, a função 'selectSuggestion' é chamada.

   Na página do formulário, logo abaixo do input desse texto, há um input do tipo 'select' oculto ('display: none'),
   esse input 'select' lista alunos cujos nomes possuem a sequência de caracteres digitada pelo usuário no campo anterior.

   Quando há resultados na query de busca, o input 'select' é exibido ('display: block').

   A lista é atualizada com a função assíncrona 'loadStudents(name)' à medida que se digita no input (evento 'onChange').

   A função 'selectSuggestion' tem apenas dois (02) parâmetros(*):
   1º) a tecla que foi digitada ('key') quando ocorre o evento 'onKeyDown';
   2º) qual o tipo do input que está com foco ao chamar a função.

   (*) Observação: desconsidere os 3º e 4º parâmetros ('mudarValor', 'toggleDisplay'), pois...
                  ...eles estão aqui apenas para não dar 'undefined' na aplicação, pois...
                  ...a função realmente usada é a que ainda está no arquivo 'form.js' (ainda não foi migrada)...
                  ...e recebe essas funções 'mudarValor' e 'toggleDisplay' diretamente no escopo, não como parâmetros.
*/
export function selectSuggestion(key, inputType, mudarValor, toggleDisplay) {
  const alfabet = /^[a-zA-Z]$/; // qualquer caractere alfabético (exclui número, acentuação e pontuação)
  const specialKeys = ['Enter', 'Backspace', ' ']; // teclas com função especial

  // Se a seta para baixo por teclada no input do nome do aluno, o foco muda para a lista de alunos.
  if (key === 'ArrowDown') {
    document.getElementById('studentsList').focus();

    // Se o input com foco for o do nome do aluno, pré-selecionar o valor do primeiro nome na lista.
    // Isso é necessário porque, ao ganhar foco pelo ArrowDown, o valor do primeito item não é obtido automaticamente.
    if (inputType === 'text') {
      document.getElementById('studentsList').selectedIndex = '0';

      const primeiroItem = document.getElementById('studentsList').options[0];

      if (primeiroItem) {
        const valorDoPrimeiroItem = primeiroItem.value;
        mudarValor(JSON.parse(valorDoPrimeiroItem));
      }
    }
  }

  /*
    Uma vez que o input 'select' nativamente já atualiza o seu próprio valor quando a seta para baixo é teclada...
    ...basta usar o evento 'onChange' nesse próprio input para obter o valor do item selecionado.
    Esse valor selecionado é inserido instantaneamente no input de texto.
  */

  // Teclas especiais em ação quando o foco estiver no input 'select'.
  if (inputType === 'select') {
    /* Se uma das três teclas especiais for usada ou se uma da teclas usada for alfabética...
       então, esconder a lista de nomes e mudar o foco de volta para o input de texto.
    */
    if (specialKeys.includes(key) || key.match(alfabet) !== null) {
      toggleDisplay();
      document.getElementById('studentNameInput').focus();
    }

    /*
      Na prática, isso significa que, quando um dos nomes da lista está selecionado, os seguintes podem acontecer:
      1) Teclando 'Enter' o usuário confirma o nome selecinado, então a lista não precisa ser mais exibida;
      2) Teclando 'Backspace' o usuário pode alterar o nome selecionado.
      3) Teclando ' ' (espaço) ou uma tecla alfabética o usuário pode estender o nome do aluno (útil no caso de homônimos)
    */
  }
}
