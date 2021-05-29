document.querySelector("#user-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("#user-input").value;

  var params = new URLSearchParams();
  params.append("username", username);

  var url = "index.html?" + params.toString();
  location.href = url;
});
