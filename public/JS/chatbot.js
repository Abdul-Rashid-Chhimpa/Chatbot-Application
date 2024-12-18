// import { GoogleGenerativeAI } from "@google/generative-ai";

const btn = document.getElementById("sendBtn");

btn.addEventListener("click", generateContent);

const apikey = "AIzaSyA_d0a9BuUM02ryz9nyAHo3r3YoHwB8tFs";
async function generateContent() {
    const userInput = document.getElementById("inp");
    const containor = document.getElementById("containor2");
    containor.classList.add("containor2");

    if (!userInput.value) {
        return;
    }

    const label = document.createElement("label");
    const span = document.createElement("span");
    const p = document.createElement("p");
    const img = document.createElement("img");
    img.src = "/public/IMG/i-am.png";
    const editInput = document.createElement("img");
    editInput.id = "editInput";
    editInput.src = "/public/IMG/pen.png";
    p.innerText = userInput.value;

    editInput.addEventListener("click", function() {
        userInput.value = p.innerText;
    });

    span.appendChild(editInput);
    span.appendChild(p);
    span.appendChild(img);

    label.appendChild(span);
    containor.appendChild(label);


    const spiner = document.createElement("spinner");
    spiner.className = "spinner";

    const SpinnerSpan = document.createElement("span");
    SpinnerSpan.textContent = "Generating Response...";
    const div = document.createElement("div");
    div.className = "spinnerContainor";
    div.id = "spinner";
    div.appendChild(spiner);
    div.appendChild(SpinnerSpan);
    containor.appendChild(div);


    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apikey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userInput.value }]
                }]
            }),
        });




        const data = await response.json();
        let result = data.candidates[0].content.parts[0].text;
        // console.log(data)

        setTimeout(function() {
            document.getElementById("spinner").style.display = "none";
        }, 1000);


        let str = result.split("**");
        // console.log(str);
        let responseArr = str;
        let newResponse;
        let pre = "";
        // console.log(pre);


        for (let i = 0; i < responseArr.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArr[i];
            } else {
                newResponse += "<b>" + responseArr[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("<br>");
        console.log(newResponse2.split(":").join("<br>"));
        let newResponseArr = newResponse2.split(" ");
        // console.log(newResponseArr); // Log the array of words



        const geminiContainor = document.createElement("div");
        geminiContainor.className = "gemini-containor";

        const geminiDIv = document.createElement("div");
        geminiDIv.className = "gemini";
        const img = document.createElement("img");
        img.src = "/public/IMG/ai-technology.png";
        geminiDIv.appendChild(img);


        const msg = document.createElement("div");
        msg.className = "message";
        const p = document.createElement("p");

        // p.innerHTML = newResponse2;
        // msg.appendChild(p);


        geminiContainor.appendChild(geminiDIv);
        geminiContainor.appendChild(msg);

        containor.appendChild(geminiContainor);

        const fun = (index, nextWord) => {

                setTimeout(function() {
                    pre += nextWord;
                    p.innerHTML = pre;
                    msg.appendChild(p);

                }, 75 * index);
                // Delay based on the index
            }
            // Iterate over the array and add each word with a delay
        for (let j = 0; j < newResponseArr.length; j++) {
            const nextWord = newResponseArr[j];
            // console.log(nextWord);
            fun(j, nextWord + " "); // Add space after each word
        }
        // console.log(pre);

        userInput.value = '';



        if (response.ok) {

            containor.style.display = "block";

        } else {
            console.log("error");
        }
    } catch (error) {
        console.error("Error:", error);
        // responseDiv.textContent = "Error communicating with the Gemini API.";
    }
};