//DOM ELEMENTS
const button = document.querySelector("#submit");
const table = document.querySelector("tbody");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const editName = document.querySelector("#name-edit");
const editEmail = document.querySelector("#email-edit");
const modal = document.querySelector("#edit");
const submitPut = document.querySelector("#submit2");
const cancel = document.querySelector("#cancel");
const feedback = document.querySelector("#alert-bar");

//VARIABLES
const PATH = "http://localhost:8080/user";

//LISTENERS
window.addEventListener("load", list());
button.addEventListener("click", submit);

//FUNCTIONS

//GET
function lineColor(id) {
    if (Number.isInteger(id / 2)) {
        return "dark-column";
    } else {
        return "light-column";
    }
}

async function list() {
    try {
        const resp = await GETlist();
        const users = resp.data;

        if (resp.status != 200) {
            throw resp.message;
        }

        table.innerHTML = "";

        users.forEach((el, index) => {
            table.innerHTML += `
                <tr class=${lineColor(index)}>
                    <td>${el.id}</td>
                    <td>${el.name}</td>
                    <td>${el.email}</td>
                    <td onclick='change(${el.id},"${el.name}","${el.email
                }")'><span class="material-symbols-outlined">edit</span></td>
                    <td onclick="del(${el.id
                })"><span class="material-symbols-outlined">close</span></td>
                </tr>
            `;
        });

        return sucess(resp.message);
    } catch (error) {
        console.log(error);
        return failure(error);
    }
}

async function GETlist() {
    try {
        const resp = await fetch(PATH + "/list");
        return resp.json();
    } catch (error) {
        return Promise.reject(error);
    }
}

//POST
async function submit() {
    try {
        const resp = await POST();

        if (resp.status != 200) {
            throw resp.message;
        }

        list();
        return sucess(resp.message);
    } catch (error) {
        console.log(error);
        return failure(error);
    }
}

async function POST() {
    try {
        const obj = {
            name: inputName.value,
            email: inputEmail.value,
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        };

        const resp = await fetch(PATH, options);
        return resp.json();
    } catch (error) {
        return Promise.reject(error);
    }
}

//PUT
async function change(id, name, email) {
    try {
        console.log("teste");
        editName.value = name;
        editEmail.value = email;
        modal.style.display = "flex";

        submitPut.onclick = async () => {
            const resp = await PUT(id);
            modal.style.display = "none";

            if (resp.status != 200) {
                throw resp.message;
            }

            list();
            return sucess(resp.message);
        };

        cancel.onclick = () => {
            modal.style.display = "none";
        };
    } catch (error) {
        console.log(error);
        return failure(error);
    }
}

async function PUT(id) {
    try {
        const obj = {
            name: editName.value,
            email: editEmail.value,
        };

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        };

        const resp = await fetch(PATH + `/${id}`, options);
        return resp.json();
    } catch (error) {
        return Promise.reject(error);
    }
}

//DELETE
async function del(id) {
    try {
        const resp = await DELETE(id);

        if (resp.status != 200) {
            throw resp.message;
        }

        list();
        return sucess(resp.message);
    } catch (error) {
        console.log(error);
        return failure(error);
    }
}

async function DELETE(id) {
    try {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const resp = await fetch(PATH + `/${id}`, options);
        return resp.json();
    } catch (error) {
        return Promise.reject(error);
    }
}

//FEEDBACK
function sucess(data) {
    const id = feedback.children.length;

    feedback.innerHTML += `
        <p id="${id}" class="sucess">${data}</p>
    `;

    setTimeout(() => {
        const card = document.getElementById(`${id}`);
        feedback.removeChild(card);
    }, 4000);
}

function failure(data) {
    const id = feedback.children.length;

    feedback.innerHTML += `
        <p id="${id}" class="failure">${data}</p>
    `;

    setTimeout(() => {
        const card = document.getElementById(`${id}`);
        feedback.removeChild(card);
    }, 4000);
}
