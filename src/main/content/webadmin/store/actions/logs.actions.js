export const SET_WEBADMIN_LOGS = 'SET-WEBADMIN-LOGS';

export function setWebadminLogs(data, post)
{

    return {
        type      : SET_WEBADMIN_LOGS,
        logs      : data,
        post      : post
    }
}


