import axios, { AxiosResponse } from "axios";
import { Container } from "../interfaces/container.interface";
import { Statistics } from "../interfaces/statistics.interface";
import { setLocale } from "./locale.helper";


export async function phaseOne(amoId: string, clientName: string, clientEmail: string, clientPhone: string,
    setIsOpen: (e: any) => void, setUrl: (e: any) => void, setPaymentLink: (e: any) => void, setInstallLink: (e: any) => void,
    setIsActive1: (e: any) => void, setIsActive2: (e: any) => void, router: any) {
    await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/clients/add_client/', {
        amo_id: amoId,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
    })
        .then(function (response) {
            console.log(setLocale(router.locale).phase_one_response);
            alert(setLocale(router.locale).phase_one_response);

            setIsOpen(true);
            setUrl(response.data.url);
            setPaymentLink(response.data.payment_link);
            setInstallLink(response.data.install_link);

            setIsActive1(false);
            setIsActive2(true);

            localStorage.setItem('client', JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(setLocale(router.locale).error + ': ' + error);
            alert(setLocale(router.locale).error + ': ' + error);
        });
}

export async function checkPayment(setIsPayment: (e: any) => void, setIsActive2: (e: any) => void, setIsActive3: (e: any) => void,
    router: any) {
    let client = localStorage.getItem('client');
    
    if (client) {
        let clientJSON = JSON.parse(client);

        const { data: response }: AxiosResponse<boolean> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + 
            '/clients/paid_or_not?uuid=' + clientJSON.uuid);

        if (response) {
            setIsPayment(true);
            alert(setLocale(router.locale).payment_confirmed);

            setIsActive2(false);
            setIsActive3(true);
        } else {
            alert(setLocale(router.locale).payment_not_confirmed);
        }
    }
}

export async function getContainers(setContainers: (e: any) => void) {
	const { data: response }: AxiosResponse<Container[]> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/containers/get_containers');

    setContainers(response);
}

export async function upContainer(value: string, router: any) {
	await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/containers/up_container', {
        uuid: value,
    })
        .then(function () {
            console.log(setLocale(router.locale).container_upped_successfully);
            alert(setLocale(router.locale).container_upped_successfully);
        })
        .catch(function (error) {
            console.log(setLocale(router.locale).error + ': ' + error);
            alert(setLocale(router.locale).error + ': ' + error);
        });
}

export async function downContainer(value: string, router: any) {
	await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/containers/stop_container', {
        uuid: value,
    })
        .then(function () {
            console.log(setLocale(router.locale).container_stopped_successfully);
            alert(setLocale(router.locale).container_stopped_successfully);
        })
        .catch(function (error) {
            console.log(setLocale(router.locale).error + ': ' + error);
            alert(setLocale(router.locale).error + ': ' + error);
        });
}

export async function deleteContainer(value: string, setContainers: (e: any) => void, router: any) {
	await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/containers/delete_container', {
        uuid: value,
    })
        .then(function () {
            console.log(setLocale(router.locale).container_deleted_successfully);
            alert(setLocale(router.locale).container_deleted_successfully);

            getContainers(setContainers);
        })
        .catch(function (error) {
            console.log(setLocale(router.locale).error + ': ' + error);
            alert(setLocale(router.locale).error + ': ' + error);
        });
}

export async function getStatistics(setStatistics: (e: any) => void, router: any) {
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

      for (let stat of response) {
        if (stat.status === "Active") {
            stat.status = setLocale(router.locale).active;
        } else if (stat.status === "Stopped") {
            stat.status = setLocale(router.locale).stopped;
        } else {
            stat.status = setLocale(router.locale).deleted;
        }
      }

    setStatistics(response);
}
