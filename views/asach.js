// <!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Slideshow App</title>
//   <script src="https://cdn.tailwindcss.com"></script>
//   <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
//   <script src="https://cdn.jsdelivr.net/npm/handtrackjs/dist/handtrack.min.js"></script>
//   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">


//   <style>
//     .background-slide {
//       background-image: url('https://images.rawpixel.com/ime_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00ODYtYmctMDE5ZC14LmpwZw.jpg');
//       background-size: cover;
//       background-position: center;
//     }

//     .highlight {
//       background-color: black;
//     }

//     #video {
//       display: none;
//     }

//     button,
//     input[type="color"] {
//       margin-top: 20px;
//       padding: 10px 20px;
//       font-size: 16px;
//       cursor: pointer;
//     }

//     /* input[type="number"]::-webkit-inner-spin-button,
//         input[type="number"]::-webkit-outer-spin-button {
//             -webkit-appearance: none;
//             margin: 0;
//         } */
//   </style>
// </head>

// <body class="bg-gray-300 h-screen flex flex-col justify-between relative">

//   <div class="absolute top-0 right-16">
//     <button id="voic-input" onclick="togglemice()" class="w3-button rounded-xl" id="fullscreenBtn">
//       <i id="mice-icon" class="fa-solid fa-microphone"></i>
//       <!-- <i class="fa-duotone fa-solid fa-microphone-slash"></i> -->
//     </button>
//   </div>

//   <div class=" absolute top-0 right-2 rounded-lg">
//     <button onclick="togglevideo()" class="w3-button rounded-xl">
//       <i id="video-icon" class="fa-solid fa-video"></i>
//       <!-- <i class="fa-duotone fa-solid fa-video-slash"></i> -->
//     </button>
//   </div>

//   <div class="w3-sidebar w3-bar-block w3-border-right hidden bg-gray-200 relative"
//     style="height:100vh; overflow-y:auto; position:fixed; top:0; left:0; width:250px;" id="mySidebar">
//     <button onclick="w3_close()" class="w3-bar-item w3-large">
//       <p class="text-[40px] ml-10"> Close &times;</p>
//     </button>
//     <div class="w3-dropdown-hover">
//       <button class="w3-button" id="fullscreenBtn">Present <i class="fa fa-caret-down"></i></button>
//     </div>
//     <div class="w3-dropdown-hover">
//       <div class="flex h-10 ml-4">
//         <input id="template-input" class="w-[50%]  bg-gray-200 rounded-xl border-none" type="text"
//           placeholder="Template" required>
//         <button onclick="changetemplate()" class="w-[50%] hover:bg-gray-200 rounded-lg  font-bold" id="fullscreenBtn">
//           <p>→</p> <i class="fa fa-caret-down"></i>
//         </button>
//       </div>
//     </div>


//     <div class="w3-dropdown-hover">
//       <button class="w3-button">SIze <i class="fa fa-caret-down"></i></button>
//       <div class="w3-dropdown-content w3-bar-block">
//         <!-- Star Dropdown -->
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('★', this)">Done</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//       </div>
//     </div>

//     <div class="w3-dropdown-hover">
//       <button class="w3-button">Dots <i class="fa fa-caret-down"></i></button>
//       <div class="w3-dropdown-content w3-bar-block">
//         <!-- Dot Dropdown -->
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-2xl" onclick="copyToClipboardWithSize('•', this)">•</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>

//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-2xl" onclick="copyToClipboardWithSize('○', this)">○</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>

//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('◴', this)">◴</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>

//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('◐', this)">◐</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('◑', this)">◑</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//       </div>
//     </div>





//     <div class="w3-dropdown-hover">
//       <button class="w3-button">Star <i class="fa fa-caret-down"></i></button>
//       <div class="w3-dropdown-content w3-bar-block">
//         <!-- Star Dropdown -->
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('★', this)">★</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1 ">
//           <span class="text-sm" onclick="copyToClipboardWithSize('☆', this)">☆</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-3 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('⭐', this)">⭐</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//       </div>
//     </div>

//     <div class="w3-dropdown-hover">
//       <button class="w3-button">Arrow <i class="fa fa-caret-down"></i></button>
//       <div class="w3-dropdown-content w3-bar-block">
//         <!-- Star Dropdown -->
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('→', this)">→</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1 ">
//           <span class="text-sm" onclick="copyToClipboardWithSize('←', this)">←</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-5 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('↑', this)">↑</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('↓', this)">↓</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//       </div>
//     </div>

//     <div class="w3-dropdown-hover">
//       <button class="w3-button">3D Arrow <i class="fa fa-caret-down"></i></button>
//       <div class="w3-dropdown-content w3-bar-block">
//         <!-- Star Dropdown -->
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('↗️', this)">↗️</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1 ">
//           <span class="text-sm" onclick="copyToClipboardWithSize('↘️', this)">↘️</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('↖️', this)">↖️</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('↙️', this)">↙️</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//       </div>
//     </div>

//     <div class="w3-dropdown-hover">
//       <button class="w3-button">Buttons <i class="fa fa-caret-down"></i></button>
//       <div class="w3-dropdown-content w3-bar-block">
//         <!-- Star Dropdown -->
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('▶️', this)">▶️</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1 ">
//           <span class="text-sm" onclick="copyToClipboardWithSize('⏸️', this)">⏸️</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('⏪', this)">⏪</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('⏩', this)">⏩</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>

//       </div>
//     </div>

//     <div class="w3-dropdown-hover">
//       <button class="w3-button">More <i class="fa fa-caret-down"></i></button>
//       <div class="w3-dropdown-content w3-bar-block">
//         <!-- Star Dropdown -->
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('✔️', this)">✔️</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1 ">
//           <span class="text-sm" onclick="copyToClipboardWithSize('✖️', this)">✖️</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-5 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('🎯', this)">🎯</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('📌', this)">📌</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>
//         <div class="flex items-center space-x-2 pl-4 rounded-md cursor-pointer hover:bg-gray-200 gap-16 mt-1">
//           <span class="text-sm" onclick="copyToClipboardWithSize('➕', this)">➕</span>
//           <input type="number" placeholder="(px)" class="w-16 border border-gray-300 rounded-md text-center">
//         </div>

//       </div>
//     </div>




//   </div>
//   <!-- <div class="nav w-full h-fit"> -->
//   <button class="absolute m-2 mt-3 ml-4 text-gray-400 text-[30px] font-bold " onclick="w3_open()">☰</button>
//   <!-- </div> -->

//   <!-- Slide Show Area -->
//   <div class="flex-grow flex justify-center items-center min-h-screen">
//     <div id="slide-container"
//       class="relative w-3/4 h-[85%] background-slide flex flex-col p-2 bg-black bg-opacity-50 rounded-lg">
//       <!-- Title and Content/Image over Background -->
//       <div class="w-full h-fit flex justify-center flex-col mt-3">
//         <div class="flex justify-center w-full">
//           <h2 id="slide-title" class="text-5xl font-bold mb-4 text-white">Title will appear here</h2>
//         </div>
//       </div>

//       <!-- Slide Content and Image Section -->
//       <div class="flex w-full h-full px-16 gap-5">
//         <div id="add-image" class="w-[60%] h-[50%] rounded-xl mt-40 hidden"></div>

//         <div class="w-full mt-10 text-white flex justify-start items-stretch">
//           <div class="rounded-xl w-full h-full">
//             <p id="slide-content-container" contenteditable="true" class="text-[21px] bg-none">Content will appear here
//             </p>
//           </div>
//         </div>
//       </div>

//       <!-- Previous Slide Button -->
//       <button id="prev-slide"
//         class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-gray-600">
//         &larr;
//       </button>

//       <!-- Next Slide Button -->
//       <button id="next-slide"
//         class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-gray-600">
//         &rarr;
//       </button>
//     </div>
//   </div>

//   <!-- Input Form at Bottom -->
//   <div class="p-4 bg-gray-200 shadow-lg p-30 mt-16">
//     <div id="slide-form" class="flex flex-col items-center space-y-3">
//       <div class="w-full flex gap-5">
//         <form class="w-[50%]">
//           <input type="text" id="title-input" placeholder="Enter title"
//             class="w-[20%] rounded-lg px-2 py-2 border border-gray-300 text-sm" required>
//           <input type="text" id="data-input" placeholder="Enter content" required
//             class="w-[20%] rounded-lg px-2 py-2 border border-gray-300 text-sm">
//           <input type="text" id="image-input" placeholder="Enter image URL"
//             class="w-[20%] rounded-lg px-2 py-2 border border-gray-300 text-sm">
//           <input type="text" id="link-input" placeholder="Enter link URL"
//             class="w-[20%] rounded-lg px-2 py-2 border border-gray-300 text-sm">
//           <button type="submit"
//             class="w-fit rounded-xl font-bold text-white bg-green-500 px-5 py-2 hover:bg-green-600 text-sm">Add
//             Slide</button>
//         </form>
//         <div class="w-[50%] flex gap-20">
//           <div>
//             <button id="summary-btn" type="button"
//               class="w-fit rounded-xl font-bold text-white bg-blue-500 px-4 py-2 hover:bg-blue-600 text-sm">
//               Summary
//             </button>
//           </div>

//           <form id="promt-form" class="w-full flex gap-5">
//             <input id="promt-input" type="text" class="w-[40%] rounded-lg px-2 py-1 border border-gray-300 text-sm"
//               placeholder="Command Prompt">
//             <div class="flex gap-32">
//               <button id="promt-button"
//                 class="w-fit h-fit rounded-xl bg-blue-700 font-bold text-white px-5 py-2">Run</button>

//               <button id="delete-slide" type="button"
//                 class=" bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-2 rounded-md hover:bg-red-500">
//                 Delete
//               </button>
//             </div>
//           </form>

//         </div>
//       </div>
//     </div>
//   </div>

//   <script>
//     async function checkSession() {
//       try {
//         const response = await fetch('/check-session', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         const data = await response.json();

//         if (!data.loggedIn) {
//           // If not logged in, you can handle it (e.g., redirect to login)
//           window.location.href = '/login-page';
//           return "";
//         }
//         else {
//           console.log("emailllllllllllllllllll : ", data.email)
//           return data.email;
//         }
//       } catch (error) {
//         console.error('Error checking session:', error);
//       }
//     }

//     const changetemplate = async () => {
//       const queryString1 = window.location.search;
//       const urlParams1 = new URLSearchParams(queryString1);
//       let user = await urlParams1.get('slide');

//       let templink = await document.getElementById('template-input').value;
//       if (templink && templink.length < 15) return false;
//       else {
//         console.log(templink, user, "vvvmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
//         let data1 = await localStorage.getItem(user + 'image');
//         let title = data1.title;

//         const dataToStore = {
//           link: templink,
//           title: title,
//           createdAt: new Date().toISOString(), // Optional: Store the timestamp
//         };
//         // Store the template link in local storage as a JSON string
//         localStorage.setItem(user + 'image', JSON.stringify(dataToStore));

//         let data = await localStorage.getItem(user + 'image');
//         console.log(data);

//         location.reload();
//       }
//     }

//     const queryString1 = window.location.search;
//     // Create a URLSearchParams object to work with the query string
//     const urlParams1 = new URLSearchParams(queryString1);

//     // Access specific parameters by name
//     let user = urlParams1.get('slide');
//     let email = checkSession();

//     let newkey = user + 'image';
//     console.log(newkey, user);
//     let data = localStorage.getItem(user);
//     console.log("data :", data);

//     let templink = JSON.parse(localStorage.getItem(newkey));

//     const check = async () => {
//       const validExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|svg|tiff|ico)$/i;
//       let flag = await validExtensions.test(templink);
//       console.log(templink.link, newkey);

//       // if(!flag) templink.link='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00ODYtYmctMDE5ZC14LmpwZw.jpg';
//       console.log(flag, templink);

//       // Set the background image using a class selector
//       document.getElementById('slide-container').style.backgroundImage = `url(${templink.link})`;
//     }


//     check();

//   </script>

//   <script>
//     const fullscreenBtn = document.getElementById('fullscreenBtn');

//     fullscreenBtn.addEventListener('click', () => {
//       if (document.documentElement.requestFullscreen) {
//         document.documentElement.requestFullscreen();
//       } else if (document.documentElement.mozRequestFullScreen) { // Firefox
//         document.documentElement.mozRequestFullScreen();
//       } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
//         document.documentElement.webkitRequestFullscreen();
//       } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
//         document.documentElement.msRequestFullscreen();
//       }

//       document.getElementById('slide-container').classList.add = 'w-[90%]';
//     });


//     function w3_open() {
//       document.getElementById("mySidebar").style.display = "block";
//     }

//     function w3_close() {
//       document.getElementById("mySidebar").style.display = "none";
//     }



//     function copyToClipboardWithSize(content, element) {
//       // Get the input field next to the clicked element
//       const input = element.parentNode.querySelector('input'); // Get the input field in the same parent div

//       // Check if input exists
//       // if (!input) {
//       //   alert('Input field not found!');
//       //   return;
//       // }

//       const size = input.value; // Get the value of the input field

//       // Check if size is provided and is a valid number
//       // if (size && !isNaN(size)) {
//       // Use the Clipboard API to write the text directly
//       navigator.clipboard.writeText(content).then(() => {
//         // alert('Copied: ' + content + ' of size ' + size + 'px');
//       }).catch(err => {
//         console.error('Failed to copy: ', err);
//       });
//       // } else {
//       //   alert('Please enter a valid size.');
//       // }
//     }

//   </script>

//   <script>
//     // Web Speech API setup
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = 'en-US';
//     recognition.interimResults = true; // Enable interim results

//     // Highlight matched text
//     function highlightText(matchedText) {
//       const contentElement = document.getElementById('slide-content-container');
//       const originalText = contentElement.textContent;

//       // Clear previous highlights
//       contentElement.innerHTML = originalText;

//       // Create a regex to match the spoken text
//       const regex = new RegExp(`(${matchedText})`, 'gi');
//       const highlightedText = originalText.replace(regex, `<span class="bg-red-400 bg-opacity-50 rounded-md transition duration-300 ease-in-out">${matchedText}</span>`);

//       // If match found, highlight it and return true
//       if (regex.test(originalText)) {
//         contentElement.innerHTML = highlightedText;
//         return true;
//       }

//       // No match found
//       return false;
//     }

//     // Start listening for voice input
//     recognition.onresult = (event) => {
//       const spokenText = Array.from(event.results)
//         .map(result => result[0].transcript)
//         .join(' ');

//       console.log('You said: ', spokenText);

//       // First try to highlight the spoken text

//       const isTextHighlighted = highlightText(spokenText);

//       // If spoken text is not found in the current slide's content, check for navigation commands
//       if (!isTextHighlighted) {
//         if (spokenText.toLowerCase().includes('next vaibhav')) {
//           displaySlide(currentSlideIndex + 1); // Go to the next slide
//         } else if (spokenText.toLowerCase().includes('back vaibhav')) {
//           displaySlide(currentSlideIndex - 1); // Go to the previous slide
//         }
//       }
//     };


//     const togglemice = async () => {
//       let mice = document.getElementById('mice-icon');
//       if (mice.classList.contains('fa-microphone')) {
//         mice.classList.add('fa-duotone', 'fa-solid', 'fa-microphone-slash');
//         mice.classList.remove('fa-microphone');
//         // Start voice recognition
//         recognition.start();

//         // Re-trigger recognition after each result (for continuous listening)
//         recognition.onend = () => {
//           recognition.start();
//         };
//       }
//       else {
//         mice.classList.add('fa-microphone', 'fa-solid');
//         mice.classList.add('fa-duotone', 'fa-microphone-slash');
//         window.location.reload();
//       }
//     }

//   </script>


//   <script>

//     const queryString = window.location.search;
//     // Create a URLSearchParams object to work with the query string
//     const urlParams = new URLSearchParams(queryString);

//     // Access specific parameters by name
//     const name = urlParams.get('slide');
//     console.log("nammmmmmm2 :", name);

//     // Load slides from local storage on page load
//     document.addEventListener('DOMContentLoaded', () => {
//       let timestamp = Date.now(); // Get the current timestamp in milliseconds 
//       const savedSlides = JSON.parse(localStorage.getItem(name));
//       let data = localStorage.getItem(user + 'image');
//       document.getElementById('slide-container').style.backgroundImage = `url(${data})`;
//       console.log(data);

//       if (savedSlides) {
//         slides = savedSlides;
//         currentSlideIndex = 0; // Reset to the first slide
//         slides.image = data;
//         displaySlide(currentSlideIndex);
//       }
//       else window.location.href = "/";
//     });

//     let slides = [];
//     let currentSlideIndex = -1;

//     // Handle adding new slide
//     document.getElementById('slide-form').addEventListener('submit', async (e) => {
//       e.preventDefault();

//       const title = document.getElementById('title-input').value;
//       const data = document.getElementById('data-input').value;
//       const image = document.getElementById('image-input').value;
//       const link = document.getElementById('link-input').value;

//       // Add new slide to the slides array
//       // slides.push({ title, data, image, link });
//       console.log("Index:: ", currentSlideIndex)
//       slides.splice(currentSlideIndex + 1, 0, { title, data, image, link });
//       const queryString = window.location.search;
//       // Create a URLSearchParams object to work with the query string
//       const urlParams = new URLSearchParams(queryString);

//       // Access specific parameters by name
//       const name = await urlParams.get('slide');

//       // Save slides to local storage
//       localStorage.setItem(name, JSON.stringify(slides));

//       // Clear form fields
//       document.getElementById('title-input').value = '';
//       document.getElementById('data-input').value = '';
//       document.getElementById('image-input').value = '';
//       document.getElementById('link-input').value = '';

//       // Automatically display the new slide
//       displaySlide(currentSlideIndex + 1);
//     });

//     // Display the current slide
//     // Display the current slide
//     function displaySlide(index) {
//       if (index < 0 || index >= slides.length) return; // Validate index
//       const slide = slides[index];

//       // Update title
//       document.getElementById('slide-title').textContent = slide.title;

//       const slideContentContainer = document.getElementById('slide-content-container');
//       const imageelement = document.getElementById('add-image');
//       slideContentContainer.innerHTML = ''; // Clear the previous content
//       imageelement.innerHTML = ''; // Clear the previous content

//       // Format data to preserve line breaks and display HTML correctly
//       slideContentContainer.innerHTML = slide.data || ''; // Use innerHTML to keep formatting

//       // Show the image if present
//       if (slide.image) {
//         const imageDiv = document.createElement('div');
//         imageDiv.classList.add('w-[100%]', 'h-[100%]', 'bg-cover', 'bg-center', 'rounded-lg');
//         imageDiv.style.backgroundImage = `url(${slide.image})`;
//         imageelement.appendChild(imageDiv);
//         imageelement.classList.remove('hidden');
//       } else {
//         imageelement.classList.add('hidden');
//       }

//       currentSlideIndex = index; // Update current slide index
//     }

//     // Update local storage when the editable content is changed
//     const slideContentContainer = document.getElementById('slide-content-container');
//     slideContentContainer.addEventListener('input', async () => {
//       const queryString = window.location.search;
//       // Create a URLSearchParams object to work with the query string
//       const urlParams = new URLSearchParams(queryString);

//       // Access specific parameters by name
//       const name = await urlParams.get('slide');
//       slides[currentSlideIndex].data = slideContentContainer.innerHTML; // Update slide data
//       localStorage.setItem(name, JSON.stringify(slides)); // Update local storage
//     });

//     let videoStream = null; // Store video stream globally

//     const onvideo = async () => {
//       console.log('Starting video...');
//       const video = document.createElement('video');
//       const modelParams = {
//         flipHorizontal: true,   // Flip the video horizontally
//         maxNumBoxes: 2,         // Only detect one hand at a time
//         iouThreshold: 0.5,      // IoU threshold for object overlap
//         scoreThreshold: 0.6,    // Confidence score threshold for predictions
//       };

//       handTrack.load(modelParams).then(model => {
//         handTrack.startVideo(video).then(status => {
//           if (status) {
//             navigator.getUserMedia({ video: {} }, stream => {
//               videoStream = stream;  // Store the single video stream
//               video.srcObject = stream;
//               setInterval(() => {
//                 model.detect(video).then(predictions => {
//                   // Check if gesture is detected (simple swipe left/right logic)
//                   if (predictions.length > 0) {
//                     const bbox = predictions[1].bbox;
//                     const centerX = bbox[0] + bbox[2] / 2;
//                     if (centerX < video.width / 3) {
//                       // Gesture detected on the left side (go to the previous slide)
//                       if (currentSlideIndex > 0)
//                         displaySlide(currentSlideIndex - 1);
//                     } else if (centerX > (2 * video.width) / 3) {
//                       // Gesture detected on the right side (go to the next slide)
//                       if (currentSlideIndex < slides.length - 1)
//                         displaySlide(currentSlideIndex + 1);
//                     }
//                   }
//                 });
//               }, 700); // Adjust interval for gesture detection responsiveness
//             }, err => console.error('Error starting video:', err));
//           }
//         });
//       });
//     };

//     // Function to stop the single video stream
//     const stopVideo = () => {
//       window.location.reload();
//     };

//     const togglevideo = async () => {
//       let mice = document.getElementById('video-icon');
//       if (mice.classList.contains('fa-video')) {
//         // Switch to 'fa-video-slash' and start the video
//         mice.classList.remove('fa-video');
//         mice.classList.add('fa-video-slash');
//         onvideo();
//       } else {
//         // Switch back to 'fa-video' and stop the video
//         mice.classList.remove('fa-video-slash');
//         mice.classList.add('fa-video');
//         stopVideo();
//       }
//     };





//     // Next slide button
//     document.getElementById('next-slide').addEventListener('click', () => {
//       if (currentSlideIndex < slides.length - 1) {
//         displaySlide(currentSlideIndex + 1);
//       }
//     });

//     // Previous slide button
//     document.getElementById('prev-slide').addEventListener('click', () => {
//       if (currentSlideIndex > 0) {
//         displaySlide(currentSlideIndex - 1);
//       }
//     });

//     // Delete slide button
//     document.getElementById('delete-slide').addEventListener('click', async () => {
//       console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
//       if (slides.length == 0) {
//         slides.length = 0;
//         const queryString = window.location.search;
//         // Create a URLSearchParams object to work with the query string
//         const urlParams = new URLSearchParams(queryString);

//         // Access specific parameters by name
//         const name = await urlParams.get('slide');
//         localStorage.setItem(name, JSON.stringify(slides));
//       }
//       else if (slides.length > 0) {
//         const queryString = window.location.search;
//         // Create a URLSearchParams object to work with the query string
//         const urlParams = new URLSearchParams(queryString);

//         // Access specific parameters by name
//         const name = await urlParams.get('slide');
//         await slides.splice(currentSlideIndex, 1); // Remove the current slide
//         localStorage.setItem(name, JSON.stringify(slides)); // Update local storage
//         // Display the next slide or previous slide if at the end
//         if (currentSlideIndex >= slides.length) {
//           currentSlideIndex = slides.length - 1;
//         }
//         displaySlide(currentSlideIndex);
//       }
//     });

//     document.getElementById('summary-btn').addEventListener('click', async (e) => {
//       e.preventDefault();

//       // Get the current slide text
//       let text = "Generate summary of 4-5 Lines  ->>>    ";
//       for (let i = 0; i <= currentSlideIndex; i++) {
//         if (text.length > 300) break;

//         text += "  " + slides[currentSlideIndex].data;
//       }
//       console.log("Slide Text: ", text);

//       try {
//         // Make the POST request to get the summary
//         const response = await fetch('/get-summary', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ text }), // Send the text to the backend
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();

//         // Check for an error in the response
//         if (data.error) {
//           alert('Error: ' + data.error);
//           return;
//         }

//         console.log("Generated Summary: ", data.content);
//         const summaryText = data.content;

//         // Add the new summary slide only if the content is valid
//         if (summaryText && summaryText.trim() !== '') {
//           slides.splice(currentSlideIndex + 1, 0, { title: "Summary", data: summaryText });
//           currentSlideIndex++; // Move to the new summary slide
//           displaySlide(currentSlideIndex); // Display the newly added slide
//         } else {
//           alert('The response is empty, cannot create a slide.');
//         }

//         // Remove empty slides (slides with both empty title and data)
//         slides = slides.filter(slide => !(slide.title.trim() === '' && slide.data.trim() === ''));

//       } catch (error) {
//         console.error('There was a problem with the fetch operation:', error);
//       }
//     });



//     document.getElementById('promt-form').addEventListener('submit', async (e) => {
//       e.preventDefault();

//       // Get the title input from the form
//       const title = document.getElementById('promt-input').value;
//       // Get the current slide's text data
//       const text = slides[currentSlideIndex];

//       try {
//         // Send the POST request to the /get-data endpoint
//         const response = await fetch('/get-data', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ title, text }), // Send both title and text
//         });

//         // Check for a valid response
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();

//         // Check if there's an error in the response
//         if (data.error) {
//           alert('Error: ' + data.error);
//           return; // Exit if there's an error
//         }

//         console.log("Generated Content: ", data.content);

//         const newTitle = title || "New Slide"; // Fallback to a default title if needed
//         const newContent = data.content; // The content received from the API

//         // Add a new slide only if newContent is valid
//         if (newContent && newContent.trim() !== '') {
//           slides.splice(currentSlideIndex + 1, 0, { title: newTitle, data: newContent });
//           currentSlideIndex++; // Move to the new slide
//           displaySlide(currentSlideIndex); // Display the newly added slide
//         } else {
//           alert('The response is empty, cannot create a slide.');
//         }

//         // Remove any empty slides (with both empty title and data)
//         slides = slides.filter(slide => !(slide.title.trim() === '' && slide.data.trim() === ''));

//       } catch (error) {
//         console.error('There was a problem with the fetch operation:', error);
//       }
//     });
//   </script>
// </body>

// </html>