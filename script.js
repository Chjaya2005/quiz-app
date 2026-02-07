const questions = {
  aptitude: [
    { q: "If 5x + 3 = 18, what is x?", o: ["2", "3", "5", "6"], a: 1 },
    { q: "What comes next: 2, 4, 8, 16, ?", o: ["20","24","32","36"], a: 2 },
    { q: "If 15% of a number is 45, the number is?", o: ["200","250","300","350"], a: 2 },
    { q: "A train travels 60 km in 1 hour. How long will it take to travel 180 km?", o: ["2 hrs","3 hrs","4 hrs","5 hrs"], a: 1 },
    { q: "Simplify: 12 × 8 ÷ 4 + 6", o: ["24","30","32","36"], a: 1 }
  ],

  reasoning: [
    { q: "Find the odd one out: Dog, Cat, Lion, Car", o: ["Dog","Cat","Lion","Car"], a: 3 },
    { q: "All Bloops are Razzies, all Razzies are Lazzies. Are all Bloops Lazzies?", o: ["Yes","No","Cannot say","Sometimes"], a: 0 },
    { q: "Next number: 1, 4, 9, 16, ?", o: ["20","25","36","30"], a: 1 },
    { q: "Find the missing letter: A, C, F, J, ?", o: ["O","K","L","M"], a: 0 },
    { q: "Which does not belong: Triangle, Square, Circle, Chair", o: ["Triangle","Square","Circle","Chair"], a: 3 }
  ],

  python: [
    { q: "Output: print(2 ** 3)?", o: ["5","6","8","9"], a: 2 },
    { q: "Keyword to define function?", o: ["func","def","function","define"], a: 1 },
    { q: "Type of [1,2,3]?", o: ["Tuple","List","Dictionary","Set"], a: 1 },
    { q: "Method to add element to list?", o: ["add()","append()","insert()","extend()"], a: 1 },
    { q: "Operator for floor division?", o: ["/","//","%","**"], a: 1 }
  ],

  java: [
    { q: "Which is a Java primitive type?", o: ["String","int","List","Scanner"], a: 1 },
    { q: "Extension of Java files?", o: [".class",".java",".exe",".txt"], a: 1 },
    { q: "Keyword for inheritance in Java?", o: ["this","super","extends","implements"], a: 2 },
    { q: "Entry point of Java program?", o: ["main()","start()","run()","init()"], a: 0 },
    { q: "Keyword to prevent inheritance?", o: ["stop","final","private","sealed"], a: 1 }
  ],

  c: [
    { q: "Which is used for comments in C?", o: ["/* */","//","#","All"], a: 3 },
    { q: "Header file for input/output?", o: ["stdio.h","iostream","math.h","conio.h"], a: 0 },
    { q: "C is a ____ language", o: ["Procedural","OOP","Markup","Both"], a: 0 },
    { q: "Operator for address-of?", o: ["*","&","%","#"], a: 1 },
    { q: "Correct syntax for main?", o: ["int main()","main()","void main()","All"], a: 0 }
  ],

  r: [
    { q: "Which symbol is used for assignment in R?", o: ["=","<-","->","All"], a: 3 },
    { q: "Function to combine elements into vector?", o: ["c()","combine()","vec()","merge()"], a: 0 },
    { q: "Which is a data type in R?", o: ["matrix","list","factor","All"], a: 3 },
    { q: "Function to get length of vector?", o: ["size()","length()","count()","len()"], a: 1 },
    { q: "How to comment a line in R?", o: ["//","/* */","#","None"], a: 2 }
  ],

  frontend: [
    { q: "HTML stands for?", o: ["Hyper Text Markup Language","High Tool Language","Hyper Tool Markup","None"], a: 0 },
    { q: "CSS is used for?", o: ["Logic","Style","Database","None"], a: 1 },
    { q: "JS is used for?", o: ["Backend","Frontend Logic","Database","OS"], a: 1 },
    { q: "Which tag inserts JavaScript?", o: ["<js>","<script>","<javascript>","<code>"], a: 1 },
    { q: "Property for text color in CSS?", o: ["font-color","color","text-color","fg-color"], a: 1 }
  ]
};

let quiz = [];
let index = 0;
let score = 0;
let time = 15;
let timer;

function startQuiz(topic) {
  quiz = questions[topic];
  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  index = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  time = 15;
  document.getElementById("timer").textContent = "Time: " + time;

  document.getElementById("bar").style.width =
    (index / quiz.length) * 100 + "%";

  const q = quiz[index];
  document.getElementById("question").textContent = q.q;
  const options = document.getElementById("options");
  options.innerHTML = "";

  q.o.forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.onclick = () => checkAnswer(i);
    options.appendChild(li);
  });

  timer = setInterval(() => {
    time--;
    document.getElementById("timer").textContent = "Time: " + time;
    if (time === 0) next();
  }, 1000);
}

function checkAnswer(ans) {
  if (ans === quiz[index].a) score++;
  next();
}

function next() {
  clearInterval(timer);
  index++;
  if (index < quiz.length) loadQuestion();
  else showResult();
}

function showResult() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";

  let percent = Math.round((score / quiz.length) * 100);
  let grade = percent >= 90 ? "A+" :
              percent >= 75 ? "A" :
              percent >= 60 ? "B" :
              percent >= 40 ? "C" : "F";

  document.getElementById("username").textContent = "Student";
  document.getElementById("score").textContent = score + "/" + quiz.length;
  document.getElementById("percentage").textContent = percent;
  document.getElementById("grade").textContent = grade;
}
