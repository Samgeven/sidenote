// input selectors
const sidenoteWrp = document.getElementById('sideNote'); // The sidenote itself	
const sidenoteCont = document.getElementById('sidenoteCont'); // Sidenote container, with bubble
const inputs = document.querySelectorAll('input');
const textareas = document.querySelectorAll('textarea');
const effectInputs = document.querySelectorAll('input[data-role="effect"]'); // effect checkboxes
const bgColor = document.getElementById('bgColor'); // background color picker
const toggleBubble = document.getElementById('bubbleOn'); // toggle bubble checkbox
const sidenoteArea = document.getElementById('sidenoteArea'); // sidenote text
const bubble = document.createElement("span");
const bubbleText = document.getElementById('bubbleText');
const copyCode = document.getElementById('copyCode'); // copy promocode checkbox
const copyInput = document.getElementById('copyInput'); // input with promocode from template
const promocodeValue = document.getElementById('promocode');

function handleUpdate() {
	const suffix = this.dataset.sizing || '';
	sidenoteWrp.style.setProperty(this.name, this.value + suffix);
	if (this.type == 'color') {
		document.documentElement.style.setProperty(`--${this.dataset.variable}`, this.value);
	}
}

function handleText() {
	sidenoteWrp.innerHTML = sidenoteArea.value;
	bubble.innerHTML = bubbleText.value;
	document.getElementById('copyInput').value = promocodeValue.value || '38Z1INNZ';
} 

function handleEffect() {
	sidenoteWrp.classList.toggle(this.name);
}

function handleDisabler() {
	if (this.id == "setBorder") {
		let borderDisabled = document.querySelectorAll("input[data-disabler='border']");
		borderDisabled.forEach(el => el.toggleAttribute('disabled'));
	}
	if (this.id == "bubbleOn") {
		let bubbleDisabled = document.querySelectorAll("input[data-disabler='bubble'], textarea[data-disabler='bubble']");
		bubbleDisabled.forEach(el => el.toggleAttribute('disabled'));
	}
}

function handleBubble() {
	if (this.id == 'bubbleOn') {
		if (this.checked) {
			bubble.classList.add("tooltiptext");
			bubble.setAttribute("id", "myTooltip");
			bubble.innerHTML = "Bubble text";
			sidenoteCont.append(bubble);
		}
		else {
			document.getElementById('myTooltip').remove();
		}
	}
}

function handleCopy() {
	let promocode = document.getElementById('textareaCode');
	let bubbleWrp = document.getElementById('bubbleWrp');
	if (this.id == 'copyCode' && this.checked) {
		let promocodeTemplate = `${sidenoteArea.value || 'Your sidenote'} <br> Промокод <input id="copyInput" onclick="copyToClipboard()" onmouseout="outFuncClipboard()" readonly="readonly" style="font-weight:inherit" type="text" value="38Z1INNZ" />`
		sidenoteArea.innerHTML = promocodeTemplate;
		sidenoteWrp.innerHTML = promocodeTemplate;
		bubbleWrp.style.display = "none";
		promocode.style.display = "block";

	}
	else {
		sidenoteWrp.innerHTML = 'Your sidenote';
		sidenoteArea.innerHTML = '';
		bubbleWrp.style.display = "flex";
		promocode.style.display = "none";
	}
}

// copy functions
function copyToClipboard() {
  var copyText = document.getElementById("copyInput");
  copyText.select();
  document.execCommand("copy");
  
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Промокод скопирован";
}

function outFuncClipboard() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Скопировать промокод";
}

// Event listeners for all input types

inputs.forEach(input => input.addEventListener('change', handleUpdate));
effectInputs.forEach(input => input.addEventListener('change', handleEffect));
inputs.forEach(input => input.addEventListener('change', handleDisabler));
textareas.forEach(input => input.addEventListener('change', handleText));
toggleBubble.addEventListener('change', handleBubble);
copyCode.addEventListener('change', handleCopy);