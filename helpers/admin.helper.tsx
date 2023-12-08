import axios from "axios";


export async function phaseOne(amoId: string, clientName: string, clientEmail: string, clientPhone: string, stripeId: string,
    setIsOpen: (e: any) => void, setUrl: (e: any) => void, setPaymentLink: (e: any) => void) {
    await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/clients/add_client', {
        amo_id: amoId,
        client_name: clientName,
        client_email: clientPhone,
        client_phone: clientEmail,
        stripe_id: stripeId,
    })
        .then(function (response) {
            console.log('Success!');

            setIsOpen(true);
            setUrl(response.data.url);
            setPaymentLink(response.data.payment_link);

            localStorage.setItem('client', JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log("Error: " + error);
        });
}

export async function phaseTwo(clientId: string, clientSecret: string) {
    let client = localStorage.getItem('client');
    
    if (client) {
        let clientJSON = JSON.parse(client);

        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/containers/add_container', {
            amo_id: clientJSON.new_client.amo_id,
            client_name: clientJSON.new_client.client_name,
            uuid: clientJSON.uuid,
            client_id: clientId,
            client_secret: clientSecret,
        })
            .then(function (response) {
                console.log('Success!');

                localStorage.clear();
            })
            .catch(function (error) {
                console.log("Error: " + error);
            });
    }
}
