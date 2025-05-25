import crypto from 'crypto';
import { URLSearchParams } from 'url';
import { Markup } from 'telegraf';
import { getAsset } from '../remonline/remonline.utils.mjs';
import { turnBackKeyboard } from './middleware/keyboards.mjs';

import { getAssetDataByClientId } from './telegram.queries.mjs';
import { getUnpackedSettings } from 'http2';


export function verifyTelegramWebAppData(initDataString, botToken) {
  const params = new URLSearchParams(initDataString);
  const receivedHash = params.get('hash');

  if (!receivedHash) {
    // console.error("Hash not found in initData"); // Можно раскомментировать для отладки на сервере
    return { isValid: false, userId: null };
  }

  // Сохраняем строку с данными пользователя до удаления хеша
  // URLSearchParams.get() автоматически URL-декодирует значение.
  const userString = params.get('user');

  // Удаляем поле 'hash' из параметров для формирования data-check-string
  params.delete('hash');

  // Формируем data-check-string
  const dataCheckArr = [];
  // Важно: параметры должны быть отсортированы по ключу в алфавитном порядке
  const sortedKeys = Array.from(params.keys()).sort();

  for (const key of sortedKeys) {
    dataCheckArr.push(`${key}=${params.get(key)}`);
  }
  const dataCheckString = dataCheckArr.join('\n');

  // Генерируем секретный ключ (secret_key)
  // Данные для HMAC: токен вашего Telegram-бота
  // Ключ для HMAC: строка "WebAppData"
  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest();

  // Вычисляем хеш от data-check-string с использованием секретного ключа
  const calculatedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  // Сравниваем вычисленный хеш с полученным хешем
  if (calculatedHash === receivedHash) {
    let userId = null;
    if (userString) {
      try {
        const user = JSON.parse(userString); // Парсим JSON строку с данными пользователя
        // Убеждаемся, что user объект существует и у него есть свойство id
        if (user && typeof user.id !== 'undefined') {
          userId = user.id;
        }
      } catch (e) {
        // console.error("Error parsing user data JSON:", e); // Можно раскомментировать для отладки
        userId = null; // Ошибка парсинга, userId остается null
      }
    }
    return { isValid: true, userId: userId };
  } else {
    return { isValid: false, userId: null };
  }
}

export const generateUserAssetListKeyboard = async ({ remonline_id }) => {
  const params = {
    remonline_id,
  };
  const { data: assets } = await getAsset({ params });
  const db_assets = await getAssetDataByClientId({ clientId: remonline_id });
  console.log({db_assets})
  if (assets.length === 0 && db_assets.length === 0) {
    return { code: 404, keyboard: turnBackKeyboard };
  }
  const asset_candidates = [assets, db_assets];
  const uids = [];
  console.log({asset_candidates})
  asset_candidates.forEach((asset_candidate) => {
    asset_candidate.forEach((asset) => {
      if (uids.includes(asset.uid)) {
        return;
      }
      uids.push(asset.uid);
    });
  });
  console.log({uids})
  const chooseAssetKeyboard = (() => {
    const buttons = uids.map((uid) => [uid]);
    console.log({buttons})
    return {
      code: 200,
      keyboard: Markup.keyboard(buttons).oneTime(true).resize(true),
    };
  })();
  return chooseAssetKeyboard;
};
export const stayInSpecialNewOrderSubscene = ({
  subSceneSet,
  targetSubscene,
}) => {
  return (ctx, currentSubscene) => {
    const isPossibleSubscene =
      Object.values(subSceneSet).includes(currentSubscene);
    if (!isPossibleSubscene) {
      return ctx.wizard.back();
    }
    const isTargetSubscene = currentSubscene === targetSubscene;
    if (isPossibleSubscene && !isTargetSubscene) {
      return ctx.wizard.next();
    }
  };
};
