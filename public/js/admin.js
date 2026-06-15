document.addEventListener("DOMContentLoaded", () => {

  alert("LOADED");
  
  let search = "";
  let selectedStatus = "";
  let page = 1;
  let limit = 5;
  let searchTimeout;

  const loading = document.getElementById("loading");
  const list = document.getElementById("list");
  const searchInput = document.getElementById("searchInput");

  if (!localStorage.getItem("token")) {
    window.location.href = "/login.html";
    return;
  }

  async function loadFeedbacks() {
    loading.classList.remove("hidden");


    try {
      const res = await fetch(
        `http://localhost:3001/feedback/admin/feedbacks?search=${search}&status=${selectedStatus}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      if (!res.ok) {
        window.location.href = "/login.html";
        return;
      }

      const data = await res.json();

      loading.classList.add("hidden");

      const total = data.data.total;

      document.getElementById("totalCount").innerText =
        `Total Feedbacks : ${total}`;

      const feedbacks = data.data?.feedbacks || [];

      list.innerHTML = "";

      feedbacks.forEach(item => {
        const div = document.createElement("div");

        div.className = "bg-white p-4 rounded shadow";

        div.innerHTML = `
        <h2 class="font-bold pb-2">${item.title}</h2>
        <p class="pb-2">${item.message}</p>
      
        <select onchange="updateStatus('${item.id}', this.value)">
          <option value="SUBMITTED" ${item.status === "SUBMITTED" ? "selected" : ""}>
            SUBMITTED
          </option>
      
          <option value="IN_REVIEW" ${item.status === "IN_REVIEW" ? "selected" : ""}>
            IN_REVIEW
          </option>
      
          <option value="RESOLVED" ${item.status === "RESOLVED" ? "selected" : ""}>
            RESOLVED
          </option>
        </select>
      `;

        list.appendChild(div);
      });

    } catch (err) {
      loading.classList.add("hidden");
      console.log(err);
    }
  }

  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      search = e.target.value;
      page = 1;
      loadFeedbacks();
    }, 500);
  });

  document.getElementById("statusFilter")
    .addEventListener("change", (e) => {
      selectedStatus = e.target.value;
      page = 1;
      loadFeedbacks();
    });

  document.getElementById("nextBtn")
    .addEventListener("click", () => {
      page++;
      loadFeedbacks();
    });

  document.getElementById("prevBtn")
    .addEventListener("click", () => {
      if (page > 1) {
        page--;
        loadFeedbacks();
      }
    });

  loadFeedbacks();
});

window.updateStatus = async function(id, status) {

  console.log("RAW ID:", id);
  console.log("RAW STATUS:", status);

  const body = { status };

  console.log("REQUEST BODY:", body);

  const res = await fetch(
    `http://localhost:3001/feedback/admin/feedbacks/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(body)
    }
  );

  const text = await res.text();
  console.log("STATUS:", res.status);
  console.log("RESPONSE:", text);
};


window.logout = function () {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
};