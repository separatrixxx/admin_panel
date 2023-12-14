import axios, { AxiosResponse } from "axios";
import { Container } from "../interfaces/container.interface";
import { Statistics } from "../interfaces/statistics.interface";


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

export async function checkPayment(setIsPayment: (e: any) => void) {
    let client = localStorage.getItem('client');
    
    if (client) {
        let clientJSON = JSON.parse(client);

        const { data: response }: AxiosResponse<boolean> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + 
            '/clients/paid_or_not?uuid=' + clientJSON.uuid);

        if (response) {
            setIsPayment(true);
            alert('Payment confirmed');
        } else {
            alert('Payment not confirmed');
        }
    }
}

export async function getContainers(setContainers: (e: any) => void) {
	const { data: response }: AxiosResponse<Container[]> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/containers/get_containers');
    console.log(response)
    setContainers(response);
}

export async function upContainer(value: string) {
	await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/containers/up_container', {
        uuid: value,
    })
        .then(function () {
            console.log('Container upped successfully');
            alert('Container upped successfully');
        })
        .catch(function (error) {
            console.log("Error: " + error);
            alert("Error: " + error);
        });
}

export async function downContainer(value: string) {
	await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/containers/stop_container', {
        uuid: value,
    })
        .then(function () {
            console.log('Container stopped successfully');
            alert('Container stopped successfully');
        })
        .catch(function (error) {
            console.log("Error: " + error);
            alert("Error: " + error);
        });
}

export async function deleteContainer(value: string, setContainers: (e: any) => void) {
	await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/containers/delete_container', {
        uuid: value,
    })
        .then(function () {
            console.log('Container deleted successfully');
            alert('Container deleted successfully');

            getContainers(setContainers);
        })
        .catch(function (error) {
            console.log("Error: " + error);
            alert("Error: " + error);
        });
}

export async function getStatistics(setStatistics: (e: any) => void) {
	const { data: response }: AxiosResponse<Statistics[]> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/containers/showAllStates');
    
    response.sort((a, b) => {
        if (a.status === "Active" && b.status !== "Active") {
          return -1;
        } else if (a.status !== "Active" && b.status === "Active") {
          return 1;
        } else if (a.status === "Stopped" && b.status === "Deleted") {
          return -1;
        } else if (a.status === "Deleted" && b.status === "Stopped") {
          return 1;
        } else {
          return 0;
        }
      });

    setStatistics(response);
}
