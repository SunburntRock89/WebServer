async function login() {
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

	res = res.json();
}
