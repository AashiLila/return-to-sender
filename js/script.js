//Sound Clips 
const EmailOpenSound = new Audio('sounds/email-open.mp3');
const MailClickAudio = new Audio('sounds/mail-click.mp3');
const DecisionSound = new Audio('sounds/decision.mp3');


// Game State
let gameState = {
    currentDay: 0,
    workScore: 0,
    wifeScore: 0,
    selectedEmailId: null,
    decisions: {},
    readEmails: {},
    gameEnded: false
};

// Story Data
const storyData = {
    days: [
        {
            day: 0,
            emails: [
                {
                    id: 'future',
                    from: '—',
                    subject: 're: you need to read this',
                    body: `hey. i know this sounds crazy but you need to listen.

you keep doing this thing where you put off the hard conversations. you tell yourself it'll be fine, that you'll handle it later, that if you just focus on one thing at a time everything will work out.

it won't.

i'm watching you ignore calls. i'm watching you choose the safe option that lets you avoid dealing with anything real. and i'm watching it all fall apart.

you can't keep delaying the things that matter. not this time.

please. just… pay attention.`,
                    snippet: 'hey. i know this sounds crazy but you need to listen...',
                    day: '???',
                    mystery: true,
                    isDecision: false,
                    isFutureEmail: true,
                    options: [
                        { text: 'Continue', wife: 0, work: 0 }
                    ]
                }
            ]
        },
        {
            day: 1,
            emails: [
                {
                    id: 'day1-main',
                    from: 'Bhumi',
                    subject: 'dinner 💕',
                    body: `hey love, i made your favorite tonight. i know you've been busy but i really want us to finally have a proper date night. don't be late 🕯️`,
                    snippet: 'hey love, i made your favorite tonight...',
                    day: 'Day 1',
                    isDecision: true,
                    options: [
                        { text: 'Stay at work, finish the project, impress boss', wife: 0, work: 15 },
                        { text: 'Leave work early, buy flowers, go home', wife: 10, work: 0 },
                        { text: 'Bring laptop home, try to balance both', wife: 5, work: 5 }
                    ]
                }
            ]
        },
        {
            day: 2,
            emails: [
                {
                    id: 'day2-main',
                    from: 'Bhumi',
                    subject: 'thinking about your presentation',
                    body: `ok so i was replaying our conversation from last night and i think the reason your boss didn't love the original plan is because it felt short-term. what if you frame it as a long-term system instead... like something the company can build on instead of just fixing this quarter's problem? you could even use that slide you were worried about to show future impact.`,
                    snippet: 'ok so i was replaying our conversation from last night...',
                    day: 'Day 2',
                    isDecision: true,
                    options: [
                        { text: 'Listen to wife and change presentation', wife: 10, work: 10 },
                        { text: 'Ignore wife and go with your own idea', wife: 0, work: 0 },
                        { text: 'Tell wife it\'s great but stay silent at work', wife: 5, work: 0 }
                    ]
                }
            ]
        },
        {
            day: 3,
            emails: [
                {
                    id: 'day3-main',
                    from: 'Bhumi',
                    subject: 'please call me',
                    body: `hey
can you call me when you see this
it's kinda important
please`,
                    snippet: 'hey, can you call me when you see this...',
                    day: 'Day 3',
                    isDecision: true,
                    options: [
                        { text: 'Ignore calls, focus on meeting', wife: 0, work: 10 },
                        { text: 'Step out and answer', wife: 20, work: 0 },
                        { text: 'Text "can\'t talk rn" promise later', wife: 5, work: 7 }
                    ]
                }
            ]
        },
        {
            day: 4,
            emails: [
                {
                    id: 'day4-flavor',
                    from: 'Mike (Slack)',
                    subject: 'lol is this about you?',
                    body: `uhhh is that your wife's post on instagram? 😬 rough timing… boss is literally right here btw`,
                    snippet: 'uhhh is that your wife\'s post on instagram?',
                    day: 'Day 4',
                    isDecision: false
                },
                {
                    id: 'day4-main',
                    from: 'Instagram',
                    subject: 'Bhumi shared a post',
                    body: `@bhumi_patel posted:

"when you're always the last priority 🙃"

[3 comments] [12 likes]`,
                    snippet: 'when you\'re always the last priority...',
                    day: 'Day 4',
                    isDecision: true,
                    options: [
                        { text: 'Lash out at coworkers now, comfort her later', wife: 10, work: 0 },
                        { text: 'Ask her to delete post and confront her', wife: 0, work: 5 },
                        { text: 'Ignore to avoid drama at work', wife: 0, work: 10 }
                    ]
                }
            ]
        },
        {
            day: 5,
            emails: [
                {
                    id: 'day5-main',
                    from: 'Bhumi',
                    subject: 'wow.',
                    body: `i can't believe you forgot valentine's day.
again.
i didn't say anything this morning because honestly i was waiting to see if you'd remember on your own.
guess that was stupid of me.
anyway. do whatever you want today. i'm done getting my hopes up.`,
                    snippet: 'i can\'t believe you forgot valentine\'s day...',
                    day: 'Day 5',
                    isDecision: true,
                    options: [
                        { text: 'Stay late at work, apologize later', wife: 0, work: 10 },
                        { text: 'Leave early, buy something meaningful', wife: 10, work: 0 },
                        { text: 'Send flowers to her workplace + plan late surprise', wife: 5, work: 10 }
                    ]
                }
            ]
        }
    ]
};

// function DayZeroButtonTransition() {

// Helper Functions
function getAllEmails() {
    const emails = [];
    for (let i = 0; i <= gameState.currentDay; i++) {
        emails.push(...storyData.days[i].emails);
    }
    return emails;
}

function getCurrentDayDecisionEmail() {
    const dayData = storyData.days[gameState.currentDay];
    return dayData.emails.find(e => e.isDecision);
}

function renderInbox() {
    const emailList = document.getElementById('emailList');
    emailList.innerHTML = '';
    
    const emails = getAllEmails();
    
    emails.forEach((email, index) => {
        const isUnread = !gameState.readEmails[email.id];
        const isSelected = gameState.selectedEmailId === email.id;
        const isDecided = gameState.decisions[email.id] !== undefined;
        const isNewEmail = !gameState.emailsRendered || !gameState.emailsRendered[email.id];
        
        const emailItem = document.createElement('div');
        emailItem.className = `email-item ${isUnread ? 'unread' : ''} ${isSelected ? 'selected' : ''} ${email.mystery ? 'mystery' : ''} ${isNewEmail ? 'new-email' : ''}`;
        emailItem.onclick = () => selectEmail(email.id);
        
        emailItem.innerHTML = `
            <div class="email-from">${email.from}</div>
            <div class="email-subject">${email.subject}</div>
            <div class="email-snippet">${email.snippet}</div>
            <div class="email-day">${email.day}${isDecided ? ' • resolved' : ''}</div>
        `;
        
        emailList.appendChild(emailItem);
        
        // Mark email as rendered
        if (!gameState.emailsRendered) {
            gameState.emailsRendered = {};
        }
        gameState.emailsRendered[email.id] = true;
    });
}

function selectEmail(emailId) {
    gameState.selectedEmailId = emailId;
    gameState.readEmails[emailId] = true;
    
    const email = getAllEmails().find(e => e.id === emailId);
    renderEmailView(email);
    renderInbox();
}

function renderEmailView(email) {
    const emailContent = document.getElementById('emailContent');
    
    const hasDecided = gameState.decisions[email.id] !== undefined;
    
    let content = `
        <div class="email-header-view">
            <div class="email-subject-view">${email.subject}</div>
            <div class="email-meta">
                <div class="email-from-view">From: ${email.from}</div>
                <div>To: You</div>
            </div>
        </div>
        <div class="email-body-view">${email.body}</div>
    `;
    
    // Show "Make a Decision" button for undecided decision emails
    if (email.isDecision && !hasDecided && email.id === getCurrentDayDecisionEmail()?.id) {
        const buttonText = email.isFutureEmail ? 'Continue' : 'Make a Decision';
        content += `
            <div class="next-day-container">
                <button class="make-decision-btn" onclick="openDecisionModal('${email.id}')">${buttonText}</button>
            </div>
        `;
    }
    // Add next day button if this is the current day's decision and it's been made
    else if (email.isDecision && hasDecided && email.id === getCurrentDayDecisionEmail()?.id) {
        const chosenOption = email.options[gameState.decisions[email.id]];
        content += `
            <div class="next-day-container">
                <div class="decision-made-note">Decision made: ${chosenOption.text}</div>
                ${gameState.currentDay < 5 ? 
                    `<button class="next-day-btn" onclick="triggerDayTransition()">Continue to Day ${gameState.currentDay + 1} →</button>` :
                    `<button class="next-day-btn" onclick="showEnding()">See Your Ending →</button>`
                }
            </div>
        `;
    }
    else if (email.isDecision == false) {
        content += `
            <div class="next-day-container">
                <button class="next-day-btn" onclick="triggerDayTransition()">Continue</button>
            </div>
        `;

    }
    
    emailContent.innerHTML = content;
}

function openDecisionModal(emailId) {
    const email = getAllEmails().find(e => e.id === emailId);
    showDecisionModal(email);
}

function showDecisionModal(email) {
    const modal = document.getElementById('decisionModal');
    const buttonsContainer = document.getElementById('decisionButtons');
    
    buttonsContainer.innerHTML = '';
    
    email.options.forEach((option, index) => {
        if( email.id === 'future') {
            btn.className = 'continue-btn';

        }
        else {
            const btn = document.createElement('button');
            btn.className = 'decision-btn';
            btn.textContent = option.text;
            btn.onclick = () => makeDecision(email.id, index);
            buttonsContainer.appendChild(btn);
        }
    });

  
    
    modal.classList.add('active');
}

function hideDecisionModal() {
    const modal = document.getElementById('decisionModal');
    modal.classList.remove('active');
}

function makeDecision(emailId, optionIndex) {
    const email = getAllEmails().find(e => e.id === emailId);
    const option = email.options[optionIndex];
    
    gameState.decisions[emailId] = optionIndex;
    gameState.wifeScore += option.wife;
    gameState.workScore += option.work;
    
    hideDecisionModal();
    renderEmailView(email);
    renderInbox();
}

function triggerDayTransition() {
    if (gameState.currentDay < 5) {
        showDayTransition(gameState.currentDay + 1);
    }
}

function showDayTransition(newDay) {
    const transition = document.getElementById('dayTransition');
    const dayNumber = document.getElementById('transitionDayNumber');
    
    if (newDay === 0) {
        dayNumber.textContent = 'DAY 0';
    } else {
        dayNumber.textContent = `DAY ${newDay}`;
    }
    transition.classList.add('active');
    
    // Add click handler to continue
    const clickHandler = () => {
        transition.classList.remove('active');
        transition.removeEventListener('click', clickHandler);
        
        // Only advance if we're not on the initial load
        if (gameState.currentDay !== newDay) {
            advanceDay();
        }
    };
    
    transition.addEventListener('click', clickHandler);
}

function advanceDay() {
    gameState.currentDay++;
    
    if (gameState.currentDay === 0) {
        document.getElementById('dayIndicator').textContent = 'DAY 0';
    } else {
        document.getElementById('dayIndicator').textContent = `DAY ${gameState.currentDay} OF 5`;
    }
    
    renderInbox();
    
    // Auto-select the new day's decision email
    const newDayDecision = getCurrentDayDecisionEmail();
    if (newDayDecision) {
        selectEmail(newDayDecision.id);
    }
}

function showEnding() {
    gameState.gameEnded = true;
    
    const keptJob = gameState.workScore >= 30;
    const keptRelationship = gameState.wifeScore >= 30;
    
    let endingTitle, endingText;
    
    if (keptJob && keptRelationship) {
        endingTitle = 'BALANCED';
        endingText = `You managed to keep both. The job, the relationship—somehow you pulled it off.

But at what cost? You're exhausted. She's exhausted. You both know you've been running on fumes.

Maybe that's just what life is now. Maybe that's enough.

Or maybe you're just delaying the inevitable.`;
    } else if (keptJob && !keptRelationship) {
        endingTitle = 'CAREER FOCUSED';
        endingText = `The promotion came through. Corner office, better title, the works.

She left three weeks ago. Packed her things while you were at a conference.

You tell yourself it was mutual. That you both wanted different things. That this is what success looks like.

The apartment is quieter now.`;
    } else if (!keptJob && keptRelationship) {
        endingTitle = 'LOVE REMAINS';
        endingText = `You got let go. "Restructuring," they called it. You know what it really was.

But she was there when you got home. She held you while you cried. She said you'd figure it out together.

You don't know what's next. But at least you're not alone.

Maybe that's what matters.`;
    } else {
        endingTitle = 'LOST';
        endingText = `You lost both.

The job vanished in a round of cuts. She left a week later. Said she couldn't watch you spiral anymore.

You keep checking your phone, waiting for someone to need you. Anyone.

No new messages.

No new messages.

No new messages.`;
    }
    
    const endingScreen = document.getElementById('endingScreen');
    endingScreen.innerHTML = `
        <div class="ending-title">${endingTitle}</div>
        <div class="ending-text">${endingText}</div>
        <div class="ending-scores">
            <div class="score-item">Work Score: ${gameState.workScore}/50 ${keptJob ? '✓' : '✗'}</div>
            <div class="score-item">Relationship Score: ${gameState.wifeScore}/50 ${keptRelationship ? '✓' : '✗'}</div>
        </div>
        <button class="restart-btn" onclick="restartGame()">Play Again</button>
    `;
    
    document.getElementById('emailContent').style.display = 'none';
    endingScreen.classList.add('active');
}

function restartGame() {
    gameState = {
        currentDay: 0,
        workScore: 0,
        wifeScore: 0,
        selectedEmailId: null,
        decisions: {},
        readEmails: {},
        emailsRendered: {},
        gameEnded: false
    };
    
    document.getElementById('dayIndicator').textContent = 'DAY 0';
    document.getElementById('emailContent').style.display = 'block';
    document.getElementById('endingScreen').classList.remove('active');
    document.getElementById('emailContent').innerHTML = '<div class="no-email-selected">Select an email to read</div>';
    
    renderInbox();
    
    // Show Day 0 transition
    setTimeout(() => {
        showDayTransition(0);
    }, 500);
}

// Initialize
// Show Day 0 transition on load
setTimeout(() => {
    showDayTransition(0);
}, 500);

renderInbox();
