{/* <script> */ }
const fullscreenBtn = document.getElementById('fullscreenBtn');

fullscreenBtn.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }

    document.getElementById('slide-container').classList.add = 'w-[90%]';
});


function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}



function copyToClipboardWithSize(content, element) {
    // Get the input field next to the clicked element
    const input = element.parentNode.querySelector('input'); // Get the input field in the same parent div

    // Check if input exists
    // if (!input) {
    //   alert('Input field not found!');
    //   return;
    // }

    const size = input.value; // Get the value of the input field

    // Check if size is provided and is a valid number
    // if (size && !isNaN(size)) {
    // Use the Clipboard API to write the text directly
    navigator.clipboard.writeText(content).then(() => {
        // alert('Copied: ' + content + ' of size ' + size + 'px');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
    // } else {
    //   alert('Please enter a valid size.');
    // }
}

{/* </script> */ }