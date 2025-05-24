import fetch from "node-fetch";
import { remonlineTokenReturn, remonlineTokenToEnv } from "./remonline.api.mjs";
import { message } from "telegraf/filters";

async function getOrderLable(orderId) {
  console.log(
    `await fetch(\`${process.env.REMONLINE_API}/order/?token=${process.env.REMONLINE_API_TOKEN}&ids[]=${orderId}\`);`
  );
  const response = await fetch(
    `${process.env.REMONLINE_API}/order/?token=${process.env.REMONLINE_API_TOKEN}&ids[]=${orderId}`
  );
  const data = await response.json();
  // console.log("lable data resp:", data);
  const { success } = data;
  if (!success) {
    const { message } = data;
    const { validation } = message;
    console.error({
      function: "getOrderLable",
      message,
      validation,
      status: response.status(),
    });
    return;
  }
  const { data: orders, count } = data;
  if (count == 0) {
    return { idLabel: null };
  }
  const [order] = orders;
  const { id_label: idLabel } = order;
  return { idLabel };
}

export async function createOrder({
  malfunction,
  scheduledFor,
  plateNumber,
  remonlineId,
  branchPublicName,
  branchId,
  manager_id,
  asset_id,
}) {
  const order_type = 185289;
  // {
  //   "id": 6728287,
  //   "name": "Номер авто (автозапись)",
  //   "type": 1
  // },
  // {
  //   "id": 6728288,
  //   "name": "Город (автозапись)",
  //   "type": 1
  // },
  const custom_fields = {
    f5294177: "test", // автопарк
    f5294178: 5.0, // Пробег одонометр
    6728287: plateNumber, // номер авто
    6728288: branchPublicName, // название бранча(города)
  };
  const params = {
    order_type,
    branch_id: branchId,
    client_id: remonlineId,
    malfunction,
    scheduled_for: scheduledFor,
    custom_fields,
    manager_id,
    asset_id,
    // ad_campaign_id,
  };
  const url = `${process.env.REMONLINE_API}/order/?token=${process.env.REMONLINE_API_TOKEN}`;
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify(params),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  // console.log({ url, params, data });

  const { success } = data;
  if (!success) {
    const { message, code } = data;
    const { validation } = message;

    if (
      (response.status == 403 && code == 101) ||
      (response.status == 401 && code == 401)
    ) {
      console.info({ function: "createOrder", message: "Get new Auth" });
      await remonlineTokenToEnv(true);
      return await createOrder({
        malfunction,
        scheduledFor,
        plateNumber,
        remonlineId,
        branchPublicName,
        branchId,
        // managerId,
      });
    }

    console.error({
      function: "createOrder",
      message,
      validation,
      status: response.status,
    });
    return;
  }

  const { id } = data.data;
  const { idLabel } = await getOrderLable(id);
  console.log("createOrder return:", id, idLabel);
  return { id, idLabel };
}

export async function getClientsByPhone({ nationalNumber }) {
  const response = await fetch(
    `${process.env.REMONLINE_API}/clients/?token=${process.env.REMONLINE_API_TOKEN}&phones[]=${nationalNumber}`
  );

  const data = await response.json();
  const { success } = data;
  if (!success) {
    const { message, code } = data;
    const { validation } = message;

    if ((response.status == 403 && code == 101) || response.status == 401) {
      console.info({ function: "getClientsByPhone", message: "Get new Auth" });
      await remonlineTokenToEnv(true);
      return await getClientsByPhone({ nationalNumber });
    }

    console.error({
      function: "createOrder",
      message,
      validation,
      status: response.status,
    });
    return;
  }

  const { data: clientsList, count } = data;
  return { clientsList, count };
}

export async function createClient({
  email,
  fullName,
  number,
  telegramId,
  branchPublicName,
}) {
  const [first_name, last_name] = fullName.split(" ");

  // Prepare request body correctly as a JSON object
  const requestBody = {
    token: process.env.REMONLINE_API_TOKEN,
    first_name,
    last_name: last_name || "n0_2nd_Name",
    phone: [number], // Phone must be an array
    custom_fields: {
      6729251: telegramId.toString(),
      5370833: "Зовнішній клієнт",
      f5370833: "Зовнішній клієнт",
      6879276: branchPublicName,
    },
  };

  if (email) {
    requestBody.email = email;
  }

  // console.log("Request Payload:", JSON.stringify(requestBody, null, 2)); // Debugging output

  const response = await fetch(`${process.env.REMONLINE_API}/clients/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // Ensure JSON content type
    body: JSON.stringify(requestBody), // Send as JSON, NOT as x-www-form-urlencoded
  });

  const data = await response.json();

  if (!data.success) {
    console.error({
      function: "createClient",
      message: JSON.stringify(data.message) || "Unknown error",
      validation: data.validation,
      status: response.status,
    });
    return;
  }

  return { clientId: data.data.id };
}
export async function getOrders(
  { idLabels, ids, modified_at, sort_dir, client_id },
  _page = 1,
  _orders = []
) {
  let idLabelsUrl = "";
  if (idLabels) {
    for (let idLabel of idLabels) {
      idLabelsUrl += `&id_labels[]=${idLabel}`;
    }
  }
  let idUrl = "";

  if (ids) {
    for (let id of ids) {
      idUrl += `&ids[]=${id}`;
    }
  }
  const sort_dir_url = sort_dir ? `&sort_dir=${sort_dir}` : "";
  const modified_at_url = modified_at ? `&modified_at[]=${modified_at}` : "";
  const client_id_url = client_id ? `&client_ids=${client_id}` : "";

  const url = `${process.env.REMONLINE_API}/order/?token=${process.env.REMONLINE_API_TOKEN}&page=${_page}${idLabelsUrl}${idUrl}${sort_dir_url}${modified_at_url}${client_id_url}`;
  console.log({ url });
  const response = await fetch(url);

  if (
    response.status == 414 ||
    response.status == 503 ||
    response.status == 502 ||
    response.status == 504
  ) {
    throw await response.text();
  }

  if (process.env.LOG == "LOG") {
    console.log(await response.text());
  }

  const data = await response.json();
  const { success } = data;
  if (!success) {
    const { message, code } = data;
    const { validation } = message;

    if ((response.status == 403 && code == 101) || response.status == 401) {
      console.info({ function: "getOrders", message: "Get new Auth" });
      await remonlineTokenToEnv(true);
      return await getOrders({idLabels, ids, modified_at, sort_dir, client_id}, _page, _orders);
    }

    console.error({
      function: "getOrders",
      message,
      validation,
      status: response.status,
    });
    return;
  }

  const { data: orders, count, page } = data;

  const doneOnPrevPage = (page - 1) * 50;

  const leftToFinish = count - doneOnPrevPage - orders.length;

  _orders.push(...orders);

  console.log({ count, page, doneOnPrevPage, leftToFinish });

  if (leftToFinish > 0) {
    return await getOrders(
      { idLabels, ids, modified_at, sort_dir, client_id },
      parseInt(page) + 1,
      _orders
    );
  }

  return { orders: _orders, count };
}
export async function editClient({ id, branchPublicName }) {
  const params = new URLSearchParams();
  params.append("token", process.env.REMONLINE_API_TOKEN);
  params.append("id", id);
  params.append(
    "custom_fields",
    JSON.stringify({
      6879276: branchPublicName,
    })
  );

  const response = await fetch(`${process.env.REMONLINE_API}/clients/`, {
    method: "PUT",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const data = await response.json();
  const { success } = data;
  if (!success) {
    const { message, code } = data;
    const { validation } = message;

    if (response.status == 403 && code == 101) {
      console.info({ function: "editClient", message: "Get new Auth" });
      await remonlineTokenToEnv(true);
      return await editClient({
        id,
        branchPublicName,
      });
    }

    console.error({
      function: "editClient",
      message,
      validation,
      status: response.status,
    });
    return;
  }

  const { data: editData } = data;
  const { id: clientId } = editData;
  return { clientId };
}

if (process.env.REMONLINE_MODE == "dev") {
  (async () => {
    await remonlineTokenToEnv();
    createOrder({
      malfunction: "?",
      scheduledFor: new Date().getTime(),
      plateNumber: "??",
      telegramId: "???",
    });
    // getClientsByPhone({ nationalNumber: '0931630786' })
  })();
}
export async function createAsset({
  uid,
  brand,
  carGroup,
  color,
  year,
  model,
  mileage,
  engineVolume,
  myTaxiCrmId,
  client_id,
}) {
  const params = {
    uid,
    group: carGroup,
    brand,
    color,
    year,
    model,
    owner_id: client_id,
    custom_fields: {
      5269820: mileage, //probig
      8088870: engineVolume, //Об'єм двигуна (куб.см)
      7280143: myTaxiCrmId, //MY_TAXI_CRM_ID
    },
  };
  const url = `${process.env.REMONLINE_API}/warehouse/assets`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.REMONLINE_API_TOKEN}`,
    },

    body: JSON.stringify(params),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  const { success } = data;
  if (!success) {
    const { message, code } = data;
    const { validation } = message;

    if (
      (response.status == 403 && code == 101) ||
      (response.status == 401 && code == 401)
    ) {
      console.info({ function: "createAsset", message: "Get new Auth" });
      await remonlineTokenToEnv(true);
      return await createAsset({ uid });
    }

    console.error({
      function: "createAsset",
      message,
      validation,
      status: response.status,
    });
    return;
  }
  return { asset: data };
}
export async function getAsset({ params }) {
  let query_params = `?token=${process.env.REMONLINE_API_TOKEN}`;
  if (!params || Object.keys(params).length == 0) {
    console.error(`requieres params`);
  }
  if (params?.licensePlate) {
    query_params += `&uid[]=${params.licensePlate}`;
  }
  if (params?.remonline_id) {
    query_params += `&owner_id[]=${params.remonline_id}`;
  }
  if (params?.asset_id) {
    query_params += `&ids[]=${params.asset_id}`;
  }

  const url = `${process.env.REMONLINE_API}/warehouse/assets${query_params}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${process.env.REMONLINE_API_TOKEN}`,
    },
  };

  console.log(`requesting url:${url}`);

  const response = await fetch(url, options);
  const data = await response.json();
  const { success } = data;
  if (!success) {
    const { message, code } = data;
    const { validation } = message;

    if (
      (response.status == 403 && code == 101) ||
      (response.status == 401 && code == 401)
    ) {
      console.info({ function: "getAsset", message: "Get new Auth" });
      await remonlineTokenToEnv(true);
      return await getAsset({ params });
    }

    console.error({
      function: "getAsset",
      message,
      validation,
      status: response.status,
    });
    return;
  }
  return data;
}
