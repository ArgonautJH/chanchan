const iframeContent = document.getElementById('contentFrame');
const navLink = document.querySelectorAll('.nav-link');

const linkStr = [
	""
]

console.log(navLink);

for(let i = 0; i < navLink.length; i++) {
	navLink[i].addEventListener('click', function() {
		iframeContent.src = "contents/"+ navLink[i].innerText + '.html';
	});
};