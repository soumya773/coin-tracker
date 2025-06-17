const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
    let cryptoData = [];

    // Fetch using async/await
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        cryptoData = data;
        renderTable(cryptoData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    // Render table
    function renderTable(data) {
      const tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = "";

      data.forEach(coin => {
        const row = `<tr>
            <td><img src="${coin.image}" alt="${coin.name}" />${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>${coin.current_price}</td>
            <td>${coin.total_volume}</td>
            <td class="${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
              ${coin.price_change_percentage_24h.toFixed(2)}%
            </td>
            <td>Mkr Cap: ${coin.market_cap}</td>
          </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    }

    // Search Functionality
    document.getElementById("searchInput").addEventListener("input", e => {
      const query = e.target.value.toLowerCase();
      const filtered = cryptoData.filter(coin =>
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
      );
      renderTable(filtered);
    });

    // Sort by Market Cap
    function sortByMarketCap() {
      const sorted = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
      renderTable(sorted);
    }

    // Sort by Percentage
    function sortByPercentage() {
      const sorted = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      renderTable(sorted);
    }

    // Initial load using .then method
    function fetchWithThen() {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          cryptoData = data;
          renderTable(data);
        })
        .catch(err => console.error(err));
    }

    // Choose one of the fetch methods:
    fetchData(); // or fetchWithThen();