import axios from "axios";


export async function phaseOne(amoId: string, clientName: string, clientEmail: string, clientPhone: string,
    setIsOpen: (e: any) => void, setUrl: (e: any) => void, setPaymentLink: (e: any) => void, setInstallLink: (e: any) => void) {
    await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/clients/add_client/', {
        amo_id: amoId,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
    })
        .then(function (response) {
            console.log('Client data has been sent to the server, we are waiting for a link');
            alert('Client data has been sent to the server, we are waiting for a link');

            setIsOpen(true);
            setUrl(response.data.url);
            setPaymentLink(response.data.payment_link);
            setInstallLink(response.data.install_link);

            localStorage.setItem('client', JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log("Error: " + error);
            alert("Error: " + error);
        });
}

export async function phaseTwo(clientId: string, clientSecret: string) {
    let client = localStorage.getItem('client');
    
    if (client) {
        let clientJSON = JSON.parse(client);

        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/containers/add_container?timeout=12000', {
            amo_id: clientJSON.new_client.amo_id,
            client_name: clientJSON.new_client.client_name,
            uuid: clientJSON.uuid,
            client_id: clientId,
            client_secret: clientSecret,
        })
            .then(function () {
                console.log('The data has been sent, we are waiting for the container');
                alert('The data has been sent, we are waiting for the container');
            })
            .catch(function (error) {
                console.log("Error: " + error);
                alert("Error: " + error);
            });
    }
}

export async function phaseThree() {
    let client = localStorage.getItem('client');
    
    if (client) {
        let clientJSON = JSON.parse(client);

        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/contracts/add_contract', {
            amo_id: clientJSON.new_client.amo_id,
            uuid: clientJSON.uuid,
            client_name: clientJSON.new_client.client_name,
        })
            .then(function () {
                console.log('The data has been sent, contract added successfully');
                alert('The data has been sent, contract added successfully');

                localStorage.clear();
            })
            .catch(function (error) {
                console.log("Error: " + error);
                alert("Error: " + error);
            });
    }
}
