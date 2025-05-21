// Обновление значений слайдеров
document.getElementById("area-slider").addEventListener("input", function () {
  document.getElementById("area-value").textContent = this.value + " м²";
  updateCalculations();
});

// Добавляем обработчики для всех радио-кнопок
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("change", updateCalculations);
});

// Функция расчета скидки и срока
function updateCalculations() {
  // Получаем выбранные значения
  const repairType = document.querySelector(
    'input[name="repair-type"]:checked'
  ).value;
  const propertyType = document.querySelector(
    'input[name="property-type"]:checked'
  ).value;
  const rooms = document.querySelector('input[name="rooms"]:checked').value;
  const area = parseInt(document.getElementById("area-slider").value);

  // Базовая стоимость за квадратный метр
  let basePrice, baseDays;
  switch (repairType) {
    case "cosmetic":
      basePrice = 3000;
      baseDays = 10;
      break;
    case "turnkey":
      basePrice = 5000;
      baseDays = 25;
      break;
    case "capital":
      basePrice = 4000;
      baseDays = 20;
      break;
    case "designer":
      basePrice = 7000;
      baseDays = 35;
      break;
    default:
      basePrice = 3000;
      baseDays = 10;
  }

  // Коэффициенты
  const propertyCoefficient = propertyType === "new" ? 1 : 1.2;
  const roomsCoefficient = 1 + (parseInt(rooms) - 1) * 0.05;
  const areaCoefficient = area / 50;

  // Расчет стоимости
  const baseCost = basePrice * area * propertyCoefficient * roomsCoefficient;
  // Расчет скидки (примерная логика)
  const discount = Math.round(baseCost * 0.1);

  // Расчет дней
  const days = Math.round(
    baseDays * areaCoefficient * (propertyType === "new" ? 1 : 1.1)
  );

  // Форматирование значений
  const formattedDiscount = discount.toLocaleString("ru-RU");

  // Обновление отображения
  document.getElementById("discount").textContent = formattedDiscount + " руб.";
  document.getElementById("repairTime").textContent = "до " + days + " дней";
}

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", updateCalculations);
