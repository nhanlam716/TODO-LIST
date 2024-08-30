const btnAdd = document.querySelector(".btnAdd");
const btnSearch = document.querySelector(".btnSearch");
const inputValue = document.querySelector(".addInput");
const searchInput = document.querySelector(".searchInput");
renderProduct();

btnSearch.addEventListener("click", () => {
  const searchValue = searchInput.value;

  let dataValue = JSON.parse(localStorage.getItem("listData")) || [];

  const searchFilter = dataValue.filter((item) => {
    return item.task.toLowerCase().includes(searchValue.toLowerCase());
  });

  let htmlResult = "";

  searchFilter.forEach((element) => {
    htmlResult += `
                  <tr>
                      <td>${element.task}</td>
                      <td>
                          <button onclick="handleEdit('${element.id}')">Edit</button>
                          <button onclick="handleDelete('${element.id}')">Delete</button>
                      </td>
                  </tr>
              `;
  });

  document.querySelector("#tbProduct").innerHTML = htmlResult;
});

btnAdd.addEventListener("click", () => {
  if (!inputValue.value) {
    alert("nhap thong tin");
    return;
  }

  if (btnAdd.classList.contains("Update")) {
    handleUpdate();
    return;
  }

  const Valuess = inputValue.value;

  const ObjValue = {
    id: crypto.randomUUID(),
    task: Valuess,
  };

  let dataValue = JSON.parse(localStorage.getItem("listData")) || [];

  let renderItems = [ObjValue, ...dataValue];

  localStorage.setItem("listData", JSON.stringify(renderItems));

  renderProduct();

  inputValue.value = "";
});

function renderProduct() {
  let dataValue = JSON.parse(localStorage.getItem("listData")) || [];

  let htmlResult = "";

  dataValue.forEach((element) => {
    htmlResult += `
            <tr>
                <td>${element.task}</td>
                <td>
                    <button onclick="handleEdit('${element.id}')">Edit</button>
                    <button onclick="handleDelete('${element.id}')">Delete</button>
                </td>
            </tr>
        `;
  });

  document.querySelector("#tbProduct").innerHTML = htmlResult;
}

function handleEdit(id) {
  let dataValue = JSON.parse(localStorage.getItem("listData")) || [];

  const dataFind = dataValue.find((item) => {
    return id === item.id;
  });

  inputValue.value = dataFind.task;

  btnAdd.textContent = "Update";
  btnAdd.classList.add("Update");
  btnAdd.setAttribute("data-id", id);
}

function handleUpdate() {
  const valueUpdate = inputValue.value;

  let dataValue = JSON.parse(localStorage.getItem("listData")) || [];

  const updateId = btnAdd.getAttribute("data-id");

  const dataProductUpdate = dataValue.map((elements) => {
    if (elements.id === updateId) {
      return {
        id: elements.id,
        task: valueUpdate,
      };
    } else {
      return elements;
    }
  });

  localStorage.setItem("listData", JSON.stringify(dataProductUpdate));

  renderProduct();

  inputValue.value = "";

  btnAdd.textContent = "Add";
  btnAdd.classList.remove("Update");
  btnAdd.removeAttribute("data-id");
}

function handleDelete(id) {
  if (confirm("xoa ???")) {
    let dataValue = JSON.parse(localStorage.getItem("listData")) || [];

    const index = dataValue.map((item) => item.id).indexOf(id);

    dataValue.splice(index, 1);

    localStorage.setItem("listData", JSON.stringify(dataValue));

    renderProduct();
  }
}
