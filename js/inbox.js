// --------------------
// GAME STATE
// --------------------
let gameState = {
  currentDay: 0,
  workScore: 0,
  wifeScore: 0,
  selectedEmailId: null,
  decisions: {},
  readEmails: {},
  gameEnded: false
};

// --------------------
// STORY DATA
// --------------------
const storyData = {
  mysteryEmail: {
    id: 'future',
    from: 'buoabcvourvgbob1456@jmail.com',
    date: '02/15/2016',
    subject: 're: you need to read this',
    body: `hey. i know this sounds crazy but you need to listen.

you keep putting things off. the conversations. the decisions.
i’m watching it all fall apart.

this is your chance to stop it.

please.`,
    snippet: 'hey. i know this sounds crazy but you need to listen...',
    day: '???',
    button: 'Continue',
    mystery: true
  },

  days: [
    {
      day: 1,
      emails: [
        {
          id: 'day1',
          from: 'Bhumi',
          subject: 'dinner 💕',
          body: `i made your favorite tonight. please come home early.`,
          snippet: 'i made your favorite tonight...',
          day: 'Day 1',
          isDecision: true,
          options: [
            { text: 'Stay late at work', wife: 0, work: 10 },
            { text: 'Go home early', wife: 10, work: 0 },
            { text: 'Bring work home', wife: 5, work: 5 }
          ]
        }
      ]
    },
    {
      day: 2,
      emails: [
        {
          id: 'day2',
          from: 'Bhumi',
          subject: 'about your presentation',
          body: `i think you should rethink the strategy.`,
          snippet: 'i think you should rethink...',
          day: 'Day 2',
          isDecision: true,
          options: [
            { text: 'Listen to her advice', wife: 10, work: 10 },
            { text: 'Ignore it', wife: 0, work: 0 }
          ]
        }
      ]
    },
    {
      day: 3,
      emails: [
        {
          id: 'day3',
          from: 'Bhumi',
          subject: 'please call me',
          body: `can you please call me.`,
          snippet: 'can you please call me...',
          day: 'Day 3',
          isDecision: true,
          options: [
            { text: 'Answer the call', wife: 15, work: 0 },
            { text: 'Ignore it', wife: 0, work: 10 }
          ]
        }
      ]
    },
    {
      day: 4,
      emails: [
        {
          id: 'day4',
          from: 'Instagram',
          subject: 'Bhumi shared a post',
          body: `"when you’re always the last priority."`,
          snippet: 'when you’re always the last priority...',
          day: 'Day 4',
          isDecision: true,
          options: [
            { text: 'Reach out to her', wife: 10, work: 0 },
            { text: 'Ignore the drama', wife: 0, work: 10 }
          ]
        }
      ]
    },
    {
      day: 5,
      emails: [
        {
          id: 'day5',
          from: 'Bhumi',
          subject: 'wow.',
          body: `you forgot again.`,
          snippet: 'you forgot again...',
          day: 'Day 5',
          isDecision: true,
          options: [
            { text: 'Apologize sincerely', wife: 15, work: 0 },
            { text: 'Stay late at work', wife: 0, work: 10 }
          ]
        }
      ]
    }
  ]
};

// --------------------
// HELPERS
// --------------------
function getAllEmails() {
  const emails = [storyData.mysteryEmail];
  for (let i = 0; i <= gameState.currentDay; i++) {
    emails.push(...storyData.days[i].emails);
  }
  return emails;
}

function getCurrentDecisionEmail() {
  return storyData.days[gameState.currentDay - 1]?.emails.find(e => e.isDecision);
}

// --------------------
// RENDER INBOX
// --------------------
function renderInbox() {
  const list = document.getElementById('emailList');
  list.innerHTML = '';

  const emails = getAllEmails();
  getCurrentDecisionEmail();
  // SAFETY: if somehow empty, still show future email
  // if (emails.length === 0 && storyData.mysteryEmail) {
  //   emails.push(storyData.mysteryEmail);
  // }

  emails.forEach(email => {
    const item = document.createElement('div');
    item.className = 'email-item';
    item.onclick = () => selectEmail(email.id);

    item.innerHTML = `
      <div class="email-from">${email.from}</div>
      <div class="email-subject">${email.subject}</div>
      <div class="email-snippet">${email.snippet}</div>
      <div class="email-day">${email.day}</div>
     
    `;

    list.appendChild(item);
  });
}

// --------------------
// SELECT EMAIL
// --------------------
function selectEmail(emailId) {
  gameState.selectedEmailId = emailId;
  gameState.readEmails[emailId] = true;

  const email = getAllEmails().find(e => e.id === emailId);
  renderEmailView(email);
  renderInbox();
  

  if (email.isDecision && gameState.decisions[email.id] === undefined) {
    showChoicePopup(email);
  }
}

// --------------------
// EMAIL VIEW
// --------------------
function renderEmailView(email) {
  document.getElementById('emailContent').innerHTML = `
    <h2>${email.subject}</h2>
    <p><strong>From:</strong> ${email.from}</p>
    <p><strong>Date:</strong> ${email.date}</p>
    <p>${email.body}</p>
    <button>${email.button}</button>
  `;
}

// --------------------
// POPUP
// --------------------
function showChoicePopup(email) {
  const popup = document.getElementById('choicePopup');
  const options = document.getElementById('popup-options');

  options.innerHTML = '';

}

renderInbox();
//selectEmail('future');
//selectEmail('day3');