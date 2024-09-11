let currentUser = {};
let currentChatCode = '';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const profession = document.getElementById('profession').value;

    if (password === '8899') {
        currentUser = { username, profession };
        document.getElementById('login').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('profile-info').innerText = `${username} (${profession})`;
    } else {
        alert('Incorrect password');
    }
}

function editProfile() {
    const newProfession = prompt('Enter new profession:');
    if (newProfession) {
        currentUser.profession = newProfession;
        document.getElementById('profile-info').innerText = `${currentUser.username} (${newProfession})`;
    }
}

function logout() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

function createChatSpace() {
    currentChatCode = Math.random().toString(36).substring(2, 7);
    alert(`Your chat space code is: ${currentChatCode}`);
    setTimeout(() => {
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('chatspace').style.display = 'block';
        printJoinMessage();
    }, 5000);
}

function joinChatSpace() {
    const chatCode = prompt('Enter chat space code:');
    if (chatCode === currentChatCode) {
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('chatspace').style.display = 'block';
        printJoinMessage();
    } else {
        alert('Invalid chat space code');
    }
}

function printJoinMessage() {
    const messagesDiv = document.getElementById('messages');
    const joinMessage = document.createElement('div');
    joinMessage.innerHTML = `<span class="profile-info">${currentUser.username} (${currentUser.profession}):</span> joined the chat`;
    messagesDiv.appendChild(joinMessage);
    saveMessages();
}

function sendMessage() {
    const message = document.getElementById('message').value;
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<span class="profile-info">${currentUser.username} (${currentUser.profession}):</span> ${message}`;
    messageElement.onclick = function() {
        messagesDiv.removeChild(messageElement);
        saveMessages();
    };
    messagesDiv.appendChild(messageElement);
    document.getElementById('message').value = '';
    saveMessages();
}

function exitChatSpace() {
    document.getElementById('chatspace').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

function saveMessages() {
    const messagesDiv = document.getElementById('messages');
    const messages = [];
    messagesDiv.childNodes.forEach(node => {
        messages.push(node.innerHTML);
    });
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

function loadMessages() {
    const messagesDiv = document.getElementById('messages');
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = message;
        messageElement.onclick = function() {
            messagesDiv.removeChild(messageElement);
            saveMessages();
        };
        messagesDiv.appendChild(messageElement);
    });
}

window.onload = function() {
    loadMessages();
};
