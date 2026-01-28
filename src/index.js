class CountdownTimer {
    constructor(options) {
        this.selector = options.selector;
        this.targetDate = options.targetDate;

        // 1) Знаходимо контейнер таймера
        this.timerEl = document.querySelector(this.selector);

        // Якщо контейнер не знайдено — далі код не має сенсу
        if (!this.timerEl) {
            console.error('Таймер не знайдено. Перевір selector:', this.selector);
            return;
        }

        // 2) Знаходимо 4 поля всередині контейнера через data-value
        this.daysEl = this.timerEl.querySelector('.value[data-value="days"]');
        this.hoursEl = this.timerEl.querySelector('.value[data-value="hours"]');
        this.minsEl = this.timerEl.querySelector('.value[data-value="mins"]');
        this.secsEl = this.timerEl.querySelector('.value[data-value="secs"]');

        this.intervalId = null;

        this.start();
    }

    start() {
        // одразу показати правильні цифри
        this.update();

        // оновлювати кожну секунду
        this.intervalId = setInterval(() => {
            this.update();
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    update() {
        const time = this.targetDate.getTime() - Date.now();

        if (time <= 0) {
            this.daysEl.textContent = '0';
            this.hoursEl.textContent = '00';
            this.minsEl.textContent = '00';
            this.secsEl.textContent = '00';
            this.stop();
            return;
        }

        /*
         * Дні, що залишилися: ділимо значення UTC на 1000 * 60 * 60 * 24, кількість
         * мілісекунд в один день (мілісекунди * секунди * хвилини * години)
         */
        const days = Math.floor(time / (1000 * 60 * 60 * 24));

        /*
         * Решта годин: отримуємо залишок від попереднього розрахунку за допомогою оператора
         * залишку% і ділимо його на кількість мілісекунд в одній годині
         * (1000 * 60 * 60 = мілісекунди * хвилини * секунди)
         */
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        /*
         * Решта хвилин: отримуємо хвилини, що залишилися і ділимо їх на кількість
         * мілісекунд в одній хвилині (1000 * 60 = мілісекунди * секунди)
         */
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

        /*
         * Решта секунд: отримуємо секунди, які залишилися і ділимо їх на кількість
         * миллисекунд в одной секунде (1000)
         */
        const secs = Math.floor((time % (1000 * 60)) / 1000);

        this.daysEl.textContent = String(days);
        this.hoursEl.textContent = String(hours).padStart(2, '0');
        this.minsEl.textContent = String(mins).padStart(2, '0');
        this.secsEl.textContent = String(secs).padStart(2, '0');
    }
};

new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2026'),
});