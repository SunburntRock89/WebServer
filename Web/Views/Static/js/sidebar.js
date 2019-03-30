window.onload = async() => {
	let menuitems = await Array.from(await document.getElementsByTagName("li"));
	let currentItem = await menuitems.find(i => i.href == window.pathname);
	currentItem.children[0].classList = "is-active";
};
