document.querySelector("#user-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("#user-input").value;

  // (B) URL PARAMETERS
  var params = new URLSearchParams();
  params.append("username", username);

  // (C) GO!
  var url = "index.html?" + params.toString();
  location.href = url;
  //   history.pushState({"i": "hello world"},"User","https://localhost:")
});
