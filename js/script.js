// Custom colorpicker icon
const inputColor = document.querySelectorAll('.main-input_color:after');


// input selectors
const sidenoteWrp = document.getElementById('sideNote');
const inputs = document.querySelectorAll('input');
const effectInputs = document.querySelectorAll('input[data-role="effect"]');
const textareas = document.querySelectorAll('textarea');
const bgColor = document.getElementById('bgColor');

function handleUpdate() {
	const suffix = this.dataset.sizing || '';
	sidenoteWrp.style.setProperty(this.name, this.value + suffix);
	/*
	if (this.type == 'color') {

	}
	*/

}

function handleText() {
	sidenoteWrp.innerHTML = this.value;
} 

function handleEffect() {
	sidenoteWrp.classList.toggle(this.name);
	if (this.id == 'shining') {
		// sidenoteWrp.style.background = `linear-gradient(90deg, ${bgColor.value} 70%, rgba(89,187,193,1) 75%, ${bgColor.value} 100%)`
	}
}

function handleDisabler() {
	if (this.id == "setBorder") {
		let borderDisabled = document.querySelectorAll("input[data-disabler='border']");
		borderDisabled.forEach(el => el.toggleAttribute('disabled'));
	}
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
effectInputs.forEach(input => input.addEventListener('change', handleEffect));
inputs.forEach(input => input.addEventListener('change', handleDisabler));
textareas.forEach(input => input.addEventListener('change', handleText));