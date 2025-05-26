import { getOrders } from '../../remonline/remonline.utils.mjs';
import { getRemonlineIdByTelegramId } from '../../telegram/telegram.queries.mjs';
import { verifyTelegramWebAppData } from '../../telegram/telegram.utilities.mjs';
export const getOrdersViaReqParams = async (req, res) => {
  try {
    const { remonline_id } = req.params;

    const { data } = await getOrders({
      'clients_ids[]': String(remonline_id),
    });

    res.status(200).json({
      status: 'success',
      message: 'Order sent to Telegram bot',
      orders: data,
    });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getOrdersWithTGAuth = async (req, res) => {
  const initDataString = req.body;
  const botToken = process.env.TELEGRAM_API_KEY;

  if (!initDataString || typeof initDataString !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'initData is required and must be a string',
    });
  }
  if (!botToken) {
    console.error('Error: TELEGRAM_API_KEY is not set.'); // Важно для безопасности
    return res
      .status(500)
      .json({ success: false, error: 'Server configuration error' });
  }

  const { isValid, userId } = verifyTelegramWebAppData(
    initDataString,
    botToken
  );

  if (isValid && userId) {
    try {
      const { remonline_id } = await getRemonlineIdByTelegramId({
        telegramId: userId,
      });
      const params = {
        remonline_id,
      };
      const orders = await getOrders({ params });

      res.status(200).json({
        success: true,
        message: 'Data verified and orders fetched',

        user: { id: userId },
        orders,
      });
    } catch (error) {
      console.error(
        `Error fetching orders for Telegram User ID ${userId}:`,
        error
      );
      res.status(500).json({
        success: true, // Аутентификация прошла, но заказы не загрузились
        message: 'User authenticated, but failed to fetch orders.',
        user: { id: userId },
        orders: null,
        error: error.message,
      });
    }
  } else if (isValid && !userId) {
    // Случай, когда initData валиден, но userId по какой-то причине не был извлечен (маловероятно, если user поле есть)
    console.warn('initData is valid, but userId could not be extracted.');
    res.status(403).json({
      success: false,
      error: 'User data incomplete in Telegram initData.',
    });
  } else {
    console.warn('Invalid initData received:', initDataString);
    res.status(403).json({
      success: false,
      error: 'Invalid Telegram data or hash mismatch',
    });
  }
};
