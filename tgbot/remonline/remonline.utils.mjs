
import fetch from 'node-fetch';
import {remonlineTokenReturn, remonlineTokenToEnv} from './remonline.api.mjs'
import {message} from "telegraf/filters";
import remonline from '@api/remonline';

async function getOrderLable(orderId) {
    console.log(`await fetch(\`${process.env.REMONLINE_API}/order/?token=${process.env.REMONLINE_API_TOKEN}&ids[]=${orderId}\`);`);
    const response = await fetch(`${process.env.REMONLINE_API}/order/?token=${process.env.REMONLINE_API_TOKEN}&ids[]=${orderId}`);
    const data = await response.json();
    console.log('lable data resp:',data);
    const { success } = data
    if (!success) {
        const { message } = data
        const { validation } = message
        console.error({ function: 'getOrderLable', message, validation, status: response.status() })
        return
    }
    const { data: orders, count } = data
    if (count == 0) {
        return { idLabel: null }
    }
    const [order] = orders
    const { id_label: idLabel } = order
    return { idLabel }
}

export async function createOrder({
    malfunction,
    scheduledFor,
    plateNumber,
    remonlineId,
    branchPublicName,
    branchId,
    managerId
}) {
    console.log("createOrder",arguments);
    const params = new URLSearchParams();
    params.append('duration', 60);

    params.append('token', process.env.REMONLINE_API_TOKEN);
    params.append('branch_id', branchId);
    params.append('order_type', process.env.ORDER_TYPE_REPAIR);
    params.append('client_id', remonlineId);
    params.append('manager', managerId);

    params.append('malfunction', malfunction);
    params.append('scheduled_for', scheduledFor);

    params.append('custom_fields', JSON.stringify({
        // 5294178: carMilleage,
        // 5294177: title,
        // 6728288: city,
        // 6728289: phone,
        // 6329336: telegramId,
        6728287: plateNumber,
        6728288: branchPublicName
    }));

    const sdk=await remonline.auth( await remonlineTokenReturn());
    const response=await remonline.createOrder({
        branch_id:branchId,
        order_type:process.env.ORDER_TYPE_REPAIR,
        client_id:remonlineId,
        scheduled_for:scheduledFor,

        custom_fields:{
            // 5294178: carMilleage,
            // 5294177: title,
            // 6728288: city,
            // 6728289: phone,
            // 6329336: telegramId,
            6728287: plateNumber,
            6728288: branchPublicName
        }
    });
    console.log(JSON.stringify(response));
    // const data=await response.json();

    // const data = await response.json();
    const { success } = response.data
    if (!success) {
        const { message, code } = data
        const { validation } = message

        if (response.status == 403 && code == 101) {
            console.info({ function: 'createOrder', message: 'Get new Auth' })
            await remonlineTokenToEnv(true);
            return await createOrder({
                malfunction,
                scheduledFor,
                plateNumber,
                remonlineId,
                branchPublicName,
                branchId,
                managerId
            });
        }

        console.error({ function: 'createOrder', message, validation, status: response.status })
        return
    }

    const { data } = response.data
    const { id } = data
    const { idLabel } = await getOrderLable(id)
    console.log('createOrder return:',data,id,idLabel)
    return { id, idLabel };
}

export async function getClientsByPhone({
    nationalNumber
}) {

    const response = await fetch(`${process.env.REMONLINE_API}/clients/?token=${process.env.REMONLINE_API_TOKEN}&phones[]=${nationalNumber}`);


    const data = await response.json();
    const { success } = data
    if (!success) {
        const { message, code } = data
        const { validation } = message

        if (response.status == 403 && code == 101) {
            console.info({ function: 'getClientsByPhone', message: 'Get new Auth' })
            await remonlineTokenToEnv(true);
            return await getClientsByPhone({ nationalNumber });
        }

        console.error({ function: 'createOrder', message, validation, status: response.status })
        return
    }

    const { data: clientsList, count } = data
    return { clientsList, count }

}

export async function createClient({
                                       email,
                                       fullName,
                                       number,
                                       telegramId,
                                       branchPublicName
                                   }) {
    const [first_name, last_name] = fullName.split(' ');

    // Prepare request body correctly as a JSON object
    const requestBody = {
        token: process.env.REMONLINE_API_TOKEN,
        first_name,
        last_name: last_name || "n0_2nd_Name",
        phone: [number], // Phone must be an array
        custom_fields: {
            6729251: telegramId.toString(),
            5370833: 'Зовнішній клієнт',
            f5370833: 'Зовнішній клієнт',
            6879276: branchPublicName
        }
    };

    if (email) {
        requestBody.email = email;
    }

    console.log("Request Payload:", JSON.stringify(requestBody, null, 2)); // Debugging output

    const response = await fetch(`${process.env.REMONLINE_API}/clients/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Ensure JSON content type
        body: JSON.stringify(requestBody) // Send as JSON, NOT as x-www-form-urlencoded
    });

    const data = await response.json();

    if (!data.success) {
        console.error({
            function: 'createClient',
            message:JSON.stringify(data.message) || "Unknown error",
            validation: data.validation,
            status: response.status
        });
        return;
    }

    return { clientId: data.data.id };
}
export const getOrders=async(params)=>{
    // remonlineTokenToEnv().then((response)=>{remonline.auth(process.env.REMONLINE_API_KEY)})
    //     .then(()=>remonline.getOrders())
    //     .then((response)=>{ console.log(response) })
    //     .catch((error)=>console.log(error));
    try {

        // await remonlineTokenToEnv(true);
        // const sdk=await remonline.auth('7f1a27773dfd3f2e6fb04d2c05281901bff387ea');
        // console.log(`api token before fetching data ${process.env.REMONLINE_API_TOKEN}`);
        // const sdk=await remonline.auth(process.env.REMONLINE_API_KEY);
        const sdk=await remonline.auth( await remonlineTokenReturn());

        // const response=await remonline.getOrders(params);
        // // console.log(response);
        // return response;
        return await remonline.getOrders(params);
    }
    catch(err){
        console.error(err);
    }

}
export async function editClient({
    id,
    branchPublicName
}) {



    const params = new URLSearchParams();
    params.append('token', process.env.REMONLINE_API_TOKEN);
    params.append('id', id);
    params.append('custom_fields', JSON.stringify({
        6879276: branchPublicName
    }));

    const response = await fetch(`${process.env.REMONLINE_API}/clients/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
    });


    const data = await response.json();
    const { success } = data
    if (!success) {
        const { message, code } = data
        const { validation } = message

        if (response.status == 403 && code == 101) {
            console.info({ function: 'editClient', message: 'Get new Auth' })
            await remonlineTokenToEnv(true);
            return await editClient({
                id,
                branchPublicName
            });
        }

        console.error({ function: 'editClient', message, validation, status: response.status })
        return
    }

    const { data: editData } = data
    const { id: clientId } = editData
    return { clientId };

}


if (process.env.REMONLINE_MODE == 'dev') {
    (async () => {
        await remonlineTokenToEnv();
        createOrder({ malfunction: '?', scheduledFor: new Date().getTime(), plateNumber: '??', telegramId: '???' });
        // getClientsByPhone({ nationalNumber: '0931630786' })
    })()
}
