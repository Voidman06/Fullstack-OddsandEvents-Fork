// == State ==
let bank = [];
let odds = [];
let evens = [];

function addNumber(n) {
  if (Number.isNaN(n)) return;
  else bank.push(n);
}

function sortOne() {
  if (bank.length === 0) {
    return;
  }

  const num = bank[0];

  if (num % 2 !== 0) {
    odds.push(num);
  } else if (num % 2 === 0) {
    evens.push(num);
  } else console.error("error");

  bank.shift();
}

function sortAll() {
  if (bank.length === 0) {
    return;
  }

  while (bank.length > 0) {
    const num = bank.shift();
    if (num % 2 !== 0) {
      odds.push(num);
    } else if (num % 2 === 0) {
      evens.push(num);
    } else console.error("error");
  }
}

// == Components ==
function InputForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Add a number to the bank.
      <input name="bank" type="number" min="1" />
    </label>
    <button type="submit">+</button>
    <button type="button" id="sort-one" >Sort 1</button>
    <button type="button" id="sort-all" >Sort All</button>
  `;

  $form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const raw = new FormData($form).get("bank");

    if (raw === "") return;

    const value = Number(raw);
    addNumber(value);

    $form.reset();
    render();
  });

  $form.querySelector("#sort-one").addEventListener("click", () => {
    sortOne();
    render();
  });

  $form.querySelector("#sort-all").addEventListener("click", () => {
    sortAll();
    render();
  });
  return $form;
}

// == Render ==
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odds and Events</h1>
    <InputForm></InputForm>
    <p id="banky"></banky>
    <p id="oddsy"></oddsy>
    <p id="evensy"></evensy>
  `;

  $app.querySelector("InputForm").replaceWith(InputForm());
  $app.querySelector("#banky").textContent = "Bank: " + bank.join(", ");
  $app.querySelector("#oddsy").textContent = "Odds: " + odds.join(", ");
  $app.querySelector("#evensy").textContent = "Evens: " + evens.join(", ");
}

render();
