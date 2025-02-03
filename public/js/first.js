{/* <script> */}
async function checkSession() {
  try {
    const response = await fetch('/check-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!data.loggedIn) {
      // If not logged in, you can handle it (e.g., redirect to login)
      window.location.href = '/login-page';
      return "";
    }
    else {
      console.log("emailllllllllllllllllll : ", data.email)
      return data.email;
    }
  } catch (error) {
    console.error('Error checking session:', error);
  }
}

const changetemplate = async () => {
  const queryString1 = window.location.search;
  const urlParams1 = new URLSearchParams(queryString1);
  let user = await urlParams1.get('slide');

  let templink = await document.getElementById('template-input').value;
  if (templink && templink.length < 15) return false;
  else {
    console.log(templink, user, "vvvmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
    let data1 = await localStorage.getItem(user + 'image');
    let title = data1.title;

    const dataToStore = {
      link: templink,
      title: title,
      createdAt: new Date().toISOString(), // Optional: Store the timestamp
    };
    // Store the template link in local storage as a JSON string
    localStorage.setItem(user + 'image', JSON.stringify(dataToStore));

    let data = await localStorage.getItem(user + 'image');
    console.log(data);

    location.reload();
  }
}

const queryString1 = window.location.search;
// Create a URLSearchParams object to work with the query string
const urlParams1 = new URLSearchParams(queryString1);

// Access specific parameters by name
let user = urlParams1.get('slide');
let email = checkSession();

let newkey = user + 'image';
console.log(newkey, user);
let data = localStorage.getItem(user);
console.log("data :", data);

let templink = JSON.parse(localStorage.getItem(newkey));

const check = async () => {
  const validExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|svg|tiff|ico)$/i;
  let flag = await validExtensions.test(templink);
  console.log(templink.link, newkey);

  // if(!flag) templink.link='https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00ODYtYmctMDE5ZC14LmpwZw.jpg';
  console.log(flag, templink);

  // Set the background image using a class selector
  document.getElementById('slide-container').style.backgroundImage = `url(${templink.link})`;
}


check();

// </script>