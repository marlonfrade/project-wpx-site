const budgetList = [];
const modelItem = document.querySelector("[modalItens]");
const addItens = document.getElementById("addItens");
const viewItens = document.getElementById("viewItens");
const table = document.querySelector("[table]");
let id = 0;

// View and Insert Machines Handlers
const createMachinesModal = (imgPath, title) => {
  addItens.innerHTML = "";
  addItens.innerHTML = `  
    <div
        class="budget__image"
        style="background-image: url(${imgPath.replace(/['"]+/g, "")})"
    ></div>
    <div class="budget__text">
        <div title class="budget__title">${title}</div>
    
        <div more class="budget__more flex fade-in open">
        <div qty class="qty flex flex-jc-sb">
            Qtd.
            <button decrement>-</button>
            <p number></p>
            <button increment>+</button>
        </div>
        <div class="model">
            Modelo
            <select modelSelect name="machine" id="equipamentos">
            <option value="sem-modelo">S/ modelo</option>
            </select>
        </div>
        </div>
        <div class="budget__description">
        <button add  id="add" class="collapsible-add">
            Adicionar
        </button>
        </div>
    </div>    
    `;

  const add = modelItem.querySelector("[add]");
  add.addEventListener("click", () => {
    if (budgetList.length === 0) id = 0;
    const qty = addItens.querySelector("[number]");
    const modelSelect = document.querySelector("[modelSelect]");
    const group = addItens.querySelector("[title]");

    const modelSelectValue =
      modelSelect.options[modelSelect.selectedIndex].value;
    const qtyValue = parseInt(qty.innerText);
    const groupValue = group.innerText;

    id += 1;
    const currentId = id;
    const budgetItem = {
      id: id,
      quantity: qtyValue,
      model: modelSelectValue,
      group: groupValue,
    };

    budgetList.push(budgetItem);

    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdGroup = document.createElement("td");
    const tdModel = document.createElement("td");
    const tdQty = document.createElement("td");
    const tdDel = document.createElement("td");
    tdDel.classList.add("remove");
    tdDel.innerText = "Excluir";
    tdId.classList.add("id");

    tdId.innerText = budgetItem.id;
    tdGroup.innerText = budgetItem.group;
    tdModel.innerText = budgetItem.model;
    tdQty.innerText = budgetItem.quantity;

    tr.appendChild(tdId);
    tr.appendChild(tdGroup);
    tr.appendChild(tdModel);
    tr.appendChild(tdQty);
    tr.appendChild(tdDel);
    table.appendChild(tr);

    data = 1;
    number.innerText = data;
    modelSelect.selectedIndex = 0;

    tdDel.addEventListener("click", () => {
      for (let i = 0; i < budgetList.length; i++) {
        if (budgetList[i].id === currentId) {
          budgetList.splice(i, 1);
          i--;
          tdDel.parentElement.remove();
        }
      }
    });
  });

  const decrement = modelItem.querySelector("[decrement]");
  const increment = modelItem.querySelector("[increment]");
  const number = modelItem.querySelector("[number]");

  data = 1;
  number.innerText = data;

  decrement.addEventListener("click", () => {
    if (data > 1) {
      data = data - 1;
      number.innerText = data;
    } else {
    }
  });

  increment.addEventListener("click", () => {
    data += 1;
    number.innerText = data;
  });
};

const addMaquinas = document.getElementById("addMaquinas");
addMaquinas.addEventListener("click", () => {
  createMachinesModal("../../../src/img/maquinas.min.jpg", "Máquinas");
});

const addCaminhoes = document.getElementById("addCaminhoes");
addCaminhoes.addEventListener("click", () => {
  createMachinesModal("../../../src/img/caminhoes.min.jpg", "Caminhões");
});

const addEquipamentos = document.getElementById("addEquipamentos");
addEquipamentos.addEventListener("click", () => {
  createMachinesModal("../../../src/img/implementosbg.min.png", "Implementos");
});

const addPasseio = document.getElementById("addPasseio");
addPasseio.addEventListener("click", () => {
  createMachinesModal("../../../src/img/passeio.min.jpg", "Veículos");
});

const openList = document.getElementById("openList");
openList.addEventListener("click", () => {
  addItens.innerHTML = "";
});

// Errors Handlers
const handleErrorMsg = (message, accordionNumber) => {
  const budgetSection = document.querySelector("[budgetSection]");
  const error = document.createElement("div");
  error.setAttribute("class", "alert danger-alert");
  error.innerHTML = `
        <p>${message}</p>
        <a
          class="closeBtn"
          onclick="this.parentElement.style.display='none'"
          >&times;
        </a>
    `;

  budgetSection.appendChild(error);
  error.style.display = "block";

  const acc = document.querySelector(`[${accordionNumber}]`);
  acc.style.border = "2px solid red";
  acc.onclick = () => {
    acc.style.border = "none";
    error.style.display = "none";
  };
};

// Budget Handlers
let budget = document.querySelector("[budget]");

const budgetToSend = {};

budget.addEventListener("click", async () => {
  const list = budgetList;

  const state = document.getElementById("state");
  const city = document.getElementById("city");
  const period = document.getElementById("period");
  const periodType = document.getElementById("periodType");
  const checkbox = document.getElementById("noPeriod");

  const stateValue = state.options[state.selectedIndex].value;
  const cityValue = city.value;
  const periodValue = period.value;
  const periodTypeValue = periodType.value;

  const clientName = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  const nameValue = clientName.value;
  const emailValue = email.value;
  const phoneValue = phone.value;

  const emailValidRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (list.length === 0) {
    handleErrorMsg("Selecione pelo menos 1 tipo de Maquinário!", "accordion1");
  } else if (
    nameValue.length < 1 ||
    emailValue.length < 1 ||
    phoneValue.length < 1
  ) {
    handleErrorMsg("Informe seus Dados para Contato!", "accordion3");
  } else if (!emailValue.match(emailValidRegex)) {
    handleErrorMsg("Preencha um email Válido!", "accordion3");
  } else {
    // LOADING
    const budget = document.querySelector("[budget]");
    budget.innerHTML = `
        <span class="loader loader-quart-1"></span>
      `;

    // Send Information
    budgetToSend.itens = budgetList;

    if (stateValue == "" && cityValue.length < 1) {
      budgetToSend.location_state = null;
      budgetToSend.location_city = null;
    } else {
      budgetToSend.location_state = `${stateValue}`;
      budgetToSend.location_city = `${cityValue}`;
    }

    if (checkbox.checked || periodValue.length < 1) {
      budgetToSend.period_qty = null;
      budgetToSend.period_type = null;
    } else {
      budgetToSend.period_qty = `${periodValue}`;
      budgetToSend.period_type = `${periodTypeValue}`;
    }

    budgetToSend.name = nameValue;
    budgetToSend.email = emailValue;
    budgetToSend.phone = phoneValue;

    handleSubmitBudget(budgetToSend);
  }
});

// Request Handlers
const handleSubmitBudget = async (data) => {
  console.log(data);

  const res = await fetch(
    "http://wpxlocacao.com.br/_wpxintranetapi/wpx-intranet-api/index.php",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(res.status, res.response, res.ok);

  if (res.status === 200) {
    const myModal = document.querySelector("[myModal]");
    const modalContent = document.querySelector("[modal-content]");
    modalContent.innerHTML = `
                  <span
                    class="closebtn"
                    onclick="this.parentElement.style.display='none'"
                    >&times;</span
                    >
                    <h3>Orçamento criado com sucesso, deseja visualizar o PDF?</h3>
                    <button class="btn" onclick="printPdf()">
                      Visualizar
                    </button>
          
                    `;

    // window.scrollTo(0, 0);
    myModal.style.display = "block";
    const closebtn = modalContent.querySelector(".closebtn");
    closebtn.addEventListener("click", () => {
      location.replace("/views/confirm.html");
    });
    budget.innerHTML = `
                  <button>Solicitar orçamento</button>
                `;
  } else {
    handleErrorMsg("Tivemos problemas, tente novamente!");
  }
};

// Print Budget PDF
function printPdf() {
  //Location
  // Elementos
  const state = document.getElementById("state");
  const city = document.getElementById("city");
  const period = document.getElementById("period");
  const periodType = document.getElementById("periodType");
  const checkbox = document.getElementById("noPeriod");

  // Valores
  const stateValue = state.options[state.selectedIndex].value;
  const cityValue = city.value;
  const periodValue = period.value;
  const periodTypeValue = periodType.value;

  // Information
  // Elementos
  const clientName = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  // Valores
  const nameValue = clientName.value;
  const emailValue = email.value;
  const phoneValue = phone.value;

  const janela = window.open("", "", "width=800, height=600");
  janela.document.write("<html><head>");
  janela.document.write("<title>PDF</title></head>");
  janela.document.write("<body>");
  janela.document.write("<h1>Solicitação de Orçamento</h1>");
  janela.document.write("<h2>Máquinas Solicitadas:</h2>");
  for (let item of budgetList) {
    janela.document.write(`<h3> group: ${item.group}</h3>`);
    janela.document.write(`<p> quantity: ${item.quantity}</p>`);
    janela.document.write(`<p> model: ${item.model}</p>`);
  }
  janela.document.write("<h2>Local Solicitado:</h2>");
  janela.document.write(`<p> ${stateValue}</p>`);
  janela.document.write(`<p> ${cityValue}</p>`);
  if (stateValue == "" && cityValue.length < 1) {
    janela.document.write("<p>O cliente não deseja informar o Local.</p>");
  }
  janela.document.write("<h2>Período Solicitado:</h2>");
  if (checkbox.checked || periodValue.length < 1) {
    janela.document.write("<p>O cliente não deseja informar o período.</p>");
  } else {
    janela.document.write(`<p> ${periodValue}</p>`);
    janela.document.write(`<p> ${periodTypeValue}</p>`);
  }
  janela.document.write("<h2>Informações do Cliente:</h2>");
  janela.document.write(`<p> ${nameValue}</p>`);
  janela.document.write(`<p> ${emailValue}</p>`);
  janela.document.write(`<p> ${phoneValue}</p>`);
  janela.document.write("</body></html>");
  janela.document.close();
  janela.print();
  location.replace("/views/confirm.html");
}
