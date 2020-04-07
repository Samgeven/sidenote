// Custom colorpicker icon
const inputColor = document.querySelectorAll('.main-input_color:after');


// input selectors
const input = document.querySelectorAll('input');
const sidenoteWrp = document.getElementById('sideNote');
const fontsize = document.getElementById('fontSize');


function changeSidenote() {
    sidenoteWrp.style.fontSize == fontsize.value + 'px';
}

changeSidenote();

input.forEach(el => el.addEventListener('change', changeSidenote()));