//Sound Clips 
const EmailOpenSound = new Audio('sounds/EmailOpenSound.mp3');
const MouseClickAudio = new Audio('sounds/MouseClick.mp3');
const NotificationSound = new Audio('sounds/Notification.mp3');

EmailOpenSound.preload = 'auto';
MouseClickAudio.preload = 'auto';
NotificationSound.preload = 'auto';



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
// Story Data
const storyData = {
    days: [
        {
            day: 0,
            emails: [
                {
                    id: 'future',
                    from: 'zhfonpoaxefafe@jmail.com',
                    fromdate: '02/15/2016',
                    subject: '❗re: you need to read this',
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
                },
                {
                    id: 'spam',
                    from: 'Manager',
                    fromdate: '02/09/2016',
                    subject: 'Meeting Follow-Up',
                    body: 'Hi team, circling back on the action items from today’s meeting. I didn’t see the notes in the shared drive - could someone point me to them?',
                    snippet: 'Hi team, circling back...',
                    day: 'Day 0',
                },
                {
                    id: 'spam2',
                    from: 'Maya',
                    fromdate: '02/09/2016',
                    subject: 'Updated Timeline',
                    body: 'Hey, just flagging that the timeline doc was updated this morning. No major changes, but take a look when you get the chance.',
                    snippet: 'Hey, just flagging that the...',
                    day: 'Day 0',
                }
            ]
        },
        {
            day: 1,
            emails: [
                {
                    id: 'day1-main',
                    from: 'Wife',
                    fromdate: '02/10/2016',
                    subject: '❗dinner 💕',
                    body: `hey love, i made your favorite tonight. i know you've been busy but i really want us to finally have a proper date night. don't be late 🕯️`,
                    images: ['../assets/dinner.jpeg'],
                    snippet: 'hey love, i made your favorite tonight...',
                    day: 'Day 1',
                    isDecision: true,
                    options: [
                        { text: 'Stay at work, finish the project, impress boss', wife: 0, work: 15 },
                        { text: 'Leave work early, buy flowers, go home', wife: 10, work: 0 },
                        { text: 'Bring laptop home, try to balance both', wife: 5, work: 5 }
                    ]
                },
                {
                    id: 'spam3',
                    from: 'Wife',
                    fromdate: '02/10/2016',
                    subject: 'my charger!',
                    body: 'random question but did you take my charger this morning? my phone’s at like 12% 🙃',
                    snippet: 'random question but...',
                    day: 'Day 1',
                }
            ]
        },
        {
            day: 2,
            emails: [
                {
                    id: 'day2-main',
                    from: 'Wife',
                    fromdate: '02/11/2016',
                    subject: '❗thinking about your presentation',
                    body: `ok so i was replaying our conversation from last night and i think the reason your boss didn't love the original plan is because it felt short-term. what if you frame it as a long-term system instead... like something the company can build on instead of just fixing this quarter's problem? you could even use that slide you were worried about to show future impact.`,
                    snippet: 'ok so i was replaying our conversation from last night...',
                    day: 'Day 2',
                    isDecision: true,
                    options: [
                        { text: 'Listen to wife and change presentation', wife: 10, work: 10 },
                        { text: 'Ignore wife and go with your own idea', wife: 0, work: 0 },
                        { text: 'Tell wife it\'s great but stay silent at work', wife: 5, work: 0 }
                    ]
                },
                {
                    id: 'spam4',
                    from: 'Jake',
                    fromdate: '02/11/2016',
                    subject: 'quick question',
                    body: 'do you know if the boss is in a good mood today or no? trying to decide when to ask lol',
                    snippet: 'do you know if...',
                    day: 'Day 2'
                },
                {
                    id: 'spam5',
                    from: 'Wife',
                    fromdate: '02/11/2016',
                    subject: 'home late again?',
                    body: `hey, are you gonna be late tonight or should i eat without you
                    
                    just wanna know`,
                    snippet: 'hey, are you...',
                    day: 'Day 2'
                }
            ]
        },
        {
            day: 3,
            emails: [
                {
                    id: 'day3-main',
                    from: 'Wife',
                    fromdate: '02/12/2016',
                    subject: 'please call me',
                    body: `hey
can you call me when you see this
it's kinda important
please`,
                    snippet: '❗hey, can you call me when you see this...',
                    day: 'Day 3',
                    isDecision: true,
                    options: [
                        { text: 'Ignore calls, focus on meeting', wife: 0, work: 10 },
                        { text: 'Step out and answer', wife: 20, work: 0 },
                        { text: 'Text "can\'t talk rn" promise later', wife: 5, work: 7 }
                    ]
                },

                {
                    id: 'spam6',
                    from: 'Priya N.',
                    fromdate: '02/12/2016',
                    subject: 'following up',
                    body: `Hey, just circling back on this from yesterday.
                    
                    No rush, but let me know when you have a second.`,
                    snippet: 'Hey, just circling back...',
                    day: 'Day 3'
                },
                {
                    id: 'spam7',
                    from: 'Alex Morgan',
                    fromdate: '02/12/2016',
                    subject: 'Heads Up',
                    body: `FYI - leadership will be sitting in on the meeting
                    
                    Might want to be prepared to speak.`,
                    snippet: 'FYI - leadership...',
                    day: 'Day 3'
                }
            ]
        },
        {
            day: 4,
            emails: [
                {
                    id: 'day4-flavor',
                    from: 'Mike (Slack)',
                    fromdate: '02/13/2016',
                    subject: 'lol is this about you?',
                    body: `uhhh is that your wife's post on instagram? 😬 rough timing… boss is literally right here btw`,
                    images: ['../assets/insta.png'],
                    snippet: 'uhhh is that your wife\'s post on instagram?',
                    day: 'Day 4',
                },
                {
                    id: '❗day4-main',
                    from: 'Instagram',
                    fromdate: '02/13/2016',
                    subject: 'Wife shared a post',
                    body: `@lifewsparkles posted:

"missing feeling chosen lately 😔"

[3 comments] [68 likes]`,
                    snippet: 'when you\'re always the last priority...',
                    day: 'Day 4',
                    isDecision: true,
                    options: [
                        { text: 'Lash out at coworkers now, comfort her later', wife: 10, work: 0 },
                        { text: 'Ask her to delete post and confront her', wife: 0, work: 5 },
                        { text: 'Ignore to avoid drama at work', wife: 0, work: 10 }
                    ]
                },
                {
                    id: 'spam8',
                    from: 'IT Support',
                    fromdate: '02/13/2016',
                    subject: 'Doc Access',
                    body: `You've been granted access to:

                    Q1 Strategy - Final Draft
                    
                    If this was unexpected, no action is required.`,
                    snippet: 'You\'ve been granted...',
                    day: 'Day 4'
                }
            ]
        },
        {
            day: 5,
            emails: [
                {
                    id: 'day5-main',
                    from: 'Wife',
                    fromdate: '02/14/2016',
                    subject: '❗wow.',
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
        emailItem.onclick = () => {
            selectEmail(email.id);
        };
        
        emailItem.innerHTML = `
            <div class="email-from">${email.from}</div>
            <div class="email-from">${email.fromdate}</div>
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
    EmailOpenSound.play();
    gameState.selectedEmailId = emailId;
    gameState.readEmails[emailId] = true;

    
    const email = getAllEmails().find(e => e.id === emailId);
    renderEmailView(email);
    renderInbox();
}

function renderEmailView(email) {
    const emailContent = document.getElementById('emailContent');

    const hasDecided = gameState.decisions[email.id] !== undefined;

    // keep track of day
    const isCurrentDayEmail =
        storyData.days[gameState.currentDay].emails.some(e => e.id === email.id);

    // images for day 1 & 4
    let imagesHtml = '';
    if (email.images && email.images.length > 0) {
        imagesHtml = `
            <div class="email-images">
                ${email.images.map(src =>
                    `<img src="${src}" class="email-image" alt="email attachment" />`
                ).join('')}
            </div>
        `;
    }

    let content = `
        <div class="email-header-view">
            <div class="email-subject-view">${email.subject}</div>
            <div class="email-meta">
                <div class="email-from-view">From: ${email.from}</div>
                <div>To: You</div>
            </div>
        </div>
        <div class="email-body-view">
            ${email.body}
            ${imagesHtml}
        </div>
    `;

    // Decision email =  choice popup
    if (
        email.isDecision &&
        !hasDecided &&
        isCurrentDayEmail &&
        email.id === getCurrentDayDecisionEmail()?.id
    ) {
        const buttonText = email.isFutureEmail ? 'Continue' : 'Make a Decision';
        content += `
            <div class="next-day-container">
                <button class="make-decision-btn"
                    onclick="openDecisionModal('${email.id}')">
                    ${buttonText}
                </button>
            </div>
        `;
    }

    // Decision email - already made
    else if (
        email.isDecision &&
        hasDecided &&
        isCurrentDayEmail &&
        email.id === getCurrentDayDecisionEmail()?.id
    ) {
        const chosenOption = email.options[gameState.decisions[email.id]];
        content += `
            <div class="next-day-container">
                <div class="decision-made-note">
                    Decision made: ${chosenOption.text}
                </div>
                ${
                    gameState.currentDay < 5
                        ? `<button class="next-day-btn"
                            onclick="triggerDayTransition()">
                            Continue to Day ${gameState.currentDay + 1} →
                          </button>`
                        : `<button class="next-day-btn"
                            onclick="showEnding()">
                            See Your Ending →
                          </button>`
                }
            </div>
        `;
    }

    // Non-decision email = continue button
    else if (email.isDecision === false && isCurrentDayEmail) {
        content += `
            <div class="next-day-container">
                <button class="next-day-btn" onclick="triggerDayTransition()">
                    Continue
                </button>
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
        const btn = document.createElement('button');
        if(email.id === 'future') {
            btn.className = 'continue-btn';
        } else {
            btn.className = 'decision-btn';
        }
        btn.textContent = option.text;
        btn.onclick = () => {
            makeDecision(email.id, index);
        };
        buttonsContainer.appendChild(btn);
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
        NotificationSound.play()
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
        document.getElementById('date').textContent = '02/09/2016';
    } else {
        document.getElementById('dayIndicator').textContent = `DAY ${gameState.currentDay}`;
        if(gameState.currentDay === 1){
            document.getElementById('date').textContent = '02/10/2016';
        }
        if(gameState.currentDay === 2){
            document.getElementById('date').textContent = '02/11/2016';
        }
        if(gameState.currentDay === 3){
            document.getElementById('date').textContent = '02/12/2016';
        }
        if(gameState.currentDay === 4){
            document.getElementById('date').textContent = '02/13/2016';
        }
        if(gameState.currentDay === 5){
            document.getElementById('date').textContent = '02/14/2016';
        }
        if(gameState.currentDay === 6){
            document.getElementById('date').textContent = '02/15/2016';
        }
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

You both adopt Felicia the Ferret to reduce stress.

Maybe that's just what life is now. Maybe that's enough.

Or maybe you're just delaying the inevitable.`;
    } else if (keptJob && !keptRelationship) {
        endingTitle = 'CAREER FOCUSED';
        endingText = `The promotion came through. Corner office, better title, the works.

She left three weeks ago. Packed her things while you were at a conference. She decided Felicia the Ferret is a better companion.

You tell yourself it was mutual. That you both wanted different things. That this is what success looks like.

The apartment is quieter now.`;
    } else if (!keptJob && keptRelationship) {
        endingTitle = 'LOVE REMAINS';
        endingText = `You got let go. "Restructuring," they called it. You know what it really was.

But she was there when you got home. She held you while you cried. She said you'd figure it out together.

Felicia the Ferret offered you her job, but you're not sure you want it.

You don't know what's next. But at least you're not alone.

Maybe that's what matters.`;
    } else {
        endingTitle = 'LOST';
        endingText = `You lost both.

The job vanished in a round of cuts. She left a week later. Said she couldn't watch you spiral anymore.

You keep checking your phone, waiting for someone to need you. Anyone.

She adopted Felicia the Ferret to lift her spirits.

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
        <button class="next-day-btn" onclick="showDay6Transition()">Reveal the Truth</button>
    `;
    
    document.getElementById('emailContent').style.display = 'none';
    endingScreen.classList.add('active');
}

function showDay6Transition() {
    const transition = document.getElementById('dayTransition');
    const dayNumber = document.getElementById('transitionDayNumber');
    
    dayNumber.textContent = 'DAY 6';
    transition.classList.add('active');
    
    // Add click handler to continue to email typing animation
    const clickHandler = () => {
        transition.classList.remove('active');
        transition.removeEventListener('click', clickHandler);
        showDay6Email();
    };
    
    transition.addEventListener('click', clickHandler);
}

function showDay6Email() {
    // Hide ending screen, show email content
    document.getElementById('endingScreen').classList.remove('active');
    document.getElementById('emailContent').style.display = 'block';
    
    const emailContent = document.getElementById('emailContent');
    emailContent.innerHTML = `
        <div class="email-compose-view">
            <div class="compose-header">Compose New Message</div>
            <div class="compose-field">
                <span class="field-label">To:</span>
                <span class="field-value typing-text" id="typingTo"></span>
            </div>
            <div class="compose-field">
                <span class="field-label">Subject:</span>
                <span class="field-value typing-text" id="typingSubject"></span>
            </div>
            <div class="compose-body">
                <div class="typing-text" id="typingBody"></div>
            </div>
        </div>
    `;
    
    // Typing animation
    const toText = 'YOU';
    const subjectText = 're: you need to read this';
    const bodyText = `hey. i know this sounds crazy but you need to listen.

you keep doing this thing where you put off the hard conversations. you tell yourself it'll be fine, that you'll handle it later, that if you just focus on one thing at a time everything will work out.

it won't.

i'm watching you ignore calls. i'm watching you choose the safe option that lets you avoid dealing with anything real. and i'm watching it all fall apart.

you can't keep delaying the things that matter. not this time.

please. just… pay attention.`;
    
    let toIndex = 0;
    let subjectIndex = 0;
    let bodyIndex = 0;
    
    // Type "To:" field
    const toInterval = setInterval(() => {
        if (toIndex < toText.length) {
            document.getElementById('typingTo').textContent += toText[toIndex];
            toIndex++;
        } else {
            clearInterval(toInterval);
            // Start typing subject after small delay
            setTimeout(() => {
                const subjectInterval = setInterval(() => {
                    if (subjectIndex < subjectText.length) {
                        document.getElementById('typingSubject').textContent += subjectText[subjectIndex];
                        subjectIndex++;
                    } else {
                        clearInterval(subjectInterval);
                        // Start typing body after small delay
                        setTimeout(() => {
                            const bodyInterval = setInterval(() => {
                                if (bodyIndex < bodyText.length) {
                                    document.getElementById('typingBody').textContent += bodyText[bodyIndex];
                                    bodyIndex++;
                                } else {
                                    clearInterval(bodyInterval);
                                    // Show "Play Again" button after typing is done
                                    setTimeout(() => {
                                        emailContent.innerHTML += `
                                            <div class="next-day-container">
                                                <button class="restart-btn" onclick="restartGame()">Play Again</button>
                                            </div>
                                        `;
                                    }, 1000);
                                }
                            }, 30); // Typing speed for body
                        }, 500);
                    }
                }, 50); // Typing speed for subject
            }, 500);
        }
    }, 80); // Typing speed for To field
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
