document.getElementById("go").addEventListener("click", async () => {
    console.log("Search button clicked!");

    const query = document.getElementById("q").value.trim();

    if(!query) {
        alert("Please enter a search term");
        return;
    }
    
    console.log("Searching for: ", query);

    fetchAndDisplay(query, "google", "google");
    fetchAndDisplay(query, "bing", "bing");
    fetchAndDisplay(query, "yahoo", "yahoo");
    fetchAndDisplay(query, "duckduckgo", "duckduckgo");

});

document.getElementById("q").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("go").click();
    }
});

async function fetchAndDisplay(query, engine, containerId) {
    try {
        const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}&engine=${engine}`);
        if (!res.ok) {
            throw new Error(`Server returned ${res.status}`);
        }

        const data = await res.json();
        console.log(`${engine} results:`, data);

        displayResults(containerId, data);
    } catch (err) {
        console.error(`Error fetching ${engine} results:`, err);
    }
}

document.getElementById("dark-mode-btn").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});


function displayResults(engineID, data) {
    const container = document.getElementById(engineID);
    container.innerHTML = "";

    if (!data.organic_results || data.organic_results.length === 0) {
        container.innerHTML = "<p>No results found.</p>";
        return;
    }

    const ul = document.createElement("ul");

    data.organic_results.slice(0, 10).forEach(result => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        // Title (blue clickable)
        a.href = result.link;
        a.textContent = result.title;
        a.target = "_blank";
        li.appendChild(a);

        // Display link (green like Google)
        if (result.link) {
            const linkDisplay = document.createElement("div");
            linkDisplay.classList.add("result-link");
            linkDisplay.textContent = result.link;
            li.appendChild(linkDisplay);
        }

        // Snippet/description
        if (result.snippet) {
            const desc = document.createElement("p");
            desc.textContent = result.snippet;
            li.appendChild(desc);
        }

        ul.appendChild(li);
    });

    container.appendChild(ul);
}
