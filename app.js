const express = require('express');
const path = require('path');
const https = require('https');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const mongoose = require('mongoose')
const session = require('express-session')
const crypto = require('crypto');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // To parse JSON request bodies

app.use(bodyParser.json());

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/create-present', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/present', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/slides-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'presentations.html'));
});

const mongoURI = 'mongodb://localhost:27017/slides'; // Replace with your actual connection string

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const generateRandomSecret = () => {
  return crypto.randomBytes(64).toString('hex'); // Generates a 128-character hex string
};

// Session middleware using generated secret key
app.use(session({
  secret: generateRandomSecret(), // Use the generated random secret key
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongoURI }),
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
}));


// Serve the registration page
app.get('/register-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/template-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'templates.html'));
});

// Registration route
// Registration route
app.post('/register', async (req, res) => {
  const { username, email, contact, password } = req.body;
  console.log(username, email, contact, password);

  // Validate user input
  if (!username || !email || !contact || !password) {
    // Redirect back to the registration page if validation fails
    return res.redirect('/register-page?error=fill-all-info');
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Redirect to the registration page with an error
      return res.redirect('/register-page?error=user-already-exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      contact,
      password: hashedPassword,
    });

    // Save the user in the database
    await newUser.save();

    // Store user information in the session
    req.session.user = {
      name: username, // Assuming 'username' is what you want to use as 'name'
      email: email,
      contact: contact,
    };

    // Redirect to the home or dashboard page after successful registration
    res.redirect('/');
  } catch (error) {
    console.error(error);
    // Redirect to a generic error page
    return res.redirect('/error-page');
  }
});


app.get('/login-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log("Login::", email, password);

  // Validate user input
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' }); // Send an error message if fields are empty
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Send a 404 if user does not exist
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Send a 401 if the password is incorrect
    }

    console.log(isMatch);

    // Store user information in the session
    req.session.user = {
      name: user.username,  // Assuming 'username' is the name you want to store
      email: user.email,
      contact: user.contact,
    };

    // Successful login, send response to client
    return res.status(200).json({ message: 'Login successful' }); // 1 indicates a successful login
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' }); // Handle server error
  }
});

app.post('/check-session', async (req, res) => {
  if (req.session && req.session.user) {
    let email = req.session.user.email;

    return res.status(200).json({ email, loggedIn: true });
  } else {
    return res.status(401).json({ loggedIn: false, message: 'User not logged in' });
  }
});


// After registration route
app.get('/after', (req, res) => {
  if (!req.session.user) {
    console.log('Error: User session is undefined');
    return res.status(401).send('Unauthorized');
  }

  // Access user data from the session
  const { name, email, contact } = req.session.user;
  console.log("User Info: ", name, email);

  // Send the home.html file
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});


app.post('/get-summary', async (req, res) => {
  try {
    // Extract text from the request body
    let text = req.body.text;
    console.log("Request Text: ", text);

    // Fallback to default message if no text is provided
    if (!text) {
      text = 'HI';
    } else {
      text = text + 'extract main keywords from each slide seperated by "****"   below and generate keywords of 5-6 points only,content should be in points . output should be only keywords without any content';
    }

    console.log("Modified Text: ", text);

    // Prepare the contents structure
    const contents = { "contents": [{ "parts": [{ "text": text }] }] };
    const requestBody = JSON.stringify(contents);

    // Setup the request options for the external API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCNAEPa9btaB2eYw05ZxZGo6INVlojTxXE`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      }
    );

    // Handle the response from the API
    if (!response.ok) {
      const errorMessage = await response.text(); // Capture error message from the response
      throw new Error(`Network response was not ok: ${errorMessage}`);
    }

    const data = await response.json();

    // Check if data contains candidates and has content
    if (data.candidates && data.candidates.length > 0) {
      const summary = data.candidates[0].content.parts[0].text;
      console.log("Generated Summary: ", summary);
      res.status(200).json({ content: summary }); // Send the summary back to the client
    } else {
      res.status(404).send('No content generated.');
    }

  } catch (error) {
    // Log the error and return a 500 status
    console.error('Error fetching summary:', error);
    res.status(500).send(`Error fetching summary: ${error.message}`);
  }
});


app.post('/get-data', async (req, res) => { // Change to POST
  try {
    let title = req.body.title;
    let text = req.body.text;

    console.log("Vaibhavvvvvvvvvvvvvv  :: ", title, text.data);

    if (title) {
      title = `"${title}"`;  // Title provided by the user
      const content = text.data;  // Text provided by the user

      text = `
Create a new information slide using the provided text data and title. 
The slide should feature a concise title of 2-3 words, such as "${title}". 
If not specified, use the title to generate a 4-5 line elaboration that is informative and relevant to the title "${content}". 
Ensure the content is accurate, engaging, and aligns with the information provided.
      `;
    } else {
      text = global.extractedText || "No text available"; // Fallback text
    }

    const { contents } = { "contents": [{ "parts": [{ "text": text }] }] };
    console.log("Request Text: ", text);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCNAEPa9btaB2eYw05ZxZGo6INVlojTxXE`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents }),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text(); // Get the error message from the response
      throw new Error(`Network response was not ok: ${errorMessage}`);
    }

    const data = await response.json();

    // Check if data.candidates exists and has content
    if (data.candidates && data.candidates.length > 0) {
      const list = data.candidates[0].content.parts[0].text;
      console.log("The list -->> ", list);
      res.status(200).json({ content: list }); // Send the generated content back to the client
    } else {
      res.status(404).send('No content generated.');
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send(`Error fetching data: ${error.message}`);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
