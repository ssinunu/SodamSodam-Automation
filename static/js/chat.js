const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // 사용자 메시지 저장하는 변수
const API_KEY = "";  // API키
const inputInitHeight = chatInput.scrollHeight;

// 초기 화면 띄우기 함수
function showChatbot() {
    document.body.classList.add("show-chatbot");
  }
  
  // 페이지 로딩 후 자동으로 초기 화면 띄우기
  window.addEventListener("load", showChatbot);


const createChatLi = (message, className) => {
   // 받은 메세지랑 className가지고 채팅 <li> 요소 만들기
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // 채팅 <li>요소 반환
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // API 요청에 대한 속성과 메세지 정의
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    // API에 POST 요청 보내서 응답
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "다시 입력해주세요.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // 사용자가 입력한 메시지 입력하고 공간 제거
    if(!userMessage) return;

    // 입력한 텍스트 영역 지우고 높이 기본값으로 설정
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // 사용자 메시지를 CHATBOX에 추가
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // 로딩중
        const incomingChatLi = createChatLi("로딩중", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // 내용에 따라 입력 텍스트 영역의 높이 조정
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);

// closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
// chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));