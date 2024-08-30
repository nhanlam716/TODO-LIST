const btnAdd = document.querySelector(".form button");
const tbProduct = document.querySelector("#tbProduct");
const valuesss = document.querySelector("input");
renderProduct();

btnAdd.addEventListener("click", function () {
  if (!valuesss.value) {
    alert("Vui lòng nhập thông tin !!!");
    return;
  }

  if (btnAdd.classList.contains("Update")) {
    handleUpdate();
    return;
  }

  const inputValue = valuesss.value;

  const objProduct = {
    id: crypto.randomUUID(),
    name: inputValue,
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

  dataProduct.forEach((objProduct, index) => {
    htmlResult =
      htmlResult +
      `
            <tr>
                <td>${objProduct.name}</td>
                <td>
                    <button onclick="handleEdit(${index})">Edit</button>
                    <button onclick="handleDelete(${index})">Delete</button>
                </td>
            </tr>
        `;
  });

  tbProduct.innerHTML = htmlResult;
}

function handleEdit(index) {
  let dataProduct = JSON.parse(localStorage.getItem("listProduct")) || [];

  // Tìm được và lấy ra phần tử muốn edit
  // Edit phần từ
  // Lưu lại vào mảng ban đầu 

  if (dataProduct.length > 0) {
    valuesss.value = dataProduct[index].name;

    btnAdd.textContent = "Update";

    btnAdd.classList.add("Update");

    btnAdd.setAttribute("data-id", index);
  }
};

function handleUpdate() {
  const inputValues = valuesss.value;

  let idUpdate = btnAdd.getAttribute("data-id");

  let dataProduct = JSON.parse(localStorage.getItem("listProduct")) || [];

  dataProduct[idUpdate].name = inputValues;

  localStorage.setItem("listProduct", JSON.stringify(dataProduct));

  renderProduct();

  resetBtnAdd();
};

function handleDelete(index) {
  if (confirm(`Chắc Chắn xóa ???`)) {
    let dataProduct = JSON.parse(localStorage.getItem("listProduct")) || [];

    dataProduct.splice(index, 1);

    localStorage.setItem("listProduct", JSON.stringify(dataProduct));

    renderProduct();
  }
};

function resetBtnAdd() {
  resetForm();

  btnAdd.textContent = "Add";
  btnAdd.classList.remove("Update");
  btnAdd.removeAttribute("data-id");
};

function resetForm() {
  document.querySelector("input").value = "";
};
