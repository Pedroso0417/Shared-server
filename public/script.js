async function loadData() {
  const res = await fetch("/data");
  const data = await res.json();
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}
