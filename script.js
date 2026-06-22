document.addEventListener("DOMContentLoaded", () => {
  const chips = document.querySelectorAll(".filter-chip");
  const cards = document.querySelectorAll(".koma-card");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");

      const filter = chip.dataset.filter;
      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.genre === filter;
        card.style.display = match ? "" : "none";
      });
    });

    // போலி தரவு (Demo Data) - எபிசோடுகள் பட்டியல்
const animeEpisodesData = {
  "Naruto": ["Episode 1: Enter: Naruto Uzumaki!", "Episode 2: My Name is Konohamaru!", "Episode 3: Sasuke and Sakura: Friends or Foes?", "Episode 4: Pass or Fail: Survival Test"],
  "Demon Slayer": ["Episode 1: Cruelty", "Episode 2: Trainer Sakonji Urokodaki", "Episode 3: Sabito and Makomo"],
  "One Piece": ["Episode 1: I'm Luffy! The Man Who'll Become the Pirate King!", "Episode 2: Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!"],
  "default": ["Episode 1: Pilot", "Episode 2: The Journey Begins", "Episode 3: Hidden Power"]
};

// பயனர் நிலை (User State)
let userState = {
  isLoggedIn: false,
  hasPlan: false,
  favourites: []
};

// DOM கூறுகள் (Elements)
const catalogGrid = document.getElementById('catalogGrid');
const animeModal = document.getElementById('animeModal');
const loginModal = document.getElementById('loginModal');
const paymentOverlay = document.getElementById('paymentOverlay');

// மொடால்களை மூடும் பட்டன்கள்
document.getElementById('closeAnimeModal').onclick = () => animeModal.style.display = 'none';
document.getElementById('closeLoginModal').onclick = () => loginModal.style.display = 'none';
document.getElementById('closePaymentModal').onclick = () => paymentOverlay.style.display = 'none';

// 1. கார்டைக் கிளிக் செய்யும்போது விவரங்களைக் காட்டுதல்
catalogGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.koma-card');
  if (!card) return;

  const animeName = card.querySelector('h3').innerText;
  document.getElementById('animeTitle').innerText = animeName;

  // எபிசோடுகளைப் பட்டியலிடுதல்
  const episodeList = document.getElementById('episodeList');
  episodeList.innerHTML = '';
  const episodes = animeEpisodesData[animeName] || animeEpisodesData['default'];
  
  episodes.forEach(ep => {
    const li = document.createElement('li');
    li.innerText = ep;
    li.style.padding = "8px 0";
    li.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
    li.style.color = "#94a3b8";
    episodeList.appendChild(li);
  });

  // பிடித்தவை பட்டன் ஸ்டேட்டஸ் மாற்றுதல்
  const addFavBtn = document.getElementById('addFavBtn');
  if (userState.favourites.includes(animeName)) {
    addFavBtn.innerText = "♥ Favourited";
    addFavBtn.style.background = "#ef4444";
  } else {
    addFavBtn.innerText = "♥ Add to Favourite";
    addFavBtn.style.background = "rgba(255,255,255,0.1)";
  }

  // மொடாலைத் திறத்தல்
  animeModal.style.display = 'block';
  animeModal.classList.add('active'); // CSS-ல் display flex/block செய்ய
});

// 2. Start Watching பட்டன் செயல்பாடு
document.getElementById('startWatchingBtn').onclick = () => {
  if (!userState.isLoggedIn) {
    animeModal.style.display = 'none';
    loginModal.style.display = 'flex';
    alert("தயவுசெய்து முதலில் லாகின் செய்யவும்!");
  } else if (!userState.hasPlan) {
    animeModal.style.display = 'none';
    paymentOverlay.style.display = 'flex';
    alert("இந்த அனிமேவை பார்க்க பிரீமியம் பிளான் தேவை!");
  } else {
    alert("Streaming ஸ்டார்ட் ஆகிறது! மகிழ்ச்சியாகப் பாருங்கள்! 🎬");
  }
};

// 3. Add to Favourite பட்டன் செயல்பாடு
document.getElementById('addFavBtn').onclick = () => {
  if (!userState.isLoggedIn) {
    animeModal.style.display = 'none';
    loginModal.style.display = 'flex';
    return;
  }
  const currentAnime = document.getElementById('animeTitle').innerText;
  if (!userState.favourites.includes(currentAnime)) {
    userState.favourites.push(currentAnime);
    document.getElementById('addFavBtn').innerText = "♥ Favourited";
    document.getElementById('addFavBtn').style.background = "#ef4444";
    alert(`${currentAnime} உங்களது ஃபேவரிட் பட்டியலில் சேர்க்கப்பட்டது!`);
  }
};

// 4. Buy Plan பட்டன் செயல்பாடு
document.getElementById('buyBtn').onclick = () => {
  animeModal.style.display = 'none';
  if (!userState.isLoggedIn) {
    loginModal.style.display = 'flex';
  } else {
    paymentOverlay.style.display = 'flex';
  }
};

// 5. லாகின் ஃபார்ம் சப்மிட் (Login Form Simulation)
document.getElementById('loginForm').onsubmit = (e) => {
  e.preventDefault();
  userState.isLoggedIn = true;
  loginModal.style.display = 'none';
  alert("வெற்றிகரமாக லாகின் செய்யப்பட்டுவிட்டது! 🎉");
  paymentOverlay.style.display = 'flex'; // லாகினுக்குப் பின் பிளான் காட்டப்படும்
};

// 6. பணம் செலுத்துதல் (Payment Simulation)
document.getElementById('proceedPayBtn').onclick = () => {
  userState.hasPlan = true;
  paymentOverlay.style.display = 'none';
  alert("பணம் செலுத்தப்பட்டது! நீங்கள் இப்போது பிரீமியம் மெம்பர். 👑");
};

// பிளான் கார்டுகளைத் தேர்ந்தெடுக்கும் ஸ்டைல் மாற்றங்கள்
document.querySelectorAll('.plan-card').forEach(card => {
  card.onclick = () => {
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  };
});
  });
});

const animeDescriptions = {
  "Naruto": "A young ninja dreams of becoming the Hokage.",
  "Demon Slayer": "Tanjiro fights demons to save his sister.",
  "One Piece": "Luffy searches for the legendary One Piece treasure.",
  "Attack on Titan": "Humanity battles giant Titans.",
  "Jujutsu Kaisen": "Yuji enters the world of cursed spirits.",
  "My Hero Academia": "Heroes train to protect society.",
  "Death Note": "A notebook grants the power of death.",
  "Spy x Family": "A spy builds a fake family for a mission.",
  "Fullmetal Alchemist: Brotherhood": "Two brothers seek redemption through alchemy.",
  "Violet Evergarden": "A former soldier learns human emotions.",
  "Your Lie in April": "A pianist rediscovers music through friendship.",
  "Toradora!": "A romantic comedy about unexpected relationships."
};

const modal = document.getElementById("animeModal");
const title = document.getElementById("animeTitle");
const description = document.getElementById("animeDescription");

document.querySelectorAll(".koma-card").forEach(card => {
  card.addEventListener("click", () => {
    const animeName = card.querySelector("h3").textContent;

    title.textContent = animeName;
    description.textContent = animeDescriptions[animeName];

    modal.style.display = "flex";
  });
});

document.querySelector(".close-btn").addEventListener("click", () => {
  modal.style.display = "none";
});

document.getElementById("buyBtn").addEventListener("click", () => {
  alert("Cashfree Payment Integration Here");
});

const closeBtn = document.querySelector(".close-btn");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

const buyBtn = document.getElementById("buyBtn");
if (buyBtn) {
  buyBtn.addEventListener("click", () => {
    alert("Cashfree Payment Integration Here");
  });
}

// 1. அனிமே எபிசோடுகள் மற்றும் விவரங்களுக்கான போலி தரவு (Demo Data)
const animeEpisodesData = {
  "Naruto": [
    "Episode 1: Enter: Naruto Uzumaki!", 
    "Episode 2: My Name is Konohamaru!", 
    "Episode 3: Sasuke and Sakura: Friends or Foes?", 
    "Episode 4: Pass or Fail: Survival Test"
  ],
  "Demon Slayer": [
    "Episode 1: Cruelty", 
    "Episode 2: Trainer Sakonji Urokodaki", 
    "Episode 3: Sabito and Makomo"
  ],
  "One Piece": [
    "Episode 1: I'm Luffy! The Man Who'll Become the Pirate King!", 
    "Episode 2: Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!"
  ],
  "default": [
    "Episode 1: Pilot", 
    "Episode 2: The Journey Begins", 
    "Episode 3: Hidden Power"
  ]
};

// பயனர் நிலை (User State)
let userState = {
  isLoggedIn: true, // நேரடியாக உள்ளே போக தற்காலிகமாக true செய்யப்பட்டுள்ளது
  hasPlan: false,
  favourites: []
};

// Cashfree SDK இனிஷியலைசேஷன் (உங்களுடைய HTML-ல் உள்ள ஸ்கிரிப்ட்டிற்காக)
const cashfree = Cashfree({
  mode: "sandbox" // டெஸ்டிங் செய்ய sandbox, லைவ் செய்ய production
});

let selectedPrice = 99; // ஆரம்ப விலை ₹99

// DOM கூறுகள் (Elements)
const catalogGrid = document.getElementById('catalogGrid');
const animeModal = document.getElementById('animeModal');
const loginModal = document.getElementById('loginModal');
const paymentOverlay = document.getElementById('paymentOverlay');

// மொடால்களை மூடுவதற்கான பட்டன் பங்க்ஷன்கள்
document.getElementById('closeAnimeModal').onclick = () => { animeModal.style.display = 'none'; };
if(document.getElementById('closeLoginModal')) {
  document.getElementById('closeLoginModal').onclick = () => { loginModal.style.display = 'none'; };
}
if(document.getElementById('closePaymentModal')) {
  document.getElementById('closePaymentModal').onclick = () => { paymentOverlay.style.display = 'none'; };
}

// 2. அனிமே கார்டைக் கிளிக் செய்யும்போது விவரங்கள் மற்றும் எபிசோடுகளைக் காட்டுதல்
catalogGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.koma-card');
  if (!card) return;

  const animeName = card.querySelector('h3').innerText;
  document.getElementById('animeTitle').innerText = animeName;

  // எபிசோடுகளைப் பட்டியலிடுதல்
  const episodeList = document.getElementById('episodeList');
  episodeList.innerHTML = '';
  const episodes = animeEpisodesData[animeName] || animeEpisodesData['default'];
  
  episodes.forEach(ep => {
    const li = document.createElement('li');
    li.innerText = ep;
    li.style.padding = "8px 0";
    li.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
    li.style.color = "#94a3b8";
    episodeList.appendChild(li);
  });

  // பிடித்தவை பட்டன் ஸ்டேட்டஸ்
  const addFavBtn = document.getElementById('addFavBtn');
  if (userState.favourites.includes(animeName)) {
    addFavBtn.innerText = "♥ Favourited";
    addFavBtn.style.background = "#ef4444";
  } else {
    addFavBtn.innerText = "♥ Add to Favourite";
    addFavBtn.style.background = "rgba(255,255,255,0.1)";
  }

  // மெயின் மொடாலைத் திறத்தல்
  animeModal.style.display = 'block';
});

// 3. Start Watching பட்டன் லாஜிக்
document.getElementById('startWatchingBtn').onclick = () => {
  if (!userState.hasPlan) {
    animeModal.style.display = 'none';
    paymentOverlay.style.display = 'flex'; // பிளான் பக்கத்திற்குத் திருப்பும்
    alert("Intha anime-gala parka Premium Plan active-aga iruka ventum!");
  } else {
    alert("Streaming start aaguthu! Enjoy! 🎬");
  }
};

// 4. Add to Favourite பட்டன் லாஜிக்
document.getElementById('addFavBtn').onclick = () => {
  const currentAnime = document.getElementById('animeTitle').innerText;
  if (!userState.favourites.includes(currentAnime)) {
    userState.favourites.push(currentAnime);
    document.getElementById('addFavBtn').innerText = "♥ Favourited";
    document.getElementById('addFavBtn').style.background = "#ef4444";
    alert(`${currentAnime} ungalathu Favourite list-il serkkapattathu!`);
  }
};

// 5. பிளான் கார்டுகளைத் தேர்ந்தெடுக்கும் ஸ்டைல் மாற்றங்கள்
document.querySelectorAll('.plan-card').forEach(card => {
  card.onclick = () => {
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedPrice = card.getAttribute('data-price'); // தேர்ந்தெடுக்கப்படும் பிளான் விலை மாறும்
  };
});

// 6. முக்கியத் திருத்தம்: Buy Premium Plan பட்டனைத் தொட்டதும் நேரடியாக பிளான் திறக்கும் லாஜிக்
document.getElementById('buyBtn').onclick = () => {
  animeModal.style.display = 'none'; // அனிமே விவர ஜன்னலை மூடு
  paymentOverlay.style.display = 'flex'; // நேரடியாக Cashfree பிளான் பக்கத்தைத் திற (flex முக்கியம் ஏன்னெனில் CSS-ல் flex உள்ளது)
};

// 7. Cashfree Payment Gateway Integration
document.getElementById('proceedPayBtn').onclick = async () => {
  const proceedBtn = document.getElementById('proceedPayBtn');
  proceedBtn.innerText = "Processing...";
  proceedBtn.disabled = true;

  try {
    // Ungalathu Backend Server URL-ai inge vaika ventum order token-gaga
    const response = await fetch("https://your-backend-server.com/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: selectedPrice,
        currency: "INR",
        customer_id: "user_customer_01",
        customer_phone: "9876543210"
      })
    });

    const orderData = await response.json();

    if (orderData && orderData.payment_session_id) {
      let checkoutOptions = {
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: "_self" 
      };
      
      cashfree.checkout(checkoutOptions).then((result) => {
        if(result.error){
          alert("Payment failed: " + result.error.message);
        }
      });
    } else {
      // Backend illatha pothu check seiya demo success alert:
      alert(`Demo Mode: ₹${selectedPrice} plan thervu seiyapattathu. Payment Successful!`);
      userState.hasPlan = true;
      paymentOverlay.style.display = 'none';
    }

  } catch (error) {
    console.log("Backend offline-il ullathaal Demo alert kaatugirathu.");
    alert(`Demo Mode: ₹${selectedPrice} plan thervu seiyapattathu. Payment Successful!`);
    userState.hasPlan = true;
    paymentOverlay.style.display = 'none';
  } finally {
    proceedBtn.innerText = "Proceed to Pay";
    proceedBtn.disabled = false;
  }
};
