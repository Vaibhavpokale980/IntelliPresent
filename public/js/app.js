let slides = [];
let currentSlideIndex = -1;

// Handle adding new slide
document.getElementById('slide-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title-input').value;
  const data = document.getElementById('data-input').value;

  // Add new slide to the slides array
  slides.push({ title, data });
  console.log(slides)

  // Clear form fields
  document.getElementById('title-input').value = '';
  document.getElementById('data-input').value = '';

  // Automatically display the new slide
  displaySlide(slides.length - 1);
});

// Handle next slide
document.getElementById('next-slide').addEventListener('click', () => {
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
    displaySlide(currentSlideIndex);
  }
});

// Handle previous slide
document.getElementById('prev-slide').addEventListener('click', () => {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    displaySlide(currentSlideIndex);
  }
});

// Display the current slide
function displaySlide(index) {
  const slide = slides[index];
  if (slide) {
    currentSlideIndex = index;
    document.getElementById('slide-title').innerText = slide.title;
    document.getElementById('slide-data').innerText = slide.data;
  } else {
    document.getElementById('slide-title').innerText = 'No slides available';
    document.getElementById('slide-data').innerText = '';
  }
}

// Initial display check
if (slides.length === 0) {
  document.getElementById('slide-title').innerText = 'No slides available';
  document.getElementById('slide-data').innerText = '';
}

document.getElementById('summary-btn').addEventListener('click', () => {
  // Send the current slide index to the backend
  fetch('/get-summary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: slides[currentSlideIndex].data }), // Send the content of the current slide
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      alert('Error: ' + data.error);
    } else {
      // Create a new slide for the summary
      const summarySlide = { title: 'Summary', data: data.summary };

      // Insert the summary slide after the current slide
      slides.splice(currentSlideIndex + 1, 0, summarySlide);

      // Update the current slide index to the new summary slide
      currentSlideIndex++;

      // Display the new slide
      displaySlide(currentSlideIndex);
    }
  })
  .catch((error) => {
    console.error('Error fetching summary:', error);
  });
});
