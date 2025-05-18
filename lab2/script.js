document.addEventListener("DOMContentLoaded", function () {

    function updateURL(route) {
        history.pushState({}, "", route);  
        handleRoute(); 
    }
    
    const goalContainer = document.querySelector(".goal-cards");
    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");
    const burger = document.querySelector(".burger-menu");
    const menu = document.querySelector("nav ul");
    const filterButton = document.getElementById("filter-button");
    const filterMenu = document.querySelector(".filter-select");

    // Бургер-меню
    burger.addEventListener("click", function () {
        menu.classList.toggle("show");
    });

    // Мотиваційне повідомлення
    const motivationText = document.createElement("p");
    motivationText.id = "motivation-message";
    motivationText.style.textAlign = "center";
    motivationText.style.fontSize = "18px";
    motivationText.style.fontWeight = "600";
    motivationText.style.color = "#4CAF50";
    motivationText.style.marginTop = "20px";
    document.body.insertBefore(motivationText, document.body.firstChild);

    function showMotivationMessage() {
        const messages = [
            "🔥 Ніколи не здавайся – ти ближче, ніж здається!",
            "💪 Кожен день – це ще один крок до мрії!",
            "🚀 Дій сьогодні, а не завтра!",
            "🌟 Маленькі досягнення ведуть до великих перемог!",
            "🎯 Фокусуйся на результаті, а не на труднощах!"
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        motivationText.textContent = randomMessage;
        alert(`🔥 Мотивація дня: ${randomMessage}`);
    }

    setInterval(showMotivationMessage, 86400000);
    showMotivationMessage();

    // Оновлення прогресу
    function updateProgress() {
        let goalCards = [...document.querySelectorAll(".goal-card:not(.add-goal)")];
        let completedGoals = goalCards.filter(card => card.classList.contains("completed")).length;
        let totalGoals = goalCards.length;
        let progressPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

        progressBar.style.width = progressPercentage + "%";
        progressText.textContent = `Прогрес: ${progressPercentage}%`;
    }

    // Перемикання статусу цілі
    function toggleGoal(button) {
        const goalCard = button.closest(".goal-card");
        goalCard.classList.toggle("completed");
        button.textContent = goalCard.classList.contains("completed") ? "Виконано" : "Виконати ціль";
        updateProgress();
    }

    // Видалення цілі
    function deleteGoal(button) {
        const goalCard = button.closest(".goal-card");
        goalCard.remove();
        updateProgress();
    }

    // Додаємо події на кнопки
    function attachEventListeners() {
        document.querySelectorAll(".mark-done").forEach(button => {
            button.addEventListener("click", function () {
                toggleGoal(this);
            });
        });

        document.querySelectorAll(".delete-goal").forEach(button => {
            button.addEventListener("click", function () {
                deleteGoal(this);
            });
        });
    }

    // Завантаження цілей
    function loadGoals() {
        fetch("goals.json")
            .then(response => response.json())
            .then(goals => {
                goals.forEach(goal => {
                    const goalCard = document.createElement("article");
                    goalCard.classList.add("goal-card");


                    if (goal.status) {
                        goalCard.classList.add(goal.status);
                    }

                    goalCard.innerHTML = `
                        <img src="${goal.img}" alt="${goal.title}">
                        <h3>${goal.title}</h3>
                        <button class="mark-done">Виконати ціль</button>
                        <button class="delete-goal">✖</button>
                    `;

                    goalContainer.appendChild(goalCard);
                });

                attachEventListeners();
                updateProgress();
            })
            .catch(error => console.error("Помилка завантаження цілей:", error));
    }

    // Фільтрація цілей
    function filterGoals() {
        const filterValue = filterMenu.value;
        const allGoalCards = document.querySelectorAll(".goal-card:not(.add-goal)");

        allGoalCards.forEach(card => {
            if (filterValue === "all") {
                card.style.display = "block";
            } else if (filterValue === "active" && !card.classList.contains("completed")) {
                card.style.display = "block";
            } else if (filterValue === "completed" && card.classList.contains("completed")) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    filterMenu.addEventListener("change", filterGoals);

    filterButton.addEventListener("click", function () {
        filterMenu.classList.toggle("show");
    });

    loadGoals();
});
