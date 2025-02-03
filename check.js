// Web Speech API setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = true; // Enable interim results

// Highlight matched text
function highlightText(matchedTextArray) {
  const contentElement = document.getElementById('slide-content-container');
  const originalText = slides[currentSlideIndex].data;
  console.log(originalText);

  if (currentSlideIndex > -1) console.log(originalText, slides[currentSlideIndex].data);

  // Clear previous highlights
  contentElement.innerHTML = originalText;

  // Iterate through the array of matched words/phrases and highlight them
  matchedTextArray.forEach(matchedText => {
    // Create a regex to match the spoken word/phrase
    const regex = new RegExp(`(${matchedText})`, 'gi');
    contentElement.innerHTML = contentElement.innerHTML.replace(regex, (match) => {
      return `<span class="bg-red-400 bg-opacity-50 rounded-md transition duration-300 ease-in-out">${match}</span>`;
    });
  });

  // Return true if any match is found, otherwise false
  return matchedTextArray.some(matchedText => new RegExp(`(${matchedText})`, 'gi').test(originalText));
}

// Start listening for voice input
recognition.onresult = (event) => {
  const spokenText = Array.from(event.results)
    .map(result => result[0].transcript)
    .join(' ');

  console.log('You said: ', spokenText);

  // Split spoken text into individual words/phrases for partial matching
  const spokenWords = spokenText.split(/\s+/); // Split by space to get individual words

  // Try to highlight the spoken text by words
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





























// 2nd-----------------------------------------------------
//=================================================================================

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