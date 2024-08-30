const btnAdd = document.querySelector(".form button");
const tbProduct = document.querySelector("#tbProduct");
const valuesss = document.querySelector("input");

renderProduct();

btnAdd.addEventListener("click", function () {
  if(!valuesss.value) {
    alert('Vui lòng nhập thông tin !!!');
    return;
  }

  if (btnAdd.classList.contains("Update")) {
    handleUpdate();
    return;
  };

  const inputValue = valuesss.value;

  const objProduct = {
    id: crypto.randomUUID(),
    task: inputValue,
  };

  let dataProduct = JSON.parse(localStorage.getItem("listProduct")) || [];

  const listProductUpdate = [objProduct, ...dataProduct];

  localStorage.setItem("listProduct", JSON.stringify(listProductUpdate));

  renderProduct();
  
  resetForm();
});

function renderProduct() {
  const dataProduct = JSON.parse(localStorage.getItem("listProduct")) || [];

  htmlResult = "";

  dataProduct.forEach((objProduct) => {
    htmlResult =
      htmlResult +
      `
            <tr>
                <td>${objProduct.task}</td>
                <td>
                    <button class="btn btn-warning btn-edit" data-id="${objProduct.id}">Edit</button>
                    <button class="btn btn-warning btn-delete" data-id="${objProduct.id}">Delete</button>
                </td>
            </tr>
        `;
  });

  tbProduct.innerHTML = htmlResult;
};

function handleUpdate() {
  const inputValues = valuesss.value;

  let dataProduct = JSON.parse(localStorage.getItem("listProduct")) || [];

  const editId = btnAdd.getAttribute("data-id");

  const dataProductUpdate = dataProduct.map((elements) => {
    if (elements.id === editId) {
      return {
        id: elements.id,
        task: inputValues,
      };
    } else {
      return elements;
    }
  });

  localStorage.setItem("listProduct", JSON.stringify(dataProductUpdate));

  renderProduct();

  resetBtnAdd();
};

tbProduct.addEventListener("click", function (e) {
  const clicked = e.target;

  if (clicked.classList.contains("btn-delete") && confirm('Bạn chắc chắn xóa ???')) {
    const deleteId = clicked.getAttribute("data-id");

    let dataProduct = JSON.parse(localStorage.getItem("listProduct")) || [];

    dataProduct.splice(deleteId, 1);

    localStorage.setItem("listProduct", JSON.stringify(dataProduct));
    
    renderProduct();

  } else if (clicked.classList.contains("btn-edit")) {
    const editId = clicked.getAttribute("data-id");

    let dataProduct = JSON.parse(localStorage.getItem("listProduct")) || [];

    const dataFind = dataProduct.find((items) => {
      return items.id === editId;
    });

    document.querySelector("input").value = dataFind.task;

    btnAdd.textContent = "Update";
    btnAdd.classList.add("Update");
    btnAdd.setAttribute("data-id", editId);
  }
});

function resetBtnAdd() {
  resetForm();

  btnAdd.textContent = "Add";
  btnAdd.classList.remove("Update");
  btnAdd.removeAttribute("data-id");
};

function resetForm() {
  document.querySelector("input").value = "";
};
