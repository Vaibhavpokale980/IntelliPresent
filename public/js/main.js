{/* <script> */}

const queryString = window.location.search;
// Create a URLSearchParams object to work with the query string
const urlParams = new URLSearchParams(queryString);

// Access specific parameters by name
const name = urlParams.get('slide');
console.log("nammmmmmm2 :", name);

// Load slides from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  let timestamp = Date.now(); // Get the current timestamp in milliseconds 
  const savedSlides = JSON.parse(localStorage.getItem(name));
  let data = localStorage.getItem(user + 'image');
  document.getElementById('slide-container').style.backgroundImage = `url(${data})`;
  console.log(data);

  if (savedSlides) {
    slides = savedSlides;
    currentSlideIndex = 0; // Reset to the first slide
    slides.image = data;
    displaySlide(currentSlideIndex);
  }
  else window.location.href = "/";
});

let slides = [];
let currentSlideIndex = -1;

// Handle adding new slide
document.getElementById('slide-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title-input').value;
  const data = document.getElementById('data-input').value;
  const image = document.getElementById('image-input').value;
  const link = document.getElementById('link-input').value;

  // Add new slide to the slides array
  // slides.push({ title, data, image, link });
  console.log("Index:: ", currentSlideIndex)
  slides.splice(currentSlideIndex + 1, 0, { title, data, image, link });
  const queryString = window.location.search;
  // Create a URLSearchParams object to work with the query string
  const urlParams = new URLSearchParams(queryString);

  // Access specific parameters by name
  const name = await urlParams.get('slide');

  // Save slides to local storage
  localStorage.setItem(name, JSON.stringify(slides));

  // Clear form fields
  document.getElementById('title-input').value = '';
  document.getElementById('data-input').value = '';
  document.getElementById('image-input').value = '';
  document.getElementById('link-input').value = '';

  // Automatically display the new slide
  displaySlide(currentSlideIndex + 1);
});

// Display the current slide
// Display the current slide
function displaySlide(index) {
  if (index < 0 || index >= slides.length) return; // Validate index
  const slide = slides[index];

  // Update title
  document.getElementById('slide-title').textContent = slide.title;

  const slideContentContainer = document.getElementById('slide-content-container');
  const imageelement = document.getElementById('add-image');
  slideContentContainer.innerHTML = ''; // Clear the previous content
  imageelement.innerHTML = ''; // Clear the previous content

  // Format data to preserve line breaks and display HTML correctly
  slideContentContainer.innerHTML = slide.data || ''; // Use innerHTML to keep formatting

  // Show the image if present
  if (slide.image) {
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('w-[100%]', 'h-[100%]', 'bg-cover', 'bg-center', 'rounded-lg');
    imageDiv.style.backgroundImage = `url(${slide.image})`;
    imageelement.appendChild(imageDiv);
    imageelement.classList.remove('hidden');
  } else {
    imageelement.classList.add('hidden');
  }

  currentSlideIndex = index; // Update current slide index
}

// Web Speech API setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = true; // Enable interim results

// Highlight matched text
function highlightText(matchedTextArray) {
  const contentElement = document.getElementById('slide-content-container');
  const originalText = slides[currentSlideIndex].data;

  // Clear previous highlights by resetting the content to the original text
  contentElement.innerHTML = originalText;

  let foundMatch = false; // To track if any match was found

  // Iterate through the array of matched two-word combinations and highlight them
  for (let i = 0; i < matchedTextArray.length - 1; i++) {
    const matchedText = `${matchedTextArray[i]} ${matchedTextArray[i + 1]}`; // Take two consecutive words

    // Create a regex to match the two-word phrase
    const regex = new RegExp(`(${matchedText})`, 'gi');

    // Check if there is a match and highlight it
    contentElement.innerHTML = contentElement.innerHTML.replace(regex, (match) => {
      foundMatch = true; // Set flag to true when a match is found
      return `<span class="bg-red-400 bg-opacity-50 rounded-md transition duration-300 ease-in-out">${match}</span>`;
    });
  }

  // Return true if any match is found
  return foundMatch;
}

let prevtext = '234xcfgh';

// Start listening for voice input
recognition.onresult = (event) => {
  let spokenText = Array.from(event.results)
    .map(result => result[0].transcript)
    .join(' ');

  console.log('You said: ', spokenText);

  // Split spoken text into individual words
  const spokenWords = spokenText.split(/\s+/);

  // Try to highlight the spoken text by two-word combinations
  const isTextHighlighted = highlightText(spokenWords);

  // If spoken text is not found in the current slide's content, check for navigation commands
  if (!isTextHighlighted && !(spokenText.toLowerCase().includes(prevtext))) {

    if (spokenText.toLowerCase().includes('moving next')) {
      console.log(!(spokenText === prevtext, 'clear')
      )
      prevtext = 'moving next';
      setTimeout(() => {
        prevtext = '234xcfgh'
      }, 2000);
      // event.stop()
      displaySlide(currentSlideIndex + 1); // Go to the next slide
    } else if (spokenText.toLowerCase().includes('moving back')) {
      prevtext = 'moving back';
      setTimeout(() => {
        prevtext = '234xcfgh'
      }, 2000);
      displaySlide(currentSlideIndex - 1); // Go to the previous slide
    }
    else if (spokenText.toLowerCase().includes('moving front')) {
      prevtext = 'moving front';
      setTimeout(() => {
        prevtext = '234xcfgh'
      }, 2000);
      displaySlide(0); // Go to the previous slide
    }
    else if (spokenText.toLowerCase().includes('moving end')) {
      prevtext = 'moving end';
      setTimeout(() => {
        prevtext = '234xcfgh'
      }, 2000);
      displaySlide(slides.length - 1); // Go to the previous slide
    }
  }
};

// Start the speech recognition when necessary (for example, on a button click)
// recognition.start();

// Restart recognition when it ends, so it keeps listening
// recognition.onend = () => recognition.start();

// // Start recognition
// recognition.start();



const togglemice = async () => {
  let mice = document.getElementById('mice-icon');
  if (mice.classList.contains('fa-microphone')) {
    mice.classList.add('fa-duotone', 'fa-solid', 'fa-microphone-slash');
    mice.classList.remove('fa-microphone');
    recognition.onend = () => recognition.start();

    // Start recognition
    recognition.start();
  }
  else {
    mice.classList.add('fa-microphone', 'fa-solid');
    mice.classList.add('fa-duotone', 'fa-microphone-slash');
    window.location.reload();
  }
}

// Update local storage when the editable content is changed
const slideContentContainer = document.getElementById('slide-content-container');
slideContentContainer.addEventListener('input', async () => {
  const queryString = window.location.search;
  // Create a URLSearchParams object to work with the query string
  const urlParams = new URLSearchParams(queryString);

  // Access specific parameters by name
  const name = await urlParams.get('slide');
  slides[currentSlideIndex].data = slideContentContainer.innerHTML; // Update slide data
  localStorage.setItem(name, JSON.stringify(slides)); // Update local storage
});

let videoStream = null; // Store video stream globally

const onvideo = async () => {
  console.log('Starting video...');
  const video = document.createElement('video');
  const modelParams = {
    flipHorizontal: true,   // Flip the video horizontally
    maxNumBoxes: 2,         // Only detect one hand at a time
    iouThreshold: 0.5,      // IoU threshold for object overlap
    scoreThreshold: 0.6,    // Confidence score threshold for predictions
  };

  handTrack.load(modelParams).then(model => {
    handTrack.startVideo(video).then(status => {
      if (status) {
        navigator.getUserMedia({ video: {} }, stream => {
          videoStream = stream;  // Store the single video stream
          video.srcObject = stream;
          setInterval(() => {
            model.detect(video).then(predictions => {
              // Check if gesture is detected (simple swipe left/right logic)
              if (predictions.length > 0) {
                const bbox = predictions[1].bbox;
                const centerX = bbox[0] + bbox[2] / 2;
                if (centerX < video.width / 3) {
                  // Gesture detected on the left side (go to the previous slide)
                  if (currentSlideIndex > 0)
                    displaySlide(currentSlideIndex - 1);
                } else if (centerX > (2 * video.width) / 3) {
                  // Gesture detected on the right side (go to the next slide)
                  if (currentSlideIndex < slides.length - 1)
                    displaySlide(currentSlideIndex + 1);
                }
              }
            });
          }, 700); // Adjust interval for gesture detection responsiveness
        }, err => console.error('Error starting video:', err));
      }
    });
  });
};

// Function to stop the single video stream
const stopVideo = () => {
  window.location.reload();
};

const togglevideo = async () => {
  let mice = document.getElementById('video-icon');
  if (mice.classList.contains('fa-video')) {
    // Switch to 'fa-video-slash' and start the video
    mice.classList.remove('fa-video');
    mice.classList.add('fa-video-slash');
    onvideo();
  } else {
    // Switch back to 'fa-video' and stop the video
    mice.classList.remove('fa-video-slash');
    mice.classList.add('fa-video');
    stopVideo();
  }
};





// Next slide button
document.getElementById('next-slide').addEventListener('click', () => {
  if (currentSlideIndex < slides.length - 1) {
    displaySlide(currentSlideIndex + 1);
  }
});

// Previous slide button
document.getElementById('prev-slide').addEventListener('click', () => {
  if (currentSlideIndex > 0) {
    displaySlide(currentSlideIndex - 1);
  }
});

// Delete slide button
document.getElementById('delete-slide').addEventListener('click', async () => {
  console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
  if (slides.length == 0) {
    slides.length = 0;
    const queryString = window.location.search;
    // Create a URLSearchParams object to work with the query string
    const urlParams = new URLSearchParams(queryString);

    // Access specific parameters by name
    const name = await urlParams.get('slide');
    localStorage.setItem(name, JSON.stringify(slides));
  }
  else if (slides.length > 0) {
    const queryString = window.location.search;
    // Create a URLSearchParams object to work with the query string
    const urlParams = new URLSearchParams(queryString);

    // Access specific parameters by name
    const name = await urlParams.get('slide');
    await slides.splice(currentSlideIndex, 1); // Remove the current slide
    localStorage.setItem(name, JSON.stringify(slides)); // Update local storage
    // Display the next slide or previous slide if at the end
    if (currentSlideIndex >= slides.length) {
      currentSlideIndex = slides.length - 1;
    }
    displaySlide(currentSlideIndex);
  }
});

document.getElementById('summary-btn').addEventListener('click', async (e) => {
  e.preventDefault();

  // Get the current slide text
  let text = "Generate summary of 4-5 Lines  ->>>    ";
  for (let i = 0; i <= currentSlideIndex; i++) {
    if (text.length > 300) break;

    text += "  " + slides[currentSlideIndex].data;
  }
  // console.log("Slide Text: ", text);

  try {
    // Make the POST request to get the summary
    const response = await fetch('/get-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }), // Send the text to the backend
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Check for an error in the response
    if (data.error) {
      alert('Error: ' + data.error);
      return;
    }

    // console.log("Generated Summary: ", data.content);

    // function generateSlideWithFormatting(content) {
      // Replace all occurrences of triple stars with <br> for line breaks
      let formattedContent = data.content.replace(/\*\*\*/g, '<br>');

      // Replace all occurrences of text between ** with <b> to bold the text
      formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

      // Generate the slide structure with the formatted and bolded text

    const summaryText = formattedContent;
    console.log(data.content,'\n\n\n',summaryText);

    // Add the new summary slide only if the content is valid
    if (summaryText && summaryText.trim() !== '') {
      slides.splice(currentSlideIndex + 1, 0, { title: "Summary", data: summaryText });
      currentSlideIndex++; // Move to the new summary slide
      displaySlide(currentSlideIndex); // Display the newly added slide
    } else {
      alert('The response is empty, cannot create a slide.');
    }

    // Remove empty slides (slides with both empty title and data)
    slides = slides.filter(slide => !(slide.title.trim() === '' && slide.data.trim() === ''));

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
});



document.getElementById('promt-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get the title input from the form
  const title = document.getElementById('promt-input').value;
  // Get the current slide's text data
  const text = slides[currentSlideIndex];

  try {
    // Send the POST request to the /get-data endpoint
    const response = await fetch('/get-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, text }), // Send both title and text
    });

    // Check for a valid response
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Check if there's an error in the response
    if (data.error) {
      alert('Error: ' + data.error);
      return; // Exit if there's an error
    }

    console.log("Generated Content: ", data.content);

    const newTitle = title || "New Slide"; // Fallback to a default title if needed
    const newContent = data.content; // The content received from the API

    // Add a new slide only if newContent is valid
    if (newContent && newContent.trim() !== '') {
      slides.splice(currentSlideIndex + 1, 0, { title: newTitle, data: newContent });
      currentSlideIndex++; // Move to the new slide
      displaySlide(currentSlideIndex); // Display the newly added slide
    } else {
      alert('The response is empty, cannot create a slide.');
    }

    // Remove any empty slides (with both empty title and data)
    slides = slides.filter(slide => !(slide.title.trim() === '' && slide.data.trim() === ''));

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
});
// </script>