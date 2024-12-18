

export function resolvePromise(prms, promiseState){

    function setDataACB(promise) {
        if (promiseState.promise === prms) {
            promiseState.data = promise;
        }   
    }

    function errorACB(error) {
        if (promiseState.promise === prms) {
            promiseState.error = error;
            console.error("Promise Rejected: ", error);
        }
    }

    promiseState.promise= prms;
    promiseState.data= null;
    promiseState.error= null;

    if (prms === null) {
        return;
    }

    prms.then(setDataACB).catch(errorACB)
}