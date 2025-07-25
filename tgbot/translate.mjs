export const ua = {
  sayHi: ` Вітаю!\nПропонуємо Вам зробити попередній запис на обслуговування.`,
  needToRegistrate: 'Спершу зареєструйтеся з командою /start',
  editDone: 'Місто змінено',
  askCityForEdit: 'Виберіть Ваше місто',
  errorWhileCreateOrder: 'Сталася помилка, спробуйте ще раз',
  getOrders: {
    initText: 'Перегляньте список заказів',
    openOrderListBtn: 'Переглянути',
  },
  createOrder: {
    chooseAsset: 'Виберіть будь ласка авто зі списку 🚙',
    chooseAssetSelectingMode: 'Як бажаєте записати авто 🚙?',
    wrongPlateNumber: '⚠️ Невірний номер, спробуте знов',
    pickMalfunctionType:
      '⚙️ Виберіть причину звернення зі списку\nАбо оберіть "Свій варіант"',
    askMalfunction: '⚙️ Будь ласка напишіть причину звернення',
    shortMalfunction: '⚠️ Треба більше деталей, спробуйте знов',
    askApointmenDateInRightFormat:
      'Напишіть дату у вірному форматі (2000-12-31)',
    wrongApointmenDateFormat: 'Невірній формат дати, спробуйте знов',
    askToVefirApointment: '👨🏻‍✈️ Дякуємо! Перевірте будь ласка, чи все вірно?',
    tryAgainToCompletApointment:
      '✈️ Почнемо з початку, напишіть номер авто ще раз',
    apointmentDone:
      '👨🏻‍✈️ Ми створили для Вас попередній запис.\nНаші менеджери скоро зв`яжуться з Вами, щоб уточнити час',
    apointmentWaitingApproval: '\n🔘 Очікує підтвердження',
  },
  createAsset: {
    askPlateNumber: '🚙 Напишіть номер авто',
    askBrand: '🎬 Впишіть марку вашого авто',
    askGroup: '👥 Впишіть групу вашого авто',
    askColor: '🎨 Впишіть колір вашого авто',
    askYear: '⚙️ Впишіть рік виготовлення вашого авто',
    askModel: '🚘 Впишіть модель вашого авто',
    askMileage: '🏃‍♂️ Впишіть пробіг вашого авто (км)',
    askEngineVolume: "⚙️ Впишіть об'єм двигуна (см^3) вашого авто",
    askMyTaxiCrmId: '🆔 Впишіть MyTaxiCrmId вашого авто',
    wrongYear: '⚠️ Введіть коректний рік',
    wrongMileage: '⚠️ Введіть коректний пробіг',
    wrongEngineVolume: "⚠️ Введіть коректний об'єм двигуна",
    wrongPlateNumber: '⚠️ Не коректний номер авто',
  },
  createRemonlineId: {
    askCity: '👨🏻‍✈️ Вас вітає СТО G CAR Service!\nВиберіть Ваше місто',
    cityNotMatch: 'Виберіть місто зі списку',
    pickOwnCity: 'Будь ласка напишіть Ваше місто',
    cityToShort: '⚠️ Дуже коротка назва міста, спробуйте знов',
    askFullName: 'Напишіть своє ім`я щоб ми знали кого очікувати на СТО',
    fullNameToShort: '⚠️ Дуже коротке ім`я, спробуйте знов',
    askContactPhone: '☎️ Будь ласка вкажіть контактний номер телефону',
    askCorrectPhone: '⚠️ Вкажіть вірний телефон',
    askMail: '🌍 Напишіть адресу електроної пошти',
    askCorrectMail: '🌍 Вкажіть вірну пошту',
    askToCheckContactInfo: '⚠️ Перевірте свої данні, чи все ок?',
    areYouExistingClient: '👤 Ви існуючий клиєнт?',
    askFullNameAgain: '👨🏻‍✈️ Спробуйте заповнити форму знову.\nНапишіть своє ім`я',
    sharePhoneNumberButtonText: '☎️ Вказати номер телефону',
    askCorrectContact: '⚠️ Вкажіть вірний контакт',
    thankYouForSharingPhone: 'Дякуємо за надання вашого контакту ☺️!',
  },
};

export const keyboardText = {
  newAppointment: 'Записати авто',
};

export const malfunctionTypes = {
  maintenance: 'ТО',
  chassis: 'Ходова частина',
  electrical: 'Електрообладнання',
  bodywork: 'Кузовний ремонт',
  other: 'Свій варіант',
};
export const chooseAssetTypes = {
  listMyAssets: 'Переглянутии мої авто',
  registerNewAsset: 'Зареєструвати нове авто',
  registerExistingAssetByLicensePlate: 'Записати авто за номером',
};
export const specialMessages = {
  turnBack: 'Повернутися назад',
};
