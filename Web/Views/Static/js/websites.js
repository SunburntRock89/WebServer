let homepage;
document.onload = () => {
	homepage = document.querySelector("#main").innerHTML;
};
const goHome = async() => {
	document.querySelector("#main").innerHTML = homepage;
};

const domainSettings = async(fulldomain, protocol, id, domain, subdomain) => {
	let page = await fetch(encodeURI(`/static/domainSettings?fulldomain=${fulldomain}&protocol=${protocol}&id=${id}&domain=${domain}&subdomain=${subdomain}`));
	page = await page.text();

	page = page.split("\n").splice(2);

	document.querySelector("#main").innerHTML = page.join("\n");
};
