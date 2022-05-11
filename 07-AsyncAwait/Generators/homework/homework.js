function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let contador = 1;

  while (contador <= max) {
    if (contador % 3 === 0 && contador % 5 === 0) yield "Fizz Buzz";
    else if (contador % 3 === 0) yield "Fizz";
    else if (contador % 5 === 0) yield "Buzz";
    else yield contador;
    contador++;
  }
}
module.exports = fizzBuzzGenerator;
