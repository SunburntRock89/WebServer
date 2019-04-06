async function login(button) {
	button.classList = "button is-loading is-info";
	button.disabled = true;
	let userBox = document.querySelector("#userBox");
	let passwordBox = document.querySelector("#passwordBox");

	let res = await fetch("/login", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({
			username: userBox.value,
			password: passwordBox.value,
		}),
	});

	res = await res.json();

	if (res.code < 0) {
		window.location.href = "/";
	}

	if (res.code !== 0) {
		document.getElementById("tag").innerHTML = res.msg;
		document.getElementById("tag").classList = "tag is-danger is-medium";
	}

	button.classList = "button is-info";
	button.disabled = false;
}
