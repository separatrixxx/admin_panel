import axios, { AxiosResponse } from "axios";
import { Container } from "../interfaces/container.interface";
import { Statistics } from "../interfaces/statistics.interface";
import { setLocale } from "./locale.helper";
import { User } from "interfaces/user.interface";


export async function checkClient(clientDomain: string, clientName: string, clientSurname: string,
    clientEmail: string, clientPhone: string, router: any, setInstallLink: (e: any) => void) {
    if (clientDomain.indexOf('|') === -1 && clientDomain.indexOf('/') === -1 && clientDomain.indexOf('\\') === -1 &&
        clientDomain.indexOf(':') === -1 && clientDomain.slice(0, 8).toLowerCase() !== 'https://' && 
        clientDomain.slice(0, 7).toLowerCase() !== 'http://' &&
        (clientDomain.slice(clientDomain.length - 9, clientDomain.length).toLowerCase() === 'kommo.com')
        || clientDomain.slice(clientDomain.length - 10, clientDomain.length).toLowerCase() === 'amocrm.com') {
        if (clientDomain.slice(clientDomain.length - 10, clientDomain.length).toLowerCase() === 'amocrm.com') {
            clientDomain = clientDomain.replace('amocrm', 'kommo');
        }

        const { data: isClient }: AxiosResponse<boolean> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + 
            '/clients/check_client_exists?client_name=' + clientDomain);
    
        if (!isClient) {
            phaseOne(clientDomain, clientName, clientSurname, clientEmail, clientPhone, router, setInstallLink);
        } else {
            alert(setLocale(router.locale).client_exist);
        }
    } else {
        alert(setLocale(router.locale).invalid_format);
    }
}

export async function phaseOne(clientDomain: string, clientName: string, clientSurname: string, clientEmail: string,
    clientPhone: string, router: any, setInstallLink: (e: any) => void) {
    await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/clients/add_client2/', {
        client_name: clientDomain,
        name: clientName,
        surname: clientSurname,
        client_email: clientEmail,
        client_phone: clientPhone,
    })
        .then(function (response) {
            setInstallLink(response.data.install_link);

            console.log(setLocale(router.locale).phase_one_response);
        })
        .catch(function (error) {
            console.log(setLocale(router.locale).error + ': ' + error);
            alert(setLocale(router.locale).error + ': ' + error);
        });
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

export async function getUsers(setUsers: (e: any) => void) {
	const { data: response }: AxiosResponse<User[]> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/clients/all_client_states');

    setUsers(response);
}

export async function deleteUser(uuid: string, setUsers: (e: any) => void, router: any) {
	await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/clinets/delete_client2', {
        uuid: uuid,
    })
        .then(function () {
            console.log(setLocale(router.locale).client_deleted_successfully);
            alert(setLocale(router.locale).client_deleted_successfully);

            getUsers(setUsers);
        })
        .catch(function (error) {
            console.log(setLocale(router.locale).error + ': ' + error);
            alert(setLocale(router.locale).error + ': ' + error);
        });
}
