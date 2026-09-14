const donorForm = document.getElementById("donorForm");
const message = document.getElementById("message");
let currentDonors = [];

donorForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const donorData = {
        name: document.getElementById("name").value.trim(),
        bloodGroup: document.getElementById("bloodGroup").value,
        age: Number(document.getElementById("age").value),
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value.trim(),
        city: document.getElementById("city").value.trim()
    };

    try {

        const response = await fetch("/api/donors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(donorData)
        });

        const data = await response.json();

        if (response.ok) {

            message.textContent = "✅ Donor registered successfully!";
            message.style.color = "green";

            donorForm.reset();

            console.log("Saved donor:", data);

        } else {

            message.style.color = "red";

            const errors = Object.values(data);

            message.textContent = errors.join(" | ");
        }

    } catch (error) {

        message.textContent = "❌ Unable to connect to server.";
        message.style.color = "red";

        console.error("Error:", error);
    }
});
// Search Donors

const searchButton = document.getElementById("searchButton");
const donorList = document.getElementById("donorList");

searchButton.addEventListener("click", async function () {

    const bloodGroup = document.getElementById("searchBloodGroup").value;
    const city = document.getElementById("searchCity").value.trim();

    try {

        let url = "/api/donors";

        if (bloodGroup && city) {
        url = `/api/donors/search?bloodGroup=${encodeURIComponent(bloodGroup)}&city=${encodeURIComponent(city)}`;
        }
        else if (bloodGroup) {
            url = `/api/donors/bloodgroup/${encodeURIComponent(bloodGroup)}`;
        }
        else if (city) {
            url = `/api/donors/city/${encodeURIComponent(city)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch donors");
        }

        const donors = await response.json();

        displayDonors(donors);

    } catch (error) {

        donorList.innerHTML = `
            <p style="color: red;">
                ❌ Unable to fetch donors.
            </p>
        `;

        console.error("Search error:", error);
    }
});


function displayDonors(donors) {
    currentDonors = donors;

    donorList.innerHTML = "";

    if (donors.length === 0) {

        donorList.innerHTML = `
            <p>No donors found.</p>
        `;

        return;
    }

    donors.forEach(donor => {

        const card = document.createElement("div");

        card.className = "donor-card";

        card.innerHTML = `
    <h3>🩸 ${donor.name}</h3>
    <p><strong>Blood Group:</strong> ${donor.bloodGroup}</p>
    <p><strong>Age:</strong> ${donor.age}</p>
    <p><strong>Gender:</strong> ${donor.gender}</p>
    <p><strong>Phone:</strong> ${donor.phone}</p>
    <p><strong>City:</strong> ${donor.city}</p>
        <button class="edit-button" onclick="editDonor(${donor.id})">
    ✏️ Edit
        </button>
        <button
    class="availability-button"
    onclick="toggleAvailability(${donor.id}, ${!donor.available})">
    ${donor.available ? "🟢 Available" : "🔴 Not Available"}
</button>
    <button class="delete-button" onclick="deleteDonor(${donor.id})">
        🗑️ Delete
    </button>
    `;

        donorList.appendChild(card);
    });
}
// Load all donors when page opens

window.addEventListener("load", function () {
    loadAllDonors();
    loadDonorCount();
    loadBloodRequests();
});

async function loadAllDonors() {

    try {

        const response = await fetch("/api/donors");

        if (!response.ok) {
            throw new Error("Failed to load donors");
        }

        const donors = await response.json();

        displayDonors(donors);

    } catch (error) {

        donorList.innerHTML = `
            <p style="color: red;">
                ❌ Unable to load donors.
            </p>
        `;

        console.error("Load donors error:", error);
    }
}
async function deleteDonor(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this donor?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(`/api/donors/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete donor");
        }

        alert("✅ Donor deleted successfully!");

        loadAllDonors();

    } catch (error) {

        alert("❌ Unable to delete donor.");

        console.error("Delete error:", error);
    }
}
function editDonor(id) {

    const donor = currentDonors.find(d => d.id === id);

    if (!donor) {
        alert("❌ Donor not found.");
        return;
    }

    document.getElementById("editId").value = donor.id;
    document.getElementById("editName").value = donor.name;
    document.getElementById("editBloodGroup").value = donor.bloodGroup;
    document.getElementById("editAge").value = donor.age;
    document.getElementById("editGender").value = donor.gender;
    document.getElementById("editPhone").value = donor.phone;
    document.getElementById("editCity").value = donor.city;

    document.getElementById("editModal").style.display = "flex";
}
const editForm = document.getElementById("editForm");

editForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const id = document.getElementById("editId").value;

    const donorData = {
        name: document.getElementById("editName").value.trim(),
        bloodGroup: document.getElementById("editBloodGroup").value,
        age: Number(document.getElementById("editAge").value),
        gender: document.getElementById("editGender").value,
        phone: document.getElementById("editPhone").value.trim(),
        city: document.getElementById("editCity").value.trim()
    };

    try {

        const response = await fetch(`/api/donors/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(donorData)
        });

        if (!response.ok) {

            const errorData = await response.json();

            alert(Object.values(errorData).join("\n"));

            return;
        }

        alert("✅ Donor updated successfully!");

        closeEditModal();

        loadAllDonors();

    } catch (error) {

        alert("❌ Unable to update donor.");

        console.error("Update error:", error);
    }
});
function closeEditModal() {

    document.getElementById("editModal").style.display = "none";

    document.getElementById("editForm").reset();
}

// Load dashboard counts
async function loadDonorCount() {
    try {
        const totalResponse = await fetch("/api/donors/count");
        const totalCount = await totalResponse.json();
        document.getElementById("totalDonors").textContent = totalCount;

        const aPlus = await fetch("/api/donors/count/A%2B");
        document.getElementById("countAPlus").textContent = await aPlus.json();

        const bPlus = await fetch("/api/donors/count/B%2B");
        document.getElementById("countBPlus").textContent = await bPlus.json();

        const oPlus = await fetch("/api/donors/count/O%2B");
        document.getElementById("countOPlus").textContent = await oPlus.json();

        const abPlus = await fetch("/api/donors/count/AB%2B");
        document.getElementById("countABPlus").textContent = await abPlus.json();

        const aMinus = await fetch("/api/donors/count/A-");
        document.getElementById("countAMinus").textContent = await aMinus.json();

        const bMinus = await fetch("/api/donors/count/B-");
        document.getElementById("countBMinus").textContent = await bMinus.json();

        const oMinus = await fetch("/api/donors/count/O-");
        document.getElementById("countOMinus").textContent = await oMinus.json();

        const abMinus = await fetch("/api/donors/count/AB-");
        document.getElementById("countABMinus").textContent = await abMinus.json();

    } catch (error) {
        console.error("Dashboard count error:", error);
    }
}

async function toggleAvailability(id, available) {
    try {
        const response = await fetch(
            `/api/donors/${id}/availability?available=${available}`,
            {
                method: "PUT"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update availability");
        }

        loadAllDonors();

    } catch (error) {
        alert("❌ Unable to update availability.");
        console.error("Availability error:", error);
    }
}
// Blood Request Form
const requestForm = document.getElementById("requestForm");
const requestMessage = document.getElementById("requestMessage");

requestForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const requestData = {
        patientName: document.getElementById("patientName").value.trim(),
        bloodGroup: document.getElementById("requestBloodGroup").value,
        units: Number(document.getElementById("units").value),
        hospitalName: document.getElementById("hospitalName").value.trim(),
        city: document.getElementById("requestCity").value.trim(),
        contactNumber: document.getElementById("contactNumber").value.trim()
    };

    try {
        const response = await fetch("/api/requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();

        if (response.ok) {
            requestMessage.textContent =
                "✅ Blood request submitted successfully!";
            requestMessage.style.color = "green";

            requestForm.reset();
        } else {
            requestMessage.textContent =
                Object.values(data).join(" | ");
            requestMessage.style.color = "red";
        }

    } catch (error) {
        requestMessage.textContent =
            "❌ Unable to connect to server.";
        requestMessage.style.color = "red";

        console.error("Request error:", error);
    }
});
// Load Blood Requests
async function loadBloodRequests() {
    const requestList = document.getElementById("requestList");

    try {
        const response = await fetch("/api/requests");

        if (!response.ok) {
            throw new Error("Failed to load blood requests");
        }

        const requests = await response.json();

        requestList.innerHTML = "";

        if (requests.length === 0) {
            requestList.innerHTML = "<p>No blood requests found.</p>";
            return;
        }

        requests.forEach(request => {
            const card = document.createElement("div");
            card.className = "request-card";

            card.innerHTML = `
                <h3>🩸 ${request.patientName}</h3>
                <p><strong>Blood Group:</strong> ${request.bloodGroup}</p>
                <p><strong>Units Required:</strong> ${request.units}</p>
                <p><strong>Hospital:</strong> ${request.hospitalName}</p>
                <p><strong>City:</strong> ${request.city}</p>
                <p><strong>Contact:</strong> ${request.contactNumber}</p>
                <button class="request-delete-button"
        onclick="deleteBloodRequest(${request.id})">
    🗑️ Delete Request
</button>
            `;

            requestList.appendChild(card);
        });

    } catch (error) {
        requestList.innerHTML =
            `<p style="color: red;">❌ Unable to load blood requests.</p>`;

        console.error("Request list error:", error);
    }}
        async function deleteBloodRequest(id) {
    if (!confirm("Are you sure you want to delete this blood request?")) {
        return;
    }

    try {
        const response = await fetch(`/api/requests/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete request");
        }

        alert("✅ Blood request deleted successfully!");

        await loadBloodRequests();

    } catch (error) {
        alert("❌ Unable to delete blood request.");
        console.error("Delete request error:", error);
    }
}