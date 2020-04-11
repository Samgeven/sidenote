
/******************** Input behavior ********************/

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

  var copyToClipboard = function() {
	var copyText = document.getElementById("copyInput");
	copyText.select();
	document.execCommand("copy");
	var tooltip = document.getElementById("myTooltip");
	tooltip.innerHTML = "Промокод скопирован";
  }
  
  var outFuncClipboard = function() {
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


/******************** Source code viewing ********************/

const sourceCode = document.getElementById('sourceCode'); // source code container

function showCode() {
	let blured = document.getElementById('blur');
	let shining = document.getElementById('shining');
	let bgColorSidenote = window.getComputedStyle(sidenoteWrp).backgroundColor; // taking computed result of bg instead of css vars in rulesets

	// templates for rulesets

	let templateBlur = `
		.blured:hover {
		    filter: blur(1px);
		    box-shadow: 0 0 10px 3px ${bgColorSidenote};
		    transition: 0.2s;
		}
	`;
	let templateShining = `
		.shining {
		    background: linear-gradient(90deg, ${bgColorSidenote} 70%, rgba(89,187,193,1) 75%, ${bgColorSidenote} 100%);
		    background-size: 300% 100%;
		    transition: 0.6s;
		}

		.shining:hover {
		    background-position: 200% 0;
		    transition: 1s;
		}
	`;
	let templateBubble = `
		.sidenote-tooltip_wrp {
		    position: relative;
		}

		.sidenote-tooltip_wrp .tooltiptext {
		    visibility: hidden;
		    font-size: 14px;
		    line-height: 20px;
		    width: 180px;
		    background-color: #555;
		    color: #fff;
		    text-align: center;
		    border-radius: 6px;
		    padding: 5px;
		    position: absolute;
		    z-index: 1;
		    bottom: 30px;
		    left: 125px;
		    margin-left: -75px;
		    opacity: 0;
		    transition: opacity 0.3s;
		}

		.sidenote-tooltip_wrp .tooltiptext::after {
		    content: "";
		    position: absolute;
		    top: 100%;
		    left: 50%;
		    margin-left: -5px;
		    border-width: 5px;
		    border-style: solid;
		    border-color: #555 transparent transparent transparent;
		}

		.sidenote-tooltip_wrp:hover .tooltiptext {
		    visibility: visible;
		    opacity: 1;
		}
	`;
	let templateSidenote = `
		.sidenote {
		    background-color: #2EB7B4;
		    text-align: center;
		    color: white;
		    max-width: 277px;
		    font-size: 14px;
		    line-height: 20px;
		    transition: 0.2s;
		    border-style: solid;
		    padding: 2px;
		}
	`;
	let templateScript = `
	<script>
	  var copyToClipboard = function() {
		var copyText = document.getElementById("copyInput");
		copyText.select();
		document.execCommand("copy");
		var tooltip = document.getElementById("myTooltip");
		tooltip.innerHTML = "Промокод скопирован";
	  }
	  
	  var outFuncClipboard = function() {
		var tooltip = document.getElementById("myTooltip");
		tooltip.innerHTML = "Скопировать промокод";
	  }
	</script>
	`;

	// depending on which inputs were selected, the source code will contain only needed rulesets and scripts

	let styleTemplate = `
	<style>
		${templateSidenote}${blured.checked ? templateBlur : ''}${shining.checked ? templateShining : ''}${toggleBubble.checked ? templateBubble : ''}
	</style>
	`;

	sourceCode.innerHTML = '';
	copyCode.checked ? sourceCode.insertAdjacentText('afterbegin', templateScript) : '';
	sourceCode.insertAdjacentText('afterbegin', sidenoteCont.outerHTML);
	sourceCode.insertAdjacentText('afterbegin', styleTemplate);
}

function copySource() {
	let virInput = document.getElementById('virInput');
	virInput.innerHTML = sourceCode.innerText;
	virInput.select();
	document.execCommand("copy");
}

function toTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
}

function insertClone() {
	let resultNode = document.getElementById('resultSd');
	let clone = sidenoteCont.cloneNode(true);
	resultNode.innerHTML = '';
	resultNode.appendChild(clone);
}

copyBtn.addEventListener('click', copySource);
backBtn.addEventListener('click', toTop);
readyBtn.addEventListener('click', showCode);
readyBtn.addEventListener('click', insertClone);
