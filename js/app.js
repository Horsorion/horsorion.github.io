const logo = document.querySelectorAll("#horsorion_svg_logo path");

for(let i = 0; i<logo.length;i++){
	console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
}