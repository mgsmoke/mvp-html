document.addEventListener('DOMContentLoaded', () => {
  // Приветствие
  const greetingElement = document.getElementById('greeting');
  if (greetingElement) {
    const hour = new Date().getHours();
    let greeting = hour >= 5 && hour < 12 ? "Доброе утро" :
                   hour >= 12 && hour < 18 ? "Добрый день" :
                   "Добрый вечер";
    greetingElement.textContent = greeting;
  }

  // Текущая дата
  const dateElement = document.getElementById('current-date');
  if (dateElement) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('ru-RU', options);
  }

  // Навигация по кнопкам
  document.getElementById('nav-list')?.addEventListener('click', () => {
    location.href = 'index.html';
  });
  document.getElementById('nav-calendar')?.addEventListener('click', () => {
    location.href = 'calendar.html';
  });
  document.getElementById('nav-ai')?.addEventListener('click', () => {
    location.href = 'ai.html';
  });

  // Модалка календаря
  const modal = document.getElementById('modal-overlay');
  const calendarBtn = document.getElementById('calendar-button');
  const closeBtn = document.querySelector('.close');

  if (modal && calendarBtn && closeBtn) {
    calendarBtn.onclick = () => modal.style.display = 'block';
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = e => {
      if (e.target === modal) modal.style.display = 'none';
    };
  }

  // Календарь
  const calendarGrid = document.getElementById('calendar-grid');
  const currentMonthEl = document.getElementById('current-month');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');

  if (calendarGrid && currentMonthEl && prevMonthBtn && nextMonthBtn) {
    const monthNames = [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function renderCalendar(month, year) {
      while (calendarGrid.children.length > 7) {
        calendarGrid.removeChild(calendarGrid.lastChild);
      }

      currentMonthEl.textContent = `${monthNames[month]} ${year}`;

      const firstDay = new Date(year, month, 1).getDay() || 7;
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const today = new Date();

      for (let i = 1; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day other-month';
        calendarGrid.appendChild(empty);
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = d;

        if (
          d === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          day.classList.add('today');
        }

        calendarGrid.appendChild(day);
      }
    }

    prevMonthBtn.onclick = () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentMonth, currentYear);
    };

    nextMonthBtn.onclick = () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentMonth, currentYear);
    };

    renderCalendar(currentMonth, currentYear);
  }

  //Кнопки добавить
  const plusButton = document.getElementById('plus-button');
  const addButtons = document.getElementById('add-buttons');
  const overlay = document.getElementById('btn-overlay');
  
  if (plusButton && addButtons && overlay) {
    plusButton.addEventListener('click', () => {
      const isVisible = addButtons.style.display === 'flex';
      addButtons.style.display = isVisible ? 'none' : 'flex';
      overlay.style.display = isVisible ? 'none' : 'block';
      plusButton.style.display = isVisible ? 'flex' : 'none';
    });
  
    overlay.addEventListener('click', () => {
      addButtons.style.display = 'none';
      overlay.style.display = 'none';
      plusButton.style.display = 'flex';
    });
  }

  //Окно добавления задачи
  
    const addEventoverlay = document.getElementById('addEvent-overlay');
    const addEventcloseBtn = document.querySelector('.addEvent-close');
    const content = document.querySelector('.addEvent-content');
    const addEventBtn = document.getElementById('addEvent-btn'); // Новая кнопка
    
    // Функция для открытия модального окна
    function openModal() {
      addEventoverlay.style.display = 'block';
    }
    
    // Функция для закрытия модального окна
    function closeModal() {
      addEventoverlay.style.display = 'none';
    }
    
    // Обработчик для кнопки "Создать событие"
    addEventBtn.addEventListener('click', openModal);
    
    // Обработчик для закрытия по крестику
    addEventcloseBtn.addEventListener('click', closeModal);
    
    // Обработчик для закрытия по клику вне контента (на overlay)
    addEventoverlay.addEventListener('click', function(e) {
      if (e.target === addEventoverlay) {
        closeModal();
      }
    });
    
    // Предотвращаем закрытие при клике на сам контент
    content.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  
  
});